"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Download, Lock, QrCode, CheckCircle2 } from 'lucide-react';
import AdBanner from '~/components/gallery/AdBanner';

interface Photo {
  id: string;
  url: string;
}

export default function ClientGallery({
  photos,
  amount,
  upiId,
}: {
  photos: Photo[];
  amount: number;
  upiId: string;
}) {
  const [isPaid, setIsPaid] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const upiQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=${upiId}&pn=StudioName&am=${amount}&cu=INR`;

  const handleVerifyPayment = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gallery/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          galleryId: 'sample-gallery-id',
          transactionId: 'UPI-REF-1234',
        }),
      });

      const data = await res.json();

      if (data.success) {
        setIsPaid(true);
        setShowQrModal(false);
        alert('✅ Payment Verified! Watermark has been removed.');
      } else {
        alert('Payment verification failed.');
      }
    } catch (err) {
      // Log the error for debugging
      // eslint-disable-next-line no-console
      console.error('verify payment failed', err);
      alert('Failed to verify payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-card p-6 rounded-xl border shadow-sm gap-4">
        <div>
          <h1 className="text-2xl font-bold">Client Photo Gallery</h1>
          <p className="text-muted-foreground text-sm">
            {isPaid
              ? '✅ Payment Complete! You can now download all HD images without watermark.'
              : '🔒 Images contain watermark. Scan QR code to pay and unlock HD downloads.'}
          </p>
        </div>

        {/* PAYMENT / STATUS BUTTON */}
        {!isPaid ? (
          <button
            onClick={() => setShowQrModal(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2.5 rounded-lg transition"
          >
            <QrCode className="w-5 h-5" />
            Pay ₹{amount} via QR to Unlock
          </button>
        ) : (
          <div className="flex items-center gap-2 text-emerald-500 font-semibold bg-emerald-500/10 px-4 py-2 rounded-lg">
            <CheckCircle2 className="w-5 h-5" />
            Unlocked & Paid
          </div>
        )}
      </div>

      {/* 🚀 AD BANNER COMPONENT ਇੱਥੇ ਐਡ ਹੋ ਗਿਆ ਹੈ */}
      <AdBanner />

      {/* PHOTO GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative group overflow-hidden rounded-xl border bg-black/5 aspect-[4/3]"
          >
            {/* PHOTO */}
            <Image
              src={photo.url}
              alt="Shoot Photo"
              fill
              className="object-cover"
              unoptimized
            />

            {/* WATERMARK OVERLAY */}
            {!isPaid && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 select-none pointer-events-none">
                <span className="text-white/50 text-xl md:text-2xl font-black tracking-widest rotate-[-25deg] uppercase text-center px-4">
                  WATERMARK • PREVIEW
                </span>
              </div>
            )}

            {/* DOWNLOAD / LOCK BADGE */}
            <div className="absolute bottom-3 right-3">
              {isPaid ? (
                <a
                  href={photo.url}
                  download
                  className="flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-1.5 text-xs font-semibold rounded-lg shadow-md hover:opacity-90 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download HD
                </a>
              ) : (
                <div className="flex items-center gap-1 bg-black/70 backdrop-blur-md text-white/90 px-2.5 py-1 text-xs rounded-md">
                  <Lock className="w-3 h-3 text-amber-400" />
                  Locked
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* QR CODE PAYMENT MODAL */}
      {showQrModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-background p-6 rounded-2xl max-w-sm w-full text-center space-y-4 border shadow-xl">
            <h3 className="text-xl font-bold">Scan to Unlock Gallery</h3>
            <p className="text-xs text-muted-foreground">
              Scan using GPay, PhonePe, Paytm, or any UPI App.
            </p>

            {/* QR CODE DISPLAY */}
              <div className="flex justify-center p-3 bg-white rounded-xl border inline-block mx-auto">
              <Image src={upiQrUrl} alt="UPI QR Code" width={208} height={208} unoptimized />
            </div>

            <div className="text-sm font-semibold text-emerald-600">
              Total Amount: ₹{amount}
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={handleVerifyPayment}
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg text-sm font-medium transition disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'I Have Completed Payment'}
              </button>

              <button
                onClick={() => setShowQrModal(false)}
                className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground py-2 text-xs rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}