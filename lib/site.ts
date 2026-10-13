// ── Sample / placeholder links ──────────────────────────────────────────────
// Hassan sends his real photo, Calendly link and social handles → swap them here.
export const SITE = {
  name: "Hassan Khan",
  brand: "Crypto by HK",
  role: "Crypto Trader & Mentor",
  tagline: "Master the markets. Trade with conviction.",
  // Sample booking link — replace with Hassan's real Calendly URL
  calendly: "https://calendly.com/cryptobyhk/30min",
  email: "hello@cryptobyhk.com",
  socials: [
    { key: "instagram", label: "Instagram", href: "https://instagram.com/cryptobyhk", handle: "@cryptobyhk" },
    { key: "facebook", label: "Facebook", href: "https://facebook.com/cryptobyhk", handle: "Crypto by HK" },
    { key: "tiktok", label: "TikTok", href: "https://tiktok.com/@cryptobyhk", handle: "@cryptobyhk" },
    { key: "discord", label: "Discord", href: "https://discord.gg/cryptobyhk", handle: "Join the server" },
  ],
};

export const TICKER = [
  { pair: "BTC/USDT", change: "+2.4%" },
  { pair: "ETH/USDT", change: "+3.1%" },
  { pair: "BNB/USDT", change: "+1.2%" },
  { pair: "SOL/USDT", change: "+5.8%" },
  { pair: "XRP/USDT", change: "-0.6%" },
  { pair: "DOGE/USDT", change: "+4.2%" },
  { pair: "ADA/USDT", change: "+1.9%" },
  { pair: "AVAX/USDT", change: "+2.7%" },
];

export const STATS = [
  { value: 5, suffix: "+", label: "Years in Crypto Markets" },
  { value: 1000, suffix: "+", label: "Trades Executed & Studied" },
  { value: 500, suffix: "+", label: "Traders Mentored" },
  { value: 40, suffix: "+", label: "Coins & Tokens Mastered" },
];

export const TIMELINE = [
  {
    year: "2019",
    title: "Entered the Crypto Markets",
    text: "Started with spot trading — learning charts, cycles and risk management the hard way, like everyone does at first.",
  },
  {
    year: "2021",
    title: "Full-Time Trader",
    text: "Went full-time across spot and futures. Built a rule-based system around trend, liquidity and strict risk limits.",
  },
  {
    year: "2022",
    title: "Signals & Community",
    text: "Started sharing trade ideas publicly. The Crypto by HK community grew around honest, no-hype market breakdowns.",
  },
  {
    year: "2024",
    title: "Mentorship Program",
    text: "Launched 1-on-1 mentorship — helping new traders skip years of costly mistakes with structured guidance.",
  },
];

export const SERVICES = [
  {
    icon: "🎯",
    title: "1-on-1 Mentorship Call",
    text: "A focused 30-minute video call: your trading questions answered, your strategy reviewed, your next steps mapped out.",
    cta: "Book your call",
    href: SITE.calendly,
  },
  {
    icon: "📊",
    title: "Daily Trade Signals",
    text: "High-probability setups with clear entry, stop-loss and targets — shared with full reasoning, never blind calls.",
    cta: "Join the community",
    href: "https://discord.gg/cryptobyhk",
  },
  {
    icon: "🛡",
    title: "Portfolio Review",
    text: "A complete health-check of your holdings: allocation, risk exposure and a rebalancing plan built for your goals.",
    cta: "Book your call",
    href: SITE.calendly,
  },
];
