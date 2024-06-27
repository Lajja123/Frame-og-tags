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

  const backgroundImageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/FrontBg.png`;
  const logo = `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`;
  const dealer = `${process.env.NEXT_PUBLIC_SITE_URL}/dealer.png`;
  const player = `${process.env.NEXT_PUBLIC_SITE_URL}/player.png`;
  const win3 = `${process.env.NEXT_PUBLIC_SITE_URL}/win3.png`;
  const p1 = `${process.env.NEXT_PUBLIC_SITE_URL}/p1.png`;
  const p2 = `${process.env.NEXT_PUBLIC_SITE_URL}/p2.png`;
  const p3 = `${process.env.NEXT_PUBLIC_SITE_URL}/p3.png`;
  const fire = `${process.env.NEXT_PUBLIC_SITE_URL}/fire.png`;
  const vector = `${process.env.NEXT_PUBLIC_SITE_URL}/vector.png`;
  const stats = `${process.env.NEXT_PUBLIC_SITE_URL}/stats.png`;
  const rank = `${process.env.NEXT_PUBLIC_SITE_URL}/Trophy.png`;
  // Render the game UI
  return (
    // <div
    //   style={{
    //     position: "relative",
    //     top: 0,
    //     left: 0,
    //   }}
    // >
    //   <img
    //     src={backgroundImageUrl}
    //     style={{
    //       position: "absolute",
    //       top: 0,
    //       left: 0,
    //       width: "550px",
    //       height: "300px",
    //       objectFit: "cover",
    //       zIndex: -1,
    //     }}
    //     alt="background"
    //   />
    //   <div
    //     style={{
    //       width: "80%",
    //       margin: "0 auto",
    //       textAlign: "center",
    //       padding: "20px",
    //     }}
    //   >
    //     <img src={logo} />
    //   </div>
    //   <div
    //     style={{
    //       display: "flex",
    //       flexDirection: "row",
    //       alignItems: "center",
    //       border: "1px solid white",
    //       width: "60%",
    //       margin: "0 auto",
    //     }}
    //   >
    //     <div
    //       style={{
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItems: "center",
    //         justifyContent: "flex-end",
    //       }}
    //     >
    //       <div
    //         style={{
    //           display: "flex",
    //           flexDirection: "column",
    //           alignItems: "center",
    //         }}
    //       >
    //         <img src={top1} style={{ width: "20px" }} />
    //         <img src={p2} style={{ width: "80px" }} />
    //         <div>Hello</div>
    //       </div>
    //       <img src={win2} style={{ width: "150px", height: "180px" }} />
    //     </div>
    //     <div
    //       style={{
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItems: "center",
    //       }}
    //     >
    //       <div
    //         style={{
    //           display: "flex",

    //           alignItems: "center",
    //           flexDirection: "column",
    //         }}
    //       >
    //         <img src={top2} style={{ width: "20px" }} />
    //         <img src={p1} style={{ width: "80px" }} />
    //         <div style={{ fontFamily: "space-mono", fontSize: "15px" }}>
    //           Hello
    //         </div>
    //       </div>
    //       <img src={win1} style={{ width: "150px", height: "200px" }} />
    //     </div>
    //     <div
    //       style={{
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItems: "center",
    //       }}
    //     >
    //       <div
    //         style={{
    //           display: "flex",
    //           flexDirection: "column",
    //           alignItems: "center",
    //         }}
    //       >
    //         <img src={top3} style={{ width: "30px" }} />
    //         <img src={p3} style={{ width: "80px" }} />
    //         <div>Hello</div>
    //       </div>
    //       <img src={win3} style={{ width: "150px", height: "150px" }} />
    //     </div>
    //   </div>
    // </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        fontFamily: "Arial, sans-serif",
        color: "white",
      }}
    >
      {/* Background Image */}
      <img
        src={backgroundImageUrl}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
        alt="background"
      />

      <img
        src={logo}
        style={{
          width: "120px",
          height: "50px",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "50vh",
          alignItems: "flex-start",
          border: "3px solid white",
          background: "transparent",

          borderRadius: "20px",
          marginBottom: "0",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "50px",
        }}
      >
        {/* <div
          style={{
            display: "flex",
            width: "100%",
            borderBottom: "1px solid white",
            padding: "20px",
            alignItems: "center",
            background: "#461b6673",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            backdropFilter: "blur(50px)",
          }}
        >
          <div
            style={{
              display: "flex",
              position: "relative",
              left: "26px",
              alignItems: "center",
            }}
          >
            <img src={rank} />
            <div style={{ padding: "0px 10px", letterSpacing: "1px" }}>
              #001
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              left: "45%",
              color: "#CFFF18",
              fontSize: "2rem",
              letterSpacing: "1px",
            }}
          >
            @johndoe
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            padding: "20px",
            justifyContent: "space-evenly",
          }}
        >
          <div style={{ fontSize: "1.5rem" }}>Games played</div>
          <div style={{ fontSize: "1.5rem" }}>Game ratio</div>
          <div style={{ fontSize: "1.5rem" }}>Game streek</div>
        </div> */}
        <div
          style={{
            display: "flex",
            width: "100%",
            padding: "20px",
            justifyContent: "space-evenly",
          }}
        >
          {/* <div
            style={{
              position: "relative",
              width: "200px",
              height: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={stats} alt="dealer" />
            <div
              style={{
                display: "flex",
                position: "absolute",
                alignItems: "center",
              }}
            >
              <img
                src={vector}
                style={{
                  fontSize: "1.5rem",
                  fontFamily: "Space Mono",
                  color: "white",
                  padding: "5px",
                }}
              />
              <div
                style={{
                  backgroundColor: "black",
                  fontFamily: "Space Mono",
                  color: "#FCFF55",
                  margin: "0px 5px",
                  padding: "10px 25px",
                  fontSize: "1.2rem",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                000.356
              </div>
            </div>
          </div>
          <div
            style={{
              position: "relative",
              width: "200px",
              height: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={stats} alt="dealer" />
            <div
              style={{
                display: "flex",
                position: "absolute",
                alignItems: "center",
              }}
            >
              <img
                src={vector}
                style={{
                  fontSize: "1.5rem",
                  fontFamily: "Space Mono",
                  color: "white",
                  padding: "5px",
                }}
              />
              <div
                style={{
                  backgroundColor: "black",
                  fontFamily: "Space Mono",
                  color: "#FCFF55",
                  margin: "0px 5px",
                  padding: "10px 25px",
                  fontSize: "1.2rem",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                000.356
              </div>
            </div>
          </div>
          <div
            style={{
              position: "relative",
              width: "200px",
              height: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={stats} alt="dealer" />
            <div
              style={{
                display: "flex",
                position: "absolute",
                alignItems: "center",
              }}
            >
              <img
                src={fire}
                style={{
                  fontSize: "1.5rem",
                  fontFamily: "Space Mono",
                  color: "white",
                  padding: "5px",
                }}
              />

              <div
                style={{
                  backgroundColor: "black",
                  fontFamily: "Space Mono",
                  color: "#FCFF55",
                  margin: "0px 5px",
                  padding: "10px 25px",
                  fontSize: "1.2rem",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                000.356
              </div>
            </div>
          </div> */}
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: -1,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              // color: resultText.includes("win") ? "red" : "#FF0000",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            ffhjhfkjhk
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                position: "relative",
                width: "200px",
                height: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "20px auto",
              }}
            >
              <img src={player} alt="player" />
              <div
                style={{
                  display: "flex",
                  position: "absolute",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "1.5rem",
                    backgroundColor: "#CFFF18",
                    fontFamily: "Space Mono",
                    color: "#461B66",
                    padding: "5px",
                  }}
                >
                  Today Game
                </div>
              </div>
            </div>
            <div
              style={{
                position: "relative",
                width: "200px",
                height: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "20px auto",
              }}
            >
              <img src={dealer} alt="player" />
              <div
                style={{
                  display: "flex",
                  position: "absolute",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "1.5rem",

                    fontFamily: "Space Mono",
                    color: "white",
                    padding: "5px",
                  }}
                >
                  Today Streek
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
