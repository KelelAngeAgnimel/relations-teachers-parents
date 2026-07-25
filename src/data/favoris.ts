const favoris = new Set<string>();

export function estFavori(id: string) {
  return favoris.has(id);
}

export function toggleFavori(id: string) {
  if (favoris.has(id)) {
    favoris.delete(id);
  } else {
    favoris.add(id);
  }
}

export function getFavoris() {
  return Array.from(favoris);
}
