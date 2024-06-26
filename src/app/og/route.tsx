import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const CARD_WIDTH = 120;
    const CARD_HEIGHT = 160;
    const imgUrl = searchParams.get("imgUrl") || "";
    const dealer = searchParams.get("dealer") || "";
    const player = searchParams.get("player") || "";
    const playerCards = (searchParams.get("playerCards") || "").split(",");
    const dealerCards = (searchParams.get("dealerCards") || "").split(",");
    const playerSum = searchParams.get("playerSum") || "";
    const dealerSum = searchParams.get("dealerSum") || "";
    const gameStatus = searchParams.get("gameStatus") || "";

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            backgroundColor: "#121212" /* Dark background for contrast */,
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
              {dealerCards.map((cardUrl, index) => (
                <img
                  key={index}
                  src={cardUrl}
                  width={CARD_WIDTH}
                  height={CARD_HEIGHT}
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
              <img src={dealer} alt="dealer" />
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
                  {dealerSum}
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
              {playerCards.map((cardUrl, index) => (
                <img
                  key={index}
                  src={cardUrl}
                  width={CARD_WIDTH}
                  height={CARD_HEIGHT}
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
              <img src={player} alt="dealer" />
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
                  {playerSum}
                </div>
              </div>
            </div>
          </div>
          {gameStatus !== "playing" && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black overlay
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10, // Ensure it's above other elements
              }}
            >
              <div
                style={{
                  fontSize: 64,
                  fontWeight: 700,
                  color: gameStatus.includes("Win") ? "#00FF00" : "#FF0000", // Bright green for win, red for lose
                  textShadow: "2px 2px 4px rgba(0,0,0,0.5)", // Add a shadow for better visibility
                }}
              >
                {gameStatus === "playerBust"
                  ? "Bust! You lose!"
                  : gameStatus === "dealerBust"
                  ? "Dealer busts! You win!"
                  : gameStatus === "playerWin"
                  ? "You win!"
                  : gameStatus === "dealerWin"
                  ? "Dealer wins!"
                  : "It's a tie!"}
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
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
