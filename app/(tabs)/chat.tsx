import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import {
  Brain,
  Camera,
  FileText,
  Image as ImageIcon,
  Layers,
  Presentation,
  Sparkles,
} from "lucide-react-native";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const colors = {
  primary: "#6B4DE6",
  coral: "#FF7A59",
  mint: "#6EE7C7",
  sun: "#FFD166",
  grape: "#9B5DE5",
  sky: "#6BC5F8",
  background: "#FAFAFC",
  card: "#FFFFFF",
  foreground: "#1A1530",
  muted: "#6B6685",
};

type ConversationStep = "greeting" | "source" | "action" | "result";
type SourceType = "document" | "image" | "camera" | "slides" | null;
type ActionType = "summary" | "flashcards" | "quiz" | null;

export default function ChatScreen() {
  const [step, setStep] = useState<ConversationStep>("greeting");
  const [selectedSource, setSelectedSource] = useState<SourceType>(null);
  const [selectedAction, setSelectedAction] = useState<ActionType>(null);

  const handleSourceSelect = (source: SourceType) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedSource(source);
    setTimeout(() => setStep("action"), 400);
  };

  const handleActionSelect = (action: ActionType) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedAction(action);
    setTimeout(() => setStep("result"), 400);
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setStep("greeting");
    setSelectedSource(null);
    setSelectedAction(null);
  };

  return (
    <View style={styles.container}>
      {/* Background gradient */}
      <LinearGradient
        colors={["#FAFAFC", "#F5F3FF", "#FAFAFC"]}
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animated.View
            entering={FadeInDown.springify().damping(15).delay(100)}
            style={styles.header}
          >
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={[colors.primary, colors.grape] as const}
                style={styles.avatar}
              >
                <Sparkles size={28} color="#fff" strokeWidth={2.5} />
              </LinearGradient>
            </View>
            <Text style={styles.greeting}>Hey there! 👋</Text>
            <Text style={styles.subGreeting}>
              I&apos;m your AI study companion. Let&apos;s turn your materials
              into something amazing!
            </Text>
          </Animated.View>

          {/* Greeting Step */}
          {step === "greeting" && (
            <Animated.View
              entering={FadeInUp.springify().damping(15).delay(200)}
              style={styles.section}
            >
              <Text style={styles.sectionTitle}>
                What would you like to scan?
              </Text>
              <View style={styles.chipGrid}>
                <SourceChip
                  icon={FileText}
                  label="Document"
                  gradient={[colors.primary, colors.grape] as const}
                  onPress={() => handleSourceSelect("document")}
                />
                <SourceChip
                  icon={ImageIcon}
                  label="Image"
                  gradient={[colors.mint, colors.sky] as const}
                  onPress={() => handleSourceSelect("image")}
                />
                <SourceChip
                  icon={Camera}
                  label="Camera"
                  gradient={[colors.sun, colors.coral] as const}
                  onPress={() => handleSourceSelect("camera")}
                />
                <SourceChip
                  icon={Presentation}
                  label="Slides"
                  gradient={[colors.coral, "#FF6B5C"] as const}
                  onPress={() => handleSourceSelect("slides")}
                />
              </View>
            </Animated.View>
          )}

          {/* Action Step */}
          {(step === "action" || step === "result") && selectedSource && (
            <Animated.View
              entering={FadeInUp.springify().damping(15).delay(100)}
              style={styles.section}
            >
              <View style={styles.chatBubble}>
                <Text style={styles.bubbleText}>
                  Great! I&apos;ll scan your {selectedSource}. What would you
                  like me to create?
                </Text>
              </View>

              {step === "action" && (
                <View style={styles.actionChips}>
                  <ActionChip
                    icon={FileText}
                    label="Summary"
                    description="Key points & highlights"
                    gradient={[colors.primary, colors.grape] as const}
                    onPress={() => handleActionSelect("summary")}
                  />
                  <ActionChip
                    icon={Layers}
                    label="Flashcards"
                    description="Study cards to memorize"
                    gradient={[colors.mint, colors.sky] as const}
                    onPress={() => handleActionSelect("flashcards")}
                  />
                  <ActionChip
                    icon={Brain}
                    label="Quiz"
                    description="Test your knowledge"
                    gradient={[colors.sun, colors.coral] as const}
                    onPress={() => handleActionSelect("quiz")}
                  />
                </View>
              )}
            </Animated.View>
          )}

          {/* Result Step */}
          {step === "result" && selectedAction && (
            <Animated.View
              entering={FadeInUp.springify().damping(15).delay(100)}
              style={styles.section}
            >
              <View style={styles.resultCard}>
                <LinearGradient
                  colors={[colors.primary, colors.grape] as const}
                  style={styles.resultGradient}
                >
                  <Sparkles size={32} color="#fff" strokeWidth={2.5} />
                </LinearGradient>
                <Text style={styles.resultTitle}>
                  {selectedAction === "summary"
                    ? "Summary Ready!"
                    : selectedAction === "flashcards"
                      ? "Flashcards Created!"
                      : "Quiz Generated!"}
                </Text>
                <Text style={styles.resultDescription}>
                  Your {selectedAction} from the {selectedSource} is ready to
                  review.
                </Text>
                <TouchableOpacity
                  style={styles.resetButton}
                  onPress={handleReset}
                  activeOpacity={0.8}
                >
                  <Text style={styles.resetButtonText}>Start New Scan</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function SourceChip({
  icon: Icon,
  label,
  gradient,
  onPress,
}: {
  icon: typeof FileText;
  label: string;
  gradient: readonly [string, string];
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.sourceChip}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <LinearGradient colors={gradient} style={styles.sourceChipGradient}>
        <Icon size={32} color="#fff" strokeWidth={2.2} />
      </LinearGradient>
      <Text style={styles.sourceChipLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function ActionChip({
  icon: Icon,
  label,
  description,
  gradient,
  onPress,
}: {
  icon: typeof FileText;
  label: string;
  description: string;
  gradient: readonly [string, string];
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.actionChip}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[gradient[0], gradient[1], gradient[1] + "20"] as const}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.actionChipGradient}
      >
        <View style={styles.actionChipIcon}>
          <Icon size={24} color={gradient[0]} strokeWidth={2.5} />
        </View>
        <View style={styles.actionChipContent}>
          <Text style={styles.actionChipLabel}>{label}</Text>
          <Text style={styles.actionChipDescription}>{description}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.foreground,
    fontFamily: "PlusJakartaSans_800ExtraBold",
    letterSpacing: -0.56,
    marginBottom: 8,
  },
  subGreeting: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.muted,
    textAlign: "center",
    maxWidth: 280,
    lineHeight: 22,
    fontFamily: "PlusJakartaSans_500Medium",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.foreground,
    fontFamily: "PlusJakartaSans_700Bold",
    marginBottom: 16,
  },
  chipGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  sourceChip: {
    width: "48%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  sourceChipGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  sourceChipLabel: {
    position: "absolute",
    bottom: 16,
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  chatBubble: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(107,102,133,0.12)",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  bubbleText: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.foreground,
    lineHeight: 22,
    fontFamily: "PlusJakartaSans_500Medium",
  },
  actionChips: {
    gap: 12,
  },
  actionChip: {
    borderRadius: 20,
    overflow: "hidden",
  },
  actionChipGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 16,
  },
  actionChipIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  actionChipContent: {
    flex: 1,
  },
  actionChipLabel: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.foreground,
    fontFamily: "PlusJakartaSans_700Bold",
    marginBottom: 2,
  },
  actionChipDescription: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.muted,
    fontFamily: "PlusJakartaSans_500Medium",
  },
  resultCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(107,102,133,0.12)",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  resultGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.foreground,
    fontFamily: "PlusJakartaSans_800ExtraBold",
    letterSpacing: -0.48,
    marginBottom: 8,
  },
  resultDescription: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.muted,
    textAlign: "center",
    lineHeight: 22,
    fontFamily: "PlusJakartaSans_500Medium",
    marginBottom: 24,
  },
  resetButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 24,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  resetButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
    fontFamily: "PlusJakartaSans_700Bold",
  },
});
