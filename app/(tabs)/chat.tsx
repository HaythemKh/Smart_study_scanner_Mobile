import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
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
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

  const handleSourceSelect = (index: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedSource(index);
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedSource(null);
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
                  <Text style={styles.avatarText}>A</Text>
                </View>
                <View style={styles.greetingContainer}>
                  <Text style={styles.greeting}>Good morning 👋 Alex</Text>
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
                    Hey Alex! Ready to turn some notes into knowledge today?
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
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() =>
                            Haptics.impactAsync(
                              Haptics.ImpactFeedbackStyle.Medium,
                            )
                          }
                          activeOpacity={0.8}
                          style={[
                            styles.actionCard,
                            action.fullWidth && styles.actionCardFull,
                          ]}
                        >
                          <View
                            style={[
                              styles.actionIconContainer,
                              { backgroundColor: action.bgColor },
                            ]}
                          >
                            <IconComponent
                              color={action.color}
                              size={20}
                              strokeWidth={2.5}
                            />
                          </View>
                          <Text style={styles.actionLabel}>{action.label}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              </View>
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
});
