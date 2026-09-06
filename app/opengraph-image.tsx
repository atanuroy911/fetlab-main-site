import { ImageResponse } from "next/og";
import { siteDescription } from "@/lib/site";

export const alt = "FETLAB — Future & Emerging Technology Laboratory";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c1414",
          padding: "80px",
          color: "#f2f7f7",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "linear-gradient(100deg, #2fb3ab 15%, #4f7fe0 85%)",
            }}
          />
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-0.01em" }}>FETLAB</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: 900,
            }}
          >
            Future &amp; Emerging Technology Laboratory
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.4, color: "#9fb3b3", maxWidth: 880 }}>
            {siteDescription}
          </div>
        </div>

        <div
          style={{
            height: 6,
            width: "100%",
            borderRadius: 3,
            background: "linear-gradient(100deg, #2fb3ab 15%, #4f7fe0 85%)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
