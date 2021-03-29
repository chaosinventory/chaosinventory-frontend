import {
  deleteDataAuth,
  getDataAuth,
  patchDataAuth,
  postDataAuth,
} from "./apiService";

export async function getTags() {
  return await getDataAuth("/api/tag/");
}

export async function getTag(id) {
  return await getDataAuth(`/api/tag/${id}/`);
}

export async function putTag(id, name, parent) {
  return await postDataAuth(`/api/tag/${id}/`, {
    name: name,
    parent: parent,
  });
}

export async function patchTag(id, name, parent) {
  return await patchDataAuth(`/api/tag/${id}/`, {
    name: name,
    parent: parent,
  });
}

export async function postTag(name, parent) {
  return await postDataAuth("/api/tag/", {
    name: name,
    parent: parent,
  });
}

export async function deleteTag(id) {
  return await deleteDataAuth(`/api/tag/${id}/`);
}
