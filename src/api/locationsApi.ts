import cafesData from "../cafes.json"
import librariesData from "../librariesData.json"
import parksData from "../parksData.json"
import type { Location } from "../types";

const delay = (ms: number) => 
    new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchCafes(): Promise<Location[]> {
    await delay(800); // Simulate network delay
    return cafesData as Location[]; // Type assertion to ensure it matches the Location type
}

export async function fetchLibraries(): Promise<Location[]> {
    await delay(800); // Simulate network delay
    return librariesData as Location[]; // Type assertion to ensure it matches the Location type
}

export async function fetchParks(): Promise<Location[]> {
    await delay(800); // Simulate network delay
    return parksData as Location[]; // Type assertion to ensure it matches the Location type
}