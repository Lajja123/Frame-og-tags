import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const backgroundImageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/FrontBg.png`;
    const logo = `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`;
    const ratio = `${process.env.NEXT_PUBLIC_SITE_URL}/ratio.png`;
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
              width: "70%",
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
                <div
                  style={{
                    padding: "0px 10px",
                    letterSpacing: "1px",
                    fontSize: "1.2rem",
                  }}
                >
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
                justifyContent: "space-around",
              }}
            >
              <div style={{ fontSize: "1.5rem" }}>Games played</div>
              <div style={{ fontSize: "1.5rem" }}>Game ratio</div>
              <div style={{ fontSize: "1.5rem" }}>Game streek</div>
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                padding: "20px",
                justifyContent: "space-around",
              }}
            >
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
                      width: "20px",
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
                    src={ratio}
                    style={{
                      fontSize: "1.5rem",
                      fontFamily: "Space Mono",
                      color: "white",
                      padding: "5px",
                      width: "20px",
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
                      width: "20px",
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
