import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Sorry, page not found.</p>
      <Link to="/" className="btn btn-warning">
        Return Home
      </Link>
    </div>
  );
}
