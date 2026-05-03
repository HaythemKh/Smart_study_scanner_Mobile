import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { BookOpen, Check, Lightbulb, X, Zap } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppStore } from "../../store/useAppStore";

export default function FlashcardsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { getFlashcardDeckById } = useAppStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const flipRotation = useSharedValue(0);

  // Define animated styles before any conditional returns
  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipRotation.value, [0, 180], [0, 180]);
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      backfaceVisibility: "hidden",
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipRotation.value, [0, 180], [180, 360]);
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      backfaceVisibility: "hidden",
    };
  });

  const deck = getFlashcardDeckById(id as string);

  if (!deck) {
    return (
      <View style={styles.container}>
        <SafeAreaView edges={["top"]} style={styles.safeArea}>
          <Text style={styles.errorText}>Flashcard deck not found</Text>
        </SafeAreaView>
      </View>
    );
  }

  const currentCard = deck.cards[currentIndex];
  const progress = ((currentIndex + 1) / deck.cards.length) * 100;

  const handleFlip = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsFlipped(!isFlipped);
    flipRotation.value = withSpring(isFlipped ? 0 : 180, {
      damping: 15,
      stiffness: 100,
    });
  };

  const handleNext = (gotIt: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (currentIndex < deck.cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      flipRotation.value = 0;
    } else {
      // Finished all cards
      router.back();
    }
  };

  const handleClose = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        {/* Top Navigation */}
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={handleClose}
            style={styles.closeButton}
            activeOpacity={0.7}
          >
            <X color="#1d1b20" size={24} strokeWidth={2.5} />
          </TouchableOpacity>

          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>
              Card {currentIndex + 1} of {deck.cards.length}
            </Text>
          </View>

          <View style={styles.percentBadge}>
            <Text style={styles.percentText}>{Math.round(progress)}%</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarTrack}>
            <LinearGradient
              colors={["#6750A4", "#FF7A59"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressBarFill, { width: `${progress}%` }]}
            />
          </View>
        </View>

        {/* Card Container */}
        <View style={styles.cardContainer}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={handleFlip}
            style={styles.cardTouchable}
          >
            <View style={styles.cardWrapper}>
              {/* Front Side */}
              <Animated.View style={[styles.card, frontAnimatedStyle]}>
                <LinearGradient
                  colors={["#6B4DE6", "#4f378a", "#22005d"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.cardGradient}
                >
                  <View style={styles.cardIconTop}>
                    <Lightbulb color="rgba(255, 255, 255, 0.4)" size={40} />
                  </View>
                  <Text style={styles.questionText}>
                    {currentCard.question}
                  </Text>
                  <Text style={styles.tapHint}>Tap to reveal answer</Text>
                </LinearGradient>
              </Animated.View>

              {/* Back Side */}
              <Animated.View
                style={[styles.card, styles.cardBack, backAnimatedStyle]}
              >
                <View style={styles.decorativeBlur} />
                <View style={styles.cardBackContent}>
                  <Zap
                    color="#6750A4"
                    size={48}
                    strokeWidth={2.5}
                    fill="#6750A4"
                  />
                  <Text style={styles.answerText}>{currentCard.answer}</Text>

                  {currentCard.keyTerms && (
                    <View style={styles.keyTermsSection}>
                      <View style={styles.keyTermsHeader}>
                        <View style={styles.keyTermsIcon}>
                          <BookOpen
                            color="#594400"
                            size={20}
                            strokeWidth={2.5}
                          />
                        </View>
                        <View style={styles.keyTermsContent}>
                          <Text style={styles.keyTermsTitle}>KEY TERMS</Text>
                          <Text style={styles.keyTermsText}>
                            {currentCard.keyTerms}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              </Animated.View>
            </View>
          </TouchableOpacity>

          {/* Hint */}
          <View style={styles.hintContainer}>
            <Text style={styles.hintText}>
              Swipe left for &apos;Again&apos;, right for &apos;Got It&apos;
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            onPress={() => handleNext(false)}
            activeOpacity={0.8}
            style={styles.reviewButton}
          >
            <View style={styles.reviewButtonIcon}>
              <Text style={styles.reviewButtonEmoji}>😕</Text>
            </View>
            <Text style={styles.reviewButtonText}>REVIEW AGAIN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleNext(true)}
            activeOpacity={0.8}
            style={styles.gotItButton}
          >
            <LinearGradient
              colors={["#00C853", "#009624"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gotItButtonGradient}
            >
              <View style={styles.gotItButtonIcon}>
                <Check color="white" size={24} strokeWidth={3} />
              </View>
              <Text style={styles.gotItButtonText}>GOT IT!</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
    paddingVertical: 24,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f8f2fa",
    alignItems: "center",
    justifyContent: "center",
  },
  progressInfo: {
    alignItems: "center",
  },
  progressText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#7a7582",
    fontFamily: "PlusJakartaSans_700Bold",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  percentBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f8f2fa",
    alignItems: "center",
    justifyContent: "center",
  },
  percentText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6750A4",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  progressBarContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  progressBarTrack: {
    width: "100%",
    height: 12,
    backgroundColor: "rgba(103, 80, 164, 0.2)",
    borderRadius: 6,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 6,
    shadowColor: "rgba(103, 80, 164, 0.4)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  cardTouchable: {
    width: "100%",
    aspectRatio: 3 / 4,
    maxHeight: 600,
  },
  cardWrapper: {
    flex: 1,
    position: "relative",
  },
  card: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 32,
    shadowColor: "rgba(75, 54, 204, 0.15)",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 10,
  },
  cardGradient: {
    flex: 1,
    borderRadius: 32,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  cardIconTop: {
    position: "absolute",
    top: 24,
    right: 32,
  },
  questionText: {
    fontSize: 32,
    fontWeight: "800",
    color: "white",
    fontFamily: "PlusJakartaSans_800ExtraBold",
    textAlign: "center",
    lineHeight: 40,
    letterSpacing: -1,
  },
  tapHint: {
    marginTop: 32,
    fontSize: 12,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.6)",
    fontFamily: "PlusJakartaSans_500Medium",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  cardBack: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "rgba(103, 80, 164, 0.1)",
  },
  decorativeBlur: {
    position: "absolute",
    top: -48,
    right: -48,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: "rgba(103, 80, 164, 0.05)",
  },
  cardBackContent: {
    flex: 1,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  answerText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#494551",
    fontFamily: "PlusJakartaSans_700Bold",
    textAlign: "center",
    lineHeight: 36,
  },
  keyTermsSection: {
    marginTop: 48,
    paddingTop: 32,
    borderTopWidth: 1,
    borderTopColor: "#f2ecf4",
    width: "100%",
  },
  keyTermsHeader: {
    flexDirection: "row",
    gap: 16,
  },
  keyTermsIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#ffdf93",
    alignItems: "center",
    justifyContent: "center",
  },
  keyTermsContent: {
    flex: 1,
    gap: 4,
  },
  keyTermsTitle: {
    fontSize: 10,
    fontWeight: "700",
    color: "#7a7582",
    fontFamily: "PlusJakartaSans_700Bold",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  keyTermsText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#494551",
    fontFamily: "PlusJakartaSans_500Medium",
  },
  hintContainer: {
    marginTop: 32,
    alignItems: "center",
  },
  hintText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#7a7582",
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  reviewButton: {
    flex: 1,
    alignItems: "center",
    gap: 8,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "rgba(186, 26, 26, 0.2)",
    backgroundColor: "white",
  },
  reviewButtonIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 218, 214, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  reviewButtonEmoji: {
    fontSize: 24,
  },
  reviewButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#ba1a1a",
    fontFamily: "PlusJakartaSans_800ExtraBold",
    letterSpacing: 1.5,
  },
  gotItButton: {
    flex: 1,
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "rgba(0, 200, 83, 0.25)",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 8,
  },
  gotItButtonGradient: {
    alignItems: "center",
    gap: 8,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  gotItButtonIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  gotItButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: "white",
    fontFamily: "PlusJakartaSans_800ExtraBold",
    letterSpacing: 1.5,
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
