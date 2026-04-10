import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/brand";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

/** Haupt-Logo: Dateiendung .png, Inhalt ist JPEG (siehe `file` am Asset). */
const LOGO_REL = "public/images/logo-eye.png";
const LOGO_MIME = "image/jpeg";

export async function createBrandOpenGraphImage() {
  const logoPath = join(process.cwd(), LOGO_REL);
  const buf = await readFile(logoPath);
  const logoSrc = `data:${LOGO_MIME};base64,${buf.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #ede9fe 0%, #e0f2fe 55%, #f8fafc 100%)",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 48,
            padding: "48px 56px",
            borderRadius: 28,
            background: "#ffffff",
            boxShadow: "0 25px 60px rgba(15, 23, 42, 0.12)",
            maxWidth: 1080,
          }}
        >
          <img
            src={logoSrc}
            alt=""
            width={220}
            height={220}
            style={{
              objectFit: "contain",
              flexShrink: 0,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              flex: 1,
              minWidth: 0,
            }}
          >
            <span
              style={{
                fontSize: 26,
                fontWeight: 600,
                color: "#7c3aed",
                letterSpacing: "-0.02em",
              }}
            >
              {SITE_TAGLINE}
            </span>
            <span
              style={{
                fontSize: 56,
                fontWeight: 700,
                color: "#0f172a",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              {SITE_NAME}
            </span>
            <span
              style={{
                fontSize: 28,
                color: "#475569",
                lineHeight: 1.45,
                maxWidth: 640,
              }}
            >
              {SITE_DESCRIPTION}
            </span>
          </div>
        </div>
      </div>
    ),
    { width: OG_WIDTH, height: OG_HEIGHT },
  );
}
