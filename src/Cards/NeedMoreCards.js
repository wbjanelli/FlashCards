// Import necessary modules and components from React and the application
import React from "react";
import { Link } from "react-router-dom";

// Define the NeedMoreCards component for informing the user about the need for more cards
export default function NeedMoreCards({ id, cards }) {
  return (
    <div className="d-flex flex-column">
      <h3>Not enough cards.</h3>
      <p>
        {/* Display a message informing the user about the card requirement */}
        You need at least 3 cards to study. There are {cards} cards in this deck.
      </p>
      <div>
        <Link className="btn btn-primary" to={`/decks/${id}/cards/new`}>
          <i className="fa-solid fa-plus"></i> Add Cards
        </Link>
      </div>
    </div>
  );
}
