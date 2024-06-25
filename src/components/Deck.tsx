// components/Deck.tsx
"use client";
import React, { useEffect, useState } from "react";
import "../components/deck.css";

interface Card {
  suit: string;
  value: string;
}

const initialDeck: Card[] = [
  { suit: "Hearts", value: "2" },
  { suit: "Hearts", value: "3" },
  // Add all 52 cards here...
  { suit: "Spades", value: "K" },
];

const Deck: React.FC = () => {
  const [deck, setDeck] = useState<Card[]>(initialDeck);

  // Function to shuffle the deck
  const shuffleDeck = () => {
    const shuffledDeck = [...deck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    setDeck(shuffledDeck);
  };

  // Shuffle the deck on initial render
  useEffect(() => {
    shuffleDeck();
  }, []);

  // Render the deck
  return (
    <div className="deck">
      <h2>Deck</h2>
      <div className="deck-cards">
        {deck.map((card, index) => (
          <div className="deck-card" key={index}>
            {card.value} {card.suit}
          </div>
        ))}
      </div>
      <button onClick={shuffleDeck}>Shuffle Deck</button>
    </div>
  );
};

export default Deck;
