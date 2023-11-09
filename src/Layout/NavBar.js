// Import React and Link component from React Router for creating navigation links
import React from "react";
import { Link } from "react-router-dom";

// Define the NavBar component for rendering breadcrumb navigation
export default function NavBar({ linkName = "", link = "", pageName = "" }) {
  // Create a list of breadcrumb items based on the provided link and pageName
  const breadcrumbItems = link
    ? (
      <React.Fragment>
        <li className="breadcrumb-item">
          <Link to={link}>{linkName}</Link> {/* Display a link if 'link' is provided */}
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {pageName} {/* Display the current page name as an active item */}
        </li>
      </React.Fragment>
    )
    : (
      <li className="breadcrumb-item active" aria-current="page">
        {pageName} {/* Display only the current page name as an active item if 'link' is not provided */}
      </li>
    );

  // Render the breadcrumb navigation with a home link, provided link and pageName
  return (
    <nav className="w-100" aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item text-secondary">
          <Link to={"/"}>
            <i className="fa-solid fa-house-chimney"></i> Home {/* Home link */}
          </Link>
        </li>
        {breadcrumbItems} {/* Render the breadcrumb items based on 'breadcrumbItems' */}
      </ol>
    </nav>
  );
}

