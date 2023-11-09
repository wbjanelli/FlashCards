// Import React, Fragment, Route, and Switch components from React Router for routing
import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

// Import components from the application
import Header from "./Header";
import NotFound from "./NotFound";
import CreateDeck from "../Deck/CreateDeck";
import Home from "../Home/Home";
import Study from "../Deck/Study";
import ViewDeck from "../Deck/ViewDeck";
import EditDeck from "../Deck/EditDeck";
import EditCard from "../Cards/EditCard";
import AddCard from "../Cards/AddCard";

// Define the Layout component for structuring application routes and components
function Layout() {
  return (
    <React.Fragment>
      <Header /> {/* Render the application header component */}
      <div className="container">
        <Switch>
          <Route exact path={"/"}>
            <Home /> {/* Route for the home page component */}
          </Route>
          <Route exact path={"/decks/new"}>
            <CreateDeck /> {/* Route for creating a new deck */}
          </Route>
          <Route exact path={"/decks/:deckId"}>
            <ViewDeck /> {/* Route for viewing a deck */}
          </Route>
          <Route exact path={"/decks/:deckId/edit"}>
            <EditDeck /> {/* Route for editing a deck */}
          </Route>
          <Route exact path={"/decks/:deckId/study"}>
            <Study /> {/* Route for studying a deck */}
          </Route>
          <Route exact path={"/decks/:deckId/cards/new"}>
            <AddCard /> {/* Route for adding a card to a deck */}
          </Route>
          <Route exact path={"/decks/:deckId/cards/:cardId/edit"}>
            <EditCard /> {/* Route for editing a card */}
          </Route>
          <Route>
            <NotFound /> {/* Default route for a "Not Found" page */}
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default Layout; // Export the Layout component as the default export
