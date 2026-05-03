// Zustand state for XP, Streaks, History, Summaries, Flashcards, Quizzes
import { create } from "zustand";

interface KeyPoint {
  title: string;
  description: string;
}

interface Summary {
  id: string;
  title: string;
  documentName: string;
  content: string;
  keyPoints: KeyPoint[];
  date: string;
  wordCount: number;
  readingTime: number;
  gradient: readonly [string, string];
}

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  keyTerms?: string;
}

interface FlashcardDeck {
  id: string;
  title: string;
  documentName: string;
  cards: Flashcard[];
  date: string;
  gradient: readonly [string, string];
}

interface QuizOption {
  id: string;
  label: string;
  text: string;
}

interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  options: QuizOption[];
  correctAnswer: string;
  explanation: string;
}

interface Quiz {
  id: string;
  title: string;
  documentName: string;
  questions: QuizQuestion[];
  date: string;
  gradient: readonly [string, string];
}

interface AppState {
  xp: number;
  streak: number;
  history: any[];
  summaries: Summary[];
  flashcardDecks: FlashcardDeck[];
  quizzes: Quiz[];
  addXP: (amount: number) => void;
  incrementStreak: () => void;
  addSummary: (summary: Summary) => void;
  getSummaryById: (id: string) => Summary | undefined;
  addFlashcardDeck: (deck: FlashcardDeck) => void;
  getFlashcardDeckById: (id: string) => FlashcardDeck | undefined;
  addQuiz: (quiz: Quiz) => void;
  getQuizById: (id: string) => Quiz | undefined;
}

export const useAppStore = create<AppState>((set, get) => ({
  xp: 0,
  streak: 0,
  history: [],
  summaries: [
    {
      id: "example-summary-1",
      title: "Organic Chemistry: Carbon Bonds",
      documentName: "Chemistry Chapter 4.pdf",
      content:
        "Detailed breakdown of covalent bonding patterns and electron shells from Chapter 4. Carbon atoms form four covalent bonds due to their four valence electrons. These bonds can be single, double, or triple bonds, each with different properties and strengths. The chapter explores how carbon's unique bonding capabilities make it the foundation of organic chemistry and all living organisms.",
      keyPoints: [
        {
          title: "Covalent Bonding",
          description:
            "Carbon forms four covalent bonds by sharing electrons with other atoms.",
        },
        {
          title: "Bond Types",
          description:
            "Single, double, and triple bonds have different lengths and strengths.",
        },
        {
          title: "Electron Shells",
          description:
            "Understanding electron configuration is key to predicting bonding patterns.",
        },
        {
          title: "Organic Molecules",
          description:
            "Carbon's versatility allows for millions of different organic compounds.",
        },
        {
          title: "Functional Groups",
          description:
            "Specific atom arrangements that determine molecular properties.",
        },
      ],
      date: "May 2, 2026",
      wordCount: 2400,
      readingTime: 12,
      gradient: ["#6B4DE6", "#A389F4"] as const,
    },
    {
      id: "example-summary-2",
      title: "Microeconomics Principles",
      documentName: "Economics Lecture Notes.pdf",
      content:
        "Supply and demand curves, elasticity, and market equilibrium summaries. This comprehensive overview covers the fundamental principles that govern how markets operate, including the forces that determine prices and quantities in competitive markets. Understanding these concepts is essential for analyzing economic behavior and policy decisions.",
      keyPoints: [
        {
          title: "Supply and Demand",
          description:
            "The fundamental forces that determine market prices and quantities.",
        },
        {
          title: "Market Equilibrium",
          description:
            "The point where supply equals demand and markets clear.",
        },
        {
          title: "Price Elasticity",
          description: "How responsive quantity demanded is to price changes.",
        },
        {
          title: "Consumer Surplus",
          description:
            "The benefit consumers receive from paying less than their maximum willingness to pay.",
        },
        {
          title: "Producer Surplus",
          description:
            "The benefit producers receive from selling at prices above their minimum acceptable price.",
        },
      ],
      date: "Apr 28, 2026",
      wordCount: 3200,
      readingTime: 16,
      gradient: ["#4f378a", "#9c27b0"] as const,
    },
  ],
  flashcardDecks: [
    {
      id: "example-deck-1",
      title: "Spanish Vocabulary: Travel",
      documentName: "Spanish Textbook Chapter 8.pdf",
      cards: [
        {
          id: "1",
          question: "How do you say 'airport' in Spanish?",
          answer: "El aeropuerto",
          keyTerms: "Travel, Transportation",
        },
        {
          id: "2",
          question: "What is 'I would like to book a room' in Spanish?",
          answer: "Me gustaría reservar una habitación",
          keyTerms: "Hotel, Accommodation",
        },
        {
          id: "3",
          question: "How do you ask 'Where is the restaurant?' in Spanish?",
          answer: "¿Dónde está el restaurante?",
          keyTerms: "Dining, Directions",
        },
        {
          id: "4",
          question: "What does 'la cuenta' mean?",
          answer: "The bill/check",
          keyTerms: "Restaurant, Payment",
        },
        {
          id: "5",
          question: "How do you say 'passport' in Spanish?",
          answer: "El pasaporte",
          keyTerms: "Travel Documents",
        },
      ],
      date: "May 1, 2026",
      gradient: ["#FF7A59", "#FFAB91"] as const,
    },
  ],
  quizzes: [
    {
      id: "example-quiz-1",
      title: "Modern European History",
      documentName: "History Lecture Series.pdf",
      questions: [
        {
          id: "1",
          category: "INDUSTRIAL REVOLUTION",
          question:
            "Which invention is considered the catalyst for the Industrial Revolution?",
          options: [
            { id: "A", label: "A", text: "The printing press" },
            { id: "B", label: "B", text: "The steam engine" },
            { id: "C", label: "C", text: "The telegraph" },
            { id: "D", label: "D", text: "The cotton gin" },
          ],
          correctAnswer: "B",
          explanation:
            "The steam engine, perfected by James Watt in the 1760s, revolutionized manufacturing and transportation, making it the key catalyst for the Industrial Revolution.",
        },
        {
          id: "2",
          category: "SOCIAL CHANGES",
          question: "What was a major social consequence of industrialization?",
          options: [
            { id: "A", label: "A", text: "Decline in urban population" },
            { id: "B", label: "B", text: "Rapid urbanization" },
            { id: "C", label: "C", text: "Return to agrarian society" },
            { id: "D", label: "D", text: "Decreased factory work" },
          ],
          correctAnswer: "B",
          explanation:
            "Industrialization led to rapid urbanization as people moved from rural areas to cities seeking factory jobs, fundamentally changing European society.",
        },
        {
          id: "3",
          category: "ECONOMIC IMPACT",
          question:
            "Which economic system emerged during the Industrial Revolution?",
          options: [
            { id: "A", label: "A", text: "Feudalism" },
            { id: "B", label: "B", text: "Mercantilism" },
            { id: "C", label: "C", text: "Capitalism" },
            { id: "D", label: "D", text: "Communism" },
          ],
          correctAnswer: "C",
          explanation:
            "Industrial capitalism emerged as the dominant economic system, characterized by private ownership of production means and market-based economies.",
        },
      ],
      date: "Apr 29, 2026",
      gradient: ["#00BFA5", "#64FFDA"] as const,
    },
  ],
  addXP: (amount) => set((state) => ({ xp: state.xp + amount })),
  incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),
  addSummary: (summary) =>
    set((state) => ({ summaries: [...state.summaries, summary] })),
  getSummaryById: (id) => {
    const state = get();
    return state.summaries.find((s) => s.id === id);
  },
  addFlashcardDeck: (deck) =>
    set((state) => ({ flashcardDecks: [...state.flashcardDecks, deck] })),
  getFlashcardDeckById: (id) => {
    const state = get();
    return state.flashcardDecks.find((d) => d.id === id);
  },
  addQuiz: (quiz) => set((state) => ({ quizzes: [...state.quizzes, quiz] })),
  getQuizById: (id) => {
    const state = get();
    return state.quizzes.find((q) => q.id === id);
  },
}));
