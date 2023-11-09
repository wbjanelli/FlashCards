// Import necessary modules and components from React and the application
import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { deleteCard } from "../utils/api";

// Define the CardList component to display a list of cards
export default function CardList({ cards }) {
  // Access 'history' and 'url' from the React Router hooks
  const history = useHistory();
  const { url } = useRouteMatch();

  // Define an asynchronous function to handle card deletion
  async function handleDelete(id) {
    try {
      // Display a confirmation dialog to confirm card deletion
      const result = window.confirm(
        "Delete this card?\n\n\nYou will not be able to recover it."
      );
      if (result) {
        const abortController = new AbortController();
        // Call the 'deleteCard' API function to delete the card
        await deleteCard(id, abortController.signal);
        // Reload the page to reflect the changes
        window.location.reload();
        // Abort the 'abortController' to clean up any pending requests
        abortController.abort();
      }
    } catch (error) {
      // Handle any errors that occur during card deletion
      throw error;
    }
  }

  // Render the list of cards if 'cards' is not empty
  return (
    cards && (
      <div className="d-flex flex-column">
        {cards.map((card) => (
          <div className="card" key={card.id}>
            <div className="card-body  d-flex">
              <div className="card-text w-50 m-2">
                <p>{card.front}</p>
              </div>
              <div className="card-text w-50 m-2">
                <p>{card.back}</p>
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-secondary mr-2"
                    type="button"
                    onClick={() =>
                      // Navigate to the card editing page
                      history.push(`${url}/cards/${card.id}/edit`)
                    }
                  >
                    <i className="fa-solid fa-pencil"></i> Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => handleDelete(card.id)}
                  >
                    <i className="fa-solid fa-trash-can"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );
}
