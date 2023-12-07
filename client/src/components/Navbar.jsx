import memories from "../images/memories.png";
import { Link } from 'react-router-dom';

import { styles } from "../styles";


const Navbar = () => {
const user = null;

  return (
    <nav className="my-4 w-4/5 flex items-center justify-around py-6 rounded-lg shadow-xl h-20 bg-primary">

        <div className="flex">
        <h2 className="text-4xl"><Link to={"/"}>Memories</Link></h2>
        <img src={memories} alt="memories" className="ml-4 h-12" />
        </div>
        <div>
            {user ? (
                    <div>
                        <avatar alt={user.result.name}>
                            <img src={user.result.imageUrl} alt={user.result.name} />
                            {user.result.name.charAt(0)}
                        </avatar>
                    </div>
            ) : (<Link to="/auth"><button className={`${styles.colored_shadow_buttons} ${styles.blue_gradient}`}>Sign In</button></Link>)}
        </div>
      </nav>
  )
}

export default Navbar