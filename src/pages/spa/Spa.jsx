import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import LoadingAnimation from "../../components/loadingAnimation/LoadingAnimation";

const Spa = () => {
  return (
    <>
      <Navbar />
      <Header type="list" />
      <div className="categoryContainer">
        <h2>Spa</h2>
        <p>Showing results for <b>Spa</b>.</p>
        <LoadingAnimation context="Fetching spas..." />
      </div>
      <Footer />
    </>
  );
};

export default Spa;
