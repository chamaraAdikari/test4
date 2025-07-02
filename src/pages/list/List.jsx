import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCurrency } from "../../context/CurrencyContext";
import "./list.css";
import Navbar from '../../components/Navbar/Navbar.jsx';
import Header from '../../components/header/Header';
import SearchItem from "../../components/searchitem/Searchitem.jsx";
import FilterButton from "../../components/filterButton/FilterButton.jsx";
import useFetch from "../../hooks/useFetch";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import LoadingAnimation from "../../components/loadingAnimation/LoadingAnimation";
import TuitionSearchItem from "../../components/tuition/TuitionSearchItem";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state?.destination || "");
  const [category, setCategory] = useState(location.state?.category || "");
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  
  const [destinationInput, setDestinationInput] = useState(destination);
  const [categoryInput, setCategoryInput] = useState(category);
  const [minInput, setMinInput] = useState(min);
  const [maxInput, setMaxInput] = useState(max);
  const { selectedCurrency, convertPrice } = useCurrency();

  
  const minLKR = min ? convertPrice(min, selectedCurrency) : undefined;
  const maxLKR = max ? convertPrice(max, selectedCurrency) : undefined;

  
  let endpoint = "/hotels";
  if (category && category !== "Hotel") {
    endpoint = `/${category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
  }
  let query = `?city=${destination}`;
  if (minLKR !== undefined) query += `&min=${minLKR}`;
  if (maxLKR !== undefined) query += `&max=${maxLKR}`;

  const { data, loading, error, reFetch } = useFetch(endpoint + query);

  const handleClick = (e) => {
    if (e) e.preventDefault();
    setDestination(destinationInput);
    setCategory(categoryInput);
    setMin(minInput);
    setMax(maxInput);
    reFetch();
  };

  const isMobile = () => window.innerWidth <= 768;
  const [isMobileView, setIsMobileView] = useState(isMobile());

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(isMobile());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    "Land / House Sale"
  ];


  let hotels = data;
  let closestCity = null;
  let originalCity = destination;
  if (data && typeof data === 'object' && data.hotels && data.closestCity) {
    hotels = data.hotels;
    closestCity = data.closestCity;
  }

  const renderSearch = () => (
    <form className="listSearch" onSubmit={handleClick}>
      <h1 className="lsTitle">Search</h1>
      <div className="lsSubtitle">Destination</div>
      <div className="lsItem">
        <input
          placeholder="Destination"
          type="text"
          value={destinationInput}
          onChange={(e) => setDestinationInput(e.target.value)}
        />
      </div>
      <div className="lsSubtitle">Category</div>
      <div className="lsItem">
        <select
          value={categoryInput}
          onChange={e => setCategoryInput(e.target.value)}
          className="lsCategorySelect"
        >
          <option value="">Select a category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="lsSubtitle">Price Range</div>
      <div className="lsOptions">
        <div className="lsOptionItem">
          <span className="lsOptionText">Min price per night</span>
          <input
            type="number"
            value={minInput || ""}
            onChange={(e) => setMinInput(e.target.value)}
            className="lsOptionInput"
            placeholder={`Min in ${selectedCurrency}`}
          />
        </div>
        <div className="lsOptionItem">
          <span className="lsOptionText">Max price per night</span>
          <input
            type="number"
            value={maxInput || ""}
            onChange={(e) => setMaxInput(e.target.value)}
            className="lsOptionInput"
            placeholder={`Max in ${selectedCurrency}`}
          />
        </div>
      </div>
      <button type="submit">Search</button>
    </form>
  );  return (
    <>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          {!isMobileView && renderSearch()}
          {isMobileView && <FilterButton>{renderSearch()}</FilterButton>}                    <div className="listResult">
                        {loading ? (
                            <LoadingAnimation context="search" />
                        ) : error ? (
              <span style={{ color: "red" }}>Error loading hotels</span>
            ) : (hotels && hotels.length === 0) ? (
              <span>No hotels found{closestCity ? ` in ${originalCity}, showing results for ${closestCity} instead` : ''}</span>
            ) : closestCity ? (
              <>
                <span style={{ color: '#0d70ea', fontWeight: 500, display: 'block', marginBottom: 12 }}>
                  No hotels found in {originalCity}, showing results for {closestCity} instead
                </span>
                {hotels.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            ) : (
              <>
                {hotels && hotels.map((item) => (
                  item.category === "Tuition Classes"
                    ? <TuitionSearchItem item={item} key={item._id} />
                    : <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      <MailList />
      <Footer />
    </>
  );
};

export default List;
