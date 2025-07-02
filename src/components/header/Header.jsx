import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBed, 
  faHouse, 
  faBicycle, 
  faUtensils, 
  faCar, 
  faBars,
  faLocation,
  faHotel,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/AuthContext";

function Header({type}) {
  const [destination, setDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [category, setCategory] = useState("");

  const navigate = useNavigate();
  const { dispatch } = useContext(SearchContext);
  const { user } = useContext(AuthContext);

  const headerListWrapperRef = useRef(null);
  const scrollIntervalRef = useRef(null);
  const userInteractingRef = useRef(false);

  const categories = [
    "Hotel",
    "Private Hospital",
    "Restaurant",
    "Liquor Bar and Shops",
    "Karaoke & Night Club",
    "Spa",
    "Tyre Shop",
    "Rent",
    "Tuk Tuk Rent / Hire",
    "Buses for Special Tour",
    "Van for Special Tour",
    "Home Stay Hotels",
    "Home Made Food Supplies",
    "Safari Tours",
    "Local Tour Arrangement Companies",
    "Contact Details About Guides",
    "Textile Shops",
    "Pharmacies",
    "Garage Service",
    "Breakdown Services",
    "Phone Shops and Communications",
    "Motorcycle Rent",
    "Insurance Agents",
    "Finance Agents",
    "Tuition Classes",
    "Lorry for Hire / Rent",
    "Goods & Services",
    "Vehicle Sale",
    "Land / House Sale",
    "Freelance & Self-Employed",
    "Caregiver"
  ];

  const handleOption = (name, operation) => {
    setOptions((prev) => ({
      ...prev,
      [name]: operation === "i" ? prev[name] + 1 : prev[name] - 1
    }));
  };

  const handleSearch = () => {
    if (!category) {
      alert("Please select a category before searching.");
      return;
    }
    dispatch({ type: "NEW_SEARCH", payload: { destination, category } });
    let route = "/hotels";
    if (category !== "Hotel") {
      if (category === "Caregiver") {
        route = "/caregivers";
      } else if (category === "Freelance & Self-Employed") {
        route = "/freelancers-selfemployed";
      } else {
        route = "/" + category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      }
    }
    navigate(route, { state: { destination, category } });
  };

  useEffect(() => {
    const wrapper = headerListWrapperRef.current;
    if (!wrapper) return;
    if (window.innerWidth > 600) return;

    let scrollAmount = 1; 
    let delayTimeout;

    function autoScroll() {
      if (!userInteractingRef.current) {
        if (wrapper.scrollLeft + wrapper.offsetWidth >= wrapper.scrollWidth) {
          wrapper.scrollLeft = 0;
        } else {
          wrapper.scrollLeft += scrollAmount;
        }
      }
      scrollIntervalRef.current = requestAnimationFrame(autoScroll);
    }

    function onUserInteract() {
      userInteractingRef.current = true;
      clearTimeout(delayTimeout);
      delayTimeout = setTimeout(() => {
        userInteractingRef.current = false;
      }, 1500);
    }             

    wrapper.addEventListener('touchstart', onUserInteract);
    wrapper.addEventListener('touchmove', onUserInteract);
    wrapper.addEventListener('mousedown', onUserInteract);
    wrapper.addEventListener('wheel', onUserInteract);

    scrollIntervalRef.current = requestAnimationFrame(autoScroll);

    return () => {
      wrapper.removeEventListener('touchstart', onUserInteract);
      wrapper.removeEventListener('touchmove', onUserInteract);
      wrapper.removeEventListener('mousedown', onUserInteract);
      wrapper.removeEventListener('wheel', onUserInteract);
      cancelAnimationFrame(scrollIntervalRef.current);
      clearTimeout(delayTimeout);
    };
  }, []);

  return (
    <div className="header">
      <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
        <div className="mobileMenuButton" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
        </div>
        
        <div className="headerListWrapper" ref={headerListWrapperRef}>
          <div className={`headerList ${mobileMenuOpen ? 'active' : ''}`}>
            <div
              className="headerListItem active"
              onClick={() => window.location.href = "/property-type/Guest%20Houses"}
              style={{ cursor: 'pointer' }}
            >
              <FontAwesomeIcon icon={faBed} />
              <span>Stays</span>
            </div>
            <div
              className="headerListItem"
              onClick={() => window.location.href = "/property-type/Hotels"}
              style={{ cursor: 'pointer' }}
            >
              <FontAwesomeIcon icon={faHotel} />
              <span>Hotels</span>
            </div>
            <div
              className="headerListItem"
              onClick={() => window.location.href = "/property-type/HomeStays"}
              style={{ cursor: 'pointer' }}
            >
              <FontAwesomeIcon icon={faHouse} />
              <span>Home-Stays</span>
            </div>
            <div
              className="headerListItem"
              onClick={() => window.location.href = "/rent"}
              style={{ cursor: 'pointer' }}
            >
              <FontAwesomeIcon icon={faCar} />
              <span>Transport</span>
            </div>
            <div
              className="headerListItem"
              onClick={() => window.location.href = "/restaurant"}
              style={{ cursor: 'pointer' }}
            >
              <FontAwesomeIcon icon={faUtensils} />
              <span>Food</span>
            </div>
            <div
              className="headerListItem"
              onClick={() => window.location.href = "/motorcycle-rent"}
              style={{ cursor: 'pointer' }}
            >
              <FontAwesomeIcon icon={faBicycle} />
              <span>Motor cycles</span>
            </div>
          </div>
        </div>
 
        {type !== "list" && (
          <>
            <h1 className="headerTitle">Plan, Book, Relax – Discover your next stay in Sri Lanka</h1>
            <p className="headerDesc">
              CeylonBookin makes hotel booking in Anuradhapura simple and reliable. From cozy resorts to traditional stays, explore the best local options with great deals and trusted service—all in one place.
            </p>
  

            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faLocation} className="headerIcon" />
                <input 
                  type="text"
                  placeholder="Type here..." 
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                  value={destination}
                />
              </div>
              <div className="headerSearchItem">
                <label htmlFor="category" className="headerCategoryLabel">Category</label>                <select
                  id="category"
                  className="headerCategorySelect"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  required
                >
                  <option value="" disabled>Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>Search</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;