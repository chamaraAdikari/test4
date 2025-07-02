import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import LoadingAnimation from "../../components/loadingAnimation/LoadingAnimation";
import MailList from "../../components/mailList/MailList";
import "./category.css";

function getLoadingText(categoryLabel) {
  if (!categoryLabel) return "Fetching results...";
  // Convert category to a pluralized, lowercase form for the loading text
  const map = {
    "Hotel": "hotels",
    "Private Hospital": "private hospitals",
    "Restaurant": "restaurants",
    "Liquor Bar and Shops": "liquor bars and shops",
    "Karaoke & Night Club": "karaoke & night clubs",
    "Spa": "spas",
    "Tyre Shop": "tyre shops",
    "Rent": "rentals",
    "Tuk Tuk Rent / Hire": "tuk tuks",
    "Buses for Special Tour": "buses",
    "Van for Special Tour": "vans",
    "Home Stay Hotels": "home stay hotels",
    "Home Made Food Supplies": "food supplies",
    "Safari Tours": "safari tours",
    "Local Tour Arrangement Companies": "tour companies",
    "Contact Details About Guides": "guides",
    "Textile Shops": "textile shops",
    "Pharmacies": "pharmacies",
    "Garage Service": "garage services",
    "Breakdown Services": "breakdown services",
    "Phone Shops and Communications": "phone shops",
    "Motorcycle Rent": "motorcycles",
    "Insurance Agents": "insurance agents",
    "Finance Agents": "finance agents",
    "Tuition Classes": "tuition classes",
    "Lorry for Hire / Rent": "lorries",
    "Goods & Services": "goods & services",
    "Vehicle Sale": "vehicles",
    "Land / House Sale": "land & houses",
    "Caregiver": "caregivers"
  };
  return `Fetching ${map[categoryLabel] || categoryLabel.toLowerCase()}...`;
}

const CategoryPage = ({ categoryLabel }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const destination = location.state?.destination || "";
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [city, setCity] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [descExpanded, setDescExpanded] = useState([]);
  const [descModal, setDescModal] = useState({ open: false, text: "" });

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        let categoryParam = categoryLabel === "Caregiver" ? "Caregiver" : categoryLabel;
        let url = `https://ceylonbookin.com/api/businesses?category=${encodeURIComponent(categoryParam)}`;
        if (city) url += `&city=${encodeURIComponent(city)}`;
        const res = await fetch(url);
        const data = await res.json();
        setResults(data);
      } catch (e) {
        setResults([]);
      }
      setLoading(false);
    };
    fetchData();
  }, [categoryLabel, city]);

  const handleCitySearch = (e) => {
    e.preventDefault();
    setCity(cityInput.trim());
  };

  return (
    <>
      <Navbar />
      <Header type="list" />
      <div className="categoryContainer">
        <h2>{categoryLabel === "Caregiver" ? "Caregivers" : categoryLabel}</h2>
        <p>Showing results for <b>{categoryLabel === "Caregiver" ? "Caregivers" : categoryLabel}</b>{destination ? ` in ${destination}` : ""}.</p>
        <form style={{marginBottom: 16, display: 'flex', gap: 8}} onSubmit={handleCitySearch}>
          <input
            type="text"
            placeholder="Enter city to filter..."
            value={cityInput}
            onChange={e => setCityInput(e.target.value)}
            style={{padding: 8, borderRadius: 4, border: '1px solid #ccc'}}
          />
          <button type="submit" style={{padding: '8px 16px', borderRadius: 4, border: 'none', background: '#0d70ea', color: '#fff', fontWeight: 600, cursor: 'pointer'}}>Search</button>
        </form>
        {loading ? (
          <LoadingAnimation context={getLoadingText(categoryLabel)} />
        ) : results.length === 0 ? (
          <div>No results found.</div>
        ) : (
          <div className="categoryResultsGrid">
            {results.map((item, idx) => {

              if (categoryLabel === "Caregiver" && item.caregiverProfile) {
                return (
                  <div className="categoryCard" key={item._id || idx}>
                    {item.caregiverProfile.faceImage && (
                      <img
                        src={item.caregiverProfile.faceImage}
                        alt={item.title}
                        className="categoryCardImg"
                      />
                    )}
                    <div className="categoryCardContent">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="categoryCardTitle">{item.title}</div>
                        <button
                          className="categoryCardDetails"
                          style={{
                            padding: '4px 10px',
                            borderRadius: 6,
                            background: '#febb02',
                            color: '#222',
                            fontWeight: 600,
                            fontSize: 13,
                            marginLeft: 0,
                            marginBottom: 0,
                            border: 'none',
                            cursor: 'pointer',
                            height: 28
                          }}
                          onClick={() => setDescModal({ open: true, text: null, caregiver: item.caregiverProfile })}
                        >
                          See Details
                        </button>
                      </div>
                      
                      <div className="categoryCardCity">City: {item.city}</div>
                      <button
                        className="categoryCardContact"
                        style={{padding: '8px 0', borderRadius: 6, marginBottom: 8}}
                        onClick={() => window.open(`tel:${item.contactNumber}`)}
                      >Contact</button>
                    </div>
                  </div>
                );
              }

              if (categoryLabel === "Tuition Classes" && item.tuitionProfile) {
                return (
                  <div className="categoryCard" key={item._id || idx}>
                    {item.tuitionProfile.profileImage && (
                      <img
                        src={item.tuitionProfile.profileImage}
                        alt={item.title}
                        className="categoryCardImg"
                      />
                    )}
                    <div className="categoryCardContent">
                      <div className="categoryCardTitle">{item.tuitionProfile.name || item.title}</div>
                      <div className="categoryCardCity">City: {item.city}</div>
                      <button
                        className="categoryCardContact"
                        style={{padding: '8px 0', borderRadius: 6, marginBottom: 8, background: '#0d70ea', color: '#fff'}}
                        onClick={() => navigate(`/tuition-classes/${item._id}`)}
                      >See more</button>
                    </div>
                  </div>
                );
              }
              // ...existing code for other categories...
              const descLimit = 120;
              const isLongDesc = item.desc && item.desc.length > descLimit;
              return (
                <div className="categoryCard" key={item._id || idx}>
                  {item.img && (
                    <img
                      src={item.img}
                      alt={item.title}
                      className="categoryCardImg"
                      style={{objectFit: 'cover', width: '100%', height: 180, borderTopLeftRadius: 8, borderTopRightRadius: 8}}
                    />
                  )}
                  <div className="categoryCardContent">
                    <div className="categoryCardTitle">{item.title}</div>
                    <div
                      className="categoryCardDesc"
                      style={{ cursor: isLongDesc ? 'pointer' : 'default' }}
                      title={isLongDesc ? 'Click to read full description' : ''}
                      onClick={() => isLongDesc && setDescModal({ open: true, text: item.desc })}
                    >
                      {item.desc}
                    </div>
                    <div className="categoryCardCity">City: {item.city}</div>
                    <button className="categoryCardContact" style={{padding: '8px 0', borderRadius: 6}} onClick={() => window.open(`tel:${item.contactNumber}`)}>Contact</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {/* Modal for full description or caregiver/tuition details */}
        {descModal.open && (
          <div className="descModalOverlay" onClick={() => setDescModal({ open: false, text: "", caregiver: null, tuition: null })}>
            <div className="descModal" onClick={e => e.stopPropagation()}>
              <button className="descModalClose" onClick={() => setDescModal({ open: false, text: "", caregiver: null, tuition: null })}>&times;</button>
              {descModal.tuition ? (
                <div className="descModalContent">
                  <img src={descModal.tuition.profileImage} alt="Tuition Teacher" style={{width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', marginBottom: 16}} />
                  <div><b>Name:</b> {descModal.tuition.name}</div>
                  <div><b>Age:</b> {descModal.tuition.age}</div>
                  <div><b>Gender:</b> {descModal.tuition.gender}</div>
                  <div><b>Description:</b> {descModal.tuition.description}</div>
                  {descModal.tuition.cvUrl && (
                    <div style={{marginTop: 12}}>
                      <a href={descModal.tuition.cvUrl} target="_blank" rel="noopener noreferrer" style={{color: '#0d70ea', fontWeight: 600}}>CV</a>
                    </div>
                  )}
                  {descModal.tuition.whatsappGroup && (
                    <div><a href={descModal.tuition.whatsappGroup} target="_blank" rel="noopener noreferrer">WhatsApp Group</a></div>
                  )}
                  {descModal.tuition.youtubeChannel && (
                    <div><a href={descModal.tuition.youtubeChannel} target="_blank" rel="noopener noreferrer">YouTube Channel</a></div>
                  )}
                  {descModal.tuition.facebookPage && (
                    <div><a href={descModal.tuition.facebookPage} target="_blank" rel="noopener noreferrer">Facebook Page</a></div>
                  )}
                  <div style={{marginTop: 12, display: 'flex', gap: 12}}>
                    {descModal.tuition.whatsappNumber && (
                      <a href={`https://wa.me/${descModal.tuition.whatsappNumber.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" style={{background: '#25d366', color: '#fff', padding: '8px 18px', borderRadius: 20, textDecoration: 'none', fontWeight: 600}}>WhatsApp</a>
                    )}
                    {descModal.tuition.mobileNumber && (
                      <a href={`tel:${descModal.tuition.mobileNumber}`} style={{background: '#0d41ea', color: '#fff', padding: '8px 18px', borderRadius: 20, textDecoration: 'none', fontWeight: 600}}>Call Now</a>
                    )}
                  </div>
                </div>
              ) : descModal.caregiver ? (
                <div className="descModalContent">
                  <img src={descModal.caregiver.faceImage} alt="Caregiver" style={{width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', marginBottom: 16}} />
                  <div><b>Age:</b> {descModal.caregiver.age}</div>
                  <div><b>Height:</b> {descModal.caregiver.heightCm} cm</div>
                  <div><b>Weight:</b> {descModal.caregiver.weightKg} kg</div>
                  <div><b>Years of Experience:</b> {descModal.caregiver.yearsOfExperience}</div>
                  <div><b>Worked Abroad:</b> {descModal.caregiver.workedAbroad ? 'Yes' : 'No'}</div>
                  {descModal.caregiver.cvUrl && (
                    <div style={{marginTop: 12}}>
                      <a href={descModal.caregiver.cvUrl} target="_blank" rel="noopener noreferrer" style={{color: '#0d70ea', fontWeight: 600}}>Download CV (PDF)</a>
                    </div>
                  )}
                </div>
              ) : (
                <div className="descModalContent">{descModal.text}</div>
              )}
            </div>
          </div>
        )}
      </div>
      <MailList />
      <Footer />
    </>
  );
};

export default CategoryPage;
