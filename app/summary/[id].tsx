import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { Href, useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Clock,
  FileText,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppStore } from "../../store/useAppStore";

export default function SummaryScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { getSummaryById } = useAppStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const summary = getSummaryById(id as string);

  if (!summary) {
    return (
      <View style={styles.container}>
        <SafeAreaView edges={["top"]} style={styles.safeArea}>
          <Text style={styles.errorText}>Summary not found</Text>
        </SafeAreaView>
      </View>
    );
  }

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // Navigate back to chat and reset state
    router.push("/(tabs)/chat" as Href);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <View style={styles.topBarLeft}>
            <TouchableOpacity
              onPress={handleBack}
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <ArrowLeft color="#6750A4" size={24} strokeWidth={2.5} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Study Scanner</Text>
          </View>

          <View style={styles.topBarRight}>
            <View style={styles.iconButton}>
              <Bookmark
                color="#6750A4"
                size={20}
                strokeWidth={2.5}
                fill="#6750A4"
              />
            </View>
            <View style={styles.streakBadge}>
              <Text style={styles.streakText}>5 🔥</Text>
            </View>
          </View>
        </View>

        {/* Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Card */}
          <LinearGradient
            colors={["#6B4DE6", "#A4508B"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroCard}
          >
            {/* Decorative Blurs */}
            <View style={styles.decorativeBlur1} />
            <View style={styles.decorativeBlur2} />

            <View style={styles.heroContent}>
              {/* AI Badge */}
              <View style={styles.aiBadge}>
                <Sparkles
                  color="white"
                  size={14}
                  strokeWidth={2.5}
                  fill="white"
                />
                <Text style={styles.aiBadgeText}>AI ANALYSIS COMPLETE</Text>
              </View>

              {/* Title */}
              <Text style={styles.heroTitle}>{summary.title}</Text>

              {/* Stats Row */}
              <View style={styles.statsRow}>
                <View style={styles.statPill}>
                  <FileText color="white" size={18} strokeWidth={2.5} />
                  <Text style={styles.statPillText}>18 Pages</Text>
                </View>
                <View style={styles.statPill}>
                  <Clock color="white" size={18} strokeWidth={2.5} />
                  <Text style={styles.statPillText}>
                    {summary.readingTime} Min Read
                  </Text>
                </View>
                <View style={styles.statPill}>
                  <Zap color="white" size={18} strokeWidth={2.5} />
                  <Text style={styles.statPillText}>Advanced</Text>
                </View>
              </View>
            </View>
          </LinearGradient>

          {/* Key Takeaways Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Key Takeaways</Text>
              <Text style={styles.sectionSubtitle}>
                {summary.keyPoints.length} FOCUS POINTS
              </Text>
            </View>

            {/* Key Points Grid */}
            <View style={styles.keyPointsGrid}>
              {summary.keyPoints.map((point, index) => (
                <View
                  key={index}
                  style={[
                    styles.keyPointCard,
                    index === 0 && styles.keyPointCardLarge,
                  ]}
                >
                  <LinearGradient
                    colors={["#6750A4", "#FF7A59"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[
                      styles.keyPointNumber,
                      index === 0 && styles.keyPointNumberLarge,
                    ]}
                  >
                    <Text
                      style={[
                        styles.keyPointNumberText,
                        index === 0 && styles.keyPointNumberTextLarge,
                      ]}
                    >
                      {index + 1}
                    </Text>
                  </LinearGradient>
                  <View style={styles.keyPointContent}>
                    <Text style={styles.keyPointTitle}>{point.title}</Text>
                    <Text style={styles.keyPointDescription}>
                      {point.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Full Summary Section */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryCardTitle}>Full Executive Summary</Text>
            <Text
              style={styles.summaryText}
              numberOfLines={isExpanded ? undefined : 4}
            >
              {summary.content}
            </Text>
            <TouchableOpacity
              onPress={() => setIsExpanded(!isExpanded)}
              style={styles.readMoreButton}
              activeOpacity={0.7}
            >
              <Text style={styles.readMoreText}>
                {isExpanded ? "Read less" : "Read more"}
              </Text>
              <ArrowRight color="#6750A4" size={18} strokeWidth={2.5} />
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                // Create quiz from this summary
                const quizId = Date.now().toString();
                const mockQuiz = {
                  id: quizId,
                  title: summary.title,
                  documentName: summary.documentName,
                  questions: [
                    {
                      id: "1",
                      category: "THERMODYNAMICS",
                      question:
                        "According to the Zeroth Law of Thermodynamics, what defines thermal equilibrium?",
                      options: [
                        {
                          id: "A",
                          label: "A",
                          text: "When two systems have the same pressure",
                        },
                        {
                          id: "B",
                          label: "B",
                          text: "When two systems are at the same temperature",
                        },
                        {
                          id: "C",
                          label: "C",
                          text: "When energy transfer stops between systems",
                        },
                        {
                          id: "D",
                          label: "D",
                          text: "When entropy reaches maximum",
                        },
                      ],
                      correctAnswer: "B",
                      explanation:
                        "The Zeroth Law states that if two systems are each in thermal equilibrium with a third system, they are in equilibrium with each other, which defines temperature.",
                    },
                    {
                      id: "2",
                      category: "ENERGY",
                      question: "What is enthalpy in thermodynamics?",
                      options: [
                        {
                          id: "A",
                          label: "A",
                          text: "The total kinetic energy of molecules",
                        },
                        {
                          id: "B",
                          label: "B",
                          text: "Internal energy plus pressure-volume work",
                        },
                        {
                          id: "C",
                          label: "C",
                          text: "The measure of disorder in a system",
                        },
                        {
                          id: "D",
                          label: "D",
                          text: "The rate of heat transfer",
                        },
                      ],
                      correctAnswer: "B",
                      explanation:
                        "Enthalpy (H) is defined as the internal energy (U) plus the product of pressure and volume (PV), representing the total heat content of a system.",
                    },
                    {
                      id: "3",
                      category: "ENTROPY",
                      question:
                        "What does the Second Law of Thermodynamics state about entropy?",
                      options: [
                        {
                          id: "A",
                          label: "A",
                          text: "Entropy always decreases in isolated systems",
                        },
                        {
                          id: "B",
                          label: "B",
                          text: "Entropy remains constant in all processes",
                        },
                        {
                          id: "C",
                          label: "C",
                          text: "Entropy of the universe tends to increase",
                        },
                        {
                          id: "D",
                          label: "D",
                          text: "Entropy only applies to reversible processes",
                        },
                      ],
                      correctAnswer: "C",
                      explanation:
                        "The Second Law states that the total entropy of an isolated system can never decrease over time, and the entropy of the universe tends toward a maximum.",
                    },
                    {
                      id: "4",
                      category: "HEAT TRANSFER",
                      question:
                        "Which mechanism of heat transfer does NOT require a medium?",
                      options: [
                        {
                          id: "A",
                          label: "A",
                          text: "Conduction",
                        },
                        {
                          id: "B",
                          label: "B",
                          text: "Convection",
                        },
                        {
                          id: "C",
                          label: "C",
                          text: "Radiation",
                        },
                        {
                          id: "D",
                          label: "D",
                          text: "All require a medium",
                        },
                      ],
                      correctAnswer: "C",
                      explanation:
                        "Radiation is the transfer of energy through electromagnetic waves and does not require a physical medium, unlike conduction and convection.",
                    },
                    {
                      id: "5",
                      category: "CARNOT CYCLE",
                      question: "What does the Carnot cycle represent?",
                      options: [
                        {
                          id: "A",
                          label: "A",
                          text: "The most efficient possible heat engine cycle",
                        },
                        {
                          id: "B",
                          label: "B",
                          text: "A real-world engine design",
                        },
                        {
                          id: "C",
                          label: "C",
                          text: "A refrigeration cycle only",
                        },
                        {
                          id: "D",
                          label: "D",
                          text: "An irreversible thermodynamic process",
                        },
                      ],
                      correctAnswer: "A",
                      explanation:
                        "The Carnot cycle is an idealized thermodynamic cycle that represents the maximum possible efficiency for a heat engine operating between two temperatures.",
                    },
                  ],
                  date: summary.date,
                  gradient: summary.gradient,
                };
                useAppStore.getState().addQuiz(mockQuiz);
                router.push(`/quiz/${quizId}` as Href);
              }}
              activeOpacity={0.9}
              style={styles.primaryButton}
            >
              <LinearGradient
                colors={["#6B4DE6", "#A4508B"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.primaryButtonGradient}
              >
                <Zap color="white" size={20} strokeWidth={2.5} fill="white" />
                <Text style={styles.primaryButtonText}>🧠 Generate Quiz</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                // Create flashcard deck from this summary
                const deckId = Date.now().toString();
                const mockDeck = {
                  id: deckId,
                  title: summary.title,
                  documentName: summary.documentName,
                  cards: [
                    {
                      id: "1",
                      question:
                        "What is the primary function of the Mitochondria in a eukaryotic cell?",
                      answer:
                        "It acts as the powerhouse of the cell, generating ATP through aerobic respiration.",
                      keyTerms: "ATP, Aerobic Respiration, Metabolism",
                    },
                    {
                      id: "2",
                      question: "What is the role of the Cell Membrane?",
                      answer:
                        "The cell membrane controls what enters and exits the cell, maintaining homeostasis.",
                      keyTerms: "Selective Permeability, Phospholipid Bilayer",
                    },
                    {
                      id: "3",
                      question: "What does the Nucleus contain?",
                      answer:
                        "The nucleus contains genetic material (DNA) and controls cell activities.",
                      keyTerms: "DNA, Chromatin, Nuclear Envelope",
                    },
                  ],
                  date: summary.date,
                  gradient: summary.gradient,
                };
                useAppStore.getState().addFlashcardDeck(mockDeck);
                router.push(`/flashcards/${deckId}` as Href);
              }}
              activeOpacity={0.9}
              style={styles.secondaryButton}
            >
              <Layers color="#6750A4" size={20} strokeWidth={2.5} />
              <Text style={styles.secondaryButtonText}>
                🃏 Create Flashcards
              </Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Spacing */}
          <View style={{ height: 120 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFC",
  },
  safeArea: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  topBarLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
  },
  topBarRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#6750A4",
    fontFamily: "PlusJakartaSans_800ExtraBold",
    letterSpacing: -0.5,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  streakBadge: {
    backgroundColor: "#ece6ee",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  streakText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6750A4",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  heroCard: {
    borderRadius: 48,
    padding: 32,
    marginBottom: 32,
    overflow: "hidden",
    shadowColor: "rgba(75, 54, 204, 0.12)",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 10,
  },
  decorativeBlur1: {
    position: "absolute",
    right: -80,
    top: -80,
    width: 256,
    height: 256,
    borderRadius: 128,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  decorativeBlur2: {
    position: "absolute",
    left: -40,
    bottom: -40,
    width: 192,
    height: 192,
    borderRadius: 96,
    backgroundColor: "rgba(103, 80, 164, 0.2)",
  },
  heroContent: {
    gap: 24,
    zIndex: 10,
  },
  aiBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
  },
  aiBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "white",
    fontFamily: "PlusJakartaSans_700Bold",
    letterSpacing: 2,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "white",
    fontFamily: "PlusJakartaSans_800ExtraBold",
    lineHeight: 40,
    letterSpacing: -1,
  },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  statPillText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#6750A4",
    fontFamily: "PlusJakartaSans_800ExtraBold",
    letterSpacing: -0.5,
  },
  sectionSubtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#7a7582",
    fontFamily: "PlusJakartaSans_700Bold",
    letterSpacing: 2,
  },
  keyPointsGrid: {
    gap: 16,
  },
  keyPointCard: {
    flexDirection: "row",
    gap: 16,
    backgroundColor: "white",
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#e6e0e9",
    shadowColor: "rgba(75, 54, 204, 0.12)",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 6,
  },
  keyPointCardLarge: {
    padding: 24,
  },
  keyPointNumber: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  keyPointNumberLarge: {
    width: 48,
    height: 48,
    borderRadius: 16,
  },
  keyPointNumberText: {
    fontSize: 18,
    fontWeight: "800",
    color: "white",
    fontFamily: "PlusJakartaSans_800ExtraBold",
  },
  keyPointNumberTextLarge: {
    fontSize: 20,
  },
  keyPointContent: {
    flex: 1,
    gap: 8,
  },
  keyPointTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1d1b20",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  keyPointDescription: {
    fontSize: 14,
    fontWeight: "500",
    color: "#494551",
    fontFamily: "PlusJakartaSans_500Medium",
    lineHeight: 22,
  },
  summaryCard: {
    backgroundColor: "white",
    padding: 32,
    borderRadius: 48,
    borderWidth: 1,
    borderColor: "#e6e0e9",
    shadowColor: "rgba(75, 54, 204, 0.12)",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 6,
    marginBottom: 32,
    gap: 24,
  },
  summaryCardTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#6750A4",
    fontFamily: "PlusJakartaSans_800ExtraBold",
    letterSpacing: -0.5,
  },
  summaryText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#494551",
    fontFamily: "PlusJakartaSans_500Medium",
    lineHeight: 26,
  },
  readMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6750A4",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  actionButtons: {
    gap: 16,
    marginBottom: 32,
  },
  primaryButton: {
    borderRadius: 999,
    overflow: "hidden",
    shadowColor: "rgba(107, 77, 230, 0.3)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 8,
  },
  primaryButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 20,
    paddingHorizontal: 32,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: "800",
    color: "white",
    fontFamily: "PlusJakartaSans_800ExtraBold",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#6750A4",
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 999,
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#6750A4",
    fontFamily: "PlusJakartaSans_800ExtraBold",
  },
  errorText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64748b",
    fontFamily: "PlusJakartaSans_600SemiBold",
    textAlign: "center",
    marginTop: 40,
  },
});
