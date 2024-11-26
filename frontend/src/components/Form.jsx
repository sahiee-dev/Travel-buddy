import { useState } from "react";
import PropTypes from "prop-types";
import './Form.css'

const Form = ({ onSubmit }) => {
    const [destination, setDestination] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [interests, setInterests] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ destination, fromDate, toDate, interests });
    };

    return (
        <>
            <div className="wrapper-form">
                <form onSubmit={handleSubmit}>
                    <h1>AI Travel Itinerary Planner</h1>
                    <label>Enter your destination:</label>
                    <input
                        type="text"
                        placeholder="Enter destination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        required
                    />
                    <div className="date-inputs">
                        <label>Enter your start date:</label>
                        <label>Enter your end date:</label>
                    </div>
                    <div className="date-inputs">
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            required
                        />
                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            required
                        />
                    </div>
                    <label>Enter your interests:</label>
                    <textarea
                        placeholder="Interests (e.g., beaches, museums)"
                        value={interests}
                        onChange={(e) => setInterests(e.target.value)}
                        required
                    ></textarea>
                    <button type="submit">Generate Itinerary</button>
                </form>
            </div>
        </>
    );
};

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default Form;
