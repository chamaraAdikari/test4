import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./becomeSupplier.css";

const BecomeSupplier = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    agent: ""
  });
  const [agentSearch, setAgentSearch] = useState("");

  const categories = [
    "Hotel",
    "Private Hospital",
    "Restaurant",
    "Liquor Bar and Shops",
    "Karaoke & Night Club",
    "Spa",
    "Tyre Shop",
    "Rent",
    "Tuk Tuk Rent / Hire",
    "Buses for Special Tour",
    "Van for Special Tour",
    "Home Stay Hotels",
    "Home Made Food Supplies",
    "Safari Tours",
    "Local Tour Arrangement Companies",
    "Contact Details About Guides",
    "Textile Shops",
    "Pharmacies",
    "Garage Service",
    "Breakdown Services",
    "Phone Shops and Communications",
    "Motorcycle Rent",
    "Insurance Agents",
    "Finance Agents",
    "Tuition Classes",
    "Lorry for Hire / Rent",
    "Goods & Services",
    "Vehicle Sale",
    "Land / House Sale"
  ];

  const yearPlusOneCategories = [
    "Karaoke & Night Club",
    "Spa",
    "Hotel"
  ];

  const getPrice = (category) => {
    if (yearPlusOneCategories.includes(category)) {
      return {
        amount: 1000,
        duration: "1 Year + 1 Bonus Year"
      };
    }
    return {
      amount: 1000,
      duration: "Lifetime"
    };
  };

  // Generate agent list
  const agents = Array.from({ length: 1000 }, (_, i) => `Agent ${i + 1}`);
  const filteredAgents = agentSearch
    ? agents.filter(agent => agent.toLowerCase().includes(agentSearch.toLowerCase()))
    : agents;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pricing = getPrice(formData.category);
    const message = `Hello! I want to become a supplier on Ceylon-Bookin\n\n` +
      `Name: ${formData.name}\n` +
      `Category: ${formData.category}\n` +
      `Agent: ${formData.agent}\n` +
      `Description: ${formData.description}\n` +
      `Package: ${pricing.duration} Ad - Rs. ${pricing.amount}`;

    const whatsappUrl = `https://wa.me/94766292314?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div>
      <Navbar />
      <div className="supplierContainer">
        <h1>Become a Supplier</h1>
        <p className="supplierDesc">Join our network of trusted suppliers and reach more customers</p>
        
        <form onSubmit={handleSubmit} className="supplierForm">
          <div className="formGroup">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="categorySelect"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Agent selection with search */}
          <div className="formGroup">
            <label htmlFor="agent">Select your agent</label>
            <input
              type="text"
              id="agentSearch"
              placeholder="Search agent by number..."
              value={agentSearch}
              onChange={e => setAgentSearch(e.target.value)}
              className="agentSearchInput"
              autoComplete="off"
            />
            <select
              id="agent"
              name="agent"
              value={formData.agent}
              onChange={handleChange}
              required
              className="agentSelect"
            >
              <option value="">Select an agent</option>
              {filteredAgents.map(agent => (
                <option key={agent} value={agent}>{agent}</option>
              ))}
            </select>
          </div>

          <div className="formGroup">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us about your business..."
              rows="4"
              required
            />
          </div>

          {formData.category && (
            <div className="pricingSection">
              <h2>Advertisement Package</h2>
              <div className="selectedPackage">
                <div className="packageDetails">
                  <span className="duration">{getPrice(formData.category).duration}</span>
                  <span className="price">Rs. {getPrice(formData.category).amount}</span>
                </div>
              </div>
            </div>
          )}

          <button type="submit" className="submitButton">Continue to WhatsApp</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default BecomeSupplier;
