import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createDeck, readDeck, updateDeck } from "../utils/api";

export default function DeckForm({ mode }) {
  const history = useHistory();
  const { deckId } = useParams();

  const initialFormData = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initialFormData });

  const handleChange = ({ target }) =>
    setFormData({ ...formData, [target.name]: target.value });

  useEffect(() => {
    const abortController = new AbortController();

    async function getDeckToEdit() {
      try {
        if (mode === "edit") {
          const deckToEdit = await readDeck(deckId, abortController.signal);
          setFormData({ ...deckToEdit });
        }
      } catch (error) {
        throw error;
      }
    }

    getDeckToEdit();

    return () => abortController.abort();
  }, [deckId, mode]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    try {
      if (mode === "create") {
        const newDeck = await createDeck(formData, abortController.signal);
        setFormData({ ...initialFormData });
        history.push(`/decks/${newDeck.id}`);
      } else if (mode === "edit") {
        await updateDeck(formData, abortController.signal);
        history.push(`/decks/${deckId}`);
      }
    } catch (error) {
      throw error;
    }

    return () => abortController.abort();
  };

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
