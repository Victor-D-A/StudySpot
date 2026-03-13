import { useState } from 'react';
import './Libraries.css';
import Filters from "./Filters";
import LocationCard from "./LocationCard";
import { libraries } from "./librariesData";

export default function Libraries() {
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [selectedLibrary, setSelectedLibrary] = useState<number | null>(null);

    function handleLibraryClick(libraryId: number) {
        setSelectedLibrary((current) => (current === libraryId ? null : libraryId));
    }

    return ( // JSX code
        <div className="library-page-wrapper">
            <h1>Libraries</h1>
            <div className = "library-description-wrapper">
                <p className = "library-description">Welcome to the Library page! Here you will be able to find the best cafes that best suit your study needs. 
                    From cozy corners to vibrant atmospheres, our curated list of cafes offer a variety of environments for you to focus and get your work done.
                </p>
            </div>
            <div className = 'library-filters-wrapper'>
                <Filters activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
            </div>
            <div className = "section-divider"></div>
            <div className = "library-cards-grid">
                {libraries.map((library) => (
                    <LocationCard
                        key={library.id}
                        location = {library} 
                        isSelected = {selectedLibrary === library.id}
                        onClick = {() => handleLibraryClick(library.id)}
                    />
                ))}

            </div>
        </div>
    )


}