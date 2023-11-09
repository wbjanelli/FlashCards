// Import necessary modules and components from React and the application
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Layout/NavBar";
import CardForm from "./CardForm";
import { readDeck } from "../utils/api";

// Define the AddCard component for adding a card to a deck
export default function AddCard() {
  // Access the 'deckId' parameter from React Router
  const { deckId } = useParams();

  // Initialize the 'currentDeck' state to store the current deck's data
  const [currentDeck, setCurrentDeck] = useState({});

  // Use the 'useEffect' hook to fetch deck data when the component mounts
  useEffect(() => {
    const fetchDeckData = async () => {
      try {
        // Fetch the deck data based on the 'deckId' and update the state
        const gotDeck = await readDeck(deckId);
        setCurrentDeck({ ...gotDeck });
      } catch (error) {
        // Handle any errors that occur during data fetching
        throw error;
      }
    };

    // Call 'fetchDeckData' when the component mounts and no cleanup needed
    fetchDeckData();

    return () => {};
  }, [deckId]);

  // Render the AddCard component with a NavBar, title, and CardForm
  return (
    <React.Fragment>
      <div className="d-flex">
        <NavBar
          linkName={currentDeck.name}
          link={`decks/${currentDeck.id}`}
          pageName={"Add Card"}
        />
      </div>
      <div className="d-flex flex-column">
        <h2>{currentDeck.name}: Add Card</h2>
        <CardForm /> {/* Render the CardForm for adding a card */}
      </div>
    </React.Fragment>
  );
}
