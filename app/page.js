'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';

export default function Home() {
  const TiptapEditor = useMemo(() => {
    return dynamic(() => import('./(Editor)/TiptapEditor'), { ssr: false });
  }, []);

  return (
    <TiptapEditor />
  );
}