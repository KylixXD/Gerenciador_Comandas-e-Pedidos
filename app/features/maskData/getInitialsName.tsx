export function getInitialsName(name?: string | null) {
  if (!name) return "—";

  const parts = name.trim().split(" ").filter(Boolean);

  const initials = parts.map(p => p[0].toUpperCase()).join("");

  return initials;
}
