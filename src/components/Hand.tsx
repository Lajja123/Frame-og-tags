// components/Hand.tsx

import React from "react";
import Card from "./Card";
import "../components/Hand.css";

interface Card {
  suit: string;
  value: string;
}

interface HandProps {
  cards: Card[];
  isDealer?: boolean; // Optional boolean to identify if it's the dealer's hand
  showAllCards?: boolean; // Optional boolean to show all cards (for dealer's second card)
}
const Hand: React.FC<HandProps> = ({
  cards,
  isDealer = false,
  showAllCards = false,
}) => {
  return (
    <div className="hand">
      {cards.map((card, index) => (
        <Card
          key={index}
          suit={card.suit}
          value={card.value}
          hidden={isDealer && index === 1 && !showAllCards} // Hide the second card of the dealer unless showAllCards is true
        />
      ))}
    </div>
  );
};

export default Hand;
