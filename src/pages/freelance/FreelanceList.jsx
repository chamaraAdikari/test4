import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import useFetch from "../../hooks/useFetch";
import "./FreelanceList.css";

const SUBCATEGORIES = [
  "Home-based bakers and cooks (birthday cakes, tiffin, desserts)",
  "Handyman & Technicians (electricians, plumbers, AC, repairs)",
  "Graphic Designers & Video Editors (logos, TikTok, YouTube)",
  "Photographers/Videographers (wedding/event/drone)",
  "Makeup Artists/Beauticians (bridal, party, home visits)",
  "Vehicle Services (mobile car wash, detailing, mechanic)",
  "Tailors/Dressmakers (blouse, saree jackets, alterations)",
  "Carpenters/Furniture makers (woodwork, repairs)",
  "Online Freelancers (writers, web designers, VAs)",
  "Event Planners/Decorators (weddings, balloons)",
  "Fitness/Wellness (Zumba, yoga, trainers, meditation)",
  "Musicians, DJs, MCs (events and parties)",
  "Delivery/Errand Services (freelance riders, shopping help)"
];

const FreelanceList = () => {
  const [city, setCity] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [search, setSearch] = useState("");
  const { data, loading, error } = useFetch(
    `https://ceylonbookin.com/api/businesses?category=Freelance%20%26%20Self-Employed&city=${city}&subCategory=${subcategory}`
  );

  const [filtered, setFiltered] = useState([]);

  React.useEffect(() => {
    if (!search) {
      setFiltered(data);
      return;
    }
    // Exact match first
    const exact = data.filter(item =>
      (item.title || item.name || "").toLowerCase() === search.toLowerCase()
    );
    if (exact.length > 0) {
      setFiltered(exact);
    } else {
      // Closest match (case-insensitive includes)
      const close = data.filter(item =>
        (item.title || item.name || "").toLowerCase().includes(search.toLowerCase())
      );
      setFiltered(close);
    }
  }, [search, data]);

  const cities = Array.from(new Set((data || []).map(item => item.city).filter(Boolean)));

  return (
    <div className="freelanceListContainer">
      <Navbar />
      <Header type="list" />

      <div className="freelanceListHeader">
        <h1>Freelance & Self-Employed Services</h1>
        <div className="freelanceListFilters">
          <select value={city} onChange={e => setCity(e.target.value)}>
            <option value="">All Cities</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={subcategory} onChange={e => setSubcategory(e.target.value)}>
            <option value="">All Subcategories</option>
            {SUBCATEGORIES.map(sub => <option key={sub} value={sub}>{sub}</option>)}
          </select>
          <input
            type="text"
            placeholder="Search by service name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="freelanceListGrid">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error loading services.</div>
        ) : filtered && filtered.length > 0 ? (
          filtered.map(item => (
            <div className="freelanceCard" key={item._id}>
              <img
                src={item.img || item.photo || item.photos?.[0] || "https://via.placeholder.com/150"}
                alt={item.title || item.name}
                className="freelanceCardImg"
              />
              <div className="freelanceCardBody">
                <h2 className="freelanceCardTitle">{item.title || item.name}</h2>
                <div className="freelanceCardSub">{item.subCategory}</div>
                <div className="freelanceCardCity">{item.city}</div>
                <div className="freelanceCardDesc">{item.desc || item.description}</div>
              </div>
              <div className="freelanceCardRight">
                <div className="freelanceCardPrice">
                  {item.price ? `${item.price.toLocaleString()} Rs` : "Contact for quote"}
                </div>
                <div className="freelanceCardTaxNote">Includes taxes and fees</div>
                {item.cv && (
                  <a
                    href={item.cv}
                    className="freelanceCardCVBtn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    See availability
                  </a>
                )}
                <button
                  className="freelanceCardSeeDetailsBtn"
                  onClick={() => window.location.href = `/freelancers-selfemployed/${item._id}`}
                >
                  See details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No freelance/self-employed services found.</div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default FreelanceList;
