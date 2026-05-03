import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    Lightbulb,
    XCircle,
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

export default function QuizScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { getQuizById } = useAppStore();

  const quiz = getQuizById(id as string);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  if (!quiz) {
    return (
      <View style={styles.container}>
        <SafeAreaView edges={["top"]} style={styles.safeArea}>
          <Text style={styles.errorText}>Quiz not found</Text>
        </SafeAreaView>
      </View>
    );
  }

  const currentQuestion = quiz.questions[currentIndex];
  const progress = ((currentIndex + 1) / quiz.questions.length) * 100;

  const handleSelectAnswer = (optionId: string) => {
    if (isAnswered) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedAnswer(optionId);
    setIsAnswered(true);
  };

  const handleNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // Quiz completed
      router.back();
    }
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const getOptionStyle = (optionId: string) => {
    if (!isAnswered) {
      return styles.optionNormal;
    }

    if (optionId === currentQuestion.correctAnswer) {
      return styles.optionCorrect;
    }

    if (
      optionId === selectedAnswer &&
      optionId !== currentQuestion.correctAnswer
    ) {
      return styles.optionWrong;
    }

    return styles.optionNormal;
  };

  const getOptionLabelStyle = (optionId: string) => {
    if (!isAnswered) {
      return styles.optionLabelNormal;
    }

    if (optionId === currentQuestion.correctAnswer) {
      return styles.optionLabelCorrect;
    }

    if (
      optionId === selectedAnswer &&
      optionId !== currentQuestion.correctAnswer
    ) {
      return styles.optionLabelWrong;
    }

    return styles.optionLabelNormal;
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
              <ArrowLeft color="#6750A4" size={28} strokeWidth={2.5} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Study Scanner</Text>
          </View>

          <View style={styles.streakBadge}>
            <Text style={styles.streakNumber}>5</Text>
            <Text style={styles.streakEmoji}>🔥</Text>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Progress Section */}
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>QUIZ PROGRESS</Text>
              <Text style={styles.progressCount}>
                {currentIndex + 1} / {quiz.questions.length}
              </Text>
            </View>
            <View style={styles.progressBarTrack}>
              <LinearGradient
                colors={["#6B4DE6", "#FF7A59"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressBarFill, { width: `${progress}%` }]}
              />
            </View>
          </View>

          {/* Question Card */}
          <View style={styles.questionCard}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>
                {currentQuestion.category}
              </Text>
            </View>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
          </View>

          {/* Options */}
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option) => {
              const isCorrect = option.id === currentQuestion.correctAnswer;
              const isSelected = option.id === selectedAnswer;
              const showIcon = isAnswered && (isCorrect || isSelected);

              return (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => handleSelectAnswer(option.id)}
                  activeOpacity={0.8}
                  disabled={isAnswered}
                  style={[styles.option, getOptionStyle(option.id)]}
                >
                  <View
                    style={[styles.optionLabel, getOptionLabelStyle(option.id)]}
                  >
                    <Text
                      style={[
                        styles.optionLabelText,
                        isAnswered &&
                          isCorrect &&
                          styles.optionLabelTextCorrect,
                        isAnswered &&
                          isSelected &&
                          !isCorrect &&
                          styles.optionLabelTextWrong,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.optionText,
                      isAnswered && styles.optionTextAnswered,
                    ]}
                  >
                    {option.text}
                  </Text>
                  {showIcon && (
                    <View style={styles.optionIcon}>
                      {isCorrect ? (
                        <CheckCircle
                          color="#00D084"
                          size={24}
                          strokeWidth={2.5}
                          fill="#00D084"
                        />
                      ) : (
                        <XCircle
                          color="#FF6B6B"
                          size={24}
                          strokeWidth={2.5}
                          fill="#FF6B6B"
                        />
                      )}
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Explanation (shown after answer) */}
          {isAnswered && (
            <View style={styles.explanationCard}>
              <View style={styles.explanationIcon}>
                <Lightbulb color="#00D084" size={20} strokeWidth={2.5} />
              </View>
              <View style={styles.explanationContent}>
                <Text style={styles.explanationTitle}>EXPERT EXPLANATION</Text>
                <Text style={styles.explanationText}>
                  {currentQuestion.explanation}
                </Text>
              </View>
            </View>
          )}

          {/* Bottom Spacing */}
          <View style={{ height: 200 }} />
        </ScrollView>

        {/* Next Button (Fixed at bottom) */}
        {isAnswered && (
          <View style={styles.nextButtonContainer}>
            <TouchableOpacity
              onPress={handleNext}
              activeOpacity={0.9}
              style={styles.nextButton}
            >
              <LinearGradient
                colors={["#6B4DE6", "#FF7A59"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.nextButtonGradient}
              >
                <Text style={styles.nextButtonText}>
                  {currentIndex === quiz.questions.length - 1
                    ? "Finish Quiz"
                    : "Next Question"}
                </Text>
                <ArrowRight color="white" size={20} strokeWidth={2.5} />
              </LinearGradient>
            </TouchableOpacity>
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
  backButton: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#6750A4",
    fontFamily: "PlusJakartaSans_800ExtraBold",
    letterSpacing: -0.5,
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#ece6ee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  streakNumber: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1d1b20",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  streakEmoji: {
    fontSize: 18,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  progressSection: {
    marginBottom: 48,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 16,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6750A4",
    fontFamily: "PlusJakartaSans_700Bold",
    letterSpacing: 0.5,
  },
  progressCount: {
    fontSize: 14,
    fontWeight: "700",
    color: "#494551",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  progressBarTrack: {
    height: 12,
    width: "100%",
    backgroundColor: "#e1d4fd",
    borderRadius: 6,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 6,
    shadowColor: "rgba(107, 77, 230, 0.4)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  questionCard: {
    backgroundColor: "white",
    borderRadius: 32,
    padding: 32,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
    shadowColor: "rgba(75, 54, 204, 0.12)",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 8,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#e9ddff",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 24,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#4f378a",
    fontFamily: "PlusJakartaSans_700Bold",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  questionText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1d1b20",
    fontFamily: "PlusJakartaSans_800ExtraBold",
    lineHeight: 30,
    letterSpacing: -0.5,
  },
  optionsContainer: {
    gap: 16,
    marginBottom: 40,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 24,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  optionNormal: {
    borderColor: "#f2ecf4",
  },
  optionCorrect: {
    borderColor: "#00D084",
  },
  optionWrong: {
    borderColor: "#FF6B6B",
  },
  optionLabel: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  optionLabelNormal: {
    backgroundColor: "#f8f2fa",
  },
  optionLabelCorrect: {
    backgroundColor: "rgba(0, 208, 132, 0.2)",
  },
  optionLabelWrong: {
    backgroundColor: "rgba(255, 107, 107, 0.2)",
  },
  optionLabelText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6750A4",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  optionLabelTextCorrect: {
    color: "#00D084",
  },
  optionLabelTextWrong: {
    color: "#FF6B6B",
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#494551",
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  optionTextAnswered: {
    color: "#1d1b20",
  },
  optionIcon: {
    marginLeft: 12,
  },
  explanationCard: {
    flexDirection: "row",
    gap: 16,
    backgroundColor: "#f8f2fa",
    borderRadius: 28,
    padding: 24,
    borderLeftWidth: 8,
    borderLeftColor: "#00D084",
    shadowColor: "rgba(75, 54, 204, 0.12)",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 6,
  },
  explanationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0, 208, 132, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  explanationContent: {
    flex: 1,
    gap: 8,
  },
  explanationTitle: {
    fontSize: 10,
    fontWeight: "800",
    color: "#1d1b20",
    fontFamily: "PlusJakartaSans_800ExtraBold",
    letterSpacing: 1.5,
  },
  explanationText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#494551",
    fontFamily: "PlusJakartaSans_500Medium",
    lineHeight: 22,
  },
  nextButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingVertical: 24,
    paddingBottom: 120,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderTopWidth: 1,
    borderTopColor: "#ece6ee",
  },
  nextButton: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "rgba(107, 77, 230, 0.3)",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
  nextButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 20,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "white",
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
