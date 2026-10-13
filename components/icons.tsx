import type { JSX } from "react";

type IconProps = { className?: string };

export function InstagramIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="2.8" y="2.8" width="18.4" height="18.4" rx="5.2" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.5 21.5v-7.2h2.5l.45-3h-2.95V9.35c0-.87.3-1.46 1.6-1.46h1.35V5.2c-.6-.08-1.35-.17-2.15-.17-2.13 0-3.6 1.3-3.6 3.7v2.57H8.2v3h2.5v7.2a10 10 0 0 0 2.8 0z" />
    </svg>
  );
}

export function TikTokIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className}>
      <path d="M14.5 4v10.8" strokeLinecap="round" />
      <path
        d="M14.5 4.5c.4 2.6 2.2 4.3 4.8 4.6"
        strokeLinecap="round"
      />
      <circle cx="10.6" cy="17.4" r="3.9" />
    </svg>
  );
}

export function DiscordIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.6 5.3A16.4 16.4 0 0 0 14.5 4l-.5 1a14.8 14.8 0 0 0-4 0L9.5 4a16.4 16.4 0 0 0-4.1 1.3C3 9.5 2.4 13.6 2.7 17.7c1.5 1.1 3 1.8 4.4 2.2l.7-1.2a12 12 0 0 1-1.9-.9l.5-.3a11.7 11.7 0 0 0 10 0l.5.3c-.6.4-1.2.7-1.9.9l.7 1.2c1.4-.4 2.9-1.1 4.4-2.2.4-4.7-.7-8.7-2.5-12.4zM9.7 14.9c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8zm4.6 0c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8z" />
    </svg>
  );
}

export const SOCIAL_ICONS: Record<string, (p: IconProps) => JSX.Element> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  tiktok: TikTokIcon,
  discord: DiscordIcon,
};
