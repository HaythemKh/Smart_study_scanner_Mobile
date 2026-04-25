// mocks/data.ts
// ═══════════════════════════════════════════════
// All mock data — run the full app without a backend
// ═══════════════════════════════════════════════

export type ContentType = "summary" | "flashcards" | "quiz";
export type SourceType = "document" | "image" | "camera" | "slides";

// ── USER ──────────────────────────────────────
export const mockUser = {
  id: "user_001",
  name: "Haythem",
  email: "haythem@example.com",
  avatar: null, // null = show initials
  level: 12,
  xp: 3100,
  xpToNextLevel: 5000,
  streakDays: 7,
  totalSessions: 47,
  totalCards: 124,
  avgQuizScore: 89,
};

// ── ACHIEVEMENTS ──────────────────────────────
export const mockAchievements = [
  {
    id: "a1",
    icon: "🔥",
    title: "7-Day Streak",
    description: "Study 7 days in a row",
    earned: true,
    xpReward: 200,
  },
  {
    id: "a2",
    icon: "🧠",
    title: "Quiz Master",
    description: "Score 100% on a quiz",
    earned: true,
    xpReward: 150,
  },
  {
    id: "a3",
    icon: "📚",
    title: "Bookworm",
    description: "Summarize 10 documents",
    earned: true,
    xpReward: 100,
  },
  {
    id: "a4",
    icon: "🏆",
    title: "Gold Scholar",
    description: "Reach Level 20",
    earned: false,
    unlockHint: "Level 20",
    xpReward: 500,
  },
  {
    id: "a5",
    icon: "⚡",
    title: "Speed Reader",
    description: "Complete 50 scans",
    earned: false,
    unlockHint: "50 scans",
    xpReward: 300,
  },
  {
    id: "a6",
    icon: "🌙",
    title: "Night Owl",
    description: "Study after midnight",
    earned: false,
    unlockHint: "Study at 1am",
    xpReward: 100,
  },
];

// ── SUMMARIES ─────────────────────────────────
export const mockSummaries = [
  {
    id: "s1",
    type: "summary" as ContentType,
    source: "document" as SourceType,
    title: "Machine Learning Fundamentals",
    sourceFile: "ml_basics.pdf",
    pageCount: 24,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    readTimeMinutes: 2,
    keyPoints: [
      "Machine learning enables systems to learn automatically from data without explicit programming.",
      "Three main types: supervised, unsupervised, and reinforcement learning.",
      "Neural networks mimic the human brain using interconnected nodes (neurons) in layers.",
      "Overfitting occurs when a model learns training data too well and fails to generalize.",
      "Gradient descent optimizes model weights by minimizing the loss function iteratively.",
    ],
    fullSummary: `Machine learning is a subset of artificial intelligence that focuses on building systems that can learn and improve from experience. Unlike traditional programming where rules are explicitly coded, ML algorithms build mathematical models from sample data (called training data) to make decisions with minimal human intervention.

The three main paradigms are: Supervised learning (labeled data, predicts output), Unsupervised learning (unlabeled data, finds patterns), and Reinforcement learning (reward-based, learns through interaction).

Neural networks, inspired by biological neurons, form the backbone of modern ML. A typical network has an input layer, hidden layers for feature extraction, and an output layer. Training involves forward propagation and backpropagation to adjust weights.

Key challenges include overfitting (model too specific to training data), underfitting (model too simple), and the bias-variance tradeoff. Regularization techniques like L1/L2 and dropout help manage these issues.`,
    xpEarned: 50,
  },
  {
    id: "s2",
    type: "summary" as ContentType,
    source: "slides" as SourceType,
    title: "Data Structures Overview",
    sourceFile: "ds_lecture.pptx",
    pageCount: 38,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    readTimeMinutes: 3,
    keyPoints: [
      "Arrays store elements in contiguous memory with O(1) access but O(n) insertion.",
      "Linked lists allow O(1) insertion but O(n) access — a trade-off in structure.",
      "Trees are hierarchical structures; binary search trees maintain sorted order.",
      "Hash tables achieve O(1) average lookup using a hash function.",
      "Graphs model networks of connected nodes, traversable via BFS or DFS.",
    ],
    fullSummary:
      "Data structures are ways of organizing data to enable efficient access and modification...",
    xpEarned: 50,
  },
];

// ── FLASHCARD DECKS ───────────────────────────
export const mockFlashcardDecks = [
  {
    id: "f1",
    type: "flashcards" as ContentType,
    source: "document" as SourceType,
    title: "Neural Networks Deck",
    sourceRef: "s1",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    cards: [
      {
        id: "c1",
        front: "What is Gradient Descent?",
        back: "An optimization algorithm that minimizes the loss function by iteratively updating model parameters in the direction of steepest descent.",
      },
      {
        id: "c2",
        front: "What is Overfitting?",
        back: "When a model performs well on training data but poorly on new data — it has memorized patterns rather than learning generalizable features.",
      },
      {
        id: "c3",
        front: "What is a Neural Network?",
        back: "A computational model inspired by the brain, using layers of interconnected nodes (neurons) with learnable weights to detect complex patterns.",
      },
      {
        id: "c4",
        front: "What is Supervised Learning?",
        back: "A type of ML where the model is trained on labeled input-output pairs to learn a prediction function for new, unseen inputs.",
      },
      {
        id: "c5",
        front: "What is Regularization?",
        back: "A technique to prevent overfitting by adding a penalty term (L1/L2) to the loss function, discouraging overly complex models.",
      },
      {
        id: "c6",
        front: "What is Backpropagation?",
        back: "The algorithm used to train neural networks by calculating gradients of the loss w.r.t. each weight using the chain rule, then updating weights.",
      },
      {
        id: "c7",
        front: "What is a Convolutional Neural Network (CNN)?",
        back: "A specialized neural network for processing grid-like data (images) using convolutional layers to detect spatial hierarchies of features.",
      },
      {
        id: "c8",
        front: "What is the bias-variance tradeoff?",
        back: "The tension between underfitting (high bias, too simple) and overfitting (high variance, too complex). Optimal models balance both.",
      },
    ],
    xpEarned: 80,
  },
  {
    id: "f2",
    type: "flashcards" as ContentType,
    source: "camera" as SourceType,
    title: "Calculus Formulas",
    sourceRef: null,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    cards: [
      { id: "cf1", front: "Power Rule", back: "d/dx [x^n] = nx^(n-1)" },
      {
        id: "cf2",
        front: "Chain Rule",
        back: "d/dx [f(g(x))] = f'(g(x)) · g'(x)",
      },
      { id: "cf3", front: "Product Rule", back: "d/dx [f·g] = f'g + fg'" },
    ],
    xpEarned: 60,
  },
];

// ── QUIZZES ───────────────────────────────────
export const mockQuizzes = [
  {
    id: "q1",
    type: "quiz" as ContentType,
    source: "document" as SourceType,
    title: "ML Basics Quiz",
    sourceRef: "s1",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    lastScore: 80,
    questions: [
      {
        id: "q1_1",
        question: "What is the primary goal of machine learning?",
        options: [
          "To replace human programmers",
          "To enable systems to learn from data automatically",
          "To create faster computers",
          "To store large datasets",
        ],
        correctIndex: 1,
        explanation:
          "ML focuses on building systems that improve through experience, automatically extracting patterns from data without being explicitly programmed for each task.",
      },
      {
        id: "q1_2",
        question: "Which type of ML uses labeled training data?",
        options: [
          "Unsupervised Learning",
          "Supervised Learning",
          "Reinforcement Learning",
          "Transfer Learning",
        ],
        correctIndex: 1,
        explanation:
          'Supervised learning trains on labeled (input, output) pairs to learn a mapping function. The model "supervises" itself using the provided labels.',
      },
      {
        id: "q1_3",
        question: "What does overfitting mean in ML?",
        options: [
          "Model trains too slowly",
          "Model performs well on training but poorly on new data",
          "Model has too few parameters",
          "Model uses too much memory",
        ],
        correctIndex: 1,
        explanation:
          "Overfitting occurs when a model memorizes training data patterns (including noise) rather than learning generalizable features, causing poor performance on unseen data.",
      },
      {
        id: "q1_4",
        question: "What is the purpose of gradient descent?",
        options: [
          "To initialize neural network weights",
          "To visualize model performance",
          "To minimize the loss function by updating model parameters",
          "To split data into train/test sets",
        ],
        correctIndex: 2,
        explanation:
          "Gradient descent iteratively moves parameters in the direction that reduces the loss function, guided by the gradient (slope) of the loss surface.",
      },
      {
        id: "q1_5",
        question: "In a neural network, what does a hidden layer do?",
        options: [
          "Stores the training data",
          "Receives the final output",
          "Extracts intermediate features and representations",
          "Initializes the model weights",
        ],
        correctIndex: 2,
        explanation:
          "Hidden layers transform inputs into progressively more abstract representations, enabling the network to learn complex, non-linear patterns.",
      },
    ],
    xpEarned: 120,
  },
  {
    id: "q2",
    type: "quiz" as ContentType,
    source: "slides" as SourceType,
    title: "Statistics Review",
    sourceRef: null,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    lastScore: 80,
    questions: [],
    xpEarned: 100,
  },
];

// ── HISTORY ───────────────────────────────────
export const mockHistory = [
  {
    id: "h1",
    contentId: "s1",
    contentType: "summary" as ContentType,
    title: "Machine Learning Summary",
    subtitle: "5 key points",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2h ago
    xpEarned: 50,
    icon: "📝",
    gradientKey: "grape",
  },
  {
    id: "h2",
    contentId: "q1",
    contentType: "quiz" as ContentType,
    title: "ML Basics Quiz",
    subtitle: "Score: 80%",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    xpEarned: 120,
    icon: "🧠",
    gradientKey: "sun",
  },
  {
    id: "h3",
    contentId: "f1",
    contentType: "flashcards" as ContentType,
    title: "Neural Networks Deck",
    subtitle: "12 cards reviewed",
    timestamp: new Date(
      Date.now() - 1 * 24 * 60 * 60 * 1000 - 4 * 60 * 60 * 1000,
    ).toISOString(),
    xpEarned: 80,
    icon: "🃏",
    gradientKey: "mint",
  },
  {
    id: "h4",
    contentId: null,
    contentType: "summary" as ContentType,
    title: "Lecture Photo Scan",
    subtitle: "Calculus notes",
    timestamp: new Date(
      Date.now() - 1 * 24 * 60 * 60 * 1000 - 8 * 60 * 60 * 1000,
    ).toISOString(),
    xpEarned: 30,
    icon: "📷",
    gradientKey: "coral",
  },
];

// ── ONBOARDING SLIDES ─────────────────────────
export const onboardingSlides = [
  {
    id: 1,
    emoji: "🤖",
    title: "AI-Powered Learning",
    subtitle:
      "Import any document, image, or slide deck. Our AI turns it into summaries, flashcards, and quizzes instantly.",
    stats: [
      { value: "10x", label: "Faster", gradient: "hero" },
      { value: "98%", label: "Retention", gradient: "mint" },
      { value: "5★", label: "Rated", gradient: "sun" },
    ],
  },
  {
    id: 2,
    emoji: "🃏",
    title: "Study Your Way",
    subtitle:
      "Choose summaries for a quick overview, flashcards for spaced repetition, or quizzes to test yourself under pressure.",
    stats: [
      { value: "3", label: "Modes", gradient: "grape" },
      { value: "∞", label: "Topics", gradient: "coral" },
      { value: "0", label: "Typing", gradient: "sun" },
    ],
  },
  {
    id: 3,
    emoji: "🏆",
    title: "Level Up Daily",
    subtitle:
      "Earn XP, maintain streaks, and unlock achievements. The more you study, the more you unlock.",
    stats: [
      { value: "XP", label: "Every session", gradient: "hero" },
      { value: "🔥", label: "Streaks", gradient: "sun" },
      { value: "24", label: "Achievements", gradient: "mint" },
    ],
  },
];
