export type PublicCard = {
  id: string;
  name: string;
  setName: string;
  collectorNumber: string;
  condition: string;
  finish: string;
  priceClp: number;
  imageUrl: string;
};

export type PublicProfile = {
  username: string;
  displayName: string;
  bio: string;
  location: string;
  memberSince: string;
  contactEmail: string;
  cards: PublicCard[];
};

const profiles: Record<string, PublicProfile> = {
  erwin: {
    username: "erwin",
    displayName: "Erwin",
    bio: "Coleccionista de cartas clásicas. Precios en CLP y retiro o envío por conversar.",
    location: "Santiago, Chile",
    memberSince: "2026",
    contactEmail: "coleccionista@example.com",
    cards: [
      {
        id: "base1-4",
        name: "Charizard",
        setName: "Base Set",
        collectorNumber: "4/102",
        condition: "Casi nueva",
        finish: "Holo",
        priceClp: 95000,
        imageUrl: "https://assets.tcgdex.net/en/base/base1/4/high.png",
      },
      {
        id: "base1-58",
        name: "Pikachu",
        setName: "Base Set",
        collectorNumber: "58/102",
        condition: "Excelente",
        finish: "Normal",
        priceClp: 12000,
        imageUrl: "https://assets.tcgdex.net/en/base/base1/58/high.png",
      },
      {
        id: "base1-2",
        name: "Blastoise",
        setName: "Base Set",
        collectorNumber: "2/102",
        condition: "Excelente",
        finish: "Holo",
        priceClp: 42000,
        imageUrl: "https://assets.tcgdex.net/en/base/base1/2/high.png",
      },
      {
        id: "base1-15",
        name: "Venusaur",
        setName: "Base Set",
        collectorNumber: "15/102",
        condition: "Jugada",
        finish: "Holo",
        priceClp: 28000,
        imageUrl: "https://assets.tcgdex.net/en/base/base1/15/high.png",
      },
      {
        id: "base1-10",
        name: "Mewtwo",
        setName: "Base Set",
        collectorNumber: "10/102",
        condition: "Casi nueva",
        finish: "Holo",
        priceClp: 35000,
        imageUrl: "https://assets.tcgdex.net/en/base/base1/10/high.png",
      },
      {
        id: "base1-16",
        name: "Zapdos",
        setName: "Base Set",
        collectorNumber: "16/102",
        condition: "Excelente",
        finish: "Holo",
        priceClp: 24000,
        imageUrl: "https://assets.tcgdex.net/en/base/base1/16/high.png",
      },
      {
        id: "base1-7",
        name: "Hitmonchan",
        setName: "Base Set",
        collectorNumber: "7/102",
        condition: "Jugada",
        finish: "Holo",
        priceClp: 9500,
        imageUrl: "https://assets.tcgdex.net/en/base/base1/7/high.png",
      },
      {
        id: "base1-8",
        name: "Machamp",
        setName: "Base Set",
        collectorNumber: "8/102",
        condition: "Excelente",
        finish: "Holo",
        priceClp: 11000,
        imageUrl: "https://assets.tcgdex.net/en/base/base1/8/high.png",
      },
    ],
  },
};

export function getPublicProfile(username: string): PublicProfile | null {
  return profiles[username.toLowerCase()] ?? null;
}
