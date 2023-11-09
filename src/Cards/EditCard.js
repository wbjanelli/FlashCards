// Import necessary modules and components from React and the application
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Layout/NavBar";
import { readDeck } from "../utils/api";
import CardForm from "./CardForm";

// Define the EditCard component for editing a specific card within a deck
export default function EditCard() {
  // Extract 'deckId' and 'cardId' from the route parameters
  const { deckId, cardId } = useParams();

  // Initialize the 'deck' state to store deck information
  const [deck, setDeck] = useState({});

  // Use the 'useEffect' hook to fetch deck data when the component mounts
  useEffect(() => {
    const abortController = new AbortController();

    // Define an asynchronous function 'getDeckData' to fetch and set deck data
    const getDeckData = async () => {
      try {
        if (deckId) {
          const fetchedDeck = await readDeck(deckId, abortController.signal);
          setDeck({ ...fetchedDeck });
        }
      } catch (error) {
        // Handle any errors that occur during data fetching
        throw error;
      }
    };

    // Call 'getDeckData' when the component mounts and cleanup with 'abortController'
    getDeckData();

    return () => abortController.abort(); // Cleanup function for aborting requests
  }, [deckId]);

  // Render the EditCard component, including the NavBar and CardForm components
  return (
    <div>
      <div className="d-flex">
        {/* Render the NavBar component with links to the deck and the page name */}
        <NavBar
          linkName={`Deck ${deck.name}`}
          link={`/decks/${deck.id}`}
          pageName={`Edit Card ${cardId}`}
        />
      </div>
      <div className="d-flex flex-column">
        <h2>Edit Card</h2>
        {/* Render the CardForm component in 'edit' mode for editing the card */}
        <CardForm mode="edit" />
      </div>
    </div>
  );
}
