export type Location = {
    id: number;
    name: string;
    features: string[];
    description: string;
    hasWifi: boolean;
    hasOutlets: boolean;
    quiet: boolean;
    hasBooths: boolean;
    hasOutdoorSeating: boolean;
    isPetFriendly: boolean;
    hasPrivateRoom: boolean;
    isOpen24Hours: boolean;
};

export type FavoriteItem = {
    id: number;
    name: string;
    description: string;
    category: "cafe" | "library" | "park";
};