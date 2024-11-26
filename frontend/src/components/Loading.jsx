import './loading.css';

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="loading-spinner">
                <div className="spinner-circle"></div>
                <div className="spinner-circle"></div>
                <div className="spinner-circle"></div>
            </div>
            <p>Generating your perfect itinerary...</p>
        </div>
    );
};

export default Loading;
