export type BookStatus = "live" | "coming_soon";
export type BookCategory = "books" | "comics" | "kits" | "essays";

export type Book = {
  slug: string;
  title: string;
  category: BookCategory;
  coverSrc?: string;
  status?: BookStatus;
  year?: string;
};

const COMIC_SLUGS = new Set<string>([
  "the-river-in-the-sea-the-voyage-of-mansa-muhammad",
  "black-caesar-the-adventures-of-blackbeard",
  "dorian-vaughn-vaudeville-villain",
  "dorian-vaughn-venomous-villain",
  "dorian-vaughn-vale-take-me-to-your-leader",
  "dr-daniel-dorian-vale-operation-special-herbs",
  "dr-daniel-dorian-vale-iron-fingers",
  "dr-daniel-dorian-vale-madvillainy",
  "dr-daniel-dorian-vale-operation-vail",
  "dr-daniel-dorian-vale-rap-sorcery",
  "dr-daniel-dorian-vale-take-me-to-your-leader-ii",
  "dr-daniel-dorian-vale-operation-food",
  "juice",
  "new-atlantis",
  "the-advantages-of-crackman",
  "ultraman",
  "ultraman-the-outliers",
]);

const ESSAY_SLUGS = new Set<string>([
  "black-american-history-economic",
  "dinner-with-jay-z-and-warren-buffett",
  "the-capstone-essays",
  "the-chinese-rule-that-builds-wealth",
  "the-family-before-the-flag",
  "the-solomon-code",
  "unified-cannon-field-theory",
  "universal-operability-180-the-turnaround-essay",
]);

const ESSAY_COVER_OVERRIDES: Record<string, string> = {
  "black-american-history-economic": "/covers/books/black-american-history-economic.png",
  "dinner-with-jay-z-and-warren-buffett": "/covers/books/dinner-with-jayz-and-warren-buffett.png",
  "the-capstone-essays": "/covers/books/the-capstone-essays.png",
  "the-chinese-rule-that-builds-wealth": "/covers/books/the-chinese-rule-that-builds-wealth.png",
  "the-family-before-the-flag": "/covers/books/the-family-before-the-flag.png",
  "the-solomon-code": "/covers/books/the-solomon-code.png",
  "unified-cannon-field-theory": "/covers/books/unified-cannon-field-theory.png",
  "universal-operability-180-the-turnaround-essay":
    "/covers/books/universal-operability-180-the-turnaround-essay.png",
};

const BOOK_COVER_OVERRIDES: Record<string, string> = {
  "america-a-nation-built-by-immigrants": "/covers/books/america-a-nation-built-by-immigrants.png",
  "black-american-history-economic": "/covers/books/black-american-history-economic.png",
  "dinner-with-jay-z-and-warren-buffett": "/covers/books/dinner-with-jayz-and-warren-buffett.png",
  "founder-glenn-by-elias-marlowe": "/covers/books/founder-glenn-by-elias-marlowe.png",
  "how-to-become-a-mogul-while-falling-in-love-founder-edition":
    "/things/Covers/How to Become a Mogul While Falling in Love.PNG",
  "i-just-called-to-say-i-love-you-60-days-of-distance":
    "/things/Covers/I Just Called to Say I Love You 60 Days of Distance.PNG",
  "legacy-talk-the-unsent-letters": "/covers/books/legacy-talk-the-unsent-letters.png",
  "nation-inside-a-nation-the-empire-signs-back": "/things/Covers/Nation Inside a Nation The Empire Signs Back .PNG",
  "sacrilegious-faith-is-fashion": "/things/Covers/Sacrilegious Faith Is Fashion.PNG",
  "sign-here-the-blueprint-decoded-founder-edition":
    "/things/Covers/Sign Here The Blueprint Decoded.PNG",
  "supreme-dictionary": "/covers/books/supreme-dictionary.png",
  "the-prince": "/covers/books/the-prince.png",
  "the-64-laws-of-black-power": "/covers/books/the-64-laws-of-black-power.png",
  "the-book-of-glenn-legacy-talk-the-unsent-letters":
    "/covers/books/the-book-of-glenn-legacy-talk-the-unsent-letters.png",
  "the-book-of-gravity-the-120-lessons": "/things/Covers/The Book of Gravity The 120 Lessons.PNG",
  "the-book-of-water-and-aura-mastery": "/things/Covers/The Book of Water & Aura Mastery.PNG",
  "the-capstone-essays": "/covers/books/the-capstone-essays.png",
  "the-chinese-rule-that-builds-wealth": "/covers/books/the-chinese-rule-that-builds-wealth.png",
  "the-family-before-the-flag": "/covers/books/the-family-before-the-flag.png",
  "the-kings-mirage-64-squares-of-sovereign-geometry":
    "/things/Covers/The King’s Mirage 64 Squares of Sovereign Geometry.PNG",
  "the-solomon-code": "/covers/books/the-solomon-code.png",
  "the-unit": "/covers/books/the-unit.png",
  "unified-cannon-field-theory": "/covers/books/unified-cannon-field-theory.png",
  "universal-operability-180-the-turnaround-essay":
    "/covers/books/universal-operability-180-the-turnaround-essay.png",
};

const ALL_TITLES: Omit<Book, "category">[] = [
  {
    slug: "the-river-in-the-sea-the-voyage-of-mansa-muhammad",
    title: "The River and the Sea",
    status: "coming_soon",
  },
  {
    slug: "america-a-nation-built-by-immigrants",
    title: "America: A Nation Built by Immigrants",
    status: "coming_soon",
  },
  {
    slug: "black-caesar-the-adventures-of-blackbeard",
    title: "Black Caesar",
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
    title: "Take Me To Your Leader",
    status: "coming_soon",
  },
  {
    slug: "dr-daniel-dorian-vale-operation-special-herbs",
    title: "Dr. Daniel Dorian Vale: Special Operations",
    status: "coming_soon",
  },
  {
    slug: "dr-daniel-dorian-vale-iron-fingers",
    title: "Dr. Daniel Dorian Vale: Iron Fingers",
    status: "coming_soon",
  },
  {
    slug: "dr-daniel-dorian-vale-madvillainy",
    title: "Dr. Daniel Dorian Vale: Mad Villainy",
    status: "coming_soon",
  },
  {
    slug: "dr-daniel-dorian-vale-operation-vail",
    title: "Dr. Daniel Dorian Vale: Operation Vale",
    status: "coming_soon",
  },
  {
    slug: "dr-daniel-dorian-vale-rap-sorcery",
    title: "Dr. Daniel Dorian Vale: Rap Sorcery",
    status: "coming_soon",
  },
  {
    slug: "dr-daniel-dorian-vale-take-me-to-your-leader-ii",
    title: "Take Me To Your Leader 2",
    status: "coming_soon",
  },
  {
    slug: "dr-daniel-dorian-vale-operation-food",
    title: "Dr. Daniel Dorian Vale: Operation Food",
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
    title: "The Adventures of Crackman",
    status: "coming_soon",
  },
  {
    slug: "ultraman",
    title: "Ultraman",
    status: "coming_soon",
  },
  {
    slug: "ultraman-the-outliers",
    title: "Ultraman: The Outliers",
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
];

export const BOOKS: Book[] = ALL_TITLES.map((book) => ({
  ...book,
  category: COMIC_SLUGS.has(book.slug) ? "comics" : ESSAY_SLUGS.has(book.slug) ? "essays" : "books",
  coverSrc:
    ESSAY_COVER_OVERRIDES[book.slug] ||
    BOOK_COVER_OVERRIDES[book.slug] ||
    book.coverSrc ||
    `/covers/books/${book.slug}.png`,
}));
