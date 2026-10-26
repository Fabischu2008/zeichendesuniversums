"use client";

import { useState } from "react";

export function BookEmailButton({
  sessionId,
  className,
}: {
  sessionId: string;
  className: string;
}) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function send() {
    if (state === "sending" || state === "sent") return;
    setState("sending");
    setMessage("");
    try {
      const res = await fetch("/api/book/email", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; message?: string }
        | null;
      if (!res.ok || !data?.ok) {
        setState("error");
        setMessage(data?.message || "Versand gerade nicht möglich.");
        return;
      }
      setState("sent");
    } catch {
      setState("error");
      setMessage("Versand gerade nicht möglich.");
    }
  }

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => void send()}
        disabled={state === "sending" || state === "sent"}
        className={className}
      >
        {state === "sending"
          ? "Wird gesendet …"
          : state === "sent"
            ? "Gesendet an deine Checkout-E-Mail"
            : "Per E-Mail an mich schicken"}
      </button>
      {state === "error" && message ? (
        <p className="mt-2 text-xs text-black/55">{message}</p>
      ) : null}
    </div>
  );
}
