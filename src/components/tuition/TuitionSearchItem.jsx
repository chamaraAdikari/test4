import React from "react";
import { useNavigate } from "react-router-dom";

const TuitionSearchItem = ({ item }) => {
  const navigate = useNavigate();
  const profile = item.tuitionProfile || {};

  return (
    <div className="searchItem">
      <img
        src={profile.profileImage || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
        alt={profile.name || "Profile"}
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{profile.name || item.name || "Tuition Teacher"}</h1>
        <span className="siFeatures">{profile.description || item.desc || "No description provided."}</span>
      </div>
      <div className="siDetails">
        <div className="siDetailTexts">
          <button className="siCheckButton" onClick={() => navigate(`/tuition-class-details/${item._id}`)}>
            See more
          </button>
        </div>
      </div>
    </div>
  );
};

export default TuitionSearchItem;
