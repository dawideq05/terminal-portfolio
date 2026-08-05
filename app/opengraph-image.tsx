import { ImageResponse } from "next/og";

export const alt = "Dawid Kubiak - AI Automation & Data Analyst";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          color: "#e7f6fb",
          background: "linear-gradient(135deg, #04111f 0%, #091a2a 55%, #0c3142 100%)",
          fontFamily: "monospace"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", color: "#4be4ef", fontSize: 28 }}>
          <span>portfolio@dawid:~$</span>
          <span style={{ marginLeft: 14, opacity: 0.72 }}>_</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 80, fontWeight: 700, letterSpacing: -5 }}>Dawid Kubiak</div>
          <div style={{ marginTop: 24, color: "#4be4ef", fontSize: 34 }}>AI Automation &amp; Data Analyst</div>
          <div style={{ marginTop: 20, color: "#90aab5", fontSize: 24 }}>Baszkow (Warta), Poland</div>
        </div>
        <div style={{ display: "flex", color: "#90aab5", fontSize: 22 }}>
          <span>AI automation</span><span style={{ margin: "0 16px", color: "#4be4ef" }}>·</span><span>Data analysis</span><span style={{ margin: "0 16px", color: "#4be4ef" }}>·</span><span>Banking technology</span>
        </div>
      </div>
    ),
    size
  );
}
