// Import necessary modules and components from React and the application
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import NavBar from "../Layout/NavBar";
import { readDeck } from "../utils/api";
import Card from "../Cards/Card";
import NeedMoreCards from "../Cards/NeedMoreCards";

// Define the Study component for studying flashcards within a deck
export default function Study() {
  // Initialize state variables to manage deck, card, and study progress
  const [deck, setDeck] = useState({});
  const [count, setCount] = useState(0);
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState({});
  const [nextIndex, setNextIndex] = useState(1);
  const [flipped, setFlipped] = useState(false);

  // Extract the 'deckId' parameter from the route and access 'history'
  const { deckId } = useParams();
  const history = useHistory();

  // Use the 'useEffect' hook to fetch deck data when the component mounts
  useEffect(() => {
    const abortController = new AbortController();

    // Define an asynchronous function 'getDeckData' to fetch and set deck and card data
    const getDeckData = async () => {
      try {
        if (deckId) {
          const deckData = await readDeck(deckId, abortController.signal);
          setDeck({ ...deckData });
          setCount(deckData.cards.length);
          setCards([...deckData.cards]);
          setCard({ ...deckData.cards[0] });
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

  // Reset the study session
  const reset = () => {
    setCard(cards[0]);
    setNextIndex(1);
    handleFlip();
  };

  // Toggle the card flip state
  const handleFlip = () => {
    setFlipped(!flipped);
  };

  // Proceed to the next card or restart the study session
  const handleNext = () => {
    if (nextIndex < cards.length) {
      setCard(cards[nextIndex]);
      setNextIndex((currentIndex) => currentIndex + 1);
      handleFlip();
    } else {
      // Display a confirmation dialog for restarting or returning to the home page
      const response = window.confirm(
        "Restart cards\n\n\nClick 'cancel' to return to the home page."
      );
      response ? reset() : history.push("/");
    }
  };

  // Render the study session's content, including the card or a message to add more cards
  return (
    <React.Fragment>
      <div className="d-flex">
        <NavBar linkName={deck.name} link={`/decks/${deck.id}`} pageName={"Study"} />
      </div>
      <h2>{deck.name}: Study</h2>
      {count < 3 || !count ? (
        // Render a message to add more cards if there are fewer than 3 cards
        <NeedMoreCards name={deck.name} id={deck.id} cards={count} />
      ) : (
        // Render the Card component for studying flashcards
        <Card card={card} count={count} index={nextIndex} flipped={flipped} flip={handleFlip} next={handleNext} />
      )}
    </React.Fragment>
  );
}
