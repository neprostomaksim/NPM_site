import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/workshops/config";
import { workshop } from "./_content/content";

// Картинка для превью ссылки (Telegram, соцсети, мессенджеры): 1200×630.
// Шрифт — локальный Montserrat с кириллицей (дефолтный шрифт next/og её не содержит).

export const alt = "ИИ-агенты для руководителя — воркшоп Максима Леонова в Минске";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const [medium, black] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/Montserrat-500.ttf")),
    readFile(join(process.cwd(), "assets/fonts/Montserrat-800.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "radial-gradient(circle at 85% 15%, rgba(198,244,50,0.22), transparent 45%), #0B0C0E",
          color: "#F2F4F5",
          fontFamily: "Montserrat",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, fontWeight: 500, color: "#C6F432" }}>
          <div style={{ display: "flex", padding: "6px 14px", borderRadius: 10, background: "#C6F432", color: "#0B0C0E", fontWeight: 800 }}>/ai</div>
          Воркшоп · {site.city}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3 }}>ИИ-агенты</div>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3, color: "#C6F432" }}>для руководителя</div>
          <div style={{ marginTop: 28, fontSize: 32, fontWeight: 500, color: "rgba(242,244,245,0.72)" }}>{workshop.tagline}</div>
        </div>
        <div style={{ display: "flex", gap: 22, fontSize: 30, fontWeight: 800 }}>
          <div style={{ display: "flex", padding: "14px 26px", borderRadius: 14, border: "2px solid rgba(255,255,255,0.16)" }}>{workshop.date}, {workshop.time.split("–")[0]}</div>
          <div style={{ display: "flex", padding: "14px 26px", borderRadius: 14, border: "2px solid rgba(255,255,255,0.16)" }}>3 часа практики</div>
          <div style={{ display: "flex", padding: "14px 26px", borderRadius: 14, background: "#C6F432", color: "#0B0C0E" }}>{site.price}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Montserrat", data: medium, style: "normal", weight: 500 },
        { name: "Montserrat", data: black, style: "normal", weight: 800 },
      ],
    }
  );
}
