import { useState } from 'react';
import { useEffect } from 'react';
import './Parks.css';
import Filters from "./Filters";
import LocationCard from "./LocationCard";
import parksData from "./parksData.json";
import type { Location, FavoriteItem } from "./types";
import { getFavorites, saveFavorites } from './favorites';

export default function Parks() {
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [selectedPark, setSelectedPark] = useState<number | null>(null);
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

    const park: Location[] = parksData;

    useEffect(() => {
        setFavorites(getFavorites());
    }, []);

    const filteredParks =
        activeFilters.length === 0
        ? park
        : park.filter((park) =>
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

    function handleParkClick(parkId: number) {
        setSelectedPark((current) => (current === parkId ? null : parkId));
    }

    function handleToggleFavorite(parkId: number) {
        const favoriteToToggle: FavoriteItem = {
            id: parkId,
            category: "park",
        };

        const isAlreadyFavorite = favorites.some(
            (favorite) => favorite.id === parkId && favorite.category === "park"
        );

        const updatedFavorites = isAlreadyFavorite
        ? favorites.filter(
            (favorite) => !(favorite.id === parkId && favorite.category === "park")
            )
        : [...favorites, favoriteToToggle];

        setFavorites(updatedFavorites);
        saveFavorites(updatedFavorites);
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
                        onToggleFavorite={() => handleToggleFavorite(park.id)}
                    />
                ))}

            </div>
        </div>
    )


}