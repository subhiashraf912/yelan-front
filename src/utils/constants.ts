const navItems = [
  { url: "/", name: "Home" },
  { url: "/docs", name: "Docs" },
  { url: "/commands", name: "Commands" },
  { url: "/discord", name: "Discord Server" },
  { url: "/invite", name: "Invite" },
];
const isExternalUrl = (url: string) => {
  return /^https?:\/\//.test(url);
};
const utf8ToBase64 = (str: string) => {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    )
  );
};

export { navItems, isExternalUrl, utf8ToBase64 };

// data/features.ts
import { IFeature } from "@/types/IFeature";

export const features: IFeature[] = [
  {
    id: "1",
    name: "welcomer",
    displayName: "Welcomer",
    description: "Welcomes new members to your server.",
    icon: "https://cdn.discordapp.com/attachments/831105674016063508/1100107297704906873/greeting-sign-hello-symbol.png",
  },
  {
    id: "2",
    description: "Logs all messages sent in your server.",
    icon: "https://cdn.discordapp.com/attachments/831105674016063508/1100107656020103239/notebook-pencil-icon-isolated-white-background-vector-illustration_736051-693.png",
    name: "logs-system",
    displayName: "Logs System",
  },
  // ... more feature objects
];
