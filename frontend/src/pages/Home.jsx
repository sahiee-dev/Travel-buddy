import { Link } from "react-router-dom";
import './Home.css'

const Home = () => {
    return (
        <div className="wrapper">
            <h1>Welcome to the AI Travel Planner</h1>
            <p>Are you ready to start your travel adventure?</p>
            <button className="getstarted"><Link to="/planner">Get Started</Link></button>
        </div>
    );
};

export default Home;
