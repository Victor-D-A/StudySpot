import type { Location } from "./types";
import './LocationCard.css';

type LocationCardProps = {
    location: Location;
    isSelected: boolean;
    onClick: () => void;
    isFavorite: boolean;
    onToggleFavorite: () => void;
};

export default function LocationCard({
    location,
    isSelected,
    onClick,
    isFavorite,
    onToggleFavorite,
}: LocationCardProps) {
    return(
        <div className="location-card" onClick={onClick}>
            <button
                className = {'favorite-button ${isFavorite ? "favorited" : ""}'}
                    onClick={(event) => {
                        event.stopPropagation();
                        onToggleFavorite();
                    }}
                    aria-label = {isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
                    {isFavorite ? "★" : "☆"}
            </button>
            <h2>{location.name}</h2>

            <ul className="location-card-features">
                {location.features.map((feature, index) => (
                    <li key = {index}>{feature}</li>
                ))}
            </ul>

            {isSelected && (
                <p className = "location-card-description">
                    {location.description}
                </p>
            )}
        </div>
    );
}