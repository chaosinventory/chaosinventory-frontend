import { getDataAuth } from "./apiService";

export async function getProducts() {
  return await getDataAuth("/api/product/");
}

export async function getProduct(id) {
  return await getDataAuth(`/api/product/${id}/`);
}
