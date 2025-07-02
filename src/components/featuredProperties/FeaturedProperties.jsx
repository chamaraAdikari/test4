import "./featuredProperties.css";
import useFetch from "../../hooks/useFetch";

import { Link, useNavigate } from "react-router-dom";
import { useCurrency } from "../../context/CurrencyContext";
import LoadingAnimation from "../loadingAnimation/LoadingAnimation";
import React, { useState } from "react";

const FeaturedProperties = () => {
    const { data, loading, error } = useFetch("/hotels?featured=true");
    const { formatPrice } = useCurrency();
    const [showAll, setShowAll] = useState(false);
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const navigate = useNavigate();

    if (loading) return <LoadingAnimation />;
    if (error) return <div>Error loading featured properties: {error.message}</div>;

    // Determine which featured properties to show
    let visibleData = data;
    if (isMobile && !showAll && data && data.length > 1) {
        visibleData = data.slice(0, 1);
    }

    // Handler for clicking a city name
    const handleCityClick = (city) => {
        navigate(`/hotels?city=${encodeURIComponent(city)}`);
    };

    // List of cities to make clickable
    const clickableCities = ["Anuradhapura", "Kandy", "Matara"];

    return (
        <div className="fp">
            {visibleData && visibleData.length > 0 ? (
                <>
                    {visibleData.map((item) => (
                        <div className="fpItem" key={item._id}>
                            <img 
                                src={item.photos?.[0] || "https://via.placeholder.com/150"} 
                                alt={item.name} 
                                className="fpImg" 
                            />
                            <Link to={`/hotels/${item._id}`} className="fpName">
                                {item.name}
                            </Link>
                            <span
                                className={
                                    clickableCities.includes(item.city) ? "fpCity fpCityClickable" : "fpCity"
                                }
                                style={
                                    clickableCities.includes(item.city)
                                        ? { color: '#0d70ea', textDecoration: 'underline', cursor: 'pointer' }
                                        : {}
                                }
                                onClick={() => {
                                    if (clickableCities.includes(item.city)) handleCityClick(item.city);
                                }}
                            >
                                {item.city}
                            </span>
                            <span className="fpPrice">
                                Starting from {formatPrice(item.cheaperstPrice || item.cheapestPrice || 0)}
                            </span>
                            {item.rating && (
                                <div className="fpRating">
                                    <button>{item.rating}</button>
                                    <span>Excellent</span>
                                </div>
                            )}
                        </div>
                    ))}
                    {/* Show More/Less button for mobile only */}
                    {isMobile && data && data.length > 1 && (
                        <button
                            className="fpShowMoreBtn mobileOnly"
                            onClick={() => setShowAll(v => !v)}
                        >
                            {showAll ? "Show Less" : "Show More"}
                        </button>
                    )}
                </>
            ) : (
                <div>No featured properties available</div>
            )}
        </div>
    );
};

export default FeaturedProperties;