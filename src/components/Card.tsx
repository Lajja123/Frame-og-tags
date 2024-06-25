// components/Card.tsx
import React from "react";
import "../components/Card.css";

interface CardProps {
  suit: string;
  value: string;
  hidden?: boolean; // Make hidden prop optional
}

const Card: React.FC<CardProps> = ({ suit, value, hidden = false }) => {
  return (
    <div className={`card ${hidden ? "hidden" : ""}`}>
      {hidden ? (
        <p>Hidden</p>
      ) : (
        <p>
          {value} of {suit}
        </p>
      )}
    </div>
  );
};

export default Card;
