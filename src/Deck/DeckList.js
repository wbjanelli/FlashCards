// Import necessary modules and components from React and the application
import React from "react";
import { Link } from "react-router-dom";
import { deleteDeck } from "../utils/api/index.js";

// Define the DeckList component to display a list of decks
export default function DeckList({ decks }) {
  // Define an asynchronous function to handle deck deletion
  async function handleDelete(id) {
    try {
      // Display a confirmation dialog to confirm deck deletion
      const result = window.confirm(
        "Delete this deck?\n\n\nYou will not be able to recover it."
      );
      if (result) {
        const abortController = new AbortController();
        
        // Call the 'deleteDeck' API function to delete the deck
        await deleteDeck(id, abortController.signal);

        // Reload the page to reflect the changes
        window.location.reload();

        // Abort the 'abortController' to clean up any pending requests
        abortController.abort();
      }
    } catch (error) {
      // Handle any errors that occur during the deletion process
      throw error;
    }
  }

  // Render the list of decks
  return (
    <>
      {decks.map((deck) => (
        <div className="card" key={deck.id}>
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div className="flex-item">
                <h2 className="card-title">{deck.name}</h2>
              </div>
              <div className="flex-item">
                <p className="text-muted">
                  <small>{deck.cards.length} cards</small>
                </p>
              </div>
            </div>
            <p className="card-text">{deck.description}</p>
            <div className="d-flex justify-content-between">
              <div className="">
                {/* Create a link to view the deck details */}
                <Link
                  className="btn btn-secondary mr-2"
                  to={`decks/${deck.id}`}
                >
                  <i className="fa-solid fa-eye mr-1"></i> View
                </Link>
                {/* Create a link to start studying the deck */}
                <Link
                  className="btn btn-primary  mr-2"
                  to={`/decks/${deck.id}/study`}
                >
                  <i className="fa-solid fa-book mr-1"></i> Study
                </Link>
              </div>
              <div className="">
                {/* Create a button to trigger deck deletion */}
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => handleDelete(deck.id)}
                >
                  <i className="fa-solid fa-trash-can"></i> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
