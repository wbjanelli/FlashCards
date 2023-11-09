// Import necessary modules and components from React and the application
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeckList from "../Deck/DeckList";
import { listDecks } from "../utils/api";

// Define the Home component
export default function Home() {
  // Initialize the 'decks' state variable using the 'useState' hook
  const [decks, setDecks] = useState([]);

  // Use the 'useEffect' hook to load decks when the component mounts
  useEffect(() => {
    // Create an 'AbortController' to handle the cleanup of asynchronous operations
    const abortController = new AbortController();

    // Define an asynchronous function 'loadDecks' to fetch and load decks
    const loadDecks = async () => {
      try {
        // Fetch a list of decks using the 'listDecks' function from the API
        const loadedDecks = await listDecks();
        
        // Update the 'decks' state with the loaded data
        setDecks([...loadedDecks]);
      } catch (error) {
        // Handle any errors that occur during the fetch
        throw error;
      }
    };

    // Call the 'loadDecks' function when the component mounts
    loadDecks();

    // Return a cleanup function to abort any pending requests when the component unmounts
    return abortController.abort();
  }, []); // The empty dependency array ensures this effect runs only on component mount

  // Render the component's content
  return (
    <div className="d-flex flex-column">
      <div className="mb-2">
        {/* Create a button that links to the 'Create Deck' page */}
        <Link className="btn btn-secondary" to="/decks/new">
          <i className="fa-solid fa-plus"></i> Create Deck
        </Link>
      </div>

      <div>
        {/* Render the 'DeckList' component, passing the 'decks' data as a prop */}
        <DeckList decks={decks} />
      </div>
    </div>
  );
}
