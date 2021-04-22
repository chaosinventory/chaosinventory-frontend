import { getDataAuth } from "./apiService";

export async function getLocation(id) {
  return await getDataAuth(`/api/location/${id}/`);
}
