// Import necessary modules and components from React and the application
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createDeck, readDeck, updateDeck } from "../utils/api";

// Define the DeckForm component that can create or edit decks
export default function DeckForm({ mode }) {
  // Access the 'history' object to enable programmatic navigation
  const history = useHistory();

  // Extract the 'deckId' parameter from the route using 'useParams'
  const { deckId } = useParams();

  // Initialize 'formData' to store deck information, with default values
  const initialFormData = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initialFormData });

  // Handle changes to form input fields
  const handleChange = ({ target }) =>
    setFormData({ ...formData, [target.name]: target.value });

  // Use the 'useEffect' hook to fetch the deck data when in 'edit' mode
  useEffect(() => {
    const abortController = new AbortController();

    async function getDeckToEdit() {
      try {
        // If in 'edit' mode, fetch and populate the form with the deck data
        if (mode === "edit") {
          const deckToEdit = await readDeck(deckId, abortController.signal);
          setFormData({ ...deckToEdit });
        }
      } catch (error) {
        throw error;
      }
    }

    // Call 'getDeckToEdit' when the component mounts and cleanup with 'abortController'
    getDeckToEdit();

    return () => abortController.abort(); // Cleanup function for aborting requests
  }, [deckId, mode]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    try {
      if (mode === "create") {
        // If in 'create' mode, create a new deck and navigate to its page
        const newDeck = await createDeck(formData, abortController.signal);
        setFormData({ ...initialFormData });
        history.push(`/decks/${newDeck.id}`);
      } else if (mode === "edit") {
        // If in 'edit' mode, update the existing deck and navigate to its page
        await updateDeck(formData, abortController.signal);
        history.push(`/decks/${deckId}`);
      }
    } catch (error) {
      throw error;
    }

    return () => abortController.abort(); // Cleanup function for aborting requests
  };

  // Render the form for creating or editing a deck
  return (
    <div className="d-flex flex-column">
      <form className="col-12" onSubmit={handleSubmit}>
        <div className="row form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control form-control-lg"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Deck Name"
          />
        </div>
        <div className="row form-group">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            className="form-control form-control-lg"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description of the deck"
          />
        </div>
        <div className="row">
          <Link
            to={mode === "create" ? "/" : `/decks/${deckId}`}
            className="btn btn-secondary mr-2"
          >
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
