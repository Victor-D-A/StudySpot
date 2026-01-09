import { useEffect, useState } from 'react';
//import react from 'react';
import './App.css';
import type { JSX } from 'react/jsx-dev-runtime';
import StudySpotLogo from './assets/StudySpotLogo.png';
import slideShowImage from './assets/slideShowImage.png';
import slideShowImage2 from './assets/slideShowImage2.png';
import slideShowImage3 from './assets/slideShowImage3.png';
import slideShowImage4 from './assets/slideShowImage4.png';
import slideShowImage5 from './assets/slideShowImage5.png';
import slideShowImage6 from './assets/slideShowImage6.png';
import Cafe from './Cafe';
// import { Link } from 'react-router-dom'; // For later use when pages for the tabs are created

type tabName = "Home" | "Cafe" | "Libraries" | "Parks" | "SignUp";

interface TabsProps {
  activeTab: tabName;
  setActiveTab: React.Dispatch<React.SetStateAction<tabName>>;
}

// Tabs is outside of the conditional rendering to prevent remount issues(flickering of logo and tabs), tabs does rerender but not remounted
function Tabs({activeTab, setActiveTab}: TabsProps) {
  return (
    <div className = "tabs">
      <header className="navbar">
      <div className="brand">
        <img src={StudySpotLogo} className="StudySpotLogo" alt="StudySpot Logo" />
        <h2>StudySpot</h2>
      </div>
      <button className = {activeTab === "Home" ? "tab active" : "tab"} onClick={() => setActiveTab("Home")}>Home</button>
      <button className = {activeTab === "Cafe" ? "tab active" : "tab"} onClick={() => setActiveTab("Cafe")}>Cafe</button>
      <button className = {activeTab === "Libraries" ? "tab active" : "tab"} onClick={() => setActiveTab("Libraries")}>Libraries</button>
      <button className = {activeTab === "Parks" ? "tab active" : "tab"} onClick={() => setActiveTab("Parks")}>Parks</button>
      <button className = {activeTab === "SignUp" ? "tab signup-tab active" : "tab signup-tab"} onClick={() => setActiveTab("SignUp")}>Sign Up</button>
      </header>
    </div>
  )
}

function Filters() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

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
      <button onClick = {() => setIsOpen(o => !o)}>
        Filters ({activeFilters.length})
      </button>

      {isOpen && (
      <div className = "filters-panel">
        {[
          "WiFi", 
          "Outdoor Seating", 
          "Quiet", "24/7", 
          "Pet Friendly", 
          "Outlets", 
          "Private Room", 
          "Plenty of seating", 
          "Booths"
        ].map((filter) => (
          <button
            key={filter}
            className = {activeFilters.includes(filter) ? "filter active" : "filter"}
            onClick = {() => toggleFilter(filter)}
          >
          {filter}
        </button>
        ))}
      </div>
      )}
    </div>
  );
}

// Each time button is clicked or input is typed, App component re-renders
export default function App() {
  const [inputValue, setInputValue] = useState(""); // state to hold input value
  const [savedName, setSavedName] = useState(""); // State to hold the saved name
  const [activeTab, setActiveTab] = useState<tabName>("Home");
  const images = [slideShowImage, slideShowImage2, slideShowImage3, slideShowImage4, slideShowImage5, slideShowImage6];
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (activeTab !== "Home") return; // Only runs slideshow on Home tab

    const id = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % images.length); // Cycles through however many images there are
    }, 3000); // Changes images every 3 seconds

    return () => window.clearInterval(id); // Cleans up interval upon change of tab

  }, [activeTab, images.length]);

  function clearLocalStorage() {
    console.log("Clearing storage...");
    if (typeof(Storage) !== "undefined") {
      localStorage.clear();
    }
  }

  function transitionedImages() {
    return (
      <div className = "slideshow-container">
        {images.map((src, i) => (
          <img
            key = {src}
            src = {src}
            alt={`slide ${i + 1}`}
            className = {`slide ${i === slideIndex ? "active" : ""}`}
          />
        ))}
      </div>
    );
  }

  return ( // JSX code
    <div className="app">
      {activeTab === "Home" && (
        <div className="home-page">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab}/>
          <Filters />
            {greet()}
            <button onClick={() => { clearLocalStorage(); setSavedName(""); }}> {/* Clears current user data */}
              New User
            </button>
            {/* <h1>Comfort While Studying</h1> */}
            <h1>Expanding Your Thoughts</h1>
            {transitionedImages()}
            <h2>{savedName}</h2>
          </div>
      )}
      {activeTab === "Cafe" && (
          <div className='cafe-page'>
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab}/>
            <Cafe/> 
          </div>
        )}
    </div>
  );
  
  function addUserName() {
    let newName = inputValue.trim();
    console.log("newName:", JSON.stringify(newName));
    if(!newName) return;
    newName = properCapitalization(newName);
    localStorage.setItem('name', newName); // Saves data to local storage(keeps data upon refresh)
    console.log(localStorage.getItem('name'))
    setSavedName(newName);
    setInputValue("");
  }

  function properCapitalization(s: string): string {
    const word = s.split(" ");
    const capitalizeWords = word.map(word => {
      if (!word) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); // Capitalize first letter
    });
    return capitalizeWords.join(" ");
  }

  function greet(): JSX.Element {
    return (
      <form className = "user-name" onSubmit={(e) => { e.preventDefault(); addUserName(); }}>
        <input type = "text" maxLength={55} value = {inputValue} onChange = {(e) => setInputValue(e.target.value)} placeholder='Enter your name'/>
      </form>
    );
}

}