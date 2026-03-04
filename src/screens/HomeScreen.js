import React, { useEffect } from "react";
import { View, Text, StyleSheet, Pressable, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

function GlassCard({ icon, title, desc, accent, onPress }) {
  return (
    <Pressable
      onPress={async () => {
        try {
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        } catch {}
        onPress?.();
      }}
      style={({ pressed }) => [
        styles.cardPressable,
        pressed && { transform: [{ scale: 0.985 }], opacity: 0.95 },
      ]}
    >
      <BlurView intensity={30} tint="dark" style={styles.cardBlur}>
        <View style={[styles.iconWrap, { backgroundColor: accent }]}>
          <Text style={styles.icon}>{icon}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDesc}>{desc}</Text>

          <View style={styles.ctaRow}>
            <Text style={styles.ctaText}>Continue</Text>
            <Text style={styles.ctaArrow}>›</Text>
          </View>
        </View>
      </BlurView>
    </Pressable>
  );
}

export default function HomeScreen({ navigation }) {
  const float = useSharedValue(0);

  useEffect(() => {
    float.value = withRepeat(
      withTiming(-10, {
        duration: 2000,
      }),
      -1,
      true
    );
  }, [float]);

  const floatingStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: float.value }],
    };
  });

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      {/* Background Gradient */}
      <LinearGradient
        colors={["#050816", "#0B1630", "#0A2A3F"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Background glow effects */}
      <LinearGradient
        colors={["rgba(34,197,94,0.25)", "rgba(34,197,94,0)"]}
        style={[styles.glow, { top: -80, left: -60 }]}
      />

      <LinearGradient
        colors={["rgba(59,130,246,0.25)", "rgba(59,130,246,0)"]}
        style={[styles.glow, { bottom: -100, right: -70 }]}
      />

      <View style={styles.container}>
        <Animated.View style={[styles.ballContainer, floatingStyle]}>
          <Text style={styles.ball}>⚽</Text>
        </Animated.View>

        {/* HERO SECTION */}
        <View style={styles.hero}>
          <Text style={styles.kicker}>⚽ ORGANIZE A GAME IN SECONDS</Text>

          <Text style={styles.title}>
            Find players.{"\n"}Start the match.
          </Text>

          <Text style={styles.subtitle}>
            Create a friendly match with friends or challenge another team.
          </Text>
        </View>

        {/* MATCH TYPES */}
        <GlassCard
          icon="⚽"
          title="Friendly Match"
          desc="Invite friends and fill the 10 spots. Pay at the field."
          accent="rgba(34,197,94,0.25)"
          onPress={() => navigation.navigate("Fields")}
        />

        <GlassCard
          icon="🔥"
          title="Rival Match"
          desc="Invite 4 friends and wait for another team to accept."
          accent="rgba(249,115,22,0.25)"
          onPress={() => navigation.navigate("Fields")}
        />

        {/* FOOTER NOTE */}
        <View style={styles.footerNote}>
          <Text style={styles.footerText}>
            MVP: Field owner confirms availability. Players pay on-site.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 70,
  },

  glow: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 260,
  },

  hero: {
    marginBottom: 30,
  },

  kicker: {
    color: "#94A3B8",
    fontSize: 12,
    letterSpacing: 1.5,
    marginBottom: 8,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "900",
    lineHeight: 42,
    letterSpacing: -0.5,
  },

  subtitle: {
    color: "#CBD5F5",
    fontSize: 14,
    marginTop: 10,
    lineHeight: 20,
    maxWidth: 300,
  },

  cardPressable: {
    marginTop: 16,
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(148,163,184,0.2)",
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 8,
  },

  cardBlur: {
    padding: 18,
    flexDirection: "row",
    gap: 14,
    backgroundColor: "rgba(15,23,42,0.4)",
  },

  iconWrap: {
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    fontSize: 24,
  },

  cardTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 4,
  },

  cardDesc: {
    color: "#CBD5E1",
    fontSize: 13,
    lineHeight: 18,
  },

  ctaRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  ctaText: {
    color: "#93C5FD",
    fontWeight: "900",
    fontSize: 13,
  },

  ctaArrow: {
    color: "#93C5FD",
    fontSize: 18,
    marginLeft: 6,
  },

  footerNote: {
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: "rgba(148,163,184,0.2)",
    paddingTop: 14,
  },

  footerText: {
    color: "#94A3B8",
    fontSize: 12,
    lineHeight: 18,
  },

  ballContainer: {
    position: "absolute",
    right: 30,
    top: 120,
  },

  ball: {
    fontSize: 46,
    opacity: 0.9,
  },
});

