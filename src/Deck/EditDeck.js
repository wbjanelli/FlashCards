import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Layout/NavBar";
import { readDeck } from "../utils/api";
import DeckForm from "./DeckForm";

export default function EditDeck() {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchDeck = async () => {
      try {
        const currentDeck = await readDeck(deckId, abortController.signal);
        setDeck({ ...currentDeck });
      } catch (error) {
        throw error;
      }
    }

    fetchDeck();

    return () => abortController.abort();
  }, [deckId]);

  return (
    <React.Fragment>
      <div className="d-flex">
        <NavBar
          linkName={deck.name}
          link={`/decks/${deck.id}`}
          pageName={"Edit Deck"}
        />
      </div>
      <div className="d-flex flex-column">
        <h2>Edit Deck</h2>
        <DeckForm mode="edit" />
      </div>
    </React.Fragment>
  );
}
