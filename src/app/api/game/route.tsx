import { FrameRequest, getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

type Card = { number: string; value: number; suit: string };

function createDeck(): Card[] {
  const suits = ["♠", "♥", "♦", "♣"];
  const numbers = [
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
    "A",
  ];
  const deck: Card[] = [];

  for (const suit of suits) {
    for (const number of numbers) {
      const value =
        number === "A"
          ? 11
          : ["J", "Q", "K"].includes(number)
          ? 10
          : parseInt(number);
      deck.push({ number, value, suit });
    }
  }

  return deck.sort(() => Math.random() - 0.5); // Shuffle the deck
}

function calculateHandValue(hand: Card[]): number {
  let sum = hand.reduce((total, card) => total + card.value, 0);
  const hasAce = hand.some((card) => card.number === "A");

  if (hasAce && sum > 21) {
    sum -= 10; // Convert Ace from 11 to 1 if busting
  }

  return sum;
}

function drawCard(deck: Card[]): Card {
  return deck.pop()!;
}

interface GameState {
  deck: Card[];
  playerHand: Card[];
  dealerHand: Card[];
  dealerShowSecondCard: boolean;
  playerTurn: boolean;
  gameStatus:
    | "playing"
    | "playerBust"
    | "dealerBust"
    | "playerWin"
    | "dealerWin"
    | "tie";
}

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { untrustedData } = body;
  const imgUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/Background.svg`;
  const dealer = `${process.env.NEXT_PUBLIC_SITE_URL}/dealer.png`;
  const player = `${process.env.NEXT_PUBLIC_SITE_URL}/player.png`;
  const CARD_BACK_IMAGE = `${process.env.NEXT_PUBLIC_SITE_URL}/cards/Back.png`;

  let gameState: GameState;
  if (!untrustedData.state || untrustedData.buttonIndex === 3) {
    // New game or "New Game" button pressed
    const deck = createDeck();
    gameState = {
      deck,
      playerHand: [drawCard(deck), drawCard(deck)],
      dealerHand: [drawCard(deck), drawCard(deck)],
      dealerShowSecondCard: false,
      playerTurn: true,
      gameStatus: "playing",
    };
  } else {
    // Continue existing game
    gameState = JSON.parse(untrustedData.state);
  }

  if (gameState.gameStatus === "playing") {
    if (gameState.playerTurn) {
      if (untrustedData.buttonIndex === 1) {
        // Hit
        gameState.playerHand.push(drawCard(gameState.deck));
        const playerValue = calculateHandValue(gameState.playerHand);
        if (playerValue > 21) {
          gameState.gameStatus = "playerBust";
          gameState.dealerShowSecondCard = true;
        }
      } else if (untrustedData.buttonIndex === 2) {
        // Stand
        gameState.playerTurn = false;
        gameState.dealerShowSecondCard = true;
      }
    } else {
      // Dealer's turn
      while (calculateHandValue(gameState.dealerHand) < 21) {
        gameState.dealerHand.push(drawCard(gameState.deck));
      }
      const playerValue = calculateHandValue(gameState.playerHand);
      const dealerValue = calculateHandValue(gameState.dealerHand);
      if (dealerValue > 21) {
        gameState.gameStatus = "dealerBust";
      } else if (dealerValue > playerValue) {
        gameState.gameStatus = "dealerWin";
      } else if (playerValue > dealerValue) {
        gameState.gameStatus = "playerWin";
      } else {
        gameState.gameStatus = "tie";
      }
    }
  }

  function getCardImageUrl(card: Card, isHidden: boolean = false): string {
    if (isHidden) {
      return CARD_BACK_IMAGE;
    }
    const numberName = card.number === "10" ? "10" : card.number.toLowerCase();
    const suitName =
      card.suit === "♠"
        ? "spades"
        : card.suit === "♥"
        ? "hearts"
        : card.suit === "♦"
        ? "diamonds"
        : "clubs";
    return `${process.env.NEXT_PUBLIC_SITE_URL}/cards/${numberName}_of_${suitName}.png`;
  }
  const playerSum = calculateHandValue(gameState.playerHand);
  const dealerSum = gameState.dealerShowSecondCard
    ? calculateHandValue(gameState.dealerHand)
    : gameState.dealerHand[0].value;

  const searchParams = new URLSearchParams({
    title: "Blackjack",
    imgUrl,
    dealer,
    player,
    playerCards: gameState.playerHand
      .map((card) => getCardImageUrl(card))
      .join(","),
    dealerCards: gameState.dealerHand
      .map((card, index) =>
        gameState.dealerShowSecondCard || index === 0
          ? getCardImageUrl(card)
          : getCardImageUrl(card, true)
      )
      .join(","),
    playerSum: playerSum.toString(),
    dealerSum: gameState.dealerShowSecondCard
      ? dealerSum.toString()
      : gameState.dealerHand[0].value.toString(),
    gameStatus: gameState.gameStatus,
    playerTurn: gameState.playerTurn.toString(),
  });

  let buttons;
  if (gameState.gameStatus === "playing") {
    if (gameState.playerTurn) {
      buttons = [
        { label: "Hit", action: "post" },
        { label: "Stand", action: "post" },
      ];
    } else {
      buttons = [{ label: "Dealer's Turn", action: "post" }];
    }
  } else {
    buttons = [{ label: "New Game", action: "post" }];
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        { label: "Hit", action: "post" },
        { label: "Stand", action: "post" },
      ],
      image: {
        src: `${process.env.NEXT_PUBLIC_SITE_URL}/og?${searchParams}`,
      },
      postUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/game`,
      // state: frameState,
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
