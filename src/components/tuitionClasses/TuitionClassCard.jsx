import React from "react";
import { useNavigate } from "react-router-dom";
import "./TuitionClassCard.css";

const TuitionClassCard = ({ item }) => {
  const navigate = useNavigate();
  const profile = item.tuitionProfile || {};

  return (
    <div className="tuition-card">
      <img
        src={profile.profileImage || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
        alt={profile.name || item.name || "Profile"}
        className="tuition-card-img"
      />
      <div className="tuition-card-body">
        <h2 className="tuition-card-title">{profile.name || item.name || "Tuition Teacher"}</h2>
        <div className="tuition-card-desc">{profile.description || item.desc || "No description provided."}</div>
        <div className="tuition-card-city">City: {item.city || "-"}</div>
        <button
          className="tuition-card-btn"
          onClick={() => navigate(`/tuition-class-details/${item._id}`)}
        >
          See more
        </button>
      </div>
    </div>
  );
};

export default TuitionClassCard;
