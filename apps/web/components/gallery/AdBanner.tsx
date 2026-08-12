'use client';

import { useEffect } from 'react';

interface AdBannerProps {
  dataAdSlot?: string;
  dataAdFormat?: string;
  fullWidthResponsive?: boolean;
}

export default function AdBanner({
  dataAdSlot = '1234567890',
  dataAdFormat = 'auto',
  fullWidthResponsive = true,
}: AdBannerProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log('AdSense Error:', err);
    }
  }, []);

  return (
    <div className="w-full my-6 p-4 rounded-xl border bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-md text-center overflow-hidden">
      {/* GOOGLE ADSENSE CODE CONTAINER */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // ਇੱਥੇ ਆਪਣੀ Google AdSense ID ਲਗਾਓ
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />

      {/* FALLBACK / LOCAL PROMOTIONAL BANNER */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2 px-2">
        <div className="text-left">
          <span className="bg-emerald-500/20 text-emerald-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-emerald-500/30">
            Sponsored / Ad
          </span>
          <h4 className="text-sm font-semibold mt-1">
            Book Your Next Pre-Wedding & Event Shoot With Us!
          </h4>
          <p className="text-xs text-gray-400">
            Get 20% discount on print albums & VIP video retouches.
          </p>
        </div>
        <a
          href="https://wa.me/919988672153"
          target="_blank"
          rel="noreferrer"
          className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold text-xs px-4 py-2 rounded-lg transition whitespace-nowrap"
        >
          Book Now via WhatsApp
        </a>
      </div>
    </div>
  );
}