import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Layout/NavBar";
import CardForm from "./CardForm";
import { readDeck } from "../utils/api";

export default function AddCard() {
  const { deckId } = useParams();
  const [currentDeck, setCurrentDeck] = useState({});

  useEffect(() => {
    const fetchDeckData = async () => {
      try {
        const gotDeck = await readDeck(deckId);
        setCurrentDeck({ ...gotDeck });
      } catch (error) {
        throw error;
      }
    };

    fetchDeckData();

    return () => {};
  }, [deckId]);

  return (
    <React.Fragment>
      <div className="d-flex">
        <NavBar
          linkName={currentDeck.name}
          link={`decks/${currentDeck.id}`}
          pageName={"Add Card"}
        />
      </div>
      <div className="d-flex flex-column">
        <h2>{currentDeck.name}: Add Card</h2>
        <CardForm />
      </div>
    </React.Fragment>
  );
}
