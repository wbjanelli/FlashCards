// Import React to create a Card component
import React from "react";

// Define the Card component for displaying individual cards during study
export default function Card({ card, count, index, flipped, flip, next }) {
  // Define the 'nextButton' element to move to the next card
  const nextButton = (
    <button type="button" className="btn btn-primary" onClick={next}>
      Next
    </button>
  );

  // Determine the text to display based on card flip status
  const cardText = flipped ? card.back : card.front;

  // Render the card element with its title, text, flip button, and 'Next' button
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">
          Card {index} of {count}
        </h4>
        <p className="card-text">{cardText}</p>
        <button type="button" className="btn btn-secondary mr-2" onClick={flip}>
          Flip
        </button>
        {flipped && nextButton} {/* Display 'Next' button when the card is flipped */}
      </div>
    </div>
  );
}
