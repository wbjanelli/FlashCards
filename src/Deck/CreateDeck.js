// Import necessary modules and components from React and the application
import React from "react";
import NavBar from "../Layout/NavBar";
import DeckForm from "./DeckForm";

// Define the CreateDeck component for creating a new deck
export default function CreateDeck() {
  return (
    <React.Fragment>
      <div className="d-flex">
        {/* Render the NavBar component for navigation and display */}
        <NavBar pageName="Create Deck" />
      </div>
      <div className="d-flex flex-column">
        <h2>Create Deck</h2>
        {/* Render the DeckForm component in 'create' mode for creating a new deck */}
        <DeckForm mode="create" />
      </div>
    </React.Fragment>
  );
}
