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
    const backgroundImageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/FrontBg.png`;
    const logo = `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`;
    const win1 = `${process.env.NEXT_PUBLIC_SITE_URL}/win1.png`;
    const win2 = `${process.env.NEXT_PUBLIC_SITE_URL}/win2.png`;
    const win3 = `${process.env.NEXT_PUBLIC_SITE_URL}/win3.png`;
 

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

          <img src={logo} 
          style={{
             
              width: "120px",
              height: "50px",
              
            }}/>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
             
            }}
          >
          
          <img src={win2} style={{width:"150px", height:"180px"}}/>
          <img src={win1} style={{width:"150px", height:"200px"}}/>
          <img src={win3} style={{width:"150px", height:"150px"}}/>
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
