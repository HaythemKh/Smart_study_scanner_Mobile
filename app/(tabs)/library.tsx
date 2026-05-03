import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { Href, router } from "expo-router";
import { FileText, Layers, Search, Sparkles, Zap } from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppStore } from "../../store/useAppStore";

type FilterType = "all" | "summaries" | "flashcards" | "quizzes";

export default function LibraryScreen() {
  const { summaries, flashcardDecks, quizzes } = useAppStore();
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterChange = (newFilter: FilterType) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setFilter(newFilter);
  };

  // Combine all items for "All" filter
  const allItems = [
    ...summaries.map((s) => ({
      id: s.id,
      type: "summary" as const,
      title: s.title,
      description: s.content.substring(0, 100) + "...",
      date: s.date,
      gradient: s.gradient,
      route: `/summary/${s.id}` as Href,
    })),
    ...flashcardDecks.map((d) => ({
      id: d.id,
      type: "flashcard" as const,
      title: d.title,
      description: `${d.cards.length} cards focusing on key concepts and definitions.`,
      date: d.date,
      gradient: d.gradient,
      route: `/flashcards/${d.id}` as Href,
    })),
    ...quizzes.map((q) => ({
      id: q.id,
      type: "quiz" as const,
      title: q.title,
      description: `Self-assessment with ${q.questions.length} questions based on your study material.`,
      date: q.date,
      gradient: q.gradient,
      route: `/quiz/${q.id}` as Href,
    })),
  ];

  const filteredItems =
    filter === "all"
      ? allItems.filter((item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : filter === "summaries"
        ? allItems.filter(
            (item) =>
              item.type === "summary" &&
              item.title.toLowerCase().includes(searchQuery.toLowerCase()),
          )
        : filter === "flashcards"
          ? allItems.filter(
              (item) =>
                item.type === "flashcard" &&
                item.title.toLowerCase().includes(searchQuery.toLowerCase()),
            )
          : allItems.filter(
              (item) =>
                item.type === "quiz" &&
                item.title.toLowerCase().includes(searchQuery.toLowerCase()),
            );

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "summary":
        return "SUMMARY";
      case "flashcard":
        return "FLASHCARDS";
      case "quiz":
        return "QUIZ";
      default:
        return "";
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

  const getIcon = (type: string) => {
    switch (type) {
      case "summary":
        return FileText;
      case "flashcard":
        return Layers;
      case "quiz":
        return Zap;
      default:
        return Sparkles;
    }
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
          <Text style={styles.pageTitle}>Library</Text>

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <Search color="#7a7582" size={20} strokeWidth={2.5} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search your scanned notes..."
              placeholderTextColor="#7a7582"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Filter Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterTabs}
          >
            <TouchableOpacity
              onPress={() => handleFilterChange("all")}
              activeOpacity={0.7}
              style={filter === "all" ? styles.filterTabActiveWrapper : null}
            >
              {filter === "all" ? (
                <LinearGradient
                  colors={["#6B4DE6", "#FF7A59"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.filterTab}
                >
                  <Text style={styles.filterTabTextActive}>All</Text>
                </LinearGradient>
              ) : (
                <View style={styles.filterTabInactive}>
                  <Text style={styles.filterTabText}>All</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleFilterChange("summaries")}
              activeOpacity={0.7}
              style={
                filter === "summaries" ? styles.filterTabActiveWrapper : null
              }
            >
              {filter === "summaries" ? (
                <LinearGradient
                  colors={["#6B4DE6", "#FF7A59"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.filterTab}
                >
                  <FileText color="white" size={16} strokeWidth={2.5} />
                  <Text style={styles.filterTabTextActive}>Summaries</Text>
                </LinearGradient>
              ) : (
                <View style={styles.filterTabInactive}>
                  <FileText color="#494551" size={16} strokeWidth={2.5} />
                  <Text style={styles.filterTabText}>Summaries</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleFilterChange("flashcards")}
              activeOpacity={0.7}
              style={
                filter === "flashcards" ? styles.filterTabActiveWrapper : null
              }
            >
              {filter === "flashcards" ? (
                <LinearGradient
                  colors={["#6B4DE6", "#FF7A59"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.filterTab}
                >
                  <Layers color="white" size={16} strokeWidth={2.5} />
                  <Text style={styles.filterTabTextActive}>Flashcards</Text>
                </LinearGradient>
              ) : (
                <View style={styles.filterTabInactive}>
                  <Layers color="#494551" size={16} strokeWidth={2.5} />
                  <Text style={styles.filterTabText}>Flashcards</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleFilterChange("quizzes")}
              activeOpacity={0.7}
              style={
                filter === "quizzes" ? styles.filterTabActiveWrapper : null
              }
            >
              {filter === "quizzes" ? (
                <LinearGradient
                  colors={["#6B4DE6", "#FF7A59"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.filterTab}
                >
                  <Zap color="white" size={16} strokeWidth={2.5} />
                  <Text style={styles.filterTabTextActive}>Quizzes</Text>
                </LinearGradient>
              ) : (
                <View style={styles.filterTabInactive}>
                  <Zap color="#494551" size={16} strokeWidth={2.5} />
                  <Text style={styles.filterTabText}>Quizzes</Text>
                </View>
              )}
            </TouchableOpacity>
          </ScrollView>

          {/* Content Grid */}
          {filteredItems.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No items found</Text>
              <Text style={styles.emptyText}>
                {searchQuery
                  ? "Try a different search term"
                  : "Start scanning documents to build your library"}
              </Text>
            </View>
          ) : (
            <View style={styles.grid}>
              {filteredItems.map((item) => {
                const IconComponent = getIcon(item.type);
                const typeColors = getTypeColor(item.type);

                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                      router.push(item.route);
                    }}
                    activeOpacity={0.9}
                    style={styles.card}
                  >
                    {/* Image Header with Gradient */}
                    <LinearGradient
                      colors={[...item.gradient]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.cardHeader}
                    >
                      <IconComponent
                        color="white"
                        size={48}
                        strokeWidth={2}
                        style={{ opacity: 0.8 }}
                      />
                    </LinearGradient>

                    {/* Card Content */}
                    <View style={styles.cardContent}>
                      <View style={styles.cardMeta}>
                        <View
                          style={[
                            styles.typeBadge,
                            { backgroundColor: typeColors.bg },
                          ]}
                        >
                          <Text
                            style={[
                              styles.typeBadgeText,
                              { color: typeColors.text },
                            ]}
                          >
                            {getTypeLabel(item.type)}
                          </Text>
                        </View>
                        <Text style={styles.dateText}>{item.date}</Text>
                      </View>

                      <Text style={styles.cardTitle} numberOfLines={2}>
                        {item.title}
                      </Text>
                      <Text style={styles.cardDescription} numberOfLines={2}>
                        {item.description}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
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
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#f8f2fa",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    color: "#1d1b20",
    fontFamily: "PlusJakartaSans_500Medium",
  },
  filterTabs: {
    flexDirection: "row",
    gap: 12,
    paddingBottom: 24,
  },
  filterTabActiveWrapper: {
    borderRadius: 999,
    shadowColor: "rgba(107, 77, 230, 0.4)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 6,
  },
  filterTab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
  },
  filterTabInactive: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(230, 224, 233, 0.5)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(203, 196, 210, 0.3)",
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#494551",
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  filterTabTextActive: {
    color: "white",
  },
  grid: {
    gap: 24,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 28,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "white",
    shadowColor: "rgba(75, 54, 204, 0.12)",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 8,
  },
  cardHeader: {
    height: 176,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    padding: 24,
  },
  cardMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    fontFamily: "PlusJakartaSans_800ExtraBold",
    letterSpacing: 2,
  },
  dateText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#7a7582",
    fontFamily: "PlusJakartaSans_500Medium",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1d1b20",
    fontFamily: "PlusJakartaSans_700Bold",
    marginBottom: 8,
    lineHeight: 26,
  },
  cardDescription: {
    fontSize: 14,
    fontWeight: "500",
    color: "#494551",
    fontFamily: "PlusJakartaSans_500Medium",
    lineHeight: 20,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    gap: 16,
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
  },
});
