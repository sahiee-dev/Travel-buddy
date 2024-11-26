import PropTypes from "prop-types";
import './itinerary.css';
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import Footer from "../Footer";

const Itinerary = ({ content }) => {
    if (!content || !Array.isArray(content)) return null;

    const saveItineraryToDatabase = async () => {
        try {
            const docRef = await addDoc(collection(db, "itineraries"), {
                content: content,
                timestamp: new Date(),
            });
            console.log("Itinerary saved with ID: ", docRef.id);
            alert("Saved to the database"); // Moved alert after successful save
        } catch (error) {
            console.error("Error saving itinerary: ", error);
            alert("Error saving to database"); // Added error alert
        }
    };

    const formatText = (text) => {
        if (!text) return null;

        return text.split('\n\n').map((paragraph, i) => {
            if (!paragraph.trim()) return null; // Check for empty paragraphs after trim

            // Check if paragraph starts with ## for headers
            if (paragraph.startsWith('##')) {
                return <h2 key={i} style={{ fontSize: '2em', fontWeight: 800, fontFamily: "'Goblin One', cursive" }}>{paragraph.slice(2).trim()}</h2>;
            }
            // Check if paragraph starts with ** for bold headers
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return <h3 key={i} style={{ fontSize: '1.5em', fontWeight: 700, fontFamily: "'Goblin One', cursive" }}>{paragraph.slice(2, -2)}</h3>;
            }
            // Check for bullet points with bold headers
            if (paragraph.startsWith('* **') && paragraph.includes('**')) {
                const boldEndIndex = paragraph.indexOf('**', 3);
                if (boldEndIndex !== -1) {
                    const boldText = paragraph.substring(3, boldEndIndex);
                    const restOfText = paragraph.substring(boldEndIndex + 2);
                    return <p key={i} style={{ fontFamily: "'Martian Mono', monospace" }}><strong style={{ fontWeight: 700 }}>• {boldText}</strong>{restOfText}</p>;
                }
            }
            // Make times bold while protecting against XSS
            const formattedParagraph = paragraph.replace(
                /(\d{1,2}:\d{2}\s*(?:AM|PM))/gi,
                '<strong>$1</strong>'
            );

            // Handle bullet points that don't have bold text
            if (paragraph.startsWith('*')) {
                return <p key={i} style={{ fontFamily: "'Martian Mono', monospace" }}>• {paragraph.slice(1).trim()}</p>;
            }

            return <p key={i} style={{ fontFamily: "'Martian Mono', monospace" }} dangerouslySetInnerHTML={{ __html: formattedParagraph }} />;
        }).filter(Boolean);
    };

    return (
        <>
            <div className="itinerary">
                <button
                    onClick={saveItineraryToDatabase}
                    style={{
                        marginBottom: "20px",
                        padding: "10px 20px",
                        fontSize: "16px",
                        cursor: "pointer" // Added cursor pointer
                    }}
                >
                    Save Itinerary
                </button>
                {content.map((item, index) => (
                    <div key={index} className="itinerary-item">
                        {item.type === 'text' && formatText(item.text)}
                        {item.type === 'image' && item.url && (
                            <img
                                src={item.url}
                                alt="Itinerary Image"
                                style={{ maxWidth: '100%' }} // Added max-width
                            />
                        )}
                        {item.type === 'link' && item.url && (
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {item.label || item.url}
                            </a>
                        )}
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
};

Itinerary.propTypes = {
    content: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.oneOf(['text', 'image', 'link']).isRequired,
            text: PropTypes.string,
            url: PropTypes.string,
            label: PropTypes.string,
        })
    ).isRequired,
};

export default Itinerary;


