import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { Href, router } from "expo-router";
import {
    Calendar,
    CheckCircle,
    Clock,
    FileText,
    Layers,
    Sparkles,
    TrendingUp,
    Zap,
} from "lucide-react-native";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppStore } from "../../store/useAppStore";

interface HistoryItem {
  id: string;
  type: "summary" | "flashcard" | "quiz";
  action: string;
  title: string;
  documentName: string;
  date: string;
  time: string;
  metadata?: string;
  gradient: readonly [string, string];
  route: Href;
}

export default function HistoryScreen() {
  const { summaries, flashcardDecks, quizzes } = useAppStore();

  // Convert all items to history format with routes
  const historyItems: HistoryItem[] = [
    ...summaries.map((s) => ({
      id: s.id,
      type: "summary" as const,
      action: "Created Summary",
      title: s.title,
      documentName: s.documentName,
      date: s.date,
      time: "2:30 PM",
      metadata: `${s.keyPoints.length} key points`,
      gradient: s.gradient,
      route: `/summary/${s.id}` as Href,
    })),
    ...flashcardDecks.map((d) => ({
      id: d.id,
      type: "flashcard" as const,
      action: "Created Flashcards",
      title: d.title,
      documentName: d.documentName,
      date: d.date,
      time: "2:35 PM",
      metadata: `${d.cards.length} cards`,
      gradient: d.gradient,
      route: `/flashcards/${d.id}` as Href,
    })),
    ...quizzes.map((q) => ({
      id: q.id,
      type: "quiz" as const,
      action: "Generated Quiz",
      title: q.title,
      documentName: q.documentName,
      date: q.date,
      time: "2:40 PM",
      metadata: `${q.questions.length} questions`,
      gradient: q.gradient,
      route: `/quiz/${q.id}` as Href,
    })),
  ];

  // Group by date
  const groupedHistory: { [key: string]: HistoryItem[] } = {};
  historyItems.forEach((item) => {
    if (!groupedHistory[item.date]) {
      groupedHistory[item.date] = [];
    }
    groupedHistory[item.date].push(item);
  });

  const dates = Object.keys(groupedHistory);

  const getIcon = (type: string) => {
    switch (type) {
      case "summary":
        return Sparkles;
      case "flashcard":
        return Layers;
      case "quiz":
        return Zap;
      default:
        return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "summary":
        return { bg: "#E9DDFF", text: "#6750A4" };
      case "flashcard":
        return { bg: "rgba(255, 122, 89, 0.2)", text: "#FF7A59" };
      case "quiz":
        return { bg: "rgba(0, 191, 165, 0.1)", text: "#00897B" };
      default:
        return { bg: "#E9DDFF", text: "#6750A4" };
    }
  };

  const handleItemPress = (item: HistoryItem) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(item.route);
  };

  const totalActivities = historyItems.length;
  const totalCards = flashcardDecks.reduce(
    (sum, deck) => sum + deck.cards.length,
    0,
  );
  const totalQuestions = quizzes.reduce(
    (sum, quiz) => sum + quiz.questions.length,
    0,
  );

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
          <Text style={styles.headerTitle}>Study Scanner</Text>
          <View style={styles.streakBadge}>
            <Text style={styles.streakText}>5 🔥</Text>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Editorial Header */}
          <Text style={styles.pageTitle}>History</Text>

          {/* Stats Overview Cards */}
          <View style={styles.statsGrid}>
            {/* Total Activities */}
            <View style={styles.statCard}>
              <LinearGradient
                colors={["#6B4DE6", "#A389F4"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statIconContainer}
              >
                <TrendingUp color="white" size={24} strokeWidth={2.5} />
              </LinearGradient>
              <View style={styles.statContent}>
                <Text style={styles.statValue}>{totalActivities}</Text>
                <Text style={styles.statLabel}>Total Activities</Text>
              </View>
            </View>

            {/* Study Sessions */}
            <View style={styles.statCard}>
              <LinearGradient
                colors={["#FF7A59", "#FFAB91"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statIconContainer}
              >
                <CheckCircle color="white" size={24} strokeWidth={2.5} />
              </LinearGradient>
              <View style={styles.statContent}>
                <Text style={styles.statValue}>{totalCards}</Text>
                <Text style={styles.statLabel}>Cards Created</Text>
              </View>
            </View>

            {/* Quiz Questions */}
            <View style={styles.statCard}>
              <LinearGradient
                colors={["#00BFA5", "#64FFDA"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statIconContainer}
              >
                <Zap color="white" size={24} strokeWidth={2.5} fill="white" />
              </LinearGradient>
              <View style={styles.statContent}>
                <Text style={styles.statValue}>{totalQuestions}</Text>
                <Text style={styles.statLabel}>Quiz Questions</Text>
              </View>
            </View>

            {/* Summaries */}
            <View style={styles.statCard}>
              <LinearGradient
                colors={["#4f378a", "#9c27b0"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.statIconContainer}
              >
                <Sparkles
                  color="white"
                  size={24}
                  strokeWidth={2.5}
                  fill="white"
                />
              </LinearGradient>
              <View style={styles.statContent}>
                <Text style={styles.statValue}>{summaries.length}</Text>
                <Text style={styles.statLabel}>Summaries</Text>
              </View>
            </View>
          </View>

          {/* Timeline Section */}
          {historyItems.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Clock color="#6750A4" size={48} strokeWidth={2} />
              </View>
              <Text style={styles.emptyTitle}>No activity yet</Text>
              <Text style={styles.emptyText}>
                Your study history will appear here as you create summaries,
                flashcards, and quizzes
              </Text>
            </View>
          ) : (
            <>
              <View style={styles.timelineHeader}>
                <Calendar color="#6750A4" size={20} strokeWidth={2.5} />
                <Text style={styles.timelineTitle}>Activity Timeline</Text>
              </View>

              {dates.map((date, dateIndex) => (
                <View key={date} style={styles.dateSection}>
                  {/* Date Badge */}
                  <View style={styles.dateBadge}>
                    <Text style={styles.dateText}>{date}</Text>
                  </View>

                  {/* Timeline Items */}
                  <View style={styles.timeline}>
                    {groupedHistory[date].map((item, index) => {
                      const IconComponent = getIcon(item.type);
                      const typeColors = getTypeColor(item.type);
                      const isLast =
                        index === groupedHistory[date].length - 1 &&
                        dateIndex === dates.length - 1;

                      return (
                        <View key={item.id} style={styles.timelineItem}>
                          {/* Timeline Line */}
                          {!isLast && <View style={styles.timelineLine} />}

                          {/* Timeline Dot with Gradient */}
                          <LinearGradient
                            colors={[...item.gradient]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.timelineDot}
                          >
                            <IconComponent
                              color="white"
                              size={18}
                              strokeWidth={2.5}
                            />
                          </LinearGradient>

                          {/* Content Card */}
                          <TouchableOpacity
                            onPress={() => handleItemPress(item)}
                            activeOpacity={0.9}
                            style={styles.historyCard}
                          >
                            <View style={styles.historyCardHeader}>
                              <View
                                style={[
                                  styles.actionBadge,
                                  { backgroundColor: typeColors.bg },
                                ]}
                              >
                                <Text
                                  style={[
                                    styles.actionBadgeText,
                                    { color: typeColors.text },
                                  ]}
                                >
                                  {item.action}
                                </Text>
                              </View>
                              <View style={styles.timeContainer}>
                                <Clock
                                  color="#7a7582"
                                  size={14}
                                  strokeWidth={2.5}
                                />
                                <Text style={styles.historyTime}>
                                  {item.time}
                                </Text>
                              </View>
                            </View>

                            <Text style={styles.historyTitle} numberOfLines={2}>
                              {item.title}
                            </Text>

                            <View style={styles.historyFooter}>
                              <Text style={styles.historyDocument}>
                                📄 {item.documentName}
                              </Text>
                              {item.metadata && (
                                <View
                                  style={[
                                    styles.metadataBadge,
                                    { backgroundColor: typeColors.bg },
                                  ]}
                                >
                                  <Text
                                    style={[
                                      styles.metadataText,
                                      { color: typeColors.text },
                                    ]}
                                  >
                                    {item.metadata}
                                  </Text>
                                </View>
                              )}
                            </View>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </View>
                </View>
              ))}
            </>
          )}

          {/* Bottom Spacing */}
          <View style={{ height: 120 }} />
        </ScrollView>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#6750A4",
    fontFamily: "PlusJakartaSans_800ExtraBold",
    letterSpacing: -0.5,
  },
  streakBadge: {
    backgroundColor: "rgba(103, 80, 164, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(103, 80, 164, 0.2)",
  },
  streakText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6750A4",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  pageTitle: {
    fontSize: 36,
    fontWeight: "800",
    color: "#1d1b20",
    fontFamily: "PlusJakartaSans_800ExtraBold",
    letterSpacing: -1,
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e6e0e9",
    width: "48%",
    shadowColor: "rgba(75, 54, 204, 0.12)",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 6,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1d1b20",
    fontFamily: "PlusJakartaSans_800ExtraBold",
    lineHeight: 28,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#7a7582",
    fontFamily: "PlusJakartaSans_600SemiBold",
    lineHeight: 14,
  },
  timelineHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  timelineTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#6750A4",
    fontFamily: "PlusJakartaSans_800ExtraBold",
    letterSpacing: -0.5,
  },
  dateSection: {
    marginBottom: 32,
  },
  dateBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#E9DDFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6750A4",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  timeline: {
    position: "relative",
  },
  timelineItem: {
    position: "relative",
    paddingLeft: 56,
    marginBottom: 20,
  },
  timelineLine: {
    position: "absolute",
    left: 19,
    top: 48,
    bottom: -20,
    width: 2,
    backgroundColor: "#e6e0e9",
  },
  timelineDot: {
    position: "absolute",
    left: 0,
    top: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  historyCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#e6e0e9",
    gap: 12,
    shadowColor: "rgba(75, 54, 204, 0.12)",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 8,
  },
  historyCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  actionBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    fontFamily: "PlusJakartaSans_800ExtraBold",
    letterSpacing: 1.5,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  historyTime: {
    fontSize: 12,
    fontWeight: "500",
    color: "#7a7582",
    fontFamily: "PlusJakartaSans_500Medium",
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1d1b20",
    fontFamily: "PlusJakartaSans_700Bold",
    lineHeight: 24,
  },
  historyFooter: {
    gap: 8,
  },
  historyDocument: {
    fontSize: 13,
    fontWeight: "500",
    color: "#7a7582",
    fontFamily: "PlusJakartaSans_500Medium",
  },
  metadataBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  metadataText: {
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    gap: 16,
  },
  emptyIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#f2ecf4",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1d1b20",
    fontFamily: "PlusJakartaSans_800ExtraBold",
  },
  emptyText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#7a7582",
    fontFamily: "PlusJakartaSans_500Medium",
    textAlign: "center",
    maxWidth: 280,
    lineHeight: 22,
  },
});
