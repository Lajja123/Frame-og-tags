import { getFrameMetadata } from "@coinbase/onchainkit/frame";
import type { Metadata } from "next";

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: "Start Game",
    },
  ],
  image: {
    src: `${process.env.NEXT_PUBLIC_SITE_URL}/api/leaderboard`,
  },

  postUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/game`,
});

export const metadata: Metadata = {
  title: "BlackJack Game",
  description: "Gaming site",
  openGraph: {
    title: "BlackJack Game",
    description: "Gaming site",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/Background.svg`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>Advanced Frame</h1>
    </>
  );
}
