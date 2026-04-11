# Vercel: Stripe & Profil-Link (Schritt für Schritt)

Diese Anleitung richtet **Production** auf Vercel so ein, dass:

1. **Stripe Checkout** echte Zahlungen (oder Testkarten) abwickelt.
2. Die **Success-Seite** den **persönlichen Profil-Link** ausstellt (signiert; optional eigenes `PROFILE_ACCESS_SECRET`, sonst Ableitung aus `STRIPE_SECRET_KEY`) + gültige Stripe-Session.

---

## 1. Stripe-Account und API-Keys

1. Öffne [dashboard.stripe.com](https://dashboard.stripe.com) und melde dich an (oder registriere dich).
2. Oben links **Testmodus** aktivieren (Schalter „Test mode“), solange du noch entwickelst.
3. Gehe zu **Developers → API keys**.
4. Kopiere den **Secret key** (`sk_test_…` im Testmodus).

Du brauchst diesen Key als `STRIPE_SECRET_KEY` auf Vercel (siehe Abschnitt 4).

---

## 2. Profil-Link Secret (optional, empfohlen)

Der Link nach dem Kauf wird serverseitig **signiert**.

- **Minimum auf Vercel:** Es reicht **`STRIPE_SECRET_KEY`**. Ohne `PROFILE_ACCESS_SECRET` wird ein stabiler Schlüssel aus dem Stripe-Serverkey abgeleitet – der Profil-Link wird trotzdem erstellt.
- **Empfohlen für mehr Kontrolle:** eigenes Secret:

```bash
openssl rand -hex 32
```

Als `PROFILE_ACCESS_SECRET` in Vercel eintragen (überschreibt die Ableitung).

**Wichtig:** Niemals committen; nur in Vercel (und lokal in `.env.local`) eintragen.

---

## 3. Umgebungsvariablen auf Vercel eintragen

1. Öffne dein Projekt auf [vercel.com](https://vercel.com) → **Settings** → **Environment Variables**.
2. Für **Production** (und optional **Preview** / **Development**) folgende Variablen anlegen:

| Name | Wert | Hinweis |
|------|------|---------|
| `STRIPE_SECRET_KEY` | `sk_test_…` oder `sk_live_…` | **Pflicht** für Checkout; reicht auch, damit der Profil-Link erzeugt wird (Fallback-Signatur). |
| `PROFILE_ACCESS_SECRET` | z. B. `openssl rand -hex 32` | **Optional** – empfohlen, wenn du die Signatur unabhängig von Stripe rotieren willst. |
| `STRIPE_WEBHOOK_SECRET` | `whsec_…` | Erst nötig, wenn du Webhooks nutzt (Abschnitt 5); sonst optional |

Optional:

| Name | Wert |
|------|------|
| `NEXT_PUBLIC_SITE_URL` | `https://deine-domain.de` | Stabilisiert Links, wenn die automatische Vercel-URL nicht reicht (z. B. Preview mit fester Domain) |

3. **Save** – danach einmal **neu deployen** (Deployments → … → Redeploy), damit die Variablen aktiv werden.

---

## 4. Deployment testen (Checkout → Success)

1. Öffne deine **Production-URL** (oder Preview mit gesetzten Keys).
2. Starte einen Kauf (z. B. Vollprofil über das Tool → Checkout).
3. Im **Stripe Testmodus** kannst du mit Testkarte zahlen, z. B.:
   - Nummer: `4242 4242 4242 4242`
   - Beliebiges zukünftiges Ablaufdatum, beliebige CVC
4. Nach Erfolg landest du auf `/success?session_id=…&productId=…`.
5. Es sollte der **persönliche Profil-Link** erscheinen – nicht die Fehlermeldung zur fehlenden Konfiguration.

Wenn die Fehlermeldung „Persönlicher Link nicht verfügbar“ kommt:

- **`STRIPE_SECRET_KEY`** in Production gesetzt und **Redeploy**? (Ohne Stripe-Key gibt es weder zuverlässigen Checkout noch Fallback-Signatur.)
- Success-URL enthält **`session_id`**? (Kommt von Stripe nach echtem Checkout; ohne Stripe-Stub nicht mehr genutzt.)
- Du hast **`PROFILE_ACCESS_SECRET`** nachträglich geändert? Dann sind alte `unlock`-Links ungültig – Nutzer brauchen einen neuen Link von einer neuen Bestellung.

---

## 5. Webhook (optional, empfohlen für spätere Automatisierung)

Die App hat den Endpoint: **`/api/stripe/webhook`**.

1. Stripe Dashboard → **Developers → Webhooks** → **Add endpoint**.
2. **Endpoint URL:** `https://deine-domain.de/api/stripe/webhook`
3. **Events:** mindestens `checkout.session.completed`.
4. Nach dem Anlegen den **Signing secret** (`whsec_…`) kopieren und in Vercel als `STRIPE_WEBHOOK_SECRET` speichern, dann erneut deployen.

Lokal testen:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Der Befehl zeigt ein **Webhook signing secret** – nur für lokale Weiterleitung.

---

## 6. Livegang (echtes Geld)

1. In Stripe **Live mode** schalten und **Live**-Keys verwenden (`sk_live_…`).
2. Dieselben Variablennamen auf Vercel in **Production** mit Live-Werten setzen.
3. Webhook-Endpoint in Stripe für die **Live**-Umgebung neu anlegen und `STRIPE_WEBHOOK_SECRET` (Live) in Vercel hinterlegen.

---

## Kurz-Checkliste

- [ ] `STRIPE_SECRET_KEY` in Vercel (Production) + Redeploy
- [ ] (Optional) `PROFILE_ACCESS_SECRET` für eigenes Signing
- [ ] Testkauf: Success-Seite zeigt Profil-Link
- [ ] (Optional) Webhook + `STRIPE_WEBHOOK_SECRET`
