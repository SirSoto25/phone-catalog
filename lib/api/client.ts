const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

function getApiKey() {
    return process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY || '';
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${baseUrl}${path}`, {
        ...init,
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': getApiKey(),
            ...(init?.headers || {}),
        },
    });

    if (!res.ok) {
        throw new Error(`API ${res.status}: ${path}`);
    }

    return res.json() as Promise<T>;
}