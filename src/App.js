import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import List from "./pages/list/list.jsx";
import Hotel from "./pages/hotel/Hotel.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register";
import BecomeSupplier from "./pages/becomeSupplier/BecomeSupplier.jsx";
import { CurrencyProvider } from "./context/CurrencyContext";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import CategoryPage from "./pages/category/CategoryPage.jsx";
import CityProperties from "./pages/city/CityProperties.jsx";
import PropertyTypePage from "./pages/propertyType/PropertyTypePage.jsx";
import TuitionClassDetails from "./pages/tuitionClasses/TuitionClassDetails.jsx";
import FreelanceList from "./pages/freelance/FreelanceList.jsx";
import FreelanceDetails from "./pages/freelance/FreelanceDetails.jsx";

function App() {
  return (
    <CurrencyProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/become-supplier" element={<BecomeSupplier />} />
          {/* Category routes */}
          <Route path="/private-hospital" element={<CategoryPage categoryLabel="Private Hospital" />} />
          <Route path="/restaurant" element={<CategoryPage categoryLabel="Restaurant" />} />
          <Route path="/liquor-bar-and-shops" element={<CategoryPage categoryLabel="Liquor Bar and Shops" />} />
          <Route path="/karaoke-night-club" element={<CategoryPage categoryLabel="Karaoke & Night Club" />} />
          <Route path="/spa" element={<CategoryPage categoryLabel="Spa" />} />
          <Route path="/tyre-shop" element={<CategoryPage categoryLabel="Tyre Shop" />} />
          <Route path="/rent" element={<CategoryPage categoryLabel="Rent" />} />
          <Route path="/tuk-tuk-rent-hire" element={<CategoryPage categoryLabel="Tuk Tuk Rent / Hire" />} />
          <Route path="/buses-for-special-tour" element={<CategoryPage categoryLabel="Buses for Special Tour" />} />
          <Route path="/van-for-special-tour" element={<CategoryPage categoryLabel="Van for Special Tour" />} />
          <Route path="/home-stay-hotels" element={<CategoryPage categoryLabel="Home Stay Hotels" />} />
          <Route path="/home-made-food-supplies" element={<CategoryPage categoryLabel="Home Made Food Supplies" />} />
          <Route path="/safari-tours" element={<CategoryPage categoryLabel="Safari Tours" />} />
          <Route path="/local-tour-arrangement-companies" element={<CategoryPage categoryLabel="Local Tour Arrangement Companies" />} />
          <Route path="/contact-details-about-guides" element={<CategoryPage categoryLabel="Contact Details About Guides" />} />
          <Route path="/textile-shops" element={<CategoryPage categoryLabel="Textile Shops" />} />
          <Route path="/pharmacies" element={<CategoryPage categoryLabel="Pharmacies" />} />
          <Route path="/garage-service" element={<CategoryPage categoryLabel="Garage Service" />} />
          <Route path="/breakdown-services" element={<CategoryPage categoryLabel="Breakdown Services" />} />
          <Route path="/phone-shops-and-communications" element={<CategoryPage categoryLabel="Phone Shops and Communications" />} />
          <Route path="/motorcycle-rent" element={<CategoryPage categoryLabel="Motorcycle Rent" />} />
          <Route path="/insurance-agents" element={<CategoryPage categoryLabel="Insurance Agents" />} />
          <Route path="/finance-agents" element={<CategoryPage categoryLabel="Finance Agents" />} />
          <Route path="/tuition-classes" element={<CategoryPage categoryLabel="Tuition Classes" />} />
          <Route path="/lorry-for-hire-rent" element={<CategoryPage categoryLabel="Lorry for Hire / Rent" />} />
          <Route path="/goods-and-services" element={<CategoryPage categoryLabel="Goods & Services" />} />
          <Route path="/vehicle-sale" element={<CategoryPage categoryLabel="Vehicle Sale" />} />
          <Route path="/land-house-sale" element={<CategoryPage categoryLabel="Land / House Sale" />} />
          <Route path="/caregivers" element={<CategoryPage categoryLabel="Caregiver" />} />
          <Route path="/city/:city" element={<CityProperties />} />
          <Route path="/property-type/:type" element={<PropertyTypePage />} />
          <Route path="/tuition-class-details/:id" element={<TuitionClassDetails />} />
          <Route path="/tuition-classes/:id" element={<TuitionClassDetails />} />
          <Route path="/freelancers-selfemployed" element={<FreelanceList />} />
          <Route path="/freelancers-selfemployed/:id" element={<FreelanceDetails />} />
        </Routes>
        <ScrollToTop />
      </BrowserRouter>
    </CurrencyProvider>
  );
}

export default App;
