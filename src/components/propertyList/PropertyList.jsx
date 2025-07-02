import "./propertyList.css";
import useFetch from "../../hooks/useFetch";
import LoadingAnimation from "../loadingAnimation/LoadingAnimation";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PropertyList = () => {
    const { data, loading, error } = useFetch("/hotels/countByType");
    const [showAll, setShowAll] = useState(false);
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const navigate = useNavigate();

    if (loading) return <LoadingAnimation />;
    if (error) return <div className="pList">Error loading properties</div>;

    const images = [
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/b0/c1/4c/boutique-hotels.jpg?w=1200&h=-1&s=1",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/632899030.jpg?k=9501f27db8c483de48bc383c4b99ec8ffd22eb15b47dbd73305458379bec6598&o=&hp=1",
        "https://browntownresort.com/wp-content/uploads/2022/11/Himalyan-Suites1-min-1.jpg",
        "https://im.proptiger.com/1/3232159/6/scape-villas-elevation-146125154.jpeg",
        "https://d2rdhxfof4qmbb.cloudfront.net/wp-content/uploads/20201116185103/Srinikethana-Homestay.jpg",
        "https://r-xx.bstatic.com/xdata/images/hotel/608x352/359573637.webp?k=7f71782193b12bb8c536b24307c60f73a2af9f502f6f69229f5a297028a4e426&o="
    ];
    const types = [
        "Hotels",
        "Apartments",
        "Resorts",
        "Villas",
        "HomeStays",
        "Guest Houses"
    ];

    // Determine which types to show
    let visibleTypes = types;
    if (isMobile && !showAll) {
        visibleTypes = types.slice(0, 3); // Only Hotels, Apartments, Resorts
    }

    return(
        <div className="pList">
           {data &&
              visibleTypes.map((type, i) => {
                // Find the count for this type (case-insensitive, handle guest house)
                let count = 0;
                if (data[i]?.type && type !== "Guest Houses") {
                  count = data[i]?.count;
                } else if (type === "Guest Houses") {
                  // Find the guest house count from data (type: 'guest', case-insensitive)
                  const guestData = data.find(d => d.type && d.type.toLowerCase().includes("guest"));
                  count = guestData ? guestData.count : 0;
                }
                return (
                  <div className="pListItem" key={i} onClick={() => navigate(`/property-type/${type}`)} style={{cursor: 'pointer'}}>
                    <img
                      src={images[i]}
                      alt=""
                      className="pListImg"
                    />
                    <div className="pListTitles">
                      <h2>{type}</h2>
                      <h3>{count} {type}</h3>
                    </div>
                  </div>
                );
              })}
           {/* Show More/Less button for mobile only */}
           <button
             className="pListShowMoreBtn mobileOnly"
             style={{ display: isMobile ? 'block' : 'none' }}
             onClick={() => setShowAll(v => !v)}
           >
             {showAll ? "Show Less" : "Show More"}
           </button>
        </div>
    )
}

export default PropertyList;