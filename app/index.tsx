import MaskedView from "@react-native-masked-view/masked-view";
import {
  Canvas,
  Circle,
  Line,
  RadialGradient,
  Rect,
  vec,
} from "@shopify/react-native-skia";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

const { width: W, height: H } = Dimensions.get("window");

const C = {
  bg: "#09060F",
  p1: "#6B4DE6",
  p2: "#C84DD9",
  p3: "#FF7A59",
  p4: "#6BC5F8",
  p5: "#FFD166",
  white: "#FFFFFF",
  muted: "rgba(255,255,255,0.4)",
};

const PARTICLE_COUNT = 55;
const CONNECTION_DIST = 80;

function seededRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function buildParticles() {
  const rand = seededRand(42);
  const colors = [C.p1, C.p2, C.p3, C.p4, C.p5];
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    x: rand() * W,
    y: rand() * H,
    vx: (rand() - 0.5) * 0.35,
    vy: (rand() - 0.5) * 0.35,
    r: rand() * 1.8 + 0.3,
    alpha: rand() * 0.55 + 0.1,
    color: colors[Math.floor(rand() * colors.length)],
    phase: rand() * Math.PI * 2,
    twinkle: rand() * 0.018 + 0.004,
  }));
}

const FLOATERS = [
  { x: 52, y: 210, label: "✦", delay: 800, dur: 2800 },
  { x: 308, y: 172, label: "◆", delay: 1100, dur: 3200 },
  { x: 38, y: 508, label: "✦", delay: 1350, dur: 2500 },
  { x: 328, y: 462, label: "●", delay: 950, dur: 3600 },
  { x: 276, y: 670, label: "✦", delay: 1550, dur: 2900 },
  { x: 84, y: 692, label: "◆", delay: 1200, dur: 3100 },
];

const NEBULAS = [
  { cx: 80, cy: 180, r: 180, color: C.p1, opacity: 0.18 },
  { cx: 310, cy: 600, r: 200, color: C.p2, opacity: 0.14 },
  { cx: 195, cy: 400, r: 160, color: C.p3, opacity: 0.1 },
  { cx: 55, cy: 680, r: 140, color: C.p4, opacity: 0.1 },
];

function FloaterDot({
  x,
  y,
  label,
  delay,
  dur,
}: {
  x: number;
  y: number;
  label: string;
  delay: number;
  dur: number;
}) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      scale.value = withSpring(1, { damping: 10, stiffness: 180 });
      opacity.value = withTiming(1, { duration: 400 });
      translateY.value = withRepeat(
        withSequence(
          withTiming(-8, {
            duration: dur / 2,
            easing: Easing.inOut(Easing.sin),
          }),
          withTiming(0, {
            duration: dur / 2,
            easing: Easing.inOut(Easing.sin),
          }),
        ),
        -1,
        true,
      );
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, dur, scale, opacity, translateY]);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[{ position: "absolute", left: x, top: y }, style]}>
      <Text
        style={{
          fontSize: 10,
          color: "rgba(163,107,255,0.4)",
          fontWeight: "700",
        }}
      >
        {label}
      </Text>
    </Animated.View>
  );
}

function OrbitalRing({
  size,
  color,
  duration,
  reverse = false,
  dotSize,
}: {
  size: number;
  color: string;
  duration: number;
  reverse?: boolean;
  dotSize: number;
}) {
  const rotation = useSharedValue(reverse ? 360 : 0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(reverse ? 0 : 360, {
        duration,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 1,
          borderColor: color,
        },
        style,
      ]}
    >
      <View
        style={{
          position: "absolute",
          width: dotSize,
          height: dotSize,
          borderRadius: dotSize / 2,
          backgroundColor: color
            .replace("0.35", "1")
            .replace("0.3", "1")
            .replace("0.25", "1"),
          top: -(dotSize / 2),
          left: size / 2 - dotSize / 2,
          shadowColor: color,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 8,
          elevation: 6,
        }}
      />
    </Animated.View>
  );
}

function LogoCore() {
  const glowScale = useSharedValue(1);

  useEffect(() => {
    glowScale.value = withRepeat(
      withSequence(
        withTiming(1.15, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
        withTiming(1.0, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      true,
    );
  }, [glowScale]);

  const glowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: glowScale.value }],
    opacity: interpolate(glowScale.value, [1, 1.15], [0.5, 0.8]),
  }));

  return (
    <View
      style={{
        width: 80,
        height: 80,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            width: 100,
            height: 100,
            borderRadius: 36,
            backgroundColor: C.p1,
          },
          glowStyle,
        ]}
      />

      <LinearGradient
        colors={[C.p1, C.p2, C.p3]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.logoGradient}
      >
        <View style={styles.docIcon}>
          <View style={styles.docPage}>
            <View style={styles.docFold} />
            <View style={[styles.docLine, { width: 22, top: 14, left: 7 }]} />
            <View style={[styles.docLine, { width: 18, top: 19, left: 7 }]} />
            <View style={[styles.docLine, { width: 20, top: 24, left: 7 }]} />
          </View>

          <View style={styles.clockBadge}>
            <View style={styles.clockCircle}>
              <View style={styles.clockHand} />
              <View style={styles.clockHandMin} />
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

export default function SplashPage() {
  const particles = useRef(buildParticles()).current;

  const orbFloat = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const titleY = useSharedValue(24);
  const pillsOpacity = useSharedValue(0);
  const pillsY = useSharedValue(20);
  const loaderWidth = useSharedValue(0);
  const loaderOpacity = useSharedValue(0);

  useEffect(() => {
    SplashScreen.hideAsync();

    orbFloat.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      true,
    );

    const t1 = setTimeout(() => {
      titleOpacity.value = withTiming(1, { duration: 700 });
      titleY.value = withSpring(0, { damping: 20, stiffness: 160 });
    }, 300);

    const t2 = setTimeout(() => {
      pillsOpacity.value = withTiming(1, { duration: 600 });
      pillsY.value = withSpring(0, { damping: 18, stiffness: 160 });
    }, 550);

    const t3 = setTimeout(() => {
      loaderOpacity.value = withTiming(1, { duration: 400 });
      loaderWidth.value = withTiming(240, {
        duration: 2000,
        easing: Easing.bezier(0.22, 1, 0.36, 1),
      });
    }, 700);

    const t4 = setTimeout(() => {
      router.replace("/(auth)/sign-in");
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [
    orbFloat,
    titleOpacity,
    titleY,
    pillsOpacity,
    pillsY,
    loaderWidth,
    loaderOpacity,
  ]);

  const orbStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: orbFloat.value }],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleY.value }],
  }));

  const pillsStyle = useAnimatedStyle(() => ({
    opacity: pillsOpacity.value,
    transform: [{ translateY: pillsY.value }],
  }));

  const loaderFillStyle = useAnimatedStyle(() => ({
    width: loaderWidth.value,
  }));

  const loaderWrapStyle = useAnimatedStyle(() => ({
    opacity: loaderOpacity.value,
  }));

  return (
    <View style={styles.root}>
      <ParticleCanvas particles={particles} />

      {FLOATERS.map((f, i) => (
        <FloaterDot key={i} {...f} />
      ))}

      <View style={styles.center}>
        <Animated.View style={[styles.orbSystem, orbStyle]}>
          <OrbitalRing
            size={240}
            color="rgba(107,77,230,0.35)"
            duration={8000}
            dotSize={10}
          />
          <OrbitalRing
            size={190}
            color="rgba(200,77,217,0.30)"
            duration={6000}
            reverse
            dotSize={8}
          />
          <OrbitalRing
            size={140}
            color="rgba(255,122,89,0.25)"
            duration={4000}
            dotSize={6}
          />
          <LogoCore />
        </Animated.View>

        <Animated.View style={[styles.titleBlock, titleStyle]}>
          <Text style={styles.titleMain}>Smart Study</Text>
          <GradientText text="Scanner" style={styles.titleSub} />
          <Text style={styles.tagline}>Your AI-powered study companion</Text>
        </Animated.View>

        <Animated.View style={[styles.pills, pillsStyle]}>
          <View style={[styles.pill, styles.pillIndigo]}>
            <Text style={[styles.pillText, { color: "#A78BFF" }]}>
              Summaries
            </Text>
          </View>
          <View style={[styles.pill, styles.pillGrape]}>
            <Text style={[styles.pillText, { color: "#E08BF5" }]}>
              Flashcards
            </Text>
          </View>
          <View style={[styles.pill, styles.pillCoral]}>
            <Text style={[styles.pillText, { color: "#FF9E7A" }]}>Quizzes</Text>
          </View>
        </Animated.View>

        {/* Loader bar - moved inside center */}
        <Animated.View style={[styles.loaderWrap, loaderWrapStyle]}>
          <View style={styles.loaderTrack}>
            <Animated.View style={loaderFillStyle}>
              <LinearGradient
                colors={[C.p1, C.p2, C.p3]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.loaderFill}
              />
            </Animated.View>
          </View>
          <LoadingText />
        </Animated.View>
      </View>
    </View>
  );
}

function ParticleCanvas({
  particles,
}: {
  particles: ReturnType<typeof buildParticles>;
}) {
  const stateRef = useRef(particles.map((p) => ({ ...p })));

  useEffect(() => {
    let frame: number;
    const step = () => {
      stateRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += p.twinkle;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      });
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <Canvas style={StyleSheet.absoluteFillObject}>
      <Rect x={0} y={0} width={W} height={H} color={C.bg} />

      {NEBULAS.map((n, i) => (
        <Circle key={`neb-${i}`} cx={n.cx} cy={n.cy} r={n.r}>
          <RadialGradient
            c={vec(n.cx, n.cy)}
            r={n.r}
            colors={[
              n.color +
                Math.round(n.opacity * 255)
                  .toString(16)
                  .padStart(2, "0"),
              n.color + "00",
            ]}
          />
        </Circle>
      ))}

      {stateRef.current.map((p, i) => (
        <Circle
          key={`p-${i}`}
          cx={p.x}
          cy={p.y}
          r={p.r}
          color={p.color}
          opacity={p.alpha * (0.5 + 0.5 * Math.sin(p.phase))}
        />
      ))}

      {stateRef.current.flatMap((p1, i) =>
        stateRef.current.slice(i + 1).flatMap((p2, j) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d >= CONNECTION_DIST) return [];
          return (
            <Line
              key={`l-${i}-${j}`}
              p1={vec(p1.x, p1.y)}
              p2={vec(p2.x, p2.y)}
              color={`${C.p1}14`}
              strokeWidth={0.5}
            />
          );
        }),
      )}
    </Canvas>
  );
}

function LoadingText() {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 750 }),
        withTiming(0.3, { duration: 750 }),
      ),
      -1,
      true,
    );
  }, [opacity]);

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.Text style={[styles.loaderText, style]}>LOADING</Animated.Text>
  );
}

export function GradientText({ text, style }: { text: string; style?: any }) {
  return (
    <MaskedView maskElement={<Text style={style}>{text}</Text>}>
      <LinearGradient
        colors={["#A36BFF", "#FF7A59"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={[style, { opacity: 0 }]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.bg,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 100,
  },
  center: {
    alignItems: "center",
    gap: 0,
    zIndex: 10,
  },
  orbSystem: {
    width: 240,
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  logoGradient: {
    width: 80,
    height: 80,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  docIcon: {
    width: 36,
    height: 40,
    position: "relative",
  },
  docPage: {
    width: 30,
    height: 36,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.6)",
    overflow: "hidden",
    position: "absolute",
    left: 0,
    top: 0,
  },
  docFold: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    backgroundColor: "rgba(255,255,255,0.45)",
    borderBottomLeftRadius: 4,
  },
  docLine: {
    height: 2,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 1,
    position: "absolute",
  },
  clockBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: C.p5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: C.bg,
  },
  clockCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: C.bg,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  clockHand: {
    position: "absolute",
    width: 1.5,
    height: 3.5,
    backgroundColor: C.bg,
    borderRadius: 1,
    bottom: "50%",
    left: "50%",
    marginLeft: -0.75,
  },
  clockHandMin: {
    position: "absolute",
    width: 1.5,
    height: 3,
    backgroundColor: C.bg,
    borderRadius: 1,
    bottom: "50%",
    left: "50%",
    marginLeft: -0.75,
    transform: [{ rotate: "60deg" }],
  },
  titleBlock: {
    alignItems: "center",
    marginTop: 20,
    gap: 0,
  },
  titleMain: {
    fontSize: 38,
    fontWeight: "800",
    letterSpacing: -0.76,
    color: C.white,
    lineHeight: 44,
    fontFamily: "PlusJakartaSans_800ExtraBold",
  },
  titleSub: {
    fontSize: 38,
    fontWeight: "800",
    letterSpacing: -0.76,
    lineHeight: 44,
    fontFamily: "PlusJakartaSans_800ExtraBold",
    color: "#A36BFF",
  },
  tagline: {
    fontSize: 15,
    fontWeight: "500",
    color: "rgba(255,255,255,0.45)",
    marginTop: 12,
    letterSpacing: 0.3,
    fontFamily: "PlusJakartaSans_500Medium",
  },
  pills: {
    flexDirection: "row",
    gap: 8,
    marginTop: 28,
  },
  pill: {
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 1,
  },
  pillText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
    fontFamily: "PlusJakartaSans_700Bold",
  },
  pillIndigo: {
    backgroundColor: "rgba(107,77,230,0.15)",
    borderColor: "rgba(107,77,230,0.4)",
  },
  pillGrape: {
    backgroundColor: "rgba(200,77,217,0.12)",
    borderColor: "rgba(200,77,217,0.35)",
  },
  pillCoral: {
    backgroundColor: "rgba(255,122,89,0.12)",
    borderColor: "rgba(255,122,89,0.35)",
  },
  loaderWrap: {
    alignItems: "center",
    gap: 16,
    marginTop: 80,
  },
  loaderTrack: {
    width: 240,
    height: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
  loaderFill: {
    height: "100%",
  },
  loaderText: {
    fontSize: 14,
    fontWeight: "700",
    color: "rgba(255,255,255,0.6)",
    letterSpacing: 2,
    fontFamily: "PlusJakartaSans_700Bold",
  },
});
