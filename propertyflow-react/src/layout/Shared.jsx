import { Link, NavLink, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";
function Heading({ eyebrow, title, children }) {
  return (
    <div className="section-heading luxury-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      {children && <p>{children}</p>}
    </div>
  );
}
function Guard({ children }) {
  const { user } = useAuth(),
    loc = useLocation();
  return user ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: loc.pathname }} />
  );
}
function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="navbar">
      <div className="nav-left">
        <NavLink to="/" className="logo">
          PropertyFlow
        </NavLink>
        <nav>
          <NavLink to="/properties">Properties</NavLink>
          <NavLink to="/portfolio">Portfolio</NavLink>
          <NavLink to="/list-property">List Property</NavLink>
          <NavLink to="/enquiry">Enquiry</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </nav>
      </div>
      <div className="desktop-actions">
        {user ? (
          <>
            <span className="welcome-user">Hi, {user.name}</span>
            <Link to="/dashboard">Dashboard</Link>
            <button className="btn btn-outline" onClick={logout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <Link to="/register" className="btn btn-primary">
              Get Started
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
export { Heading, Guard, Header };
