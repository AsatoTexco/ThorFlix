'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    router.push("/login");
  }, [router]);

  return null; // Opcionalmente, você pode retornar algo como um spinner ou uma mensagem de carregamento.
}