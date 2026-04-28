import { BASE_URL, COVERS_URL } from "./constants";

export function getCoverUrl(coverId) {
  // coverId may come with undefined (need to make a plug)
  return `${COVERS_URL}/b/id/${coverId}.jpg`;
}

export function getBookUrl(key) {
  return `${BASE_URL}${key}`;
}
