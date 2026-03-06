export type BookStatus = "live" | "coming_soon";

export type Book = {
  slug: string;
  title: string;
  coverSrc?: string;
  status?: BookStatus;
  year?: string;
};

export const BOOKS: Book[] = [
  {
    slug: "the-river-in-the-sea-the-voyage-of-mansa-muhammad",
    title: "The River in the Sea: The Voyage of Mansa Muhammad",
    status: "coming_soon",
  },
  {
    slug: "america-a-nation-built-by-immigrants",
    title: "America: A Nation Built by Immigrants",
    status: "coming_soon",
  },
  {
    slug: "black-caesar-the-adventures-of-blackbeard",
    title: "Black Caesar: The Adventures of Blackbeard",
    status: "coming_soon",
  },
  {
    slug: "black-american-history-economic",
    title: "Black American History Economic",
    status: "coming_soon",
  },
  {
    slug: "dinner-with-jay-z-and-warren-buffett",
    title: "Dinner With Jay-Z & Warren Buffett",
    status: "coming_soon",
  },
  {
    slug: "dorian-vaughn-vaudeville-villain",
    title: "Dorian Vaughn: Vaudeville Villain",
    status: "coming_soon",
  },
  {
    slug: "dorian-vaughn-venomous-villain",
    title: "Dorian Vaughn: Venomous Villain",
    status: "coming_soon",
  },
  {
    slug: "dorian-vaughn-vale-take-me-to-your-leader",
    title: "Dorian Vaughn Vale: Take Me to Your Leader",
    status: "coming_soon",
  },
  {
    slug: "dr-daniel-dorian-vale-operation-special-herbs",
    title: "Dr Daniel Dorian Vale: Operation Special Herbs",
    status: "coming_soon",
  },
  {
    slug: "dr-daniel-dorian-vale-iron-fingers",
    title: "Dr Daniel Dorian Vale: Iron Fingers",
    status: "coming_soon",
  },
  {
    slug: "dr-daniel-dorian-vale-madvillainy",
    title: "Dr Daniel Dorian Vale: Madvillainy",
    status: "coming_soon",
  },
  {
    slug: "dr-daniel-dorian-vale-operation-vail",
    title: "Dr Daniel Dorian Vale: Operation Vail",
    status: "coming_soon",
  },
  {
    slug: "dr-daniel-dorian-vale-rap-sorcery",
    title: "Dr Daniel Dorian Vale: Rap Sorcery",
    status: "coming_soon",
  },
  {
    slug: "dr-daniel-dorian-vale-take-me-to-your-leader-ii",
    title: "Dr Daniel Dorian Vale: Take Me To Your Leader II",
    status: "coming_soon",
  },
  {
    slug: "dr-daniel-dorian-vale-operation-food",
    title: "Dr Daniel Dorian Vale: Operation Food",
    status: "coming_soon",
  },
  {
    slug: "dr-daniel-darius-vale-food",
    title: "Dr Daniel Darius Vale: Food",
    status: "coming_soon",
  },
  {
    slug: "dr-daniel-darius-vale-operation-doomsday",
    title: "Dr Daniel Darius Vale: Operation Doomsday",
    status: "coming_soon",
  },
  {
    slug: "founder-glenn-by-elias-marlowe",
    title: "Founder Glenn (By Elias Marlowe)",
    status: "coming_soon",
  },
  {
    slug: "how-to-become-a-mogul-while-falling-in-love-founder-edition",
    title: "How to Become a Mogul While Falling in Love — Founder Edition",
    status: "coming_soon",
  },
  {
    slug: "i-just-called-to-say-i-love-you-60-days-of-distance",
    title: "I Just Called to Say I Love You: 60 Days of Distance",
    status: "coming_soon",
  },
  {
    slug: "juice",
    title: "Juice",
    status: "coming_soon",
  },
  {
    slug: "legacy-talk-the-unsent-letters",
    title: "Legacy Talk: The Unsent Letters",
    status: "coming_soon",
  },
  {
    slug: "maynard-eaton-program-revised-program-2",
    title: "Maynard Eaton Program (Revised Program 2)",
    status: "coming_soon",
  },
  {
    slug: "nation-inside-a-nation-the-empire-signs-back",
    title: "Nation Inside a Nation: The Empire Signs Back",
    status: "coming_soon",
  },
  {
    slug: "new-atlantis",
    title: "New Atlantis",
    status: "coming_soon",
  },
  {
    slug: "sacrilegious-faith-is-fashion",
    title: "Sacrilegious: Faith Is Fashion",
    status: "coming_soon",
  },
  {
    slug: "sign-here-the-blueprint-decoded-founder-edition",
    title: "Sign Here: The Blueprint Decoded — Founder Edition",
    status: "coming_soon",
  },
  {
    slug: "supreme-dictionary",
    title: "Supreme Dictionary",
    status: "coming_soon",
  },
  {
    slug: "the-prince",
    title: "The Prince",
    status: "coming_soon",
  },
  {
    slug: "the-64-laws-of-black-power",
    title: "The 64 Laws of Black Power",
    status: "coming_soon",
  },
  {
    slug: "the-book-of-glenn-legacy-talk-the-unsent-letters",
    title: "The Book of Glenn: Legacy Talk — The Unsent Letters",
    status: "coming_soon",
  },
  {
    slug: "the-book-of-gravity-the-120-lessons",
    title: "The Book of Gravity: The 120 Lessons",
    status: "coming_soon",
  },
  {
    slug: "the-book-of-water-and-aura-mastery",
    title: "The Book of Water & Aura Mastery",
    status: "coming_soon",
  },
  {
    slug: "the-capstone-essays",
    title: "The Capstone Essays",
    status: "coming_soon",
  },
  {
    slug: "the-chinese-rule-that-builds-wealth",
    title: "The Chinese Rule That Builds Wealth",
    status: "coming_soon",
  },
  {
    slug: "the-family-before-the-flag",
    title: "The Family Before the Flag",
    status: "coming_soon",
  },
  {
    slug: "the-kings-mirage-64-squares-of-sovereign-geometry",
    title: "The King’s Mirage: 64 Squares of Sovereign Geometry",
    status: "coming_soon",
  },
  {
    slug: "the-solomon-code",
    title: "The Solomon Code",
    status: "coming_soon",
  },
  {
    slug: "the-unit",
    title: "The Unit",
    status: "coming_soon",
  },
  {
    slug: "the-advantages-of-crackman",
    title: "The Advantages of Crackman",
    status: "coming_soon",
  },
  {
    slug: "ultraman",
    title: "Ultraman",
    status: "coming_soon",
  },
  {
    slug: "unified-cannon-field-theory",
    title: "Unified Cannon Field Theory",
    status: "coming_soon",
  },
  {
    slug: "universal-operability-180-the-turnaround-essay",
    title: "Universal Operability: 180 The Turnaround Essay",
    status: "coming_soon",
  },
  {
    slug: "faith-is-fashion",
    title: "Faith Is Fashion",
    status: "coming_soon",
  },
];
