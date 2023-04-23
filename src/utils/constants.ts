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
