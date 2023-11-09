// Import necessary modules and components from React and the application
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Layout/NavBar";
import { readDeck } from "../utils/api";
import DeckForm from "./DeckForm";

// Define the EditDeck component for editing an existing deck
export default function EditDeck() {
  // Initialize the 'deck' state variable to store the deck data
  const [deck, setDeck] = useState({});
  
  // Extract the 'deckId' parameter from the route using 'useParams'
  const { deckId } = useParams();

  // Use the 'useEffect' hook to fetch the deck data when the component mounts
  useEffect(() => {
    const abortController = new AbortController();

    // Define an asynchronous function 'fetchDeck' to fetch and update the deck data
    const fetchDeck = async () => {
      try {
        // Fetch the current deck based on 'deckId' and the 'abortController' signal
        const currentDeck = await readDeck(deckId, abortController.signal);
        
        // Update the 'deck' state with the fetched deck data
        setDeck({ ...currentDeck });
      } catch (error) {
        // Handle any errors that occur during the fetch
        throw error;
      }
    }

    // Call 'fetchDeck' when the component mounts and cleanup with 'abortController'
    fetchDeck();

    return () => abortController.abort(); // Cleanup function for aborting requests
  }, [deckId]);

  // Render the component's content
  return (
    <React.Fragment>
      <div className="d-flex">
        {/* Render the NavBar component with a link to the current deck */}
        <NavBar
          linkName={deck.name}
          link={`/decks/${deck.id}`}
          pageName={"Edit Deck"}
        />
      </div>
      <div className="d-flex flex-column">
        <h2>Edit Deck</h2>
        {/* Render the DeckForm component in 'edit' mode */}
        <DeckForm mode="edit" />
      </div>
    </React.Fragment>
  );
}
