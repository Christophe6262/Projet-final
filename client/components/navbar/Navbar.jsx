/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { RiLogoutBoxRLine } from "react-icons/ri";

const Navbar = ({ user }) => {
  const disconnect = () => {
    localStorage.removeItem("token");
    toast.success("Déconnecté");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="nav-center">
        <div className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link-active" : "nav-link"
            }
          >
            Accueil
          </NavLink>

          <NavLink
            to="/offers"
            className={({ isActive }) =>
              isActive ? "nav-link-active" : "nav-link"
            }
          >
            Offres
          </NavLink>

          <NavLink
            to="/dashboarduser"
            className={({ isActive }) =>
              isActive ? "nav-link-active" : "nav-link"
            }
          >
            Mon compte
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "nav-link-active" : "nav-link"
            }
          >
            Contact
          </NavLink>
        </div>
      </div>
      {!user && (
        <div className="nav-center nav-links">
          <NavLink to="/login" className="nav-link">
            Connexion/Inscription
          </NavLink>
        </div>
      )}
      {user && (
        <div className="nav-disconnect nav-center nav-links">
          <div className="nav-link">
            {user.first_name} {user.last_name}
          </div>
          <button className="btn-disconnect" onClick={disconnect}>
            DECONNEXION <RiLogoutBoxRLine />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
