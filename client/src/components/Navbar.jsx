import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Avatar from 'react-avatar';

import { logout } from "../features/auth/authSlice";
import { styles } from "../styles";
import memories from "../images/memories.png";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if(token) {
      const decodedToken = jwtDecode(token);
      if(decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <nav className="my-4 w-4/5 flex items-center justify-around py-6 rounded-lg shadow-xl h-20 bg-primary">
      <div className="flex">
        <h2 className="text-4xl">
          <Link to={"/"}>Memories</Link>
        </h2>
        <img src={memories} alt="memories" className="ml-4 h-12" />
      </div>
      <div>
        {user ? (
          <div className="flex justify-between items-center gap-4">
            <Avatar name={user.name} size="40" round={true} />
            <h1 className="text-xl antialiased">{user.name}</h1>
            <button
              className={`${styles.colored_shadow_buttons} ${styles.red_gradient}`}
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        ) : (
          <Link to="/auth">
            <button
              className={`${styles.colored_shadow_buttons} ${styles.blue_gradient}`}
            >
              Sign In
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
