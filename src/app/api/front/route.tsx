import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

    // Dynamic data in JSON format
    const leaderboardData = {
      background: `${baseUrl}/FrontBg.png`,
      logo: `${baseUrl}/logo.png`,
      winners: [
        {
          rank: 2,
          name: "Player 2",
          avatar: `${baseUrl}/p2.png`,
          trophy: `${baseUrl}/top1.png`,
          podium: `${baseUrl}/win2.png`,
        },
        {
          rank: 1,
          name: "Player 1",
          avatar: `${baseUrl}/p1.png`,
          trophy: `${baseUrl}/top2.png`,
          podium: `${baseUrl}/win1.png`,
        },
        {
          rank: 3,
          name: "Player 3",
          avatar: `${baseUrl}/p3.png`,
          trophy: `${baseUrl}/top3.png`,
          podium: `${baseUrl}/Rank.png`,
        },
      ],
    };

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "red",
            color: "white",
          }}
        >
          {/* Background Image */}
          <img
            src={leaderboardData.background}
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
            src={leaderboardData.logo}
            style={{
              width: "120px",
              height: "50px",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              border: "3px solid white",
              background: "transparent",
              backdropFilter: "blur(50px)",
              borderRadius: "30px",
              marginBottom: "0",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "50px",
              padding: "80px 50px 0px 50px ",
            }}
          >
            {leaderboardData.winners.map((winner, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "10px auto",
                  }}
                >
                  <img
                    src={winner.trophy}
                    style={{ width: winner.rank === 1 ? "50px" : "40px" }}
                  />
                  <img
                    src={winner.avatar}
                    style={{ width: winner.rank === 1 ? "100px" : "80px" }}
                  />
                  <div
                    style={{
                      fontSize: "2rem",
                      fontFamily: winner.rank === 1 ? "Space Mono" : "inherit",
                    }}
                  >
                    {winner.name}
                  </div>
                </div>
                <img
                  src={winner.podium}
                  style={{ width: winner.rank === 1 ? "350px" : "250px" }}
                />
              </div>
            ))}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error(`Failed to generate the leaderboard image: ${e.message}`);
    return new Response(`Failed to generate the leaderboard image`, {
      status: 500,
    });
  }
}
