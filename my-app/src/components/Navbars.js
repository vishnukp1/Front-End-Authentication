import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import logo from "../assets/clipart1257397-removebg-preview.png";
import "../styles/offerPedia.css";

function Navbars() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Navbar
      className="navbar-navbr"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <div>
        <img
          className="navbar-img"
          style={{ width: "6rem", height: "2rem", marginLeft: "1rem" }}
          src={logo}
          alt=""
          onClick={() => navigate("/")}
        ></img>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <h5
          style={{ marginTop: "10px" }}
          onClick={() => navigate("/changePassword")}
        >
          Change Password
        </h5>
        <button
          style={{ marginRight: "2rem" }}
          className="logout-btn"
          onClick={() => logout()}
        >
          logout
        </button>
      </div>
    </Navbar>
  );
}

export default Navbars;
