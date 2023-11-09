// Import necessary modules and components from React and the application
import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { readDeck, deleteDeck } from "../utils/api";
import NavBar from "../Layout/NavBar";
import CardList from "../Cards/CardList";

// Define the Deck component to display deck details and manage deck-related actions
export default function Deck() {
  // Extract 'deckId' from the route parameters and access 'history' and 'url'
  const { deckId } = useParams();
  const history = useHistory();
  const { url } = useRouteMatch();
  
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

  // Define a function to handle deck deletion
  async function handleDeckDelete(id) {
    try {
      // Display a confirmation dialog to confirm deck deletion
      const result = window.confirm(
        "Delete this deck?\n\nYou will not be able to recover it."
      );

      if (result) {
        const abortController = new AbortController();
        // Call the 'deleteDeck' API function to delete the deck
        await deleteDeck(id, abortController.signal);
        // Redirect to the home page after deletion
        history.push("/");
      }
    } catch (error) {
      // Handle any errors that occur during deck deletion
      throw error;
    }
  }

  // Render the deck details, buttons for actions, and the list of cards
  return (
    <>
      <NavBar pageName={deck.name} />
      {!deck.id ? (
        // If the deck is still loading, display a loading message
        <>
          <h2>Loading deck...</h2>
        </>
      ) : (
        <React.Fragment>
          <div className="d-flex flex-column">
            <div className="d-flex flex-column">
              <h2>{deck.name}</h2>
              <p>{deck.description}</p>
            </div>
            <div className="d-flex justify-content-between">
              <div className="flex-item">
                <Link
                  className="btn btn-secondary mr-2"
                  to={`/decks/${deck.id}/edit`}
                >
                  <i className="fa-solid fa-pencil"></i> Edit
                </Link>
                <Link
                  className="btn btn-primary  mr-2"
                  to={`/decks/${deck.id}/study`}
                >
                  <i className="fa-solid fa-book mr-1"></i> Study
                </Link>
                <Link className="btn btn-primary" to={`${url}/cards/new`}>
                  <i className="fa-solid fa-plus"></i> Add Cards
                </Link>
              </div>
              <div className="flex-item">
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => handleDeckDelete(deck.id)}
                >
                  <i className="fa-solid fa-trash-can"></i> Delete
                </button>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column mt-4">
            <h2>Cards</h2>
            {/* Render the list of cards in the deck using the CardList component */}
            <CardList cards={deck.cards} />
          </div>
        </React.Fragment>
      )}
    </>
  );
}
