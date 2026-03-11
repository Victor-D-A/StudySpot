import { useState } from 'react';
import './Cafe.css';
import Filters from "./Filters";

type Cafe = {
    id: number;
    name: string;
    features: string[];
    description: string;
};

const cafes: Cafe[] = [
    {
        id: 1,
        name: "Mecatos",
        features: [
            "Cozy and Relaxed Atmosphere",
            "Booths and Table Top Options",
            "Very Limited Outlet Availability",
            "Moderate WIFI Strength",
        ],
        description:
        "Mecatos is a solid option for casual studying if you want a cozy atmosphere and do not need to charge your laptop or phone."
    },

    {
        id: 2,
        name: "Starbucks",
        features: [
            "Vibrant and Bustling",
            "Strong WIFI",
            "Plenty of Outlets",
            "Can Get Loud During Peak Hours",
        ],
        description:
        `Popular choice amongst students due to their delicious menu items and study inviting atmoshere. With Starbucks offering a variety of seating options, 
        it is a great place to study either in a group or alone.`
    },

    {
        id: 3,
        name: "Foxtail Coffee",
        features: [
            "Modern, Warm Ambiance",
            "Study Friendly",
            "Strong WIFI",
            "Moderate Outlet Availabilty",
            "Quality Coffee and Food Items",
        ],
        description:
        `Foxtail Coffee focuses on friendly staff making you feel welcome into a study friendly setting. The bar area provides outlets along with some
        the tables near the walls. Menu options for food are small but their coffee is delicious and great for a quick recharge while studying or with friends.`
    },

    {
        id: 4,
        name: "Dunkin Donuts",
        features: [
            "Lively and Energetic with Constant Foot Traffic",
            "Noise Cancelling Headphones Recommended",
            "Limited Outlets",
            "Table Options Vary",
        ],
        description:
        `Perfect for group meetups. This cafe is a popular choice but if you have a laptop that needs charging, then it is best to come early to grab a table with an 
        outlet nearby.`

    },

    {
        id: 5,
        name: "Light on the Sugar Bakery Cafe",
        features: [
            "Charming Down to Earth Vibe",
            "Several Booth Options Available",
            "Plenty of Outlets",
            "Can Be Noisy During Peak Hours",
        ],
        description:
        `Offering a small selection for seating, however, their locations do offer plenty of booths with outlets at each one. Delicious drink menu and seasonal 
        bakery items are available. Recommended to bring noise cancelling headphones if you are planning to study and focus. Small groups fit just fine but large
        groups will face seating issues unless you arrive early.`
    },

    {
        id: 6,
        name: "Vespr Coffee Bar",
        features: [
            "Quiet and Cozy",
            "Study Friendly",
            "Moderate Outlet Availability",
            "Mainly Table Tops, Limited Bar Seating",
            "Moderate WIFI Strength",
        ],
        description:
        `A study friendly cafe offering a welcoming atmosphere with a variety of seating options. Outlets mainly at the bar or shared between the table tops.
        Friendly staff and delicious food compliment a great start to your work or for a great time with friends.`
    },

    {
        id: 7,
        name: "Lineage Coffee Roasting",
        features: [
            "Trendy and Modern with a Welcoming Atmosphere",
            "Booth and Table Top Options with One Large High Top for Groups",
            "Limited Outlets",
            "Spotty WIFI",
            "Moderate Parking Availability",
        ],
        description:
        `Qualtiy coffee and seasonal menu options available. Limited food items, mainly for small bites on the go or a quick recharge while studying or getting work
        done. The wifi can be inconsistent so it is best for people who are reviewing material over web surfing.`
    },

    {
        id: 8,
        name: "Lobos Coffee Roasters",
        features: [
            "Small but Calm Cafe",
            "Moderate Level Wifi",
            "Limited Outlets",
            "Delicious Drinks with Mainly Snacks for Food",
            "Pricing is Average",
        ],
        description:
        `Seating options vary from table tops to high tops but it is best for people looking for a calm place to review notes and study. Menu options will satisfy 
        your taste buds but are small in portions. The drink menu is delicious with seasonal items rotating.`
    },

    {
        id: 9,
        name: "But First Coffee",
        features: [
            "Modern, Trendy, and Lively Cafe",
            "Great Wifi",
            "Limited Outlets",
            "Delicious Drink Options",
            "Noise Cancelling Headphones Recommended",
        ],
        description:
        `Friendly staff and a welcoming atmosphere, this cafe is a popular go to spot for both getting work done and catching up with friends and family. It is 
        recommended to get their early to grab a seat and bring headphones to help you focus on your work. They have an extensive menu with great pricing.`
    },

    {
        id: 10,
        name: "Haraz Coffee House",
        features: [
            "Large and Spacious",
            "Great Wifi",
            "Limited Outlets to Booths and Front Couch Seats",
            "Open Late",
            "Often Loud Towards the Evening Hours",
            "Great for Group Meetups",
        ],
        description:
        `Open Late 7 days a week with a lively atmosphere in the afternoon and evening hours. The early mornings are often quiet. It is a great place for friends to 
        meetup and talk or study. Seating options are mainly table tops with some booths and a high top. Outlet availbility is mainly located by the booths and
        close to the high top.`
    }
]

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
                    <div
                        key = {cafe.id}
                        className = "cafe-card"
                        onClick = {() => handleCafeClick(cafe.id)}
                    >
                        <h2>{cafe.name}</h2>

                        <ul className='cafe-card-features'>
                            {cafe.features.map((feature, index) => (
                                <li key = {index}>{feature}</li>
                            ))}
                        </ul>

                        {selectedCafe === cafe.id && (
                            <p className = "cafe-card-description">{cafe.description}</p>
                        )}
                    </div>
                ))}

            </div>
        </div>
    )


}

// Create a revolving carousel of the cafe cards, with the card in the middle being the largest and most visible, and the cards below are smaller.