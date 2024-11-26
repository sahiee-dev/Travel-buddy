import { useState } from "react";
import model from "../lib/gemini";
import Form from "../components/Form";
import Itinerary from "../components/Itinerary";
import Loading from "../components/Loading";
import './planner.css'

const Planner = () => {
    const [itinerary, setItinerary] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGenerate = async ({ destination, fromDate, toDate, interests }) => {
        if (!destination || !fromDate || !toDate || !interests) {
            setError("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        setError(null);

        const prompt = `Create a detailed day-by-day travel itinerary for ${destination} from ${fromDate} to ${toDate}. 
        Please include:
        - Specific timings for each activity (e.g., Morning 8:00 AM - 12:00 PM)
        - Detailed recommendations for meals and restaurants
        - Notable attractions and activities based on these interests: ${interests}
        - Practical tips for transportation and what to carry
        - Accommodation suggestions
        - make sure to adjust the itinerary to the weather of the destination

        Format the response with:
        - Day headers in bold using **
        - Each activity on a new line starting with *
        - Include a recommendations section at the end
        - Add a note about flexibility of the itinerary
        
        
        Also include how to get there section at the start of the response
        -try giving a few methods to get to the place`;

        try {
            const chat = model.startChat();
            const result = await chat.sendMessage(prompt);

            if (!result) {
                throw new Error("No response from AI model");
            }

            const text = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!text) {
                throw new Error("Invalid response format from AI model");
            }

            // Process the text to ensure proper markdown formatting
            const formattedText = text
                .split('\n')
                .map(line => {
                    line = line.trim();
                    // Ensure day headers are properly formatted
                    if (line.startsWith('Day')) {
                        return `**${line}**`;
                    }
                    // Ensure activity items are properly formatted
                    if (line.match(/^\d+[:.]|Morning|Afternoon|Evening|Night/)) {
                        return `* ${line}`;
                    }
                    return line;
                })
                .filter(line => line.length > 0)
                .join('\n\n');

            setItinerary([{ type: 'text', text: formattedText }]);

            // Automatically scroll to itinerary after generation
            setTimeout(() => {
                const itineraryElement = document.querySelector('.itinerary');
                if (itineraryElement) {
                    itineraryElement.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } catch (error) {
            console.error("Error generating itinerary:", error);
            setError("Failed to generate itinerary. Please try again.");
            setItinerary(null);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            {isLoading && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    zIndex: 1000,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Loading />
                </div>
            )}
            {error && <div className="error-message">{error}</div>}
            <Form onSubmit={handleGenerate} />
            {itinerary && <Itinerary content={itinerary} />}
        </div>
    );
};

export default Planner;


