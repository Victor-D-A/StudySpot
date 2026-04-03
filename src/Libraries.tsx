import { useState } from 'react';
import { useEffect } from 'react';
import './Libraries.css';
import Filters from "./Filters";
import LocationCard from "./LocationCard";
import { fetchLibraries } from './api/locationsApi';
import type { Location, FavoriteItem } from "./types";

interface LibraryProps {
    favorites: FavoriteItem[];
    setFavorites: React.Dispatch<React.SetStateAction<FavoriteItem[]>>;
}

export default function Libraries({favorites, setFavorites}: LibraryProps) {
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [selectedLibrary, setSelectedLibrary] = useState<number | null>(null);
    const [libraries, setLibraries] = useState<Location[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function loadLibraries() {
            try {
                setLoading(true); // Start request, page is waiting
                setError(""); // Clear any previous errors

                const data = await fetchLibraries(); // Fetch libraries from API
                setLibraries(data); // Store libraries in state
            } catch {
                setError("Could not load libraries."); // Show error message if request fails
            } finally {
                setLoading(false); // Stop loading no matter what
            }
        }

        loadLibraries();
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

    function handleLibraryClick(libraryItem: number) {
        setSelectedLibrary((current) => (current === libraryItem ? null : libraryItem));
    }

    function handleToggleFavorite(libraryItem: Location) {
        const favoriteToToggle: FavoriteItem = {
            id: libraryItem.id,
            name: libraryItem.name,
            description: libraryItem.description,
            category: "library",
        };

        const isAlreadyFavorite = favorites.some(
            (favorite) => favorite.id === libraryItem.id && favorite.category === "library"
        );

        const updatedFavorites = isAlreadyFavorite
        ? favorites.filter(
            (favorite) => !(favorite.id === libraryItem.id && favorite.category === "library")
            )
        : [...favorites, favoriteToToggle];

        setFavorites(updatedFavorites);
    }

    if (loading) {
        return <p>Loading libraries...</p>;
    }

    if (error) {
        return <p>{error}</p>;
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
                        onToggleFavorite={() => handleToggleFavorite(library)}
                    />
                ))}

            </div>
        </div>
    )


}