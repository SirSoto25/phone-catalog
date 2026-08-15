import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ padding: '1.5rem' }}>
      <p>Producto no encontrado</p>
      <Link href="/">Volver al listado</Link>
    </main>
  );
}