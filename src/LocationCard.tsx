import type { Location } from "./types";

type LocationCardProps = {
    location: Location;
    isSelected: boolean;
    onClick: () => void;
};

export default function LocationCard({
    location,
    isSelected,
    onClick,
}: LocationCardProps) {
    return(
        <div className="location-card" onClick={onClick}>
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