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

type ProfileRow = {
  id: string;
  username: string;
  display_name: string;
  bio: string;
  location: string;
  contact_email: string;
  created_at: string;
};

type CardRow = {
  id: string;
  name: string;
  set_name: string;
  collector_number: string;
  condition: string;
  finish: string;
  price_clp: number;
  image_url: string;
};

async function supabaseRequest<T>(
  table: "profiles" | "cards",
  query: Record<string, string>,
): Promise<T[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!baseUrl || !anonKey) {
    throw new Error("Faltan NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  const url = new URL(`${baseUrl.replace(/\/$/, "")}/rest/v1/${table}`);
  for (const [key, value] of Object.entries(query)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url, {
    headers: { apikey: anonKey },
  });

  if (!response.ok) {
    throw new Error(`Supabase respondió ${response.status} al consultar ${table}`);
  }

  return response.json() as Promise<T[]>;
}

export async function getPublicProfile(username: string): Promise<PublicProfile | null> {
  const normalizedUsername = username.toLowerCase();
  const profiles = await supabaseRequest<ProfileRow>("profiles", {
    username: `eq.${normalizedUsername}`,
    select: "id,username,display_name,bio,location,contact_email,created_at",
    limit: "1",
  });
  const profile = profiles[0];

  if (!profile) {
    return null;
  }

  const cards = await supabaseRequest<CardRow>("cards", {
    user_id: `eq.${profile.id}`,
    status: "eq.available",
    select: "id,name,set_name,collector_number,condition,finish,price_clp,image_url",
    order: "created_at.desc",
  });

  return {
    username: profile.username,
    displayName: profile.display_name,
    bio: profile.bio,
    location: profile.location,
    memberSince: new Date(profile.created_at).getUTCFullYear().toString(),
    contactEmail: profile.contact_email,
    cards: cards.map((card) => ({
      id: card.id,
      name: card.name,
      setName: card.set_name,
      collectorNumber: card.collector_number,
      condition: card.condition,
      finish: card.finish,
      priceClp: card.price_clp,
      imageUrl: card.image_url,
    })),
  };
}
