import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";
import React from "react";

const suits = ["♠", "♥", "♦", "♣"];
const values = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

interface Card {
  value: string;
  suit: string;
}

function mapNumberToCard(num: number): Card {
  if (num < 1 || num > 52) throw new Error("Invalid card number");
  const suitIndex = Math.floor((num - 1) / 13);
  const valueIndex = (num - 1) % 13;
  return { value: values[valueIndex], suit: suits[suitIndex] };
}

enum GameResult {
  Ongoing = 0,
  PlayerWins = 1,
  DealerWins = 2,
  Tie = 3,
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = searchParams.get("params");

    if (!params) {
      return new Response(JSON.stringify({ message: "Params are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { playerCards, dealerCards, playerScore, dealerScore, result } =
      JSON.parse(decodeURIComponent(params)) as {
        playerCards: number[];
        dealerCards: number[];
        playerScore: number;
        dealerScore: number;
        result: GameResult;
      };

    const playerHand: Card[] = playerCards.map(mapNumberToCard);
    const dealerHand: Card[] = dealerCards.map(mapNumberToCard);

    const playerText = `Player: ${playerHand
      .map((card) => `${card.value}${card.suit}`)
      .join(", ")} - Total: ${playerScore}${
      playerScore > 21 ? " (Busted)" : ""
    }`;
    const dealerText = `Dealer: ${dealerHand
      .map((card) => `${card.value}${card.suit}`)
      .join(", ")} - Total: ${dealerScore}${
      dealerScore > 21 ? " (Busted)" : ""
    }`;

    let resultText = "";
    if (result === GameResult.PlayerWins) {
      resultText = "Player Wins!";
    } else if (result === GameResult.DealerWins) {
      resultText = "Dealer Wins!";
    } else if (result === GameResult.Tie) {
      resultText = "It's a Tie!";
    }

    const imageResponse = new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            {playerText}
          </div>
          <div
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            {dealerText}
          </div>
          {resultText && (
            <div style={{ fontSize: "48px", fontWeight: "bold", color: "red" }}>
              {resultText}
            </div>
          )}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );

    return new Response(imageResponse.body, {
      headers: {
        "Content-Type": "image/png",
      },
    });
  } catch (error: any) {
    console.error("Error generating image:", error);
    return new Response(
      JSON.stringify({
        message: "Error generating image",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export const runtime = "edge";
