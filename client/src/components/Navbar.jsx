import memories from "../images/memories.png";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  console.log(user);

  useEffect(() => {
    const token = user?.token;

    //JWT...

    setUser(JSON.parse(localStorage.getItem("profile")))
  }, [])

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
              <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full"/>
              <h1 className="">{user.name}</h1>
              <button
              className={`${styles.colored_shadow_buttons} ${styles.red_gradient}`}
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
