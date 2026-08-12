'use client';

import { useState, useEffect } from 'react';
import ClientGallery from './ClientGallery';

export default function GalleryPage() {
  const [galleryData, setGalleryData] = useState({
    photos: [
      { id: '1', url: 'https://images.unsplash.com/photo-1519741497674-611481863552' },
      { id: '2', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc' },
    ],
    amount: 2000,
    upiId: '9988672153@paytm',
  });

  useEffect(() => {
    const savedData = localStorage.getItem('custom_gallery_data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.photos && parsed.photos.length > 0) {
          setGalleryData(parsed);
        }
      } catch (e) {
        console.error('Error loading custom gallery:', e);
      }
    }
  }, []);

  return (
    <ClientGallery
      photos={galleryData.photos}
      amount={galleryData.amount}
      upiId={galleryData.upiId}
    />
  );
}