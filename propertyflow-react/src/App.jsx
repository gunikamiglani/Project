import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadProperties } from "./store.js";
import { useAuth } from "./AuthContext.jsx";
import { Guard, Header } from "./layout/Shared.jsx";
import Home from "./pages/Home.jsx";
import Listings from "./pages/Listings.jsx";
import ListingForm from "./pages/ListingForm.jsx";
import Enquiry from "./pages/Enquiry.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import Portfolio from "./pages/Portfolio.jsx";
export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { toast } = useAuth();
  useEffect(() => { dispatch(loadProperties()); }, [dispatch]);
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);
  return (<>
    <Header />
    <main><Routes>
      <Route path="/" element={<Home />} />
      <Route path="/properties" element={<Listings />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage registering />} />
      <Route path="/list-property" element={<Guard><ListingForm /></Guard>} />
      <Route path="/enquiry" element={<Guard><Enquiry /></Guard>} />
      <Route path="/dashboard" element={<Guard><Dashboard /></Guard>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes></main>
    <footer><p>© 2026 PropertyFlow. All rights reserved.</p></footer>
    <div className={`toast ${toast ? "show" : ""}`} role="status" aria-live="polite">{toast}</div>
  </>);
}
