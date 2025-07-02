import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import SearchItem from "../../components/searchItem/SearchItem";

const CityProperties = () => {
  const { city } = useParams();
  const { data, loading, error } = useFetch(`/hotels?city=${city}`);

  if (loading) {
    return (
      <>
        <Navbar />
        <Header type="list" />
        <div style={{ textAlign: "center", margin: "4rem 0", fontSize: "1.2rem", color: "#0071c2", fontWeight: 500 }}>
          Loading properties in {city}...
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <Header type="list" />
        <div style={{ textAlign: "center", margin: "4rem 0", fontSize: "1.2rem", color: "red", fontWeight: 500 }}>
          Error loading properties in {city}.
        </div>
        <Footer />
      </>
    );
  }

  // Ensure data is an array before mapping
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <>
        <Navbar />
        <Header type="list" />
        <div style={{ textAlign: "center", margin: "4rem 0", fontSize: "1.5rem", color: "#0071c2", fontWeight: 600 }}>
          Sorry, there are no properties listed in{" "}
          <span style={{ color: "#222" }}>{city}</span> yet.
          <br />
          Please check back soon or try searching another city!
        </div>
        <Footer />
      </>
    );
  }

  // Show only the hotels for this city
  return (
    <>
      <Navbar />
      <Header type="list" />
      <div style={{ maxWidth: 1024, margin: "2rem auto", padding: "0 1rem" }}>
        <h2 style={{ color: "#0071c2", textAlign: "center", marginBottom: "2rem" }}>Properties in {city}</h2>
        {data.map((property) => (
          <SearchItem key={property._id} item={property} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default CityProperties;
