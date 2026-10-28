import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { personal } from "@/data/portfolio";

// The preview image LinkedIn, WhatsApp, Facebook and X show when I share my link.
// Next.js draws it as a PNG at build time (1200×630 is the standard size).
export const alt = `${personal.name} | ${personal.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// A font for ImageResponse: the font file + its name, weight and style
type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 700;
  style: "normal";
};

// Load a Google Font as a .ttf file (ImageResponse can't use woff2).
// If it fails (e.g. no internet), return null → the default font is used.
async function loadGoogleFont(
  family: string,
  weight: number,
): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`;
    const css = await (await fetch(cssUrl)).text();
    const fontUrl = css.match(/src: url\((.+?)\) format\('truetype'\)/)?.[1];
    if (!fontUrl) return null;
    return await (await fetch(fontUrl)).arrayBuffer();
  } catch {
    return null;
  }
}

// Load my photo + fonts once at build time ("use cache"), so the image is static:
// no font downloads and no file reading when someone shares my link.
async function getAssets() {
  "use cache";
  // My photo from public/ as a "data URL" (the image file written as text)
  const photoFile = await readFile(
    join(process.cwd(), "public", "profile.png"),
  );
  const photo = `data:image/png;base64,${photoFile.toString("base64")}`;

  const [regular, bold] = await Promise.all([
    loadGoogleFont("Inter", 400),
    loadGoogleFont("Inter", 700),
  ]);
  return { photo, regular, bold };
}

export default async function OpengraphImage() {
  const { photo, regular, bold } = await getAssets();

  // Only add the fonts that loaded
  const fonts: OgFont[] = [];
  if (regular) fonts.push({ name: "Inter", data: regular, weight: 400, style: "normal" });
  if (bold) fonts.push({ name: "Inter", data: bold, weight: 700, style: "normal" });

  const skills = ["React", "Next.js", "Node.js", "Express", "MongoDB"];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "70px 80px",
        backgroundColor: "#020617", // slate-950, same as my dark mode
        backgroundImage:
          "radial-gradient(circle at 85% 30%, rgba(6,182,212,0.35), transparent 45%), radial-gradient(circle at 10% 100%, rgba(37,99,235,0.3), transparent 40%)",
        color: "#f1f5f9",
        fontFamily: "Inter",
      }}
    >
      {/* Left: text */}
      <div style={{ display: "flex", flexDirection: "column", width: 680 }}>
        {personal.availability && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: "flex-start",
              gap: 12,
              padding: "8px 20px",
              borderRadius: 999,
              border: "2px solid rgba(16,185,129,0.4)",
              backgroundColor: "rgba(16,185,129,0.12)",
              color: "#34d399",
              fontSize: 24,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                backgroundColor: "#10b981",
              }}
            />
            {personal.availability}
          </div>
        )}

        <div
          style={{
            marginTop: 36,
            fontSize: 76,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1.05,
          }}
        >
          {personal.name}
        </div>

        <div
          style={{
            marginTop: 14,
            fontSize: 40,
            fontWeight: 700,
            color: "#22d3ee", // cyan-400
          }}
        >
          {personal.title}
        </div>

        {/* Skill tags */}
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 36 }}
        >
          {skills.map((skill) => (
            <div
              key={skill}
              style={{
                padding: "8px 18px",
                borderRadius: 10,
                backgroundColor: "rgba(34,211,238,0.12)",
                color: "#a5f3fc",
                fontSize: 24,
              }}
            >
              {skill}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, fontSize: 26, color: "#94a3b8" }}>
          {personal.siteUrl.replace("https://", "")}
        </div>
      </div>

      {/* Right: my photo with a gradient ring */}
      <div
        style={{
          display: "flex",
          padding: 8,
          borderRadius: 999,
          backgroundImage: "linear-gradient(135deg, #22d3ee, #2563eb)",
        }}
      >
        {/* ImageResponse needs a plain <img> (next/image doesn't work here) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo}
          alt=""
          width={300}
          height={300}
          style={{ borderRadius: 999, objectFit: "cover" }}
        />
      </div>
    </div>,
    { ...size, fonts },
  );
}
