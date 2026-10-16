import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link className="brand" to="/events">
          Committee Event Dashboard
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
