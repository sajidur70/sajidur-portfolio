import { ImageResponse } from "next/og";
import { personal } from "@/data/portfolio";

// Icon for iPhone / iPad when someone saves my site to their home screen.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// "Sajidur Rahman" → "SR"
const initials = personal.name
  .split(" ")
  .map((word) => word[0])
  .join("");

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #06b6d4, #2563eb)", // cyan → blue
        color: "white",
        fontSize: 84,
        fontWeight: 700,
        letterSpacing: -4,
      }}
    >
      {initials}
    </div>,
    { ...size },
  );
}
