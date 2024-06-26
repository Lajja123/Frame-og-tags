import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

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
            <div
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
                <img src={top1} style={{ width: "40px" }} />
                <img src={p2} style={{ width: "80px" }} />
                <div style={{ fontSize: "2rem" }}>Hello</div>
              </div>
              <img src={win2} style={{ width: "250px" }} />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",

                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img src={top2} style={{ width: "50px" }} />
                <img src={p1} style={{ width: "100px" }} />
                <div style={{ fontSize: "2rem", fontFamily: "Space Mono" }}>
                  Hello
                </div>
              </div>
              <img src={win1} style={{ width: "350px" }} />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img src={top3} style={{ width: "40px" }} />
                <img src={p3} style={{ width: "80px" }} />
                <div style={{ fontSize: "2rem" }}>Hello</div>
              </div>
              <img src={win3} style={{ width: "250px" }} />
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
