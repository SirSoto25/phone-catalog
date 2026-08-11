import { getProducts, getProductById } from '@/lib/api/products';

export default async function Home() {
  const products = await getProducts({ limit: 20 });
  const firstId = products[0]?.id;
  const detail = firstId ? await getProductById(firstId) : null;

  return (
    <main style={{ padding: 16, fontFamily: 'monospace', fontSize: 12 }}>
      <h1>API smoke</h1>
      <h2>GET /products?limit=20 ({products.length})</h2>
      <pre>{JSON.stringify(products, null, 2)}</pre>
      <h2>GET /products/{firstId}</h2>
      <pre>{JSON.stringify(detail, null, 2)}</pre>
    </main>
  );
}