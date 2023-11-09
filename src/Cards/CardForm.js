// Import necessary modules and components from React and the application
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readCard, updateCard } from "../utils/api";

// Define the CardForm component for creating or editing cards
export default function CardForm({ mode = "create" }) {
  // Access the 'history' and 'params' objects from React Router
  const history = useHistory();
  const { deckId, cardId } = useParams();

  // Initialize the 'formData' state to store card data
  const initialFormData = {
    front: "",
    back: "",
  };
  const [formData, setFormData] = useState({ ...initialFormData });

  // Define a function to handle changes in the form data
  const handleChange = ({ target }) =>
    setFormData({ ...formData, [target.name]: target.value });

  // Use the 'useEffect' hook to fetch card data when in 'edit' mode
  useEffect(() => {
    const abortController = new AbortController();

    // Define an asynchronous function 'getEditCardData' to fetch and set card data
    const getEditCardData = async () => {
      try {
        if (mode === "edit") {
          const cardToEdit = await readCard(cardId, abortController.signal);
          setFormData({ ...cardToEdit });
        }
      } catch (error) {
        // Handle any errors that occur during data fetching
        throw error;
      }
    };

    // Call 'getEditCardData' when the component mounts and cleanup with 'abortController'
    getEditCardData();

    return () => abortController.abort(); // Cleanup function for aborting requests
  }, [cardId, mode]);

  // Define a function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    try {
      if (mode === "create") {
        // Create a new card and update the form data
        await createCard(deckId, formData, abortController.signal);
        setFormData({ ...initialFormData });
      } else if (mode === "edit") {
        // Update an existing card with the form data
        await updateCard(formData, abortController.signal);
        history.push(`/decks/${deckId}`);
      }
    } catch (error) {
      // Handle any errors that occur during card creation or update
      throw error;
    }

    return () => abortController.abort(); // Cleanup function for aborting requests
  };

  // Render the card form with front and back inputs
  return (
    <div className="d-flex flex-column">
      <form className="col-12" onSubmit={handleSubmit}>
        <div className="row form-group">
          <label htmlFor="front">Front</label>
          <textarea
            type="text"
            className="form-control form-control-lg"
            id="front"
            name="front"
            value={formData.front}
            onChange={handleChange}
            placeholder="Front side of card"
          />
        </div>
        <div className="row form-group">
          <label htmlFor="back">Back</label>
          <textarea
            type="text"
            className="form-control form-control-lg"
            id="back"
            name="back"
            value={formData.back}
            onChange={handleChange}
            placeholder="Back side of card"
          />
        </div>
        <div className="row">
          <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-2">
            {mode === "edit" ? "Cancel" : "Done"}
          </Link>
          <button type="submit" className="btn btn-primary">
            {mode === "edit" ? "Submit" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
