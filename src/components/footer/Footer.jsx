import "./footer.css";

const Footer = () => {
    return (
        <div className="footer">
            <div className="fLists">
                {/* Quick Links */}
                <ul className="fList">
                    <h4 className="fTitle">Quick Links</h4>
                    <li className="listItem"><a href="/">Home</a></li>
                    <li className="listItem"><a href="/about">About Us</a></li>
                    <li className="listItem"><a href="/contact">Contact</a></li>
                    <li className="listItem"><a href="/blog">Blog</a></li>
                    <li className="listItem"><a href="/faqs">FAQs</a></li>
                    <li className="listItem"><a href="/property-type/Guest%20Houses">Stays</a></li>
                    <li className="listItem"><a href="/property-type/Hotels">Hotels</a></li>
                    <li className="listItem"><a href="/property-type/HomeStays">Home-Stays</a></li>
                    <li className="listItem"><a href="/rent">Transport</a></li>
                    <li className="listItem"><a href="/restaurant">Food</a></li>
                    <li className="listItem"><a href="/motorcycle-rent">Motor cycles</a></li>
                </ul>

                {/* Explore with Stay Connected */}
                <div className="fList">
                    <div className="fSection">
                        <h4 className="fTitle">Explore</h4>
                        <ul>
                            <li className="listItem">Top Destinations</li>
                            <li className="listItem">Hotels in Anuradhapura</li>
                            <li className="listItem">Coastal Stays</li>
                            <li className="listItem">Hill Country Escapes</li>
                            <li className="listItem">Cultural Experiences</li>
                        </ul>
                    </div>
                    <div className="fSection">
                        <h4 className="fTitle">Stay Connected</h4>
                        <ul>
                            <li className="listItem">Subscribe to Updates</li>
                            <li className="listItem">Follow Us on Social Media</li>
                            <li className="listItem">Feedback & Suggestions</li>
                        </ul>
                    </div>
                </div>

                {/* Legal and Partners Combined */}
                <div className="fList">
                    <div className="fSection">
                        <h4 className="fTitle">For Partners</h4>
                        <ul>
                            <li className="listItem">List Your Property</li>
                            <li className="listItem">Partner Login</li>
                            <li className="listItem">Become a Host</li>
                            <li className="listItem">Property Support</li>
                        </ul>
                    </div>
                    <div className="fSection">
                        <h4 className="fTitle">Legal</h4>
                        <ul>
                            <li className="listItem">Terms & Conditions</li>
                            <li className="listItem">Privacy Policy</li>
                            <li className="listItem">Cancellation Policy</li>
                            <li className="listItem">Cookie Policy</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="fText">
                Copyright © 2025 Ceylon-Bookin. | Powered by 
                <a href="https://ceylonbookin.com/" target="_blank" rel="noopener noreferrer" className="footerLink"> Ceylon-Bookin Development Team </a>
            </div>
        </div>
    );
};

export default Footer;
