// components/Game.tsx
"use client";
import React, { useState, useEffect } from "react";
import Hand from "./Hand";
import Deck from "./Deck";
import "../components/Game.css";

interface Card {
  suit: string;
  value: string;
}

const initialDeck: Card[] = [
  { suit: "Hearts", value: "2" },
  { suit: "Hearts", value: "3" },
  { suit: "Hearts", value: "4" },
  { suit: "Hearts", value: "5" },
  { suit: "Hearts", value: "6" },
  { suit: "Hearts", value: "7" },
  { suit: "Hearts", value: "8" },
  { suit: "Hearts", value: "9" },
  { suit: "Hearts", value: "10" },
  { suit: "Hearts", value: "J" },
  { suit: "Hearts", value: "Q" },
  { suit: "Hearts", value: "K" },
  { suit: "Hearts", value: "A" },
  { suit: "Diamonds", value: "2" },
  { suit: "Diamonds", value: "3" },
  { suit: "Diamonds", value: "4" },
  { suit: "Diamonds", value: "5" },
  { suit: "Diamonds", value: "6" },
  { suit: "Diamonds", value: "7" },
  { suit: "Diamonds", value: "8" },
  { suit: "Diamonds", value: "9" },
  { suit: "Diamonds", value: "10" },
  { suit: "Diamonds", value: "J" },
  { suit: "Diamonds", value: "Q" },
  { suit: "Diamonds", value: "K" },
  { suit: "Diamonds", value: "A" },
  { suit: "Clubs", value: "2" },
  { suit: "Clubs", value: "3" },
  { suit: "Clubs", value: "4" },
  { suit: "Clubs", value: "5" },
  { suit: "Clubs", value: "6" },
  { suit: "Clubs", value: "7" },
  { suit: "Clubs", value: "8" },
  { suit: "Clubs", value: "9" },
  { suit: "Clubs", value: "10" },
  { suit: "Clubs", value: "J" },
  { suit: "Clubs", value: "Q" },
  { suit: "Clubs", value: "K" },
  { suit: "Clubs", value: "A" },
  { suit: "Spades", value: "2" },
  { suit: "Spades", value: "3" },
  { suit: "Spades", value: "4" },
  { suit: "Spades", value: "5" },
  { suit: "Spades", value: "6" },
  { suit: "Spades", value: "7" },
  { suit: "Spades", value: "8" },
  { suit: "Spades", value: "9" },
  { suit: "Spades", value: "10" },
  { suit: "Spades", value: "J" },
  { suit: "Spades", value: "Q" },
  { suit: "Spades", value: "K" },
  { suit: "Spades", value: "A" },
];

const Game: React.FC = () => {
  const [deck, setDeck] = useState<Card[]>(initialDeck);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [dealerScore, setDealerScore] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<
    "playing" | "player_wins" | "dealer_wins" | "draw"
  >("playing");
  const [currentTurn, setCurrentTurn] = useState<"player" | "dealer">("player");
  const [showDealerSecondCard, setShowDealerSecondCard] =
    useState<boolean>(false);

  // Function to shuffle the deck
  const shuffleDeck = () => {
    const shuffledDeck = [...initialDeck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    setDeck(shuffledDeck);
  };

  // Function to deal initial hands
  const dealInitialHands = () => {
    const updatedDeck = [...deck];
    const playerCards: Card[] = [];
    const dealerCards: Card[] = [];

    // Deal two cards to player
    playerCards.push(updatedDeck.pop()!);
    playerCards.push(updatedDeck.pop()!);

    // Deal two cards to dealer
    dealerCards.push(updatedDeck.pop()!);
    dealerCards.push(updatedDeck.pop()!);

    setDeck(updatedDeck);
    setPlayerHand(playerCards);
    setDealerHand(dealerCards);

    // Calculate initial scores
    setPlayerScore(calculateScore(playerCards));
    setDealerScore(calculateScore(dealerCards));

    // Start game with player's turn
    setCurrentTurn("player");
  };

  // Function to calculate score of a hand
  const calculateScore = (hand: Card[]): number => {
    let score = 0;
    let aceCount = 0;

    // Calculate score based on card values
    hand.forEach((card) => {
      if (card.value === "A") {
        aceCount++;
        score += 11; // Assuming ace initially counts as 11
      } else if (
        card.value === "K" ||
        card.value === "Q" ||
        card.value === "J"
      ) {
        score += 10;
      } else {
        score += parseInt(card.value);
      }
    });

    // Adjust score for aces
    while (score > 21 && aceCount > 0) {
      score -= 10; // Change ace value from 11 to 1
      aceCount--;
    }

    return score;
  };

  // Function to handle player hit
  const playerHit = () => {
    if (gameStatus === "playing" && currentTurn === "player") {
      const updatedDeck = [...deck];
      const updatedPlayerHand = [...playerHand];
      updatedPlayerHand.push(updatedDeck.pop()!);
      setDeck(updatedDeck);
      setPlayerHand(updatedPlayerHand);
      const newPlayerScore = calculateScore(updatedPlayerHand);
      setPlayerScore(newPlayerScore);

      // Check if player busts
      if (newPlayerScore > 21) {
        setGameStatus("dealer_wins");
        setCurrentTurn("dealer"); // Player busts, switch turn to dealer
      } else {
      }
    }
  };

  // Function to handle player stand
  const playerStand = () => {
    if (gameStatus === "playing" && currentTurn === "player") {
      setCurrentTurn("dealer");
      setShowDealerSecondCard(true); // Switch turn to dealer after player stands
    }
  };

  // Function for dealer to hit
  const dealerHit = () => {
    if (gameStatus === "playing" && currentTurn === "dealer") {
      const updatedDeck = [...deck];
      const updatedDealerHand = [...dealerHand];
      updatedDealerHand.push(updatedDeck.pop()!);
      setDeck(updatedDeck);
      setDealerHand(updatedDealerHand);
      const newDealerScore = calculateScore(updatedDealerHand);
      setDealerScore(newDealerScore);

      // Check if dealer busts
      if (newDealerScore > 21) {
        setGameStatus("player_wins");
      } else {
      }
    }
  };

  // Function for dealer to stand
  const dealerStand = () => {
    if (gameStatus === "playing" && currentTurn === "dealer") {
      setCurrentTurn("player"); // Switch turn back to player after dealer stands
    }
  };

  // Function to restart the game
  const restartGame = () => {
    // Reset all states to initial values
    setDeck(initialDeck);
    setPlayerHand([]);
    setDealerHand([]);
    setPlayerScore(0);
    setDealerScore(0);
    setGameStatus("playing");
    setCurrentTurn("player");
    setShowDealerSecondCard(false);
    // Shuffle deck and deal initial hands
    shuffleDeck();
    dealInitialHands();
  };

  // Shuffle deck and deal initial hands on component mount
  useEffect(() => {
    // shuffleDeck();
    dealInitialHands();
  }, []);

  // Render the game UI
  return (
    <div className="game">
      <h1>Blackjack</h1>
      <div className="game-area">
        <div className="player-area">
          <h2>Player</h2>
          <Hand cards={playerHand} isDealer={false} showAllCards={true} />
          <p>Score: {playerScore}</p>
          {gameStatus === "playing" && currentTurn === "player" && (
            <>
              <button onClick={playerHit}>Hit</button>
              <button onClick={playerStand}>Stand</button>
            </>
          )}
        </div>
        <div className="dealer-area">
          <h2>Dealer</h2>
          <Hand
            cards={dealerHand}
            isDealer={true}
            showAllCards={showDealerSecondCard || gameStatus !== "playing"}
          />
          <p>Score: {dealerScore}</p>
          {gameStatus === "playing" && currentTurn === "dealer" && (
            <>
              <button onClick={dealerHit}> Hit</button>
              <button onClick={dealerStand}> Stand</button>
            </>
          )}
        </div>
      </div>
      <Deck />
      <div className="game-status">
        {gameStatus !== "playing" && (
          <div>
            <p>
              {gameStatus === "player_wins"
                ? "Player wins!"
                : gameStatus === "dealer_wins"
                ? "Dealer wins!"
                : "Draw!"}
            </p>
            <button onClick={restartGame}>Restart</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
