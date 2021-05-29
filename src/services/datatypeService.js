import {
  deleteDataAuth,
  getDataAuth,
  patchDataAuth,
  postDataAuth,
} from "./apiService";

export async function getDatatypes() {
  return await getDataAuth("/api/datatype/");
}

export async function getDatatype(id) {
  return await getDataAuth(`/api/datatype/${id}/`);
}

export async function putDatatype(id, name, note) {
  return await postDataAuth(`/api/datatype/${id}/`, {
    name: name,
    note: note,
  });
}

export async function patchDatatype(id, name, note) {
  return await patchDataAuth(`/api/datatype/${id}/`, {
    name: name,
    note: note,
  });
}

export async function postDatatype(name, note) {
  return await postDataAuth("/api/datatype/", {
    name: name,
    note: note,
  });
}

export async function deleteDatatype(id) {
  return await deleteDataAuth(`/api//api/datatype/{id}//${id}/`);
}
