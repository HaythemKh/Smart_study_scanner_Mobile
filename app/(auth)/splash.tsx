import { LinearGradient } from "expo-linear-gradient";
import { Href, useRouter } from "expo-router";
import {
  Clock,
  FileText,
  HelpCircle,
  Layers,
  Sparkles,
} from "lucide-react-native";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter();

  // Animation Values
  const innerRingRotation = useSharedValue(0);
  const middleRingRotation = useSharedValue(0);
  const outerRingRotation = useSharedValue(0);
  const logoScale = useSharedValue(0.8);
  const logoOpacity = useSharedValue(0);
  const float1Y = useSharedValue(0);
  const float2Y = useSharedValue(0);
  const float3Y = useSharedValue(0);
  const loaderProgress = useSharedValue(0);

  useEffect(() => {
    // Logo entrance
    logoScale.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.back(1.2)),
    });
    logoOpacity.value = withTiming(1, { duration: 600 });

    // Orbital rings
    innerRingRotation.value = withRepeat(
      withTiming(360, { duration: 15000, easing: Easing.linear }),
      -1,
    );
    middleRingRotation.value = withRepeat(
      withTiming(-360, { duration: 25000, easing: Easing.linear }),
      -1,
    );
    outerRingRotation.value = withRepeat(
      withTiming(360, { duration: 40000, easing: Easing.linear }),
      -1,
    );

    // Floating geometries
    float1Y.value = withRepeat(
      withSequence(
        withTiming(-20, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );
    float2Y.value = withRepeat(
      withSequence(
        withTiming(-20, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );
    float3Y.value = withRepeat(
      withSequence(
        withTiming(-20, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );

    // Loader animation
    loaderProgress.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 0 }),
      ),
      -1,
    );

    // Navigate after delay
    const timer = setTimeout(() => {
      router.replace("/(auth)/onboarding" as Href);
    }, 3500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const innerRingStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${innerRingRotation.value}deg` }],
  }));

  const middleRingStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${middleRingRotation.value}deg` }],
  }));

  const outerRingStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${outerRingRotation.value}deg` }],
  }));

  const float1Style = useAnimatedStyle(() => ({
    transform: [{ translateY: float1Y.value }],
  }));

  const float2Style = useAnimatedStyle(() => ({
    transform: [{ translateY: float2Y.value }],
  }));

  const float3Style = useAnimatedStyle(() => ({
    transform: [{ translateY: float3Y.value }],
  }));

  const loaderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: (loaderProgress.value - 0.33) * width * 0.6 }],
  }));

  return (
    <View style={styles.container}>
      {/* Orbital Rings */}
      <View style={styles.orbitalsContainer}>
        {/* Inner Ring */}
        <Animated.View style={[styles.ring, styles.innerRing, innerRingStyle]}>
          <View style={[styles.orbitDot, styles.primaryDot, { top: -6 }]} />
        </Animated.View>

        {/* Middle Ring */}
        <Animated.View
          style={[styles.ring, styles.middleRing, middleRingStyle]}
        >
          <View style={[styles.orbitDot, styles.tertiaryDot, { left: -8 }]} />
        </Animated.View>

        {/* Outer Ring */}
        <Animated.View style={[styles.ring, styles.outerRing, outerRingStyle]}>
          <View
            style={[
              styles.orbitDot,
              styles.secondaryDot,
              { bottom: "25%", right: -4 },
            ]}
          />
        </Animated.View>
      </View>

      {/* Floating Geometries */}
      <Animated.Text
        style={[styles.floatingGeometry, styles.float1, float1Style]}
      >
        ✦
      </Animated.Text>
      <Animated.Text
        style={[styles.floatingGeometry, styles.float2, float2Style]}
      >
        ◆
      </Animated.Text>
      <Animated.Text
        style={[styles.floatingGeometry, styles.float3, float3Style]}
      >
        ●
      </Animated.Text>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Logo Card */}
        <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
          <View style={styles.logoGlow} />
          <LinearGradient
            colors={["#6750a4", "#4f378a", "#63597c"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoGradient}
          >
            <View style={styles.logoInner}>
              <FileText color="white" size={56} strokeWidth={2} />
              <View style={styles.logoBadge}>
                <LinearGradient
                  colors={["#c9a74d", "#765b00"]}
                  style={styles.badgeGradient}
                >
                  <Clock color="#09060F" size={16} strokeWidth={3} />
                </LinearGradient>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Branding Text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Smart Study</Text>
          <LinearGradient
            colors={["#cfbcff", "#e7c365", "#cdc0e9"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientTextWrapper}
          >
            <Text style={styles.gradientTitle}>Scanner</Text>
          </LinearGradient>
          <Text style={styles.subtitle}>
            Next-generation cognitive document processing.
          </Text>
        </View>

        {/* Pill Badges */}
        <View style={styles.badgesContainer}>
          <View style={styles.badge}>
            <Sparkles color="#cfbcff" size={14} strokeWidth={2.5} />
            <Text style={styles.badgeText}>SUMMARIES</Text>
          </View>
          <View style={styles.badge}>
            <Layers color="#e7c365" size={14} strokeWidth={2.5} />
            <Text style={styles.badgeText}>FLASHCARDS</Text>
          </View>
          <View style={styles.badge}>
            <HelpCircle color="#cdc0e9" size={14} strokeWidth={2.5} />
            <Text style={styles.badgeText}>QUIZZES</Text>
          </View>
        </View>

        {/* Loading Indicator */}
        <View style={styles.loaderContainer}>
          <View style={styles.loaderTrack}>
            <Animated.View style={[styles.loaderBar, loaderStyle]}>
              <LinearGradient
                colors={["#6750a4", "#c9a74d"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.loaderGradient}
              />
            </Animated.View>
          </View>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>PREPARING YOUR STUDY SESSION...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09060F",
    alignItems: "center",
    justifyContent: "center",
  },
  orbitalsContainer: {
    position: "absolute",
    width: width,
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
  ring: {
    position: "absolute",
    borderRadius: 9999,
    borderWidth: 1,
    borderStyle: "dashed",
  },
  innerRing: {
    width: 300,
    height: 300,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  middleRing: {
    width: 500,
    height: 500,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  outerRing: {
    width: 750,
    height: 750,
    borderColor: "rgba(255, 255, 255, 0.02)",
  },
  orbitDot: {
    position: "absolute",
    borderRadius: 999,
    left: "50%",
    top: "50%",
  },
  primaryDot: {
    width: 12,
    height: 12,
    backgroundColor: "#6750a4",
    shadowColor: "#6750a4",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 10,
  },
  tertiaryDot: {
    width: 16,
    height: 16,
    backgroundColor: "#c9a74d",
    shadowColor: "#c9a74d",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 10,
  },
  secondaryDot: {
    width: 8,
    height: 8,
    backgroundColor: "#cdc0e9",
    shadowColor: "#cdc0e9",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 8,
  },
  floatingGeometry: {
    position: "absolute",
    fontSize: 24,
    color: "rgba(255, 255, 255, 0.2)",
  },
  float1: {
    top: "25%",
    left: "25%",
  },
  float2: {
    bottom: "25%",
    right: "25%",
    fontSize: 32,
    opacity: 0.1,
  },
  float3: {
    top: "33%",
    right: "33%",
    fontSize: 20,
    opacity: 0.3,
  },
  content: {
    alignItems: "center",
    zIndex: 10,
  },
  logoContainer: {
    marginBottom: 48,
    position: "relative",
  },
  logoGlow: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#6750a4",
    opacity: 0.3,
    top: "50%",
    left: "50%",
    marginLeft: -80,
    marginTop: -80,
  },
  logoGradient: {
    width: 128,
    height: 128,
    borderRadius: 32,
    padding: 2,
    shadowColor: "#6750a4",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 15,
  },
  logoInner: {
    flex: 1,
    backgroundColor: "#09060F",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  logoBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    borderRadius: 999,
    borderWidth: 4,
    borderColor: "#09060F",
  },
  badgeGradient: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  title: {
    fontSize: 48,
    fontWeight: "800",
    color: "white",
    fontFamily: "PlusJakartaSans_800ExtraBold",
    letterSpacing: -1.5,
    textAlign: "center",
  },
  gradientTextWrapper: {
    borderRadius: 8,
  },
  gradientTitle: {
    fontSize: 48,
    fontWeight: "800",
    fontFamily: "PlusJakartaSans_800ExtraBold",
    letterSpacing: -1.5,
    color: "transparent",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.4)",
    fontFamily: "PlusJakartaSans_500Medium",
    marginTop: 16,
    textAlign: "center",
    maxWidth: 320,
    letterSpacing: 0.5,
  },
  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    marginBottom: 80,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.8)",
    letterSpacing: 2,
    fontFamily: "PlusJakartaSans_700Bold",
  },
  loaderContainer: {
    width: width * 0.6,
    alignItems: "center",
  },
  loaderTrack: {
    width: "100%",
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 3,
    overflow: "hidden",
  },
  loaderBar: {
    width: "33%",
    height: "100%",
  },
  loaderGradient: {
    flex: 1,
    borderRadius: 3,
  },
  footer: {
    position: "absolute",
    bottom: 40,
    fontSize: 10,
    fontWeight: "700",
    color: "rgba(207, 188, 255, 0.3)",
    letterSpacing: 4,
    fontFamily: "PlusJakartaSans_700Bold",
  },
});
