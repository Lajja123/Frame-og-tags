import { NextRequest, NextResponse } from "next/server";
import { ImageResponse } from "@vercel/og";

// This would typically come from a database or API
const gameData = {
  playerCards: [6, 36, 28],
  dealerCards: [12, 26],
  playerScore: 18,
  dealerScore: 10,
  result: 0,
};

function getCardImageUrl(cardNumber: number): string {
  const suits = ["spades", "hearts", "diamonds", "clubs"];
  const numbers = [
    "ace",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "jack",
    "queen",
    "king",
  ];
  const suitIndex = Math.floor(cardNumber / 13);
  const numberIndex = cardNumber % 13;
  return `${process.env.NEXT_PUBLIC_SITE_URL}/cards/${numbers[numberIndex]}_of_${suits[suitIndex]}.png`;
}

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const imgUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/Background.png`;
  const dealer = `${process.env.NEXT_PUBLIC_SITE_URL}/dealer.png`;
  const player = `${process.env.NEXT_PUBLIC_SITE_URL}/player.png`;

  const playerImages = gameData.playerCards.map((card) =>
    getCardImageUrl(card)
  );
  const dealerImages = gameData.dealerCards.map((card) =>
    getCardImageUrl(card)
  );

  const resultText = ["playing", "playerWin", "dealerWin", "tie"][
    gameData.result
  ];

  const imageResponse = new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: "#121212",
        }}
      >
        <img
          /*@ts-ignore*/
          src={imgUrl}
          style={{
            position: "absolute",
            zIndex: -1,
          }}
          alt="background"
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            {dealerImages.map((src, index) => (
              <img
                key={index}
                src={src}
                width={100} // Set your card width here
                height={150} // Set your card height here
                alt={`Dealer card ${index + 1}`}
              />
            ))}
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
            <img src={dealer} alt="dealer" />{" "}
            {/* Set your dealer image path here */}
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
                  backgroundColor: "#EB00FF",
                  fontFamily: "Space Mono",
                  color: "white",
                  padding: "5px",
                }}
              >
                Dealer
              </div>
              <div
                style={{
                  backgroundColor: "black",
                  fontFamily: "Space Mono",
                  color: "#A2F9FF",
                  padding: "10px 35px",
                  fontSize: "1.2rem",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                {gameData.dealerScore}
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            {playerImages.map((src, index) => (
              <img
                key={index}
                src={src}
                width={100} // Set your card width here
                height={150} // Set your card height here
                alt={`Player card ${index + 1}`}
              />
            ))}
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
            <img src={player} alt="player" />{" "}
            {/* Set your player image path here */}
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
                Player
              </div>
              <div
                style={{
                  backgroundColor: "black",
                  fontFamily: "Space Mono",
                  color: "#FCFF55",
                  padding: "10px 35px",
                  fontSize: "1.2rem",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                {gameData.playerScore}
              </div>
            </div>
          </div>
        </div>
        {resultText !== "playing" && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            <div
              style={{
                fontSize: 64,
                fontWeight: 700,
                color: resultText.includes("Win") ? "#00FF00" : "#FF0000",
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              {resultText === "playerWin"
                ? "You win!"
                : resultText === "dealerWin"
                ? "Dealer wins!"
                : resultText === "tie"
                ? "It's a tie!"
                : ""}
            </div>
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );

  return new NextResponse(imageResponse.body, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
