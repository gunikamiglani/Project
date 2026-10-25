import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../AuthContext.jsx";
import { Heading } from "../layout/Shared.jsx";
function Dashboard() {
  const { user } = useAuth(),
    { items, wishlist } = useSelector((s) => s.properties),
    mine = items.filter((p) => p.owner === user.email);
  return (
    <section className="page-section">
      <Heading eyebrow="YOUR PROPERTYFLOW" title={`Welcome, ${user.name}`}>
        Manage your properties, wishlist and account.
      </Heading>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <span className="dashboard-icon">🏠</span>
          <h3>Your Properties</h3>
          <strong>{mine.length}</strong>
        </div>
        <div className="dashboard-card">
          <span className="dashboard-icon">♡</span>
          <h3>Wishlist</h3>
          <strong>{wishlist.length}</strong>
        </div>
        <div className="dashboard-card">
          <span className="dashboard-icon">✦</span>
          <h3>Account</h3>
          <p>{user.email}</p>
        </div>
      </div>
      <div className="dashboard-actions">
        <Link to="/list-property" className="btn btn-primary">
          + List Property
        </Link>
        <Link to="/properties" className="btn btn-outline">
          Browse Properties
        </Link>
      </div>
    </section>
  );
}
export default Dashboard;
