import React from "react";
import { Link } from "react-router-dom";

export default function NavBar({ linkName = "", link = "", pageName = "" }) {
  const breadcrumbItems = link
    ? (
      <React.Fragment>
        <li className="breadcrumb-item">
          <Link to={link}>{linkName}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {pageName}
        </li>
      </React.Fragment>
    )
    : (
      <li className="breadcrumb-item active" aria-current="page">
        {pageName}
      </li>
    );

  return (
    <nav className="w-100" aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item text-secondary">
          <Link to={"/"}>
            <i className="fa-solid fa-house-chimney"></i> Home
          </Link>
        </li>
        {breadcrumbItems}
      </ol>
    </nav>
  );
}
