import { BASE_URL, COVERS_URL } from "./constants";

export function getCoverUrl(coverId) {
  if (!coverId) {
    return null;
  }
  return `${COVERS_URL}/b/id/${coverId}.jpg`;
}

export function getBookUrl(key) {
  return `${BASE_URL}${key}`;
}
