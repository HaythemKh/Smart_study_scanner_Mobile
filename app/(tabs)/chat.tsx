import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { Href, router } from "expo-router";
import {
  ArrowLeft,
  Camera,
  FileText,
  Image as ImageIcon,
  Layers,
  Paperclip,
  Send,
  Sparkles,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppStore } from "../../store/useAppStore";

const sourceCards = [
  {
    icon: FileText,
    label: "Document",
    subtitle: "PDF, Word, TXT",
    gradient: ["#2563EB", "#60A5FA"] as const,
    fileExample: "Biology Chapter 4.pdf",
    fileSize: "PDF • 2.4 MB",
  },
  {
    icon: ImageIcon,
    label: "Image",
    subtitle: "From Gallery",
    gradient: ["#9333EA", "#A78BFA"] as const,
    fileExample: "Study Notes.jpg",
    fileSize: "JPG • 1.8 MB",
  },
  {
    icon: Camera,
    label: "Camera",
    subtitle: "Live Scan",
    gradient: ["#F97316", "#FBB040"] as const,
    fileExample: "Scanned Document.jpg",
    fileSize: "JPG • 2.1 MB",
  },
  {
    icon: Layers,
    label: "Slides",
    subtitle: "Presentation Link",
    gradient: ["#059669", "#2DD4BF"] as const,
    fileExample: "Lecture Slides.pptx",
    fileSize: "PPTX • 5.2 MB",
  },
];

const actionOptions = [
  {
    icon: Sparkles,
    label: "Summary",
    color: "#6750A4",
    bgColor: "#E9DDFF",
  },
  {
    icon: Layers,
    label: "Flashcards",
    color: "#00A86B",
    bgColor: "#E0F2F1",
  },
  {
    icon: FileText,
    label: "Quiz me",
    color: "#FF6B6B",
    bgColor: "#FFF0F0",
    fullWidth: true,
  },
];

export default function ChatScreen() {
  const [selectedSource, setSelectedSource] = useState<number | null>(null);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollViewRef = React.useRef<ScrollView>(null);

  // Animation values
  const pulseScale = useSharedValue(1);
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    if (isProcessing) {
      // Pulse animation for AI indicator
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(1.3, { duration: 800, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
      );

      // Progress bar animation
      progressWidth.value = 0;
      progressWidth.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 0 }),
        ),
        -1,
      );

      // Auto-scroll to loading section
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: false });
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProcessing]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value * 100}%`,
  }));

  const handleSourceSelect = (index: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedSource(index);
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedSource(null);
    setSelectedAction(null);
    setIsProcessing(false);
  };

  const handleActionSelect = (actionLabel: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedAction(actionLabel);
    setIsProcessing(true);

    // Simulate processing (remove this when you connect to real API)
    setTimeout(() => {
      setIsProcessing(false);

      if (actionLabel === "Summary" && selectedSource !== null) {
        // Create a mock summary and add to store
        const summaryId = Date.now().toString();
        const mockSummary = {
          id: summaryId,
          title: "The Fundamentals of Thermodynamics: Chapter 7",
          documentName: sourceCards[selectedSource].fileExample,
          content:
            "Chapter 7 provides a comprehensive bridge between classical thermodynamics and the molecular reality of thermodynamic systems. It begins by establishing that the conservation of energy is the cornerstone of all chemical and physical transformations. The text emphasizes that while energy is conserved, the quality of that energy (exergy) is constantly being degraded in any real-world spontaneous process. By examining the microscopic origins of temperature and pressure, the chapter identifies that students often struggle with the distinction between state functions like enthalpy and path functions like work and heat. This chapter systematically deconstructs these hurdles by providing concrete examples of how energy flows through systems and how entropy measures the dispersal of that energy.",
          keyPoints: [
            {
              title: "The Zeroth Law",
              description:
                "Defines temperature based on thermal equilibrium. If two systems are each in equilibrium with a third, they are in equilibrium with each other.",
            },
            {
              title: "Enthalpy Shifts",
              description:
                "Understanding internal energy plus the product of pressure and volume.",
            },
            {
              title: "Entropy Growth",
              description:
                "The universe tends toward disorder as energy dissipates over time.",
            },
            {
              title: "Heat Transfer",
              description: "Mechanisms of conduction and radiation.",
            },
            {
              title: "Carnot Cycle",
              description: "Idealized heat engine cycle efficiency limits.",
            },
          ],
          date: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          wordCount: 2400,
          readingTime: 12,
          gradient: sourceCards[selectedSource].gradient,
        };

        useAppStore.getState().addSummary(mockSummary);

        // Navigate to summary screen
        router.push(`/summary/${summaryId}` as Href);
      } else if (actionLabel === "Flashcards" && selectedSource !== null) {
        // Create a mock flashcard deck and add to store
        const deckId = Date.now().toString();
        const mockDeck = {
          id: deckId,
          title: "Biology Chapter 4 - Flashcards",
          documentName: sourceCards[selectedSource].fileExample,
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
          date: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          gradient: sourceCards[selectedSource].gradient,
        };

        useAppStore.getState().addFlashcardDeck(mockDeck);

        // Navigate to flashcards screen
        router.push(`/flashcards/${deckId}` as Href);
      } else if (actionLabel === "Quiz me" && selectedSource !== null) {
        // Create a mock quiz and add to store
        const quizId = Date.now().toString();
        const mockQuiz = {
          id: quizId,
          title: "Biology Chapter 4 - Quiz",
          documentName: sourceCards[selectedSource].fileExample,
          questions: [
            {
              id: "1",
              category: "CELL BIOLOGY",
              question:
                "What is the primary function of mitochondria in eukaryotic cells?",
              options: [
                {
                  id: "A",
                  label: "A",
                  text: "Protein synthesis and folding",
                },
                {
                  id: "B",
                  label: "B",
                  text: "Energy production through ATP synthesis",
                },
                {
                  id: "C",
                  label: "C",
                  text: "DNA replication and repair",
                },
                {
                  id: "D",
                  label: "D",
                  text: "Lipid storage and metabolism",
                },
              ],
              correctAnswer: "B",
              explanation:
                "Mitochondria are known as the powerhouse of the cell because they generate most of the cell's supply of ATP through aerobic respiration.",
            },
            {
              id: "2",
              category: "CELL STRUCTURE",
              question:
                "Which organelle is responsible for modifying, sorting, and packaging proteins?",
              options: [
                {
                  id: "A",
                  label: "A",
                  text: "Endoplasmic Reticulum",
                },
                {
                  id: "B",
                  label: "B",
                  text: "Golgi Apparatus",
                },
                {
                  id: "C",
                  label: "C",
                  text: "Ribosome",
                },
                {
                  id: "D",
                  label: "D",
                  text: "Lysosome",
                },
              ],
              correctAnswer: "B",
              explanation:
                "The Golgi apparatus receives proteins from the ER, modifies them, and packages them into vesicles for transport to their final destinations.",
            },
            {
              id: "3",
              category: "CELL MEMBRANE",
              question:
                "What property of the cell membrane allows it to control what enters and exits the cell?",
              options: [
                {
                  id: "A",
                  label: "A",
                  text: "Selective permeability",
                },
                {
                  id: "B",
                  label: "B",
                  text: "Complete impermeability",
                },
                {
                  id: "C",
                  label: "C",
                  text: "Random diffusion",
                },
                {
                  id: "D",
                  label: "D",
                  text: "Active transport only",
                },
              ],
              correctAnswer: "A",
              explanation:
                "The cell membrane is selectively permeable, meaning it allows certain molecules to pass through while blocking others, maintaining cellular homeostasis.",
            },
          ],
          date: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          gradient: sourceCards[selectedSource].gradient,
        };

        useAppStore.getState().addQuiz(mockQuiz);

        // Navigate to quiz screen
        router.push(`/quiz/${quizId}` as Href);
      }
    }, 5000);
  };

  return (
    <View style={styles.container}>
      {/* Decorative Scan Line */}
      <LinearGradient
        colors={[
          "rgba(103, 80, 164, 0)",
          "rgba(103, 80, 164, 0.2)",
          "rgba(103, 80, 164, 0)",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.scanLine}
      />

      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          {selectedSource === null ? (
            <>
              {/* Home View - Avatar, Greeting, Progress */}
              <View style={styles.topBarLeft}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>H</Text>
                </View>
                <View style={styles.greetingContainer}>
                  <Text style={styles.greeting}>Good morning 👋 Haythem</Text>
                  <View style={styles.levelContainer}>
                    <View style={styles.levelBar}>
                      <LinearGradient
                        colors={["#6750a4", "#6750a4"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.levelProgress}
                      />
                    </View>
                    <Text style={styles.levelText}>LEVEL 12</Text>
                  </View>
                </View>
              </View>
              <View style={styles.streakBadge}>
                <Text style={styles.streakText}>5 🔥</Text>
              </View>
            </>
          ) : (
            <>
              {/* Conversation View - Back Button & Title */}
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
              <View style={styles.streakBadge}>
                <Text style={styles.streakText}>5 🔥</Text>
              </View>
            </>
          )}
        </View>

        {/* Scrollable Content */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {selectedSource === null ? (
            <>
              {/* Initial Bot Greeting Message */}
              <View style={styles.botMessage}>
                <View style={styles.botAvatar}>
                  <Text style={styles.botAvatarIcon}>🤖</Text>
                </View>
                <View style={styles.botBubble}>
                  <Text style={styles.botText}>
                    Hey Haythem! Ready to turn some notes into knowledge today?
                    Pick a source to start scanning.
                  </Text>
                </View>
              </View>

              {/* Source Cards Grid */}
              <View style={styles.sourceGrid}>
                {sourceCards.map((card, index) => {
                  const IconComponent = card.icon;
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleSourceSelect(index)}
                      activeOpacity={0.9}
                      style={styles.sourceCard}
                    >
                      <LinearGradient
                        colors={card.gradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.sourceCardGradient}
                      >
                        <View style={styles.sourceCardIcon}>
                          <IconComponent
                            color="white"
                            size={28}
                            strokeWidth={2.5}
                          />
                        </View>
                        <View style={styles.sourceCardContent}>
                          <Text style={styles.sourceCardLabel}>
                            {card.label}
                          </Text>
                          <Text style={styles.sourceCardSubtitle}>
                            {card.subtitle}
                          </Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </>
          ) : (
            <>
              {/* Conversation View */}
              {/* Bot Greeting */}
              <View style={styles.botMessage}>
                <View style={styles.botAvatar}>
                  <Text style={styles.botAvatarIcon}>🤖</Text>
                </View>
                <View style={styles.botBubble}>
                  <Text style={styles.botText}>
                    Ready to turn some notes into knowledge today?
                  </Text>
                </View>
              </View>

              {/* User Uploaded Document */}
              <View style={styles.userMessage}>
                <View style={styles.documentCard}>
                  <LinearGradient
                    colors={sourceCards[selectedSource].gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.documentIcon}
                  >
                    {React.createElement(sourceCards[selectedSource].icon, {
                      color: "white",
                      size: 24,
                      strokeWidth: 2.5,
                      fill: "white",
                    })}
                  </LinearGradient>
                  <View style={styles.documentInfo}>
                    <Text style={styles.documentName}>
                      {sourceCards[selectedSource].fileExample}
                    </Text>
                    <Text style={styles.documentSize}>
                      {sourceCards[selectedSource].fileSize}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Bot Response with Actions */}
              <View style={styles.botMessage}>
                <View style={styles.botAvatar}>
                  <Text style={styles.botAvatarIcon}>🤖</Text>
                </View>
                <View style={styles.botResponseContainer}>
                  <View style={styles.botBubble}>
                    <Text style={styles.botText}>
                      Nice! What should I do with it?
                    </Text>
                  </View>

                  {/* Action Options Grid */}
                  <View style={styles.actionsGrid}>
                    {actionOptions.map((action, index) => {
                      const IconComponent = action.icon;
                      const isSelected = selectedAction === action.label;
                      const shouldShow = !selectedAction || isSelected;

                      if (!shouldShow) return null;

                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => handleActionSelect(action.label)}
                          activeOpacity={0.8}
                          disabled={isSelected}
                          style={[
                            styles.actionCard,
                            action.fullWidth && styles.actionCardFull,
                            isSelected && {
                              borderWidth: 2,
                              borderColor: action.color,
                              backgroundColor: action.bgColor,
                            },
                          ]}
                        >
                          <View
                            style={[
                              styles.actionIconContainer,
                              { backgroundColor: action.bgColor },
                              isSelected && {
                                backgroundColor: action.color,
                              },
                            ]}
                          >
                            <IconComponent
                              color={isSelected ? "white" : action.color}
                              size={20}
                              strokeWidth={2.5}
                            />
                          </View>
                          <Text
                            style={[
                              styles.actionLabel,
                              isSelected && { color: action.color },
                            ]}
                          >
                            {action.label}
                          </Text>
                          {isSelected && (
                            <View
                              style={[
                                styles.selectedBadge,
                                { backgroundColor: action.color },
                              ]}
                            >
                              <Text style={styles.selectedBadgeText}>✓</Text>
                            </View>
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              </View>

              {/* Loading State */}
              {isProcessing && (
                <View style={styles.loadingSection}>
                  <View style={styles.botMessage}>
                    <View style={styles.botAvatar}>
                      <Text style={styles.botAvatarIcon}>🤖</Text>
                    </View>
                    <View style={styles.loadingCard}>
                      {/* Animated Header */}
                      <View style={styles.loadingHeader}>
                        <View style={styles.aiIndicator}>
                          <Animated.View style={[styles.aiPulse, pulseStyle]} />
                          <Text style={styles.aiText}>AI PROCESSING</Text>
                        </View>
                      </View>

                      {/* Main Loading Message */}
                      <Text style={styles.loadingMessage}>
                        {selectedAction === "Summary"
                          ? "Analyzing your document and extracting key concepts..."
                          : selectedAction === "Flashcards"
                            ? "Creating smart flashcards from your content..."
                            : "Generating quiz questions based on your material..."}
                      </Text>

                      {/* Animated Progress Bar */}
                      <View style={styles.progressContainer}>
                        <View style={styles.progressTrack}>
                          <Animated.View style={progressStyle}>
                            <LinearGradient
                              colors={["#6B4DE6", "#FF7A59"]}
                              start={{ x: 0, y: 0 }}
                              end={{ x: 1, y: 0 }}
                              style={styles.progressBar}
                            />
                          </Animated.View>
                        </View>
                        <Text style={styles.progressText}>
                          This may take a few seconds...
                        </Text>
                      </View>

                      {/* Processing Stats */}
                      <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                          <Sparkles
                            color="#6750A4"
                            size={16}
                            strokeWidth={2.5}
                          />
                          <Text style={styles.statText}>Analyzing</Text>
                        </View>
                        <View style={styles.statItem}>
                          <Layers color="#00A86B" size={16} strokeWidth={2.5} />
                          <Text style={styles.statText}>Processing</Text>
                        </View>
                        <View style={styles.statItem}>
                          <FileText
                            color="#FF7A59"
                            size={16}
                            strokeWidth={2.5}
                          />
                          <Text style={styles.statText}>Generating</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </>
          )}

          {/* Bottom Spacing for Tab Bar */}
          <View style={{ height: 120 }} />
        </ScrollView>

        {/* Floating Input Bar - Only on Home Screen */}
        {selectedSource === null && (
          <View style={styles.inputContainer}>
            <View style={styles.inputBar}>
              <View style={styles.attachButton}>
                <Paperclip color="#7a7582" size={20} strokeWidth={2.5} />
              </View>
              <Text style={styles.inputPlaceholder}>
                Tap above to choose a source...
              </Text>
              <View style={styles.sendButton}>
                <Send color="white" size={18} strokeWidth={2.5} />
              </View>
            </View>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFC",
  },
  scanLine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    opacity: 0.5,
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
    gap: 12,
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#6750a4",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1d1b20",
    fontFamily: "PlusJakartaSans_800ExtraBold",
    letterSpacing: -0.5,
  },
  levelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 2,
  },
  levelBar: {
    width: 96,
    height: 8,
    backgroundColor: "#f2ecf4",
    borderRadius: 999,
    overflow: "hidden",
  },
  levelProgress: {
    width: "66%",
    height: "100%",
  },
  levelText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#6750a4",
    fontFamily: "PlusJakartaSans_700Bold",
    letterSpacing: -0.5,
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
  streakBadge: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#f3f4f6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  streakText: {
    fontSize: 18,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  botMessage: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 32,
  },
  botAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#6750a4",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(75, 54, 204, 0.15)",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 8,
  },
  botAvatarIcon: {
    fontSize: 20,
  },
  botBubble: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#f1f5f9",
    shadowColor: "rgba(75, 54, 204, 0.15)",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 8,
    maxWidth: "85%",
  },
  botText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1d1b20",
    fontFamily: "PlusJakartaSans_600SemiBold",
    lineHeight: 26,
  },
  botResponseContainer: {
    flex: 1,
    gap: 16,
  },
  sourceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 32,
  },
  sourceCard: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 32,
    overflow: "hidden",
  },
  sourceCardGradient: {
    flex: 1,
    padding: 24,
    justifyContent: "space-between",
  },
  sourceCardIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  sourceCardContent: {
    gap: 4,
  },
  sourceCardLabel: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
    fontFamily: "PlusJakartaSans_700Bold",
    lineHeight: 24,
  },
  sourceCardSubtitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.8)",
    fontFamily: "PlusJakartaSans_500Medium",
  },
  userMessage: {
    alignItems: "flex-end",
    marginBottom: 32,
  },
  documentCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "rgba(103, 80, 164, 0.1)",
    shadowColor: "rgba(75, 54, 204, 0.15)",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 8,
    maxWidth: "80%",
  },
  documentIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  documentInfo: {
    flex: 1,
    gap: 4,
  },
  documentName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1d1b20",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  documentSize: {
    fontSize: 10,
    fontWeight: "500",
    color: "#64748b",
    fontFamily: "PlusJakartaSans_500Medium",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  actionsGrid: {
    flexDirection: "column",
    gap: 12,
    width: "100%",
  },
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#f1f5f9",
    shadowColor: "rgba(75, 54, 204, 0.15)",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 4,
    width: "100%",
  },
  actionCardFull: {
    paddingVertical: 20,
  },
  actionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  actionLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1d1b20",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  selectedBadge: {
    marginLeft: "auto",
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedBadgeText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  inputContainer: {
    position: "absolute",
    bottom: 112,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  inputBar: {
    width: "100%",
    maxWidth: 672,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 28,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: "white",
    shadowColor: "rgba(75, 54, 204, 0.12)",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 10,
  },
  attachButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f2ecf4",
    alignItems: "center",
    justifyContent: "center",
  },
  inputPlaceholder: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#494551",
    fontFamily: "PlusJakartaSans_500Medium",
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#6750a4",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.5,
  },
  loadingSection: {
    marginTop: 16,
  },
  loadingCard: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#f1f5f9",
    shadowColor: "rgba(75, 54, 204, 0.15)",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 8,
    maxWidth: "85%",
    gap: 20,
  },
  loadingHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  aiIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  aiPulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#6B4DE6",
  },
  aiText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#6750A4",
    fontFamily: "PlusJakartaSans_800ExtraBold",
    letterSpacing: 2,
  },
  loadingMessage: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1d1b20",
    fontFamily: "PlusJakartaSans_600SemiBold",
    lineHeight: 24,
  },
  progressContainer: {
    gap: 8,
  },
  progressTrack: {
    height: 8,
    backgroundColor: "#f2ecf4",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    width: "100%",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#64748b",
    fontFamily: "PlusJakartaSans_500Medium",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f2ecf4",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748b",
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
});
