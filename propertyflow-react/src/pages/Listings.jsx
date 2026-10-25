import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProperties, toggleWishlist } from "../store.js";
import { LOCATIONS, PROPERTY_TYPES } from "../data/properties.js";
import { LoadState, PropertyGrid } from "../components.jsx";
import { Heading } from "../layout/Shared.jsx";
function Listings() {
  const d = useDispatch(),
    { items, status, error, wishlist } = useSelector((s) => s.properties),
    [type, setType] = useState(""),
    [place, setPlace] = useState("");
  const shown = useMemo(
    () =>
      items.filter(
        (p) => (!type || p.type === type) && (!place || p.location === place),
      ),
    [items, type, place],
  );
  return (
    <section className="page-section">
      <div className="properties-header">
        <Heading
          eyebrow="PROPERTY COLLECTION"
          title={
            <>
              Find Your <span>Perfect Place.</span>
            </>
          }
        >
          Explore premium properties across Punjab and Chandigarh.
        </Heading>
        <div className="property-count">
          <strong>{shown.length}</strong>
          <span>Available Properties</span>
        </div>
      </div>
      <LoadState
        status={status}
        error={error}
        retry={() => d(loadProperties())}
      />
      {status === "succeeded" && (
        <>
          <div className="filters">
            <div className="filter-group">
              <label htmlFor="filter-type">Property Type</label>
              <select
                id="filter-type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">All Types</option>
                {PROPERTY_TYPES.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="filter-place">Location</label>
              <select
                id="filter-place"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              >
                <option value="">All Locations</option>
                {LOCATIONS.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </div>
          </div>
          <PropertyGrid
            properties={shown}
            wishlist={wishlist}
            onToggle={(id) => d(toggleWishlist(id))}
          />
        </>
      )}
    </section>
  );
}
export default Listings;
