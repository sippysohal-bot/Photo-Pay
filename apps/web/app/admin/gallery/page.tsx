'use client';

import { useState } from 'react';
import { Upload, Copy, Check, Image as ImageIcon, IndianRupee, QrCode } from 'lucide-react';
import Image from 'next/image';

export default function AdminGalleryPage() {
  const [clientName, setClientName] = useState('');
  const [amount, setAmount] = useState('2000');
  const [upiId, setUpiId] = useState('9988672153@paytm');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [galleryCreated, setGalleryCreated] = useState(false);

  // 🚀 Base64 ਵਿੱਚ ਫੋਟੋ ਅੱਪਲੋਡ ਕਰਨ ਦਾ ਸਹੀ ਤਰੀਕਾ
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            setUploadedFiles((prev) => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleCreateGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName) {
      alert('ਕਿਰਪਾ ਕਰਕੇ ਕਲਾਇੰਟ ਦਾ ਨਾਮ ਭਰੋ');
      return;
    }

    const galleryData = {
      clientName,
      amount: Number(amount) || 2000,
      upiId: upiId || '9988672153@paytm',
      photos:
        uploadedFiles.length > 0
          ? uploadedFiles.map((url, i) => ({ id: String(i + 1), url }))
          : [
              { id: '1', url: 'https://images.unsplash.com/photo-1519741497674-611481863552' },
              { id: '2', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc' },
            ],
    };

    // LocalStorage ਵਿੱਚ ਸੇਵ
    localStorage.setItem('custom_client_gallery', JSON.stringify(galleryData));
    setGalleryCreated(true);
    alert('✅ ਫੋਟੋਆਂ ਸਫਲਤਾਪੂਰਵਕ ਸੇਵ ਹੋ ਗਈਆਂ ਹਨ!');
  };

  const galleryLink = `http://localhost:3000/gallery`;

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
          ਕਲਾਇੰਟ ਲਈ ਨਵੀਂ ਵਾਟਰਮਾਰਕ ਗੈਲਰੀ ਬਣਾਓ, ਫੋਟੋਆਂ ਅੱਪਲੋਡ ਕਰੋ ਅਤੇ UPI ਪੇਮੈਂਟ ਸੈੱਟ ਕਰੋ।
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
              <label className="block text-xs font-medium mb-1">Upload Album Photos</label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 text-center hover:bg-black/5 transition cursor-pointer relative">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm font-medium">Click or Drag photos here to upload</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WEBP up to 20MB each</p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg transition"
            >
              Generate Client Gallery Link
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-card p-6 rounded-xl border shadow-sm space-y-4">
            <h2 className="text-lg font-semibold border-b pb-2">2. Client Share Link</h2>

            {galleryCreated ? (
              <div className="space-y-3">
                <p className="text-xs text-emerald-500 font-medium">✅ Gallery Created Successfully!</p>
                <div className="p-2.5 bg-black/5 dark:bg-white/5 rounded-lg border text-xs break-all font-mono">
                  {galleryLink}
                </div>
                <button
                  onClick={copyToClipboard}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground text-xs py-2 rounded-lg font-medium hover:opacity-90 transition"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Link Copied!' : 'Copy Link for Client'}
                </button>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                ਗੈਲਰੀ ਬਣਾਉਣ ਲਈ ਫਾਰਮ ਭਰ ਕੇ "Generate Client Gallery Link" 'ਤੇ ਕਲਿੱਕ ਕਰੋ।
              </p>
            )}
          </div>

          <div className="bg-card p-6 rounded-xl border shadow-sm space-y-3">
            <h3 className="text-sm font-semibold flex items-center justify-between">
              <span>Uploaded Photos</span>
              <span className="text-xs text-emerald-500 font-bold">{uploadedFiles.length} Photos</span>
            </h3>

            {uploadedFiles.length > 0 ? (
              <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                {uploadedFiles.map((src, index) => (
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