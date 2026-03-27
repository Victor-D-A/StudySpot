import { useState } from 'react';
import { useEffect } from 'react';
import './Libraries.css';
import Filters from "./Filters";
import LocationCard from "./LocationCard";
import librariesData from "./librariesData.json";
import type { Location, FavoriteItem } from "./types";
import { getFavorites, saveFavorites } from './favorites';

export default function Libraries() {
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [selectedLibrary, setSelectedLibrary] = useState<number | null>(null);
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

    const libraries: Location[] = librariesData;

    useEffect(() => {
        setFavorites(getFavorites());
    }, []);

    const filteredLibraries =
        activeFilters.length === 0
        ? libraries
        : libraries.filter((libraries) =>
            activeFilters.every((filter) => {
                if (filter === "Wifi") return libraries.hasWifi;
                if (filter === "Outlets") return libraries.hasOutlets;
                if (filter === "Quiet") return libraries.quiet;
                if (filter === "Booths") return libraries.hasBooths;
                if (filter === "Outdoor Seating") return libraries.hasOutdoorSeating;
                if (filter === "Pet Friendly") return libraries.isPetFriendly;
                if (filter === "Private Room") return libraries.hasPrivateRoom;
                if (filter === "24/7") return libraries.isOpen24Hours;
                return true;
        })
    );

    function handleLibraryClick(libraryId: number) {
        setSelectedLibrary((current) => (current === libraryId ? null : libraryId));
    }

    function handleToggleFavorite(libraryId: number) {
        const favoriteToToggle: FavoriteItem = {
            id: libraryId,
            category: "library",
        };

        const isAlreadyFavorite = favorites.some(
            (favorite) => favorite.id === libraryId && favorite.category === "library"
        );

        const updatedFavorites = isAlreadyFavorite
        ? favorites.filter(
            (favorite) => !(favorite.id === libraryId && favorite.category === "library")
            )
        : [...favorites, favoriteToToggle];

        setFavorites(updatedFavorites);
        saveFavorites(updatedFavorites);
    }

    return ( // JSX code
        <div className="library-page-wrapper">
            <h1>Libraries</h1>
            <div className = "library-description-wrapper">
                <p className = "library-description">Welcome to the Library page! Here you will be able to find libraries that fit your personality. 
                    Libraries offer a great place to read, study, and accomplish work. Our selection offers a range for every need. Filter out your most wanted
                    needs and start viewing your next place to forward your goals.
                </p>
            </div>
            <div className = 'library-filters-wrapper'>
                <Filters activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
            </div>
            <div className = "section-divider"></div>
            <div className = "library-cards-grid">
                {filteredLibraries.map((library) => (
                    <LocationCard
                        key={library.id}
                        location = {library} 
                        isSelected = {selectedLibrary === library.id}
                        onClick = {() => handleLibraryClick(library.id)}
                        isFavorite = {favorites.some(
                            (favorite) => favorite.id === library.id && favorite.category === "library"
                        )}
                        onToggleFavorite={() => handleToggleFavorite(library.id)}
                    />
                ))}

            </div>
        </div>
    )


}