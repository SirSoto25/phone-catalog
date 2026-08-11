import { apiFetch } from "./client";
import { 
    ProductListItem, 
    ProductDetail 
} from "../types/product";

export function getProducts(params?: {
    search?: string;
    limit?: number;
    offset?: number;
}) {
    const sp = new URLSearchParams();
    if (params?.search) {
        sp.set('search', params.search);
    }
    if (params?.limit !== null) {
        sp.set('limit', String(params?.limit));
    }
    if (params?.offset) {
        sp.set('offset', String(params?.offset));
    }
    const q = sp.toString();
    return apiFetch<ProductListItem[]>(`/products${q ? `?${q}` : ''	}`);
}

export function getProductById(id: string) {
    return apiFetch<ProductDetail>(`/products/${id}`);
}
