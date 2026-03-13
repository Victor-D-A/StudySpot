import { useState } from 'react';
import './Cafe.css';
import Filters from "./Filters";
import LocationCard from "./LocationCard";
import { cafes } from "./Cafes";

export default function Cafe() {
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [selectedCafe, setSelectedCafe] = useState<number | null>(null);

    function handleCafeClick(cafeId: number) {
        setSelectedCafe((current) => (current === cafeId ? null : cafeId));
    }

    return ( // JSX code
        <div className="cafe-page-wrapper">
            <h1>Cafe's</h1>
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
                {cafes.map((cafe) => (
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

// Create a revolving carousel of the cafe cards, with the card in the middle being the largest and most visible, and the cards below are smaller.