import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AlugaPA - Máquinas e Equipamentos',
    short_name: 'AlugaPA',
    description: 'A plataforma nacional para alugar equipamentos e serviços especializados.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#2563eb',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon.svg',
        sizes: '192x192 512x512',
        type: 'image/svg+xml',
      }
    ],
  };
}
