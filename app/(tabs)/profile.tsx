import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import {
    Bell,
    BookOpen,
    ChevronRight,
    Crown,
    Edit2,
    Flame,
    Globe,
    Lock,
    LogOut,
    Moon,
    Settings,
    Shield,
    Target,
    TrendingUp,
    Trophy,
    Zap
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
    Animated,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  // Animations
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleToggleNotifications = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleToggleDarkMode = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setDarkModeEnabled(!darkModeEnabled);
  };

  const handleLogout = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const currentXP = 1240;
  const maxXP = 1500;
  const xpProgress = (currentXP / maxXP) * 100;

  return (
    <View style={styles.container}>
      {/* Animated Background Gradient */}
      <LinearGradient
        colors={["#FAFAFC", "#F5F0FF", "#FAFAFC"]}
        style={styles.backgroundGradient}
      />

      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        {/* Minimal Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
            <Settings color="#6750A4" size={24} strokeWidth={2.5} />
          </TouchableOpacity>
          <View style={styles.streakBadgeTop}>
            <Flame color="#FF6B35" size={18} strokeWidth={2.5} fill="#FF6B35" />
            <Text style={styles.streakNumber}>5</Text>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            {/* Profile Header - Floating Card Style */}
            <View style={styles.profileSection}>
              <View style={styles.avatarContainer}>
                <LinearGradient
                  colors={["#6B4DE6", "#A78BFA", "#FF7A59"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.avatarGradientRing}
                >
                  <View style={styles.avatarInner}>
                    <Text style={styles.avatarText}>H</Text>
                  </View>
                </LinearGradient>
                <TouchableOpacity style={styles.editBadge} activeOpacity={0.8}>
                  <Edit2 color="white" size={14} strokeWidth={3} />
                </TouchableOpacity>
              </View>

              <Text style={styles.userName}>Haythem</Text>
              <Text style={styles.userEmail}>haythem@student.edu</Text>

              {/* Level Badge */}
              <View style={styles.levelContainer}>
                <LinearGradient
                  colors={["#6B4DE6", "#8B5CF6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.levelBadge}
                >
                  <Crown
                    color="white"
                    size={16}
                    strokeWidth={2.5}
                    fill="white"
                  />
                  <Text style={styles.levelText}>Level 12</Text>
                </LinearGradient>
              </View>
            </View>

            {/* XP Progress Card - Glassmorphism */}
            <View style={styles.xpSection}>
              <View style={styles.xpCard}>
                <View style={styles.xpHeader}>
                  <View>
                    <Text style={styles.xpTitle}>Experience Points</Text>
                    <Text style={styles.xpSubtitle}>260 XP to next level</Text>
                  </View>
                  <View style={styles.xpBadge}>
                    <Zap
                      color="#FFB800"
                      size={20}
                      strokeWidth={2.5}
                      fill="#FFB800"
                    />
                  </View>
                </View>

                <View style={styles.xpProgressContainer}>
                  <View style={styles.xpProgressTrack}>
                    <LinearGradient
                      colors={["#FFB800", "#FF8A00", "#FF6B35"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={[
                        styles.xpProgressFill,
                        { width: `${xpProgress}%` },
                      ]}
                    />
                  </View>
                  <View style={styles.xpNumbers}>
                    <Text style={styles.xpCurrent}>{currentXP}</Text>
                    <Text style={styles.xpMax}>/ {maxXP} XP</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Stats Grid - Modern Cards */}
            <View style={styles.statsSection}>
              <Text style={styles.sectionTitle}>Your Stats</Text>
              <View style={styles.statsGrid}>
                {/* Sessions */}
                <View style={[styles.statCard, styles.statCardPurple]}>
                  <View style={styles.statIconContainer}>
                    <Target color="#6B4DE6" size={24} strokeWidth={2.5} />
                  </View>
                  <Text style={styles.statValue}>142</Text>
                  <Text style={styles.statLabel}>Sessions</Text>
                </View>

                {/* Cards */}
                <View style={[styles.statCard, styles.statCardOrange]}>
                  <View style={styles.statIconContainer}>
                    <BookOpen color="#FF7A59" size={24} strokeWidth={2.5} />
                  </View>
                  <Text style={styles.statValue}>892</Text>
                  <Text style={styles.statLabel}>Cards</Text>
                </View>

                {/* Score */}
                <View style={[styles.statCard, styles.statCardGreen]}>
                  <View style={styles.statIconContainer}>
                    <TrendingUp color="#00D084" size={24} strokeWidth={2.5} />
                  </View>
                  <Text style={styles.statValue}>94%</Text>
                  <Text style={styles.statLabel}>Avg Score</Text>
                </View>

                {/* Rank */}
                <View style={[styles.statCard, styles.statCardGold]}>
                  <View style={styles.statIconContainer}>
                    <Trophy color="#FFB800" size={24} strokeWidth={2.5} />
                  </View>
                  <Text style={styles.statValue}>Top 5</Text>
                  <Text style={styles.statLabel}>Ranking</Text>
                </View>
              </View>
            </View>

            {/* Achievements - Premium Style */}
            <View style={styles.achievementsSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Achievements</Text>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.achievementsScroll}
              >
                {/* Fast Learner */}
                <View style={styles.achievementCard}>
                  <LinearGradient
                    colors={["#6B4DE6", "#8B5CF6"]}
                    style={styles.achievementGradient}
                  >
                    <Zap
                      color="white"
                      size={32}
                      strokeWidth={2.5}
                      fill="white"
                    />
                  </LinearGradient>
                  <Text style={styles.achievementName}>Fast Learner</Text>
                  <Text style={styles.achievementDesc}>
                    Complete 100 sessions
                  </Text>
                </View>

                {/* Exam King */}
                <View style={styles.achievementCard}>
                  <LinearGradient
                    colors={["#FFB800", "#FF8A00"]}
                    style={styles.achievementGradient}
                  >
                    <Crown
                      color="white"
                      size={32}
                      strokeWidth={2.5}
                      fill="white"
                    />
                  </LinearGradient>
                  <Text style={styles.achievementName}>Exam King</Text>
                  <Text style={styles.achievementDesc}>
                    Score 90%+ on 50 quizzes
                  </Text>
                </View>

                {/* Perfect Week - Locked */}
                <View
                  style={[styles.achievementCard, styles.achievementLocked]}
                >
                  <View style={styles.achievementLockedGradient}>
                    <Lock color="#9CA3AF" size={32} strokeWidth={2.5} />
                  </View>
                  <Text style={styles.achievementNameLocked}>Perfect Week</Text>
                  <Text style={styles.achievementDescLocked}>
                    Study 7 days straight
                  </Text>
                </View>

                {/* Scholar - Locked */}
                <View
                  style={[styles.achievementCard, styles.achievementLocked]}
                >
                  <View style={styles.achievementLockedGradient}>
                    <Lock color="#9CA3AF" size={32} strokeWidth={2.5} />
                  </View>
                  <Text style={styles.achievementNameLocked}>Scholar</Text>
                  <Text style={styles.achievementDescLocked}>
                    Create 1000 cards
                  </Text>
                </View>
              </ScrollView>
            </View>

            {/* Settings - Modern List */}
            <View style={styles.settingsSection}>
              <Text style={styles.sectionTitle}>Settings</Text>

              <View style={styles.settingsCard}>
                {/* Notifications */}
                <TouchableOpacity
                  style={styles.settingItem}
                  onPress={handleToggleNotifications}
                  activeOpacity={0.7}
                >
                  <View style={styles.settingLeft}>
                    <View
                      style={[styles.settingIcon, styles.settingIconPurple]}
                    >
                      <Bell color="#6B4DE6" size={20} strokeWidth={2.5} />
                    </View>
                    <View>
                      <Text style={styles.settingTitle}>Notifications</Text>
                      <Text style={styles.settingSubtitle}>
                        Daily reminders
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.switchContainer,
                      notificationsEnabled && styles.switchActive,
                    ]}
                  >
                    <View
                      style={[
                        styles.switchThumb,
                        notificationsEnabled && styles.switchThumbActive,
                      ]}
                    />
                  </View>
                </TouchableOpacity>

                {/* Dark Mode */}
                <TouchableOpacity
                  style={styles.settingItem}
                  onPress={handleToggleDarkMode}
                  activeOpacity={0.7}
                >
                  <View style={styles.settingLeft}>
                    <View style={[styles.settingIcon, styles.settingIconDark]}>
                      <Moon color="#4B5563" size={20} strokeWidth={2.5} />
                    </View>
                    <View>
                      <Text style={styles.settingTitle}>Dark Mode</Text>
                      <Text style={styles.settingSubtitle}>System default</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.switchContainer,
                      darkModeEnabled && styles.switchActive,
                    ]}
                  >
                    <View
                      style={[
                        styles.switchThumb,
                        darkModeEnabled && styles.switchThumbActive,
                      ]}
                    />
                  </View>
                </TouchableOpacity>

                {/* Language */}
                <TouchableOpacity
                  style={styles.settingItem}
                  activeOpacity={0.7}
                >
                  <View style={styles.settingLeft}>
                    <View style={[styles.settingIcon, styles.settingIconBlue]}>
                      <Globe color="#3B82F6" size={20} strokeWidth={2.5} />
                    </View>
                    <View>
                      <Text style={styles.settingTitle}>Language</Text>
                      <Text style={styles.settingSubtitle}>English</Text>
                    </View>
                  </View>
                  <ChevronRight color="#9CA3AF" size={20} strokeWidth={2.5} />
                </TouchableOpacity>

                {/* Privacy */}
                <TouchableOpacity
                  style={styles.settingItem}
                  activeOpacity={0.7}
                >
                  <View style={styles.settingLeft}>
                    <View style={[styles.settingIcon, styles.settingIconGreen]}>
                      <Shield color="#10B981" size={20} strokeWidth={2.5} />
                    </View>
                    <View>
                      <Text style={styles.settingTitle}>Privacy</Text>
                      <Text style={styles.settingSubtitle}>
                        Manage your data
                      </Text>
                    </View>
                  </View>
                  <ChevronRight color="#9CA3AF" size={20} strokeWidth={2.5} />
                </TouchableOpacity>

                {/* Logout */}
                <TouchableOpacity
                  style={[styles.settingItem, styles.settingItemLast]}
                  onPress={handleLogout}
                  activeOpacity={0.7}
                >
                  <View style={styles.settingLeft}>
                    <View style={[styles.settingIcon, styles.settingIconRed]}>
                      <LogOut color="#EF4444" size={20} strokeWidth={2.5} />
                    </View>
                    <Text style={styles.settingTitleRed}>Log Out</Text>
                  </View>
                  <ChevronRight color="#EF4444" size={20} strokeWidth={2.5} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Bottom Spacing */}
            <View style={{ height: 120 }} />
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
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
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6750A4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  streakBadgeTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  streakNumber: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1F2937",
    fontFamily: "PlusJakartaSans_800ExtraBold",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  profileSection: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 32,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 20,
  },
  avatarGradientRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    padding: 4,
    shadowColor: "#6B4DE6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 12,
  },
  avatarInner: {
    width: "100%",
    height: "100%",
    borderRadius: 56,
    backgroundColor: "#6750A4",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 48,
    fontWeight: "800",
    color: "white",
    fontFamily: "PlusJakartaSans_800ExtraBold",
  },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#6B4DE6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#F5F0FF",
    shadowColor: "#6B4DE6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  userName: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1F2937",
    fontFamily: "PlusJakartaSans_800ExtraBold",
    letterSpacing: -1,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 15,
    fontWeight: "500",
    color: "#6B7280",
    fontFamily: "PlusJakartaSans_500Medium",
    marginBottom: 16,
  },
  levelContainer: {
    marginTop: 8,
  },
  levelBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
    shadowColor: "#6B4DE6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  levelText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  xpSection: {
    marginBottom: 32,
  },
  xpCard: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#6B4DE6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
  },
  xpHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  xpTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    fontFamily: "PlusJakartaSans_700Bold",
    marginBottom: 4,
  },
  xpSubtitle: {
    fontSize: 13,
    fontWeight: "500",
    color: "#6B7280",
    fontFamily: "PlusJakartaSans_500Medium",
  },
  xpBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFF7ED",
    alignItems: "center",
    justifyContent: "center",
  },
  xpProgressContainer: {
    gap: 12,
  },
  xpProgressTrack: {
    height: 16,
    backgroundColor: "#F3F4F6",
    borderRadius: 999,
    overflow: "hidden",
  },
  xpProgressFill: {
    height: "100%",
    borderRadius: 999,
  },
  xpNumbers: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "flex-end",
  },
  xpCurrent: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1F2937",
    fontFamily: "PlusJakartaSans_800ExtraBold",
  },
  xpMax: {
    fontSize: 14,
    fontWeight: "600",
    color: "#9CA3AF",
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  statsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1F2937",
    fontFamily: "PlusJakartaSans_800ExtraBold",
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statCard: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },
  statCardPurple: {
    borderLeftWidth: 4,
    borderLeftColor: "#6B4DE6",
  },
  statCardOrange: {
    borderLeftWidth: 4,
    borderLeftColor: "#FF7A59",
  },
  statCardGreen: {
    borderLeftWidth: 4,
    borderLeftColor: "#00D084",
  },
  statCardGold: {
    borderLeftWidth: 4,
    borderLeftColor: "#FFB800",
  },
  statIconContainer: {
    marginBottom: 12,
  },
  statValue: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1F2937",
    fontFamily: "PlusJakartaSans_800ExtraBold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  achievementsSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B4DE6",
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  achievementsScroll: {
    gap: 16,
    paddingRight: 24,
  },
  achievementCard: {
    width: 140,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },
  achievementGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: "#6B4DE6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  achievementName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2937",
    fontFamily: "PlusJakartaSans_700Bold",
    textAlign: "center",
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 11,
    fontWeight: "500",
    color: "#6B7280",
    fontFamily: "PlusJakartaSans_500Medium",
    textAlign: "center",
    lineHeight: 14,
  },
  achievementLocked: {
    opacity: 0.5,
  },
  achievementLockedGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
  },
  achievementNameLocked: {
    fontSize: 14,
    fontWeight: "600",
    color: "#9CA3AF",
    fontFamily: "PlusJakartaSans_600SemiBold",
    textAlign: "center",
    marginBottom: 4,
  },
  achievementDescLocked: {
    fontSize: 11,
    fontWeight: "500",
    color: "#D1D5DB",
    fontFamily: "PlusJakartaSans_500Medium",
    textAlign: "center",
    lineHeight: 14,
  },
  settingsSection: {
    marginBottom: 32,
  },
  settingsCard: {
    backgroundColor: "white",
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  settingItemLast: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
  },
  settingIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  settingIconPurple: {
    backgroundColor: "#EDE9FE",
  },
  settingIconDark: {
    backgroundColor: "#F3F4F6",
  },
  settingIconBlue: {
    backgroundColor: "#DBEAFE",
  },
  settingIconGreen: {
    backgroundColor: "#D1FAE5",
  },
  settingIconRed: {
    backgroundColor: "#FEE2E2",
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  settingSubtitle: {
    fontSize: 13,
    fontWeight: "500",
    color: "#9CA3AF",
    fontFamily: "PlusJakartaSans_500Medium",
    marginTop: 2,
  },
  settingTitleRed: {
    fontSize: 15,
    fontWeight: "600",
    color: "#EF4444",
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  switchContainer: {
    width: 52,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    padding: 2,
  },
  switchActive: {
    backgroundColor: "#6B4DE6",
  },
  switchThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  switchThumbActive: {
    alignSelf: "flex-end",
  },
});
