import { useState } from 'react';
import { useEffect } from 'react';
import './Parks.css';
import Filters from "./Filters";
import LocationCard from "./LocationCard";
import { fetchParks } from './api/locationsApi';
import type { Location, FavoriteItem } from "./types";

interface ParksProps {
    favorites: FavoriteItem[];
    setFavorites: React.Dispatch<React.SetStateAction<FavoriteItem[]>>;
}

export default function Parks({favorites, setFavorites}: ParksProps) {
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [selectedPark, setSelectedPark] = useState<number | null>(null);
    const [parks, setParks] = useState<Location[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function loadParks() {
            try {
                setLoading(true); // Start request, page is waiting
                setError(""); // Clear any previous errors

                const data = await fetchParks(); // Fetch parks from API
                setParks(data); // Store parks in state
            } catch {
                setError("Could not load parks."); // Show error message if request fails
            } finally {
                setLoading(false); // Stop loading no matter what
            }
        }

        loadParks();
    }, []);

    const filteredParks =
        activeFilters.length === 0
        ? parks
        : parks.filter((park) =>
            activeFilters.every((filter) => {
                if (filter === "Wifi") return park.hasWifi;
                if (filter === "Outlets") return park.hasOutlets;
                if (filter === "Quiet") return park.quiet;
                if (filter === "Booths") return park.hasBooths;
                if (filter === "Outdoor Seating") return park.hasOutdoorSeating;
                if (filter === "Pet Friendly") return park.isPetFriendly;
                if (filter === "Private Room") return park.hasPrivateRoom;
                if (filter === "24/7") return park.isOpen24Hours;
                return true;
            })
        );

    function handleParkClick(parkItem: number) {
        setSelectedPark((current) => (current === parkItem ? null : parkItem));
    }

    function handleToggleFavorite(parkItem: Location) {
        const favoriteToToggle: FavoriteItem = {
            id: parkItem.id,
            name: parkItem.name,
            description: parkItem.description,
            category: "park",
        };

        const isAlreadyFavorite = favorites.some(
            (favorite) => favorite.id === parkItem.id && favorite.category === "park"
        );

        const updatedFavorites = isAlreadyFavorite
            ? favorites.filter(
                (favorite) => !(favorite.id === parkItem.id && favorite.category === "park")
                )
            : [...favorites, favoriteToToggle];

        setFavorites(updatedFavorites);
    }

    if (loading) {
        return <p>Loading parks...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return ( // JSX code
        <div className="park-page-wrapper">
            <h1>Parks</h1>
            <div className = "park-description-wrapper">
                <p className = "park-description">Welcome to the Parks page! Here you will be able to find parks that fit your nature vibes. 
                    Parks offer a great place to read, study, and accomplish work while enjoying the great outdoors. Our selection offers a range for every need. 
                    From places that have dog parks nearby, to lakes in view of pavilions, our list has a variety of choices for each person.
                </p>
            </div>
            <div className = 'park-filters-wrapper'>
                <Filters activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
            </div>
            <div className = "section-divider"></div>
            <div className = "park-cards-grid">
                {filteredParks.map((park) => (
                    <LocationCard
                        key={park.id}
                        location = {park} 
                        isSelected = {selectedPark === park.id}
                        onClick = {() => handleParkClick(park.id)}
                        isFavorite = {favorites.some(
                            (favorite) => favorite.id === park.id && favorite.category === "park"
                        )}
                        onToggleFavorite={() => handleToggleFavorite(park)}
                    />
                ))}

            </div>
        </div>
    )


}