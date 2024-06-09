import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'dedicado',
    short_name: 'dedicado',
    description: 'a dedicado oferece soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}