import { useState } from 'react';
import './Parks.css';
import Filters from "./Filters";
import LocationCard from "./LocationCard";
import { parks } from "./parksData";

export default function Parks() {
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [selectedPark, setSelectedPark] = useState<number | null>(null);

    function handleParkClick(parkId: number) {
        setSelectedPark((current) => (current === parkId ? null : parkId));
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
                {parks.map((park) => (
                    <LocationCard
                        key={park.id}
                        location = {park} 
                        isSelected = {selectedPark === park.id}
                        onClick = {() => handleParkClick(park.id)}
                    />
                ))}

            </div>
        </div>
    )


}