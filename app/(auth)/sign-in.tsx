import MaskedView from "@react-native-masked-view/masked-view";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { Href, useRouter } from "expo-router";
import { ArrowLeft, Zap } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

import { useAuth } from "../../contexts/AuthContext";

// Google Icon Component
function GoogleIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <Path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <Path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <Path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </Svg>
  );
}

export default function SignInScreen() {
  const router = useRouter();
  const { signIn, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Floating animation
  const floatingY = useSharedValue(0);

  React.useEffect(() => {
    floatingY.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const floatingStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatingY.value }],
  }));

  const handleGoogleSignIn = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setIsLoading(true);

      // Sign in with Google using AuthContext
      await signIn();

      // Navigate to main app on success
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace("/(tabs)/chat" as Href);
    } catch (error) {
      console.error("Sign in error:", error);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

      Alert.alert(
        "Sign In Failed",
        "Unable to sign in with Google. Please try again.",
        [{ text: "OK" }],
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonLoading = isLoading || authLoading;

  return (
    <View style={styles.container}>
      {/* Top Hero Section */}
      <LinearGradient
        colors={["#3a1fb0", "#FF7A59"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroSection}
      >
        {/* Background Decorative Glows */}
        <View style={styles.glowTop} />
        <View style={styles.glowBottom} />

        {/* Header */}
        <SafeAreaView edges={["top"]} style={styles.header}>
          <TouchableOpacity
            onPress={() => router.replace("/(auth)/onboarding" as Href)}
            style={styles.backButton}
          >
            <ArrowLeft color="white" size={24} strokeWidth={2.5} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Study Scanner</Text>
          <View style={styles.streakBadge}>
            <Text style={styles.streakText}>5 🔥</Text>
          </View>
        </SafeAreaView>

        {/* Floating Content */}
        <View style={styles.heroContent}>
          <Animated.View style={[styles.floatingContainer, floatingStyle]}>
            {/* Main Book Emoji/Icon */}
            <Text style={styles.bookEmoji}>📚</Text>

            {/* XP Badge */}
            <View style={styles.xpBadge}>
              <Zap color="#4f378a" size={14} fill="#4f378a" strokeWidth={2.5} />
              <Text style={styles.xpText}>+120 XP</Text>
            </View>
          </Animated.View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statBadge}>
              <Text style={styles.statText}>🔥 7-day streak</Text>
            </View>
            <View style={styles.statBadge}>
              <Text style={styles.statText}>★★★★★ 4.9</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        {/* Grab Handle */}
        <View style={styles.grabHandle} />

        <View style={styles.contentContainer}>
          {/* Headline */}
          <View style={styles.headlineContainer}>
            <View style={styles.headlineWrapper}>
              <Text style={styles.headline}>Master any subject </Text>
              <MaskedView
                maskElement={
                  <Text style={styles.headlineGradient}>in seconds</Text>
                }
              >
                <LinearGradient
                  colors={["#6B4DE6", "#FF7A59"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={[styles.headlineGradient, { opacity: 0 }]}>
                    in seconds
                  </Text>
                </LinearGradient>
              </MaskedView>
            </View>
            <Text style={styles.subheadline}>
              Master any subject in seconds with our hyper-intelligent document
              scanning engine.
            </Text>
          </View>

          {/* Google Sign In Button */}
          <TouchableOpacity
            onPress={handleGoogleSignIn}
            disabled={isButtonLoading}
            activeOpacity={0.9}
            style={styles.googleButton}
          >
            <GoogleIcon />
            <Text style={styles.googleButtonText}>
              {isButtonLoading ? "Signing in..." : "Continue with Google"}
            </Text>
          </TouchableOpacity>

          {/* Trust Footer */}
          <Text style={styles.footer}>
            BY SIGNING UP, YOU AGREE TO OUR{" "}
            <Text style={styles.footerLink}>TERMS</Text> &{" "}
            <Text style={styles.footerLink}>PRIVACY</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFC",
  },
  heroSection: {
    height: "49%",
    position: "relative",
    overflow: "hidden",
  },
  glowTop: {
    position: "absolute",
    top: 40,
    left: 40,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  glowBottom: {
    position: "absolute",
    bottom: 40,
    right: 40,
    width: 192,
    height: 192,
    borderRadius: 96,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    zIndex: 50,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "white",
    fontFamily: "PlusJakartaSans_800ExtraBold",
    letterSpacing: -0.5,
  },
  streakBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  streakText: {
    fontSize: 14,
    fontWeight: "700",
    color: "white",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  heroContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    zIndex: 10,
  },
  floatingContainer: {
    alignItems: "center",
    marginBottom: 24,
    position: "relative",
  },
  bookEmoji: {
    fontSize: 128,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 10 },
    textShadowRadius: 20,
  },
  xpBadge: {
    position: "absolute",
    top: 48,
    left: -48,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    shadowColor: "rgba(75, 54, 204, 0.15)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 8,
  },
  xpText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#4f378a",
    fontFamily: "PlusJakartaSans_800ExtraBold",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
  },
  statBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  statText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1d1b20",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    marginTop: -32,
    paddingTop: 48,
    paddingHorizontal: 32,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -20 },
    shadowOpacity: 0.1,
    shadowRadius: 60,
    elevation: 20,
    zIndex: 20,
  },
  grabHandle: {
    position: "absolute",
    top: 16,
    alignSelf: "center",
    width: 48,
    height: 6,
    backgroundColor: "#f2ecf4",
    borderRadius: 3,
  },
  contentContainer: {
    flex: 1,
    maxWidth: 400,
    alignSelf: "center",
    width: "100%",
    gap: 32,
  },
  headlineContainer: {
    gap: 12,
  },
  headlineWrapper: {
    alignItems: "center",
  },
  headline: {
    fontSize: 35,
    fontWeight: "800",
    color: "#1d1b20",
    fontFamily: "PlusJakartaSans_800ExtraBold",
    letterSpacing: -0.8,
    lineHeight: 36,
    textAlign: "center",
  },
  headlineGradient: {
    fontSize: 30,
    fontWeight: "800",
    fontFamily: "PlusJakartaSans_800ExtraBold",
    letterSpacing: -0.8,
    textAlign: "center",
  },
  subheadline: {
    fontSize: 14,
    fontWeight: "500",
    color: "#494551",
    fontFamily: "PlusJakartaSans_500Medium",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 16,
  },
  googleButton: {
    height: 64,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#e6e0e9",
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  googleButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1d1b20",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  footer: {
    fontSize: 10,
    fontWeight: "700",
    color: "#7a7582",
    fontFamily: "PlusJakartaSans_700Bold",
    textAlign: "center",
    letterSpacing: 1.5,
  },
  footerLink: {
    textDecorationLine: "underline",
  },
});
