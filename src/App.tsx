import { useEffect, useState } from 'react';
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
import Libraries from './Libraries';
import Parks from './Parks';
import { getFavorites, saveFavorites } from './favorites';
import type { FavoriteItem } from './types';

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
      <button className = {activeTab === "Home" ? "tab-button active" : "tab-button"} onClick={() => setActiveTab("Home")}>Home</button>
      <button className = {activeTab === "Cafe" ? "tab-button active" : "tab-button"} onClick={() => setActiveTab("Cafe")}>Cafe</button>
      <button className = {activeTab === "Libraries" ? "tab-button active" : "tab-button"} onClick={() => setActiveTab("Libraries")}>Libraries</button>
      <button className = {activeTab === "Parks" ? "tab-button active" : "tab-button"} onClick={() => setActiveTab("Parks")}>Parks</button>
      <button className = {activeTab === "SignUp" ? "tab signup-tab active" : "tab signup-tab"} onClick={() => setActiveTab("SignUp")}>Sign Up</button>
      </header>
    </div>
  )
}

// Each time button is clicked or input is typed, App component re-renders
export default function App() {
  const [inputValue, setInputValue] = useState(""); // state to hold input value
  const [savedName, setSavedName] = useState(""); // State to hold the saved name
  const [activeTab, setActiveTab] = useState<tabName>("Home");
  const images = [slideShowImage, slideShowImage2, slideShowImage3, slideShowImage4, slideShowImage5, slideShowImage6];
  const [slideIndex, setSlideIndex] = useState(0);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]); // State to hold the favorites, lifted up to App to persist across tabs

  useEffect(() => {
    const savedFavorites = getFavorites();
    setFavorites(savedFavorites);
  }, []); // Load favorites on initial render)

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]); // Save favorites to local storage whenever they change

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
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab}/>

      {activeTab === "Home" && (
        <>
        <section className = "favorites-section">
          <h2>Your Favorites</h2>
        {favorites.length === 0 ? (
          <p>No favorites selected yet.</p>
        ) : (
          <div className = "favorites-grid">
            {favorites.map((item) => (
              <div key = {item.id} className = "favorite-card">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>{item.category}</p>
              </div>
            ))}
          </div>
        )}
      </section>
        <div className="home-page">
          <div className = "top-controls">
            <div className = "user-greeting">
              {greet()}
              <h2>{savedName ? `Hello, ${savedName}!` : 'Hello!'}</h2>
            </div>
              <button onClick={() => { clearLocalStorage(); setSavedName(""); }}>  {/*Clears current user data*/}
                New User
              </button>
            </div>
            <h1>Find Your Comfort Zone</h1>
            <div className = "description-position">
              <div className = "description-left">
                <p className = "description">
                  StudySpot helps you look for cafes, libraries, parks, or any location that fits your study style. You can filter for WIFI, outlet availability, 
                  pricing, atmosphere, and more to get your momentum going.
                </p>
              </div>

              <div className = "description-right">
                {transitionedImages()}
              </div>
            </div>
          </div>
        </>
      )}

      
      {activeTab === "Cafe" && (
          <div className='cafe-page'>
            <Cafe favorites = {favorites} setFavorites = {setFavorites} /> 
          </div>
        )}

      {activeTab === "Libraries" && (
          <div className='library-page'>
            <Libraries favorites = {favorites} setFavorites = {setFavorites} /> 
          </div>
        )}

      {activeTab === "Parks" && (
          <div className='park-page'>
            <Parks favorites = {favorites} setFavorites = {setFavorites} /> 
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