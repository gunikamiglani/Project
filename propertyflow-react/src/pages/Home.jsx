import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../store.js";
import { PropertyGrid } from "../components.jsx";
import { Heading } from "../layout/Shared.jsx";
function Home() {
  const items = useSelector((s) => s.properties.items),
    wishlist = useSelector((s) => s.properties.wishlist),
    d = useDispatch();
  return (
    <>
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="eyebrow">PREMIUM REAL ESTATE</span>
          <h1>
            Find a place
            <br />
            worth coming home to.
          </h1>
          <p>
            Discover exceptional homes, apartments and investment properties
            across Chandigarh, Mohali, Zirakpur, Patiala and Rajpura.
          </p>
          <div className="hero-actions">
            <Link to="/properties" className="btn btn-primary btn-large">
              Explore Properties
            </Link>
            <Link to="/list-property" className="btn btn-light btn-large">
              List Your Property
            </Link>
          </div>
          <div className="hero-stats">
            <div>
              <strong>{items.length}+</strong>
              <span>Properties</span>
            </div>
            <div>
              <strong>5</strong>
              <span>Locations</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>Support</span>
            </div>
          </div>
        </div>
      </section>
      <section className="featured-section">
        <Heading eyebrow="HANDPICKED FOR YOU" title="Featured Properties">
          Explore some of our finest properties.
        </Heading>
        <PropertyGrid
          properties={items.slice(0, 6)}
          wishlist={wishlist}
          onToggle={(id) => d(toggleWishlist(id))}
        />
        <div className="center-button">
          <Link to="/properties" className="btn btn-primary">
            View All Properties
          </Link>
        </div>
      </section>
    </>
  );
}
export default Home;
