import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { styles } from "./styling";

const COLORS = [
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#45B7D1", // Blue
  "#FFA07A", // Light Salmon
  "#98D8C8", // Mint
  "#F7DC6F", // Yellow
  "#BB8FCE", // Purple
  "#85C1E2", // Sky Blue
];

export default function AddExpenseModal() {
  const [label, setLabel] = useState("");
  const [expense, setExpense] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const handleSave = () => {
    // TODO: Save expense data
    console.log({ label, expense, color: selectedColor });
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Add Expense
      </ThemedText>

      <View style={styles.inputContainer}>
        <ThemedText style={styles.label}>Label</ThemedText>
        <TextInput
          style={styles.input}
          value={label}
          onChangeText={setLabel}
          placeholder="e.g., Groceries"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputContainer}>
        <ThemedText style={styles.label}>Expense Amount</ThemedText>
        <TextInput
          style={styles.input}
          value={expense}
          onChangeText={setExpense}
          placeholder="0.00"
          placeholderTextColor="#999"
          keyboardType="decimal-pad"
        />
      </View>

      <View style={styles.inputContainer}>
        <ThemedText style={styles.label}>Color</ThemedText>
        <View style={styles.colorContainer}>
          {COLORS.map((color) => (
            <Pressable
              key={color}
              style={[
                styles.colorCircle,
                { backgroundColor: color },
                selectedColor === color && styles.selectedColor,
              ]}
              onPress={() => setSelectedColor(color)}
            />
          ))}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.cancelButton]}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.saveButton]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </Pressable>
      </View>
    </ThemedView>
  );
}
