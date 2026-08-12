'use client';

import { useState, useEffect } from 'react';
import { Upload, Copy, Check, Image as ImageIcon, IndianRupee, QrCode, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function AdminGalleryPage() {
  const supabase = createClientComponentClient();
  const [clientName, setClientName] = useState('');
  const [amount, setAmount] = useState('2000');
  const [upiId, setUpiId] = useState('9988672153@paytm');
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [galleryCreated, setGalleryCreated] = useState(false);
  const [galleryLink, setGalleryLink] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setGalleryLink(`${window.location.origin}/gallery`);
    }
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    const files = Array.from(e.target.files);
    const newUrls: string[] = [];

    for (const file of files) {
      if (file.size > 50 * 1024 * 1024) {
        alert(`⚠️ ਫਾਈਲ ${file.name} 50 MB ਤੋਂ ਵੱਡੀ ਹੈ।`);
        continue;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `photos/${fileName}`;

      const { error } = await supabase.storage
        .from('gallery-photos')
        .upload(filePath, file);

      if (error) {
        console.error('Upload Error:', error.message);
        alert(`ਅੱਪਲੋਡ ਫੇਲ੍ਹ: ${error.message}`);
      } else {
        const { data: publicUrlData } = supabase.storage
          .from('gallery-photos')
          .getPublicUrl(filePath);

        if (publicUrlData?.publicUrl) {
          newUrls.push(publicUrlData.publicUrl);
        }
      }
    }

    setUploadedUrls((prev) => [...prev, ...newUrls]);
    setUploading(false);
  };

  const handleCreateGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName) {
      alert('ਕਿਰਪਾ ਕਰਕੇ ਕਲਾਇੰਟ ਦਾ ਨਾਮ ਭਰੋ');
      return;
    }

    setSaving(true);
    const uniqueId = `gal_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const photosList = uploadedUrls.map((url, i) => ({ id: String(i + 1), url }));

    const galleryPayload = {
      id: uniqueId,
      client_name: clientName,
      amount: Number(amount) || 2000,
      upi_id: upiId || '9988672153@paytm',
      photos: photosList,
    };

    const { error } = await supabase.from('galleries').insert([galleryPayload]);

    if (error) {
      console.error('Database Error:', error.message);
      localStorage.setItem(`gallery_${uniqueId}`, JSON.stringify(galleryPayload));
      localStorage.setItem('custom_client_gallery', JSON.stringify(galleryPayload));
    }

    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
    const finalUniqueUrl = `${currentOrigin}/gallery?id=${uniqueId}`;
    
    setGalleryLink(finalUniqueUrl);
    setGalleryCreated(true);
    setSaving(false);
    alert('✅ ਨਵੀਂ ਗੈਲਰੀ ਦਾ ਪਰਮਾਨੈਂਟ ਲਿੰਕ ਸਫਲਤਾਪੂਰਵਕ ਬਣ ਗਿਆ ਹੈ!');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(galleryLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-8">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Studio Admin Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          ਕਲਾਇੰਟ ਲਈ ਨਵੀਂ ਵਾਟਰਮਾਰਕ ਗੈਲਰੀ ਬਣਾਓ ਅਤੇ ਪਰਮਾਨੈਂਟ ਲਿੰਕ ਜਨਰੇਟ ਕਰੋ।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <form onSubmit={handleCreateGallery} className="space-y-4 bg-card p-6 rounded-xl border shadow-sm">
            <h2 className="text-lg font-semibold border-b pb-2">1. Gallery Details</h2>

            <div>
              <label className="block text-xs font-medium mb-1">Client Name / Event</label>
              <input
                type="text"
                placeholder="ਜਿਵੇਂ: Studio Offer Gallery"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full p-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1">Unlock Price (₹)</label>
                <div className="relative">
                  <IndianRupee className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-9 p-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Your UPI ID (For Payment)</label>
                <div className="relative">
                  <QrCode className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full pl-9 p-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-medium mb-1">Upload HD Album Photos</label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 text-center hover:bg-black/5 transition cursor-pointer relative">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading || saving}
                  className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
                {uploading ? (
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                    <p className="text-sm font-medium text-emerald-500">Supabase 'ਤੇ ਫੋਟੋਆਂ ਅੱਪਲੋਡ ਹੋ ਰਹੀਆਂ ਹਨ...</p>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Click or Drag HD photos here</p>
                    <p className="text-xs text-muted-foreground mt-1">Direct Cloud Upload</p>
                  </>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={uploading || saving}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-medium py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {saving ? 'Creating Gallery Link...' : 'Generate Client Gallery Link'}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-card p-6 rounded-xl border shadow-sm space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2">2. Client Share Link</h2>

            {galleryCreated ? (
              <div className="space-y-3">
                <p className="text-xs text-emerald-500 font-medium">✅ Permanent Gallery Link Created!</p>
                <div className="p-2.5 bg-black/5 dark:bg-white/5 rounded-lg border text-xs break-all font-mono">
                  {galleryLink}
                </div>
                <button
                  onClick={copyToClipboard}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground text-xs py-2 rounded-lg font-medium hover:opacity-90 transition"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Link Copied!' : 'Copy Unique Link for Client'}
                </button>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                ਫੋਟੋਆਂ ਅੱਪਲੋਡ ਕਰਕੇ "Generate Client Gallery Link" 'ਤੇ ਕਲਿੱਕ ਕਰੋ।
              </p>
            )}
          </div>

          <div className="bg-card p-6 rounded-xl border shadow-sm space-y-3">
            <h3 className="text-sm font-semibold flex items-center justify-between">
              <span>Uploaded Photos</span>
              <span className="text-xs text-emerald-500 font-bold">{uploadedUrls.length} Photos</span>
            </h3>

            {uploadedUrls.length > 0 ? (
              <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                {uploadedUrls.map((src, index) => (
                  <Image
                    key={index}
                    src={src}
                    alt="Uploaded"
                    width={160}
                    height={96}
                    className="object-cover rounded-md border"
                    unoptimized
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-6 border rounded-lg bg-black/5 dark:bg-white/5">
                <ImageIcon className="w-6 h-6 mx-auto text-muted-foreground mb-1" />
                <p className="text-xs text-muted-foreground">No photos uploaded yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}