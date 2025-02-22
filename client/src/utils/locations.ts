// locations.ts
export const states = {
  "Province 1": ["Biratnagar", "Dharan", "Itahari"],
  "Madhesh": ["Janakpur", "Rajbiraj", "Siraha"],
  "Bagmati": ["Kathmandu", "Lalitpur", "Bhaktapur"],
  "Gandaki": ["Pokhara", "Besisahar", "Gorkha"],
  "Lumbini": ["Butwal", "Nepalgunj", "Tansen"],
  "Karnali": ["Surkhet", "Jumla", "Dolpa"],
  "Sudurpashchim": ["Dhangaadhi", "Mahendranagar", "Tikapur"]
} as const;

export type State = keyof typeof states;
export type City = typeof states[State][number];

export const cities: Record<State, readonly City[]> = states;