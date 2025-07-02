import { useState, useEffect } from 'react';
import './loadingAnimation.css';

const LoadingAnimation = ({ context = "default" }) => {

    return (
        <div className="loadingContainer">
            <div className="loadingCircle">
                <div className="loadingLogoC">
                    <span>C</span>
                </div>
            </div>
            <p className="loadingText">
                {context === "search" ? "Fetching hotels..." : "Loading..."}
            </p>
        </div>
    );
};

export default LoadingAnimation;
