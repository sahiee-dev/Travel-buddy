import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './SavedItineraries.css';

const SavedItineraries = () => {
    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItineraries = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "itineraries"));
                const fetchedItineraries = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setItineraries(fetchedItineraries);
            } catch (error) {
                console.error("Error fetching itineraries:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchItineraries();
    }, []);

    const getDestinationFromContent = (content) => {
        if (!content || !Array.isArray(content)) return "Untitled Itinerary";

        // Look for the first text item that starts with "Destination: " (from Planner)
        const destinationItem = content.find(item =>
            item.type === 'text' &&
            item.text &&
            item.text.startsWith('Destination: ')
        );

        if (destinationItem) {
            return destinationItem.text.replace('Destination: ', '').trim();
        }
        return "Untitled Itinerary";
    };

    if (loading) {
        return <div className="loading">Loading saved itineraries...</div>;
    }

    return (
        <div className="saved-itineraries">
            <h2>Saved Itineraries</h2>
            {itineraries.length > 0 ? (
                <div className="itineraries-grid">
                    {itineraries.map(itinerary => (
                        <div key={itinerary.id} className="itinerary-card">
                            <h3 className="itinerary-destination">
                                {getDestinationFromContent(itinerary.content)}
                            </h3>
                            {itinerary.timestamp && (
                                <div className="timestamp">
                                    {new Date(itinerary.timestamp.toDate()).toLocaleDateString()}
                                </div>
                            )}
                            <div className="itinerary-preview">
                                {itinerary.content && itinerary.content.slice(0, 2).map((item, index) => (
                                    item.type === 'text' ? (
                                        <p key={index} className="preview-text">
                                            {item.text.substring(0, 100)}
                                            {item.text.length > 100 ? '...' : ''}
                                        </p>
                                    ) : null
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No itineraries saved yet.</p>
            )}
        </div>
    );
};

export default SavedItineraries;
