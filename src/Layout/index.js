import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";

function Layout() {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <NotFound />
      </div>
    </React.Fragment>
  );
}

export default Layout;
