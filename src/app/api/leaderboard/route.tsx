import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

// This type definition should match your actual leaderboard data structure
type LeaderboardEntry = {
  rank: number;
  name: string;
  gamesPlayed: number;
  wins: number;
};

// Mock leaderboard data - replace this with actual data fetching logic
const getLeaderboardData = async (): Promise<LeaderboardEntry[]> => [
  { rank: 1, name: "Player1", gamesPlayed: 50, wins: 30 },
  { rank: 2, name: "Player2", gamesPlayed: 45, wins: 25 },
  { rank: 3, name: "Player3", gamesPlayed: 40, wins: 20 },
  { rank: 4, name: "Player4", gamesPlayed: 35, wins: 15 },
  { rank: 5, name: "Player5", gamesPlayed: 30, wins: 10 },
];

export async function GET(request: NextRequest) {
  try {
    const leaderboardData = await getLeaderboardData();
    const backgroundImageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/Background.svg`;

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
            backgroundColor: "#121212",
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

          {/* Title */}
          <h1 style={{ fontSize: 48, marginBottom: 20, color: "#ffd700" }}>
            BlackJack Leaderboard
          </h1>

          {/* Leaderboard Table */}
          <table
            style={{
              width: "80%",
              borderCollapse: "separate",
              borderSpacing: "0 10px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "rgba(22, 33, 62, 0.8)" }}>
                {["Rank", "Player", "Games", "Wins"].map((header) => (
                  <th
                    key={header}
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      color: "#ffd700",
                      fontSize: 24,
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry, index) => (
                <tr
                  key={entry.rank}
                  style={{
                    backgroundColor:
                      index % 2 === 0
                        ? "rgba(15, 52, 96, 0.8)"
                        : "rgba(26, 26, 46, 0.8)",
                  }}
                >
                  <td style={{ padding: "12px", fontSize: 20 }}>
                    {entry.rank}
                  </td>
                  <td style={{ padding: "12px", fontSize: 20 }}>
                    {entry.name}
                  </td>
                  <td style={{ padding: "12px", fontSize: 20 }}>
                    {entry.gamesPlayed}
                  </td>
                  <td style={{ padding: "12px", fontSize: 20 }}>
                    {entry.wins}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Instructions */}
          <p style={{ fontSize: 24, marginTop: 20, textAlign: "center" }}>
            Press "Start Game" to play!
          </p>
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
