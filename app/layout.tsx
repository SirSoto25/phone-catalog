import type { Metadata } from 'next';
import Navbar from '@/components/Navbar/Navbar';
import Providers from '@/components/Providers';
import './globals.scss';

export const metadata: Metadata = {
  title: 'MBST',
  description: 'Tienda de moviles',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}