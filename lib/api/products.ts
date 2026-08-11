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
    const limit = params?.limit;
    const offset = params?.offset;
    const search = params?.search;
    
    if (search != null) sp.set('search', search);
    if (limit != null) sp.set('limit', String(limit));
    if (offset != null) sp.set('offset', String(offset));
    const q = sp.toString();
    return apiFetch<ProductListItem[]>(`/products${q ? `?${q}` : ''	}`);
}

export function getProductById(id: string) {
    return apiFetch<ProductDetail>(`/products/${id}`);
}
