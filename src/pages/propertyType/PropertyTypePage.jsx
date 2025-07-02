import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import SearchItem from "../../components/searchitem/Searchitem";

const typeMap = {
  Hotels: "hotel",
  Apartments: "apartment",
  Resorts: "Resort", // Capital R to match backend
  Villas: "villa",
  HomeStays: "homestay",
  "Guest Houses": "guesthouse"
};

const PropertyTypePage = () => {
  const { type } = useParams();
  const apiType = typeMap[type] || type;
  const { data, loading, error } = useFetch(`https://ceylonbookin.com/api/hotels?type=${apiType}`);

  if (loading) {
    return (
      <>
        <Navbar />
        <Header type="list" />
        <div style={{textAlign: 'center', margin: '4rem 0', fontSize: '1.2rem', color: '#0071c2', fontWeight: 500}}>
          Loading {type} properties...
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
        <div style={{textAlign: 'center', margin: '4rem 0', fontSize: '1.2rem', color: 'red', fontWeight: 500}}>
          Error loading {type} properties.
        </div>
        <Footer />
      </>
    );
  }

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <>
        <Navbar />
        <Header type="list" />
        <div style={{textAlign: 'center', margin: '4rem 0', fontSize: '1.5rem', color: '#0071c2', fontWeight: 600}}>
          Sorry, there are no properties listed for <span style={{color: '#222'}}>{type}</span> yet.<br />
          Please check back soon or try another property type!
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Header type="list" />
      <div style={{maxWidth: 1024, margin: '2rem auto', padding: '0 1rem'}}>
        <h2 style={{color: '#0071c2', textAlign: 'center', marginBottom: '2rem'}}>Properties in {type}</h2>
        {data.map((property) => (
          <SearchItem key={property._id} item={property} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default PropertyTypePage;
