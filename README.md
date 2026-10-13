# Crypto by HK — Hassan Khan Portfolio

Portfolio + booking landing page for **Hassan Khan**, crypto trader and mentor
(**Crypto by HK**). Dark, premium, animation-rich single-page site built with
**Next.js 16**, **React 19**, **TypeScript** and **Tailwind CSS 4**.

## ✨ Sections

- **Hero** — headline, photo placeholder, CTAs + live-style crypto ticker marquee
- **Stats** — animated counters (years, trades, mentees, coins)
- **About + Journey** — bio, skill tags and an animated experience timeline
- **Services** — 1-on-1 mentorship, trade signals, portfolio review
- **Booking** — 1-on-1 call booking via Calendly (sample link)
- **Community** — Instagram, Facebook, TikTok, Discord cards (sample links)
- **Footer** — nav + risk disclaimer

Scroll-triggered reveals, floating hero card, pulsing CTA buttons and a
pausable ticker — all CSS + IntersectionObserver, no heavy libraries.

## 🔧 Customizing

All content lives in `lib/site.ts`:

- `SITE.calendly` — replace with Hassan's real Calendly URL
- `SITE.socials` — replace with real profile links
- `STATS`, `TIMELINE`, `SERVICES` — edit freely
- Hero photo: swap the `HK` monogram block in `components/Hero.tsx` with a
  real `<Image />` once Hassan sends his photo

## 🚀 Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

Deploys to Vercel with zero configuration.
