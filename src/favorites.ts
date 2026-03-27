import type { FavoriteItem } from "./types";

const FAVORITES_KEY = "studyspot-favorites";

export function getFavorites(): FavoriteItem [] {
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
}

export function saveFavorites(favorites: FavoriteItem[]): void {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}