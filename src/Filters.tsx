import { useEffect, useState } from 'react';
import "./Filters.css";

export default function Filters({
  activeFilters,
  setActiveFilters,
}: {
  activeFilters: string[]; // props receives state from App (array of strings)
  setActiveFilters: React.Dispatch<React.SetStateAction<string[]>>; // props receives state setter function from App
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!(e.target as HTMLElement).closest(".filters")) { // checks if the click is outside of the filters component, if so, close the filters panel
        setIsOpen(false);
      }
  }
    document.addEventListener("click", handleClickOutside);
  
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function toggleFilter(filter: string) {
    setActiveFilters((prev) => // gives current value of array and we return a new array
      prev.includes(filter) // checks if the filter user clicks is already active(True/False)
        ? prev.filter(f => f !== filter) // Removes filter (if/else statement), Creates new array without the filter
        // essentially, for each element in the array, call this function and ask if you want to keep item or not.(for the above line)
        : [...prev, filter] // Adds filter, Creates new array with previous filters and the new filter
    );

  }

  return ( 
    <div className = "filters">
      <button 
        className = "filters-toggle" 
        onClick = {() => setIsOpen(o => !o)}
      >
        Filters ({activeFilters.length})
      </button>

      {isOpen && (
      <div className = "filters-panel">
        {[
          "Wifi", 
          "Outdoor Seating", 
          "Quiet", 
          "24/7", 
          "Pet Friendly", 
          "Outlets", 
          "Private Room", 
          "Booths"
        ].map((filter) => (
          <button
            key={filter}
            className = {activeFilters.includes(filter) ? "filter active" : "filter"}
            onClick = {() => toggleFilter(filter)}
          >
          {activeFilters.includes(filter) ? "✓ " : ""}
          {filter}
        </button>
        ))}
      </div>
      )}
    </div>
  );
}