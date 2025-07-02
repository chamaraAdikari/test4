import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faHotel, faHome, faCar, faUtensils, faBicycle } from "@fortawesome/free-solid-svg-icons";
import "./TuitionClassDetails.css";
import Header from "../../components/header/Header";

const TuitionClassDetails = () => {
  const { id } = useParams();
  // Fetch with both category and id as query params
  const { data, loading, error } = useFetch(`/businesses?category=Tuition%20Classes&id=${id}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading details.</div>;
  if (!data || (Array.isArray(data) && data.length === 0)) return <div>No details found.</div>;

  // If backend returns an array, use the first item
  const business = Array.isArray(data) ? data[0] : data;
  const profile = business.tuitionProfile || {};

  return (
    <div className="tuitionDetailsContainer">
      <Navbar />
            <Header type="list" />

     
      <div className="tuitionDetailsLayout">
        <img
          className="tuitionDetailsProfilePic"
          src={profile.profileImage || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
          alt={profile.name || business.name}
        />
        <div className="tuitionDetailsInfo">
          <div className="tuitionDetailsName">{profile.name || business.name}</div>
          <div className="tuitionDetailsMeta"><b>Age:</b> {profile.age || '-'}</div>
          <div className="tuitionDetailsMeta"><b>Gender:</b> {profile.gender || '-'}</div>
          <div className="tuitionDetailsMeta"><b>City:</b> {business.city || '-'}</div>
          <div className="tuitionDetailsDesc">{profile.description || business.desc || '-'}</div>

          <div className="tuitionDetailsLinks">
            {profile.cvUrl && (
              <a href={profile.cvUrl} target="_blank" rel="noopener noreferrer" className="tuitionDetailsLinkBtn">CV (Download/View)</a>
            )}
            {profile.whatsappGroup && (
              <a href={profile.whatsappGroup} target="_blank" rel="noopener noreferrer" className="tuitionDetailsLinkBtn">WhatsApp Group</a>
            )}
            {profile.youtubeChannel && (
              <a href={profile.youtubeChannel} target="_blank" rel="noopener noreferrer" className="tuitionDetailsLinkBtn">YouTube Channel</a>
            )}
            {profile.facebookPage && (
              <a href={profile.facebookPage} target="_blank" rel="noopener noreferrer" className="tuitionDetailsLinkBtn">Facebook Page</a>
            )}
          </div>

          <div className="tuitionDetailsContactBtns">
            {profile.whatsappNumber && (
              <a
                href={`https://wa.me/${profile.whatsappNumber.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="tuitionDetailsContactBtn"
                style={{ background: 'linear-gradient(90deg, #25d366 0%, #0d70ea 100%)' }}
              >
                WhatsApp
              </a>
            )}
            {profile.mobileNumber && (
              <a
                href={`tel:${profile.mobileNumber}`}
                className="tuitionDetailsContactBtn"
                style={{ background: 'linear-gradient(90deg, #0d41ea 0%, #0dccea 100%)' }}
              >
                📞 Call Now
              </a>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TuitionClassDetails;
