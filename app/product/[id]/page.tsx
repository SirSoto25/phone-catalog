type Props = {
    params: Promise<{ id: string }>;
  };
  
  export default async function ProductPage({ params }: Props) {
    const { id } = await params;
  
    return (
      <main style={{ padding: '1.5rem' }}>
        <p>producto: {id}</p>
      </main>
    );
  }