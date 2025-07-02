import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import LoadingAnimation from "../../components/loadingAnimation/LoadingAnimation";

const TextileShops = () => {
  return (
    <>
      <Navbar />
      <Header type="list" />
      <div className="categoryContainer">
        <h2>Textile Shops</h2>
        <p>Showing results for <b>Textile Shops</b>.</p>
        <LoadingAnimation context="Fetching textile shops..." />
      </div>
      <Footer />
    </>
  );
};

export default TextileShops;
