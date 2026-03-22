import { useState } from 'react';
import './Cafe.css';
import Filters from "./Filters";
import LocationCard from "./LocationCard";
import cafesData from "./cafes.json";
import type { Location } from "./types";

export default function Cafe() {
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [selectedCafe, setSelectedCafe] = useState<number | null>(null);

    const cafes: Location[] = cafesData;

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

    function handleCafeClick(cafeId: number) {
        setSelectedCafe((current) => (current === cafeId ? null : cafeId));
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
                    />
                ))}

            </div>
        </div>
    )


}