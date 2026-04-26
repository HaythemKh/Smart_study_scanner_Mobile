import { LinearGradient } from "expo-linear-gradient";
import { Href, useRouter } from "expo-router";
import { Award, Diamond, Flame, Star, Zap } from "lucide-react-native";
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const slides = [
  {
    emoji: "📚",
    title: "Scan Anything",
    description:
      "Upload documents, images, or slides and transform them into study materials instantly.",
    stats: [
      { icon: "file", label: "Docs", color: "#6B4DE6" },
      { icon: "image", label: "Images", color: "#FF7A59" },
      { icon: "presentation", label: "Slides", color: "#6B4DE6" },
    ],
  },
  {
    emoji: "🎯",
    title: "Smart Learning",
    description:
      "AI-powered summaries, flashcards, and quizzes tailored to your study needs.",
    stats: [
      { icon: "sparkles", label: "Summary", color: "#6B4DE6" },
      { icon: "layers", label: "Cards", color: "#FF7A59" },
      { icon: "help", label: "Quiz", color: "#6B4DE6" },
    ],
  },
  {
    emoji: "🏆",
    title: "Level Up Daily",
    description:
      "Turn your notes into missions and unlock new achievements every study session.",
    stats: [
      { icon: "zap", label: "XP", color: "#6B4DE6" },
      { icon: "flame", label: "Streaks", color: "#FF7A59" },
      { icon: "award", label: "24", color: "#6B4DE6" },
    ],
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.replace("/(auth)/sign-in" as Href);
    }
  };

  const slide = slides[currentSlide];

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "zap":
        return Zap;
      case "flame":
        return Flame;
      case "award":
        return Award;
      default:
        return Zap;
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Decorative Elements */}
      <View style={styles.decorativeLeft}>
        <View style={styles.decorativeCard}>
          <View style={[styles.decorativeIcon, { backgroundColor: "#ffdf93" }]}>
            <Star color="#241a00" size={24} fill="#241a00" />
          </View>
          <View style={styles.decorativeLine} />
          <View style={styles.decorativeLineSmall} />
        </View>
      </View>

      <View style={styles.decorativeRight}>
        <View style={styles.decorativeCard}>
          <View style={[styles.decorativeIcon, { backgroundColor: "#e9ddff" }]}>
            <Diamond color="#1f1635" size={24} fill="#1f1635" />
          </View>
          <View style={styles.decorativeLineLong} />
        </View>
      </View>

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Study Scanner</Text>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Hero Visual */}
          <Animated.View
            key={currentSlide}
            entering={FadeInUp.springify().damping(15)}
            style={styles.heroContainer}
          >
            {/* Background Glow */}
            <View style={styles.glow} />

            {/* Emoji */}
            <Text style={styles.emoji}>{slide.emoji}</Text>

            {/* Stats Grid */}
            <View style={styles.statsGrid}>
              {slide.stats.map((stat, index) => {
                const IconComponent = getIconComponent(stat.icon);
                return (
                  <Animated.View
                    key={index}
                    entering={FadeInDown.springify()
                      .damping(15)
                      .delay(100 * index)}
                    style={styles.statCard}
                  >
                    <IconComponent
                      color={stat.color}
                      size={20}
                      strokeWidth={2.5}
                    />
                    <Text style={styles.statLabel}>{stat.label}</Text>
                  </Animated.View>
                );
              })}
            </View>
          </Animated.View>

          {/* Text Content */}
          <Animated.View
            key={`text-${currentSlide}`}
            entering={FadeInUp.springify().damping(15).delay(200)}
            style={styles.textContainer}
          >
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.description}>{slide.description}</Text>
          </Animated.View>

          {/* Navigation */}
          <View style={styles.navigation}>
            {/* Pagination Dots */}
            <View style={styles.pagination}>
              {slides.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    index === currentSlide && styles.dotActive,
                  ]}
                />
              ))}
            </View>

            {/* Action Button */}
            <TouchableOpacity
              onPress={handleNext}
              activeOpacity={0.9}
              style={styles.button}
            >
              <LinearGradient
                colors={["#6B4DE6", "#FF7A59"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>
                  {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
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
  decorativeLeft: {
    position: "absolute",
    bottom: -32,
    left: -32,
    opacity: 0.2,
    transform: [{ rotate: "12deg" }],
    zIndex: 0,
  },
  decorativeRight: {
    position: "absolute",
    top: 80,
    right: -64,
    opacity: 0.2,
    transform: [{ rotate: "-12deg" }],
    zIndex: 0,
  },
  decorativeCard: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  decorativeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  decorativeLine: {
    height: 12,
    width: 96,
    backgroundColor: "#f2ecf4",
    borderRadius: 6,
    marginBottom: 8,
  },
  decorativeLineSmall: {
    height: 8,
    width: 64,
    backgroundColor: "#f8f2fa",
    borderRadius: 4,
  },
  decorativeLineLong: {
    height: 12,
    width: 128,
    backgroundColor: "#f2ecf4",
    borderRadius: 6,
  },
  header: {
    alignItems: "center",
    paddingVertical: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#6750A4",
    fontFamily: "PlusJakartaSans_800ExtraBold",
    letterSpacing: -0.5,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  heroContainer: {
    alignItems: "center",
    marginBottom: 48,
    position: "relative",
  },
  glow: {
    position: "absolute",
    width: 280,
    height: 280,
    backgroundColor: "rgba(103, 80, 164, 0.1)",
    borderRadius: 140,
    top: "50%",
    left: "50%",
    marginLeft: -140,
    marginTop: -140,
  },
  emoji: {
    fontSize: 120,
    marginBottom: 32,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 12,
    width: width - 48,
    maxWidth: 342,
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: 16,
    borderRadius: 24,
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.8)",
    shadowColor: "rgba(75, 54, 204, 0.15)",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 8,
  },
  statLabelGradient: {
    borderRadius: 4,
  },
  statLabel: {
    fontSize: 18,
    fontWeight: "800",
    fontFamily: "PlusJakartaSans_800ExtraBold",
    letterSpacing: -0.5,
    textTransform: "uppercase",
    color: "#1d1b20",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  title: {
    fontSize: 48,
    fontWeight: "800",
    color: "#1d1b20",
    fontFamily: "PlusJakartaSans_800ExtraBold",
    letterSpacing: -1.5,
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 52,
  },
  description: {
    fontSize: 18,
    fontWeight: "500",
    color: "#494551",
    fontFamily: "PlusJakartaSans_500Medium",
    textAlign: "center",
    lineHeight: 28,
    maxWidth: 280,
  },
  navigation: {
    width: "100%",
    gap: 32,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#e6e0e9",
  },
  dotActive: {
    width: 32,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#6B4DE6",
    shadowColor: "#6B4DE6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  button: {
    width: "100%",
    borderRadius: 24,
    shadowColor: "rgba(107, 77, 230, 0.3)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 8,
  },
  buttonGradient: {
    paddingVertical: 20,
    borderRadius: 24,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "800",
    color: "white",
    fontFamily: "PlusJakartaSans_800ExtraBold",
    letterSpacing: -0.5,
  },
});
