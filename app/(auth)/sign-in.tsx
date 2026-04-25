import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsLoading(true);

    // Simulate sign-in
    setTimeout(() => {
      setIsLoading(false);
      router.replace("/(tabs)/chat");
    }, 1500);
  };

  return (
    <View style={styles.container}>
      {/* Background gradient */}
      <LinearGradient
        colors={["#09060F", "#1A0F2E", "#09060F"]}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Floating gradient orbs */}
      <View style={styles.orb1}>
        <LinearGradient
          colors={["rgba(107,77,230,0.15)", "rgba(107,77,230,0.05)"]}
          style={styles.orbGradient}
        />
      </View>
      <View style={styles.orb2}>
        <LinearGradient
          colors={["rgba(200,77,217,0.12)", "rgba(200,77,217,0.03)"]}
          style={styles.orbGradient}
        />
      </View>

      <SafeAreaView style={styles.safeArea}>
        {/* Content */}
        <View style={styles.content}>
          {/* Logo Section */}
          <Animated.View
            entering={FadeInUp.springify().damping(15).delay(100)}
            style={styles.logoSection}
          >
            {/* Logo with glow */}
            <View style={styles.logoContainer}>
              <View style={styles.logoGlow} />
              <LinearGradient
                colors={["#6B4DE6", "#C84DD9", "#FF7A59"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.logo}
              >
                <Text style={styles.logoEmoji}>🎓</Text>
              </LinearGradient>
              {/* Badge */}
              <LinearGradient
                colors={["#FFD980", "#FFA94D"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.badge}
              >
                <Text style={styles.badgeEmoji}>⚡</Text>
              </LinearGradient>
            </View>

            {/* Title */}
            <Text style={styles.title}>Smart Study Scanner</Text>
            <Text style={styles.subtitle}>
              Level up your learning. Scan any notes and turn them into
              power-study materials instantly.
            </Text>
          </Animated.View>

          {/* Spacer */}
          <View style={{ flex: 1 }} />

          {/* Bottom Section */}
          <Animated.View
            entering={FadeInDown.springify().damping(15).delay(300)}
            style={styles.bottomSection}
          >
            {/* Glass Card */}
            <View style={styles.glassCard}>
              {/* Google Sign In Button */}
              <TouchableOpacity
                onPress={handleGoogleSignIn}
                disabled={isLoading}
                activeOpacity={0.8}
                style={styles.googleButton}
              >
                {/* Google Icon */}
                <View style={styles.googleIcon}>
                  <Text style={styles.googleIconText}>G</Text>
                </View>
                <Text style={styles.googleButtonText}>
                  {isLoading ? "Signing in..." : "Continue with Google"}
                </Text>
              </TouchableOpacity>

              {/* Terms */}
              <Text style={styles.terms}>
                By continuing, you agree to our{" "}
                <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </View>

            {/* Support Badge */}
            <View style={styles.supportBadge}>
              <Text style={styles.lockEmoji}>🔒</Text>
              <Text style={styles.supportText}>Secure Academic Cloud Sync</Text>
            </View>
          </Animated.View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09060F",
  },
  safeArea: {
    flex: 1,
  },
  // Floating orbs
  orb1: {
    position: "absolute",
    top: "15%",
    left: "-10%",
    width: 300,
    height: 300,
  },
  orb2: {
    position: "absolute",
    bottom: "20%",
    right: "-10%",
    width: 320,
    height: 320,
  },
  orbGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 9999,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  // Logo Section
  logoSection: {
    alignItems: "center",
    marginTop: 40,
  },
  logoContainer: {
    position: "relative",
    marginBottom: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  logoGlow: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 40,
    backgroundColor: "#6B4DE6",
    opacity: 0.3,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6B4DE6",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 12,
  },
  logoEmoji: {
    fontSize: 60,
  },
  badge: {
    position: "absolute",
    top: -8,
    right: -8,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FFD980",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  badgeEmoji: {
    fontSize: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 16,
    fontFamily: "PlusJakartaSans_800ExtraBold",
    letterSpacing: -0.72,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "rgba(255,255,255,0.5)",
    textAlign: "center",
    maxWidth: 300,
    lineHeight: 22,
    fontFamily: "PlusJakartaSans_500Medium",
  },
  // Bottom Section
  bottomSection: {
    width: "100%",
  },
  glassCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: "#6B4DE6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  googleButton: {
    height: 56,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  googleIcon: {
    width: 24,
    height: 24,
    backgroundColor: "#4285F4",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  googleIconText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1530",
    fontFamily: "PlusJakartaSans_600SemiBold",
    letterSpacing: -0.16,
  },
  terms: {
    fontSize: 11,
    fontWeight: "500",
    color: "rgba(255,255,255,0.4)",
    textAlign: "center",
    marginTop: 16,
    paddingHorizontal: 12,
    fontFamily: "PlusJakartaSans_500Medium",
    lineHeight: 16,
  },
  termsLink: {
    color: "#A36BFF",
    textDecorationLine: "underline",
  },
  supportBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    gap: 4,
  },
  lockEmoji: {
    fontSize: 12,
  },
  supportText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#A36BFF",
    fontFamily: "PlusJakartaSans_600SemiBold",
    letterSpacing: 0.3,
  },
});
