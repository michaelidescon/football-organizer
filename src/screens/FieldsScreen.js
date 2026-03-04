import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const FIELDS = [
  {
    id: "city-arena",
    name: "City Arena",
    meta: "5v5 • 2 km away",
    pricePerHour: 80,
    allowedFormats: ["5v5", "6v6"],
    allowedDurations: [60, 90],
  },
  {
    id: "downtown-pitch",
    name: "Downtown Pitch",
    meta: "5v5 • 4 km away",
    pricePerHour: 70,
    allowedFormats: ["5v5", "7v7", "11v11"],
    allowedDurations: [60, 120],
  },
];

export default function FieldsScreen({ navigation, route }) {
  const initialFormat = route?.params?.format ?? "5v5";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Field</Text>

      {FIELDS.map((field) => {
        const startingFormat = field.allowedFormats?.includes(initialFormat)
          ? initialFormat
          : field.allowedFormats?.[0] ?? "5v5";

        return (
          <Pressable
            key={field.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate("FieldDetails", {
                field,
                format: startingFormat,
              })
            }
          >
            <Text style={styles.name}>{field.name}</Text>
            <Text style={styles.desc}>{field.meta}</Text>
            {field.allowedFormats?.length ? (
              <Text style={styles.formatsText}>
                Formats: {field.allowedFormats.join(", ")}
              </Text>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050816",
    padding: 24,
  },

  title: {
    fontSize: 32,
    color: "white",
    fontWeight: "900",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#111827",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },

  name: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },

  desc: {
    color: "#9CA3AF",
    marginTop: 4,
  },

  formatsText: {
    color: "#6B7280",
    marginTop: 6,
    fontSize: 12,
  },
});

