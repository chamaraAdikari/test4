import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./FreelanceDetails.css";

const FreelanceDetails = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`https://ceylonbookin.com/api/businesses?category=Freelance%20%26%20Self-Employed&id=${id}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading details.</div>;
  if (!data || (Array.isArray(data) && data.length === 0)) return <div>No details found.</div>;

  const freelancer = Array.isArray(data) ? data[0] : data;

  return (
    <div className="freelanceDetailsContainer">
      <Navbar />
      <Header type="list" />
      <div className="freelanceDetailsLayout">
        <img
          className="freelanceDetailsProfilePic"
          src={freelancer.img || freelancer.photo || freelancer.photos?.[0] || "https://via.placeholder.com/150"}
          alt={freelancer.title || freelancer.name}
        />
        <div className="freelanceDetailsInfo">
          <div className="freelanceDetailsName">{freelancer.title || freelancer.name}</div>
          {freelancer.age && <div className="freelanceDetailsMeta"><b>Age:</b> {freelancer.age}</div>}
          {freelancer.gender && <div className="freelanceDetailsMeta"><b>Gender:</b> {freelancer.gender}</div>}
          <div className="freelanceDetailsMeta"><b>City:</b> {freelancer.city || '-'}</div>
          <div className="freelanceDetailsDesc">{freelancer.desc || freelancer.description || '-'}</div>

          <div className="freelanceDetailsLinks">
            {freelancer.cv && (
              <a href={freelancer.cv} target="_blank" rel="noopener noreferrer" className="freelanceDetailsLinkBtn">CV (Download/View)</a>
            )}
            {freelancer.whatsappChannel && (
              <a href={freelancer.whatsappChannel} target="_blank" rel="noopener noreferrer" className="freelanceDetailsLinkBtn">WhatsApp Group</a>
            )}
            {freelancer.youtubeChannel && (
              <a href={freelancer.youtubeChannel} target="_blank" rel="noopener noreferrer" className="freelanceDetailsLinkBtn">YouTube Channel</a>
            )}
            {freelancer.facebookPage && (
              <a href={freelancer.facebookPage} target="_blank" rel="noopener noreferrer" className="freelanceDetailsLinkBtn">Facebook Page</a>
            )}
          </div>

          <div className="freelanceDetailsContactBtns">
            {freelancer.contactNumber && (
              <a
                href={`https://wa.me/${freelancer.contactNumber.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="freelanceDetailsContactBtn freelanceDetailsWhatsappBtn"
              >
                WhatsApp
              </a>
            )}
            {freelancer.contactNumber && (
              <a
                href={`tel:${freelancer.contactNumber}`}
                className="freelanceDetailsContactBtn freelanceDetailsCallBtn"
              >
                <span role="img" aria-label="call">📞</span> Call Now
              </a>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FreelanceDetails;
