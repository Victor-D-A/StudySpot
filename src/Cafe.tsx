import { useState } from 'react';
import { useEffect } from 'react';
import './Cafe.css';
import Filters from "./Filters";
import LocationCard from "./LocationCard";
import { fetchCafes } from './api/locationsApi';
import type { Location, FavoriteItem } from "./types";
// import { getFavorites, saveFavorites } from './favorites';

interface CafeProps {
    favorites: FavoriteItem[];
    setFavorites: React.Dispatch<React.SetStateAction<FavoriteItem[]>>;
}

export default function Cafe({favorites, setFavorites}: CafeProps) {
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [selectedCafe, setSelectedCafe] = useState<number | null>(null);
    const [cafes, setCafes] = useState<Location[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function loadCafes() {
            try {
                setLoading(true); // Start request, page is waiting
                setError(""); // Clear any previous errors

                const data = await fetchCafes(); // Fetch cafes from API
                setCafes(data); // Store cafes in state
            } catch {
                setError("Could not load cafes."); // Show error message if request fails
            } finally {
                setLoading(false); // Stop loading no matter what
            }
        }

        loadCafes();
    }, []);

    const filteredCafes =
        activeFilters.length === 0 // no filters selected, show all cafes.
        ? cafes
        : cafes.filter((cafe) => 
            activeFilters.every((filter) => {
                if (filter === "Wifi") return cafe.hasWifi;
                if (filter === "Outlets") return cafe.hasOutlets;
                if (filter === "Quiet") return cafe.quiet;
                if (filter === "Booths") return cafe.hasBooths;
                if (filter === "Outdoor Seating") return cafe.hasOutdoorSeating;
                if (filter === "Pet Friendly") return cafe.isPetFriendly;
                if (filter === "Private Room") return cafe.hasPrivateRoom;
                if (filter === "24/7") return cafe.isOpen24Hours;
                return true;
            })
        );

    function handleCafeClick(cafeItem: number) {
        setSelectedCafe((current) => (current === cafeItem ? null : cafeItem));
    }

    function handleToggleFavorite(cafeItem: Location) {
        const favoriteToToggle: FavoriteItem = {
            id: cafeItem.id,
            name: cafeItem.name,
            description: cafeItem.description,
            category: "cafe",
        };

        const isAlreadyFavorite = favorites.some( // checks if cafe is in favorites array
            (favorite) => favorite.id === cafeItem.id && favorite.category === "cafe"
        );

        const updatedFavorites = isAlreadyFavorite 
        ? favorites.filter(
            (favorite) => !(favorite.id === cafeItem.id && favorite.category === "cafe")
            )
        : [...favorites, favoriteToToggle]; // if cafe is already a favorite, remove it from favorites. If not, add it to favorites by creating a new array with the existing favorites and the new favorite item.

        setFavorites(updatedFavorites); // Update state with new favorites array
    }

    if (loading) {
        return <p>Loading cafes...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return ( // JSX code
        <div className="cafe-page-wrapper">
            <h1>Cafe Shops</h1>
            <div className = "cafe-description-wrapper">
                <p className = "cafe-description">Welcome to the Cafe Shops page! Here you will be able to find the best cafes that best suit your study needs. 
                    From cozy corners to vibrant atmospheres, our curated list of cafes offer a variety of environments for you to focus and get your work done.
                </p>
            </div>
            <div className = 'cafe-filters-wrapper'>
                <Filters activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
            </div>
            <div className = "section-divider"></div>
            <div className = "cafe-cards-grid">
                {filteredCafes.map((cafe) => ( // makes UI change
                    <LocationCard
                        key={cafe.id}
                        location = {cafe} 
                        isSelected = {selectedCafe === cafe.id}
                        onClick = {() => handleCafeClick(cafe.id)}
                        isFavorite = {favorites.some(
                            (favorite) => favorite.id === cafe.id && favorite.category === "cafe"
                        )}
                        onToggleFavorite={() => handleToggleFavorite(cafe)}
                    />
                ))}

            </div>
        </div>
    )


}