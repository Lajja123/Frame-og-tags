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
    const backgroundImageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/FrontBg.png`;
    const logo = `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`;
    const win1 = `${process.env.NEXT_PUBLIC_SITE_URL}/win1.png`;
    const win2 = `${process.env.NEXT_PUBLIC_SITE_URL}/win2.png`;
    const win3 = `${process.env.NEXT_PUBLIC_SITE_URL}/Rank.png`;
    const p1 = `${process.env.NEXT_PUBLIC_SITE_URL}/p1.png`;
    const p2 = `${process.env.NEXT_PUBLIC_SITE_URL}/p2.png`;
    const p3 = `${process.env.NEXT_PUBLIC_SITE_URL}/p3.png`;
    const top1 = `${process.env.NEXT_PUBLIC_SITE_URL}/top1.png`;
    const top2 = `${process.env.NEXT_PUBLIC_SITE_URL}/top2.png`;
    const top3 = `${process.env.NEXT_PUBLIC_SITE_URL}/top3.png`;
    const fire = `${process.env.NEXT_PUBLIC_SITE_URL}/fire.png`;
    const vector = `${process.env.NEXT_PUBLIC_SITE_URL}/vector.png`;
    const stats = `${process.env.NEXT_PUBLIC_SITE_URL}/stats.png`;
    const rank = `${process.env.NEXT_PUBLIC_SITE_URL}/Trophy.png`;

    // Base64-encoded Space Mono font

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
            <div
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
                <img src={rank} style={{ width: "20px" }} />
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
              }}
            >
              <div style={{ fontSize: "1.5rem" }}>Games played</div>
              <div style={{ fontSize: "1.5rem" }}>Game ratio</div>
              <div style={{ fontSize: "1.5rem" }}>Game streek</div>
            </div>
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
