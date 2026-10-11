import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const logo = `data:image/svg+xml;base64,${fs
  .readFileSync(path.join(process.cwd(), "public/brand/mhec-logo.svg"))
  .toString("base64")}`;

export function ogImage({ kicker, title }: { kicker: string; title: string }) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#ffffff", position: "relative", fontFamily: "sans-serif" }}>
        <div style={{ position: "absolute", right: -160, top: -160, width: 640, height: 640, borderRadius: 9999, border: "48px solid #50ACE4", display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} width={92} height={96} alt="" />
            <div style={{ display: "flex", flexDirection: "column", fontSize: 30, fontWeight: 700, color: "#231F20", lineHeight: 1.1 }}>
              <span>Muscat Higher</span>
              <span>Education Centre</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 860 }}>
            <span style={{ fontSize: 30, color: "#1B6FA6", fontWeight: 700 }}>{kicker}</span>
            <span style={{ fontSize: 64, color: "#231F20", fontWeight: 800, lineHeight: 1.08, marginTop: 12 }}>{title}</span>
          </div>
        </div>
        <div style={{ position: "absolute", left: 0, bottom: 0, height: 18, width: "100%", background: "#231F20", display: "flex" }} />
      </div>
    ),
    ogSize
  );
}
