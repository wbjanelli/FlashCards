// Import React and Link component from React Router for creating navigation links
import React from "react";
import { Link } from "react-router-dom";

// Define the NotFound component for rendering a "Not Found" page
export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2> {/* Display the "Not Found" heading */}
      <p>Sorry, page not found.</p> {/* Display a message indicating the page is not found */}
      <Link to="/" className="btn btn-warning">
        Return Home
      </Link> {/* Create a link to the home page with a "Return Home" button */}
    </div>
  );
}
