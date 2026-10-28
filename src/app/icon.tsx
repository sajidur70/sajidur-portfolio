import { ImageResponse } from "next/og";
import { personal } from "@/data/portfolio";

// Browser tab icon (favicon). Next.js draws this as a PNG at build time.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// "Sajidur Rahman" → "SR"
const initials = personal.name
  .split(" ")
  .map((word) => word[0])
  .join("");

export default function Icon() {
  return new ImageResponse(
    // ImageResponse only understands inline styles (no Tailwind classes)
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #06b6d4, #2563eb)", // cyan → blue
        borderRadius: 8,
        color: "white",
        fontSize: 16,
        fontWeight: 700,
        letterSpacing: -1,
      }}
    >
      {initials}
    </div>,
    { ...size },
  );
}
