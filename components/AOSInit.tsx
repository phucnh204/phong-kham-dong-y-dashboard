'use client'
import { useEffect } from 'react'

export default function AOSInit() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('aos').then(AOS => {
        AOS.init({
          duration: 3000,
          easing: 'ease-in-out',
          once: false,
          offset: 100,
          delay: 100,
        });
      });
    }
  }, []);

  return null;
}
