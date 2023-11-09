// Import React module
import React from "react";

// Define the Header component for displaying the application header
function Header() {
  return (
    <header className="jumbotron bg-dark">
      <div className="container text-white">
        <h1 className="display-4">Flashcard-o-matic</h1> {/* Display the application name */}
        <p className="lead">Discover The Flashcard Difference.</p> {/* Display a brief description */}
      </div>
    </header>
  );
}

export default Header; // Export the Header component as the default export
