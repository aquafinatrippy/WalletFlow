import { router } from "expo-router";
import { useState } from "react";
import { Alert, Animated, Pressable, StyleSheet, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { expenseData } from "@/constants/dummyFinances";
import { Fonts } from "@/constants/theme";

type ExpenseItem = {
  label: string;
  value: number;
  color: string;
};

export default function TabTwoScreen() {
  const [expenses, setExpenses] = useState<ExpenseItem[]>(expenseData);

  const handleDelete = (index: number) => {
    Alert.alert(
      "Delete Expense",
      `Are you sure you want to delete "${expenses[index].label}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setExpenses(expenses.filter((_, i) => i !== index));
          },
        },
      ]
    );
  };

  const handleEdit = (index: number) => {
    // TODO: Navigate to edit modal with expense data
    console.log("Edit expense:", expenses[index]);
    router.push("/AddExpenseModal");
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
    index: number
  ) => {
    const translateEdit = dragX.interpolate({
      inputRange: [-160, 0],
      outputRange: [0, 160],
      extrapolate: "clamp",
    });

    const translateDelete = dragX.interpolate({
      inputRange: [-160, 0],
      outputRange: [0, 80],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.actionsContainer}>
        <Animated.View
          style={[
            styles.actionButton,
            { transform: [{ translateX: translateEdit }] },
          ]}
        >
          <Pressable
            style={[styles.action, styles.editAction]}
            onPress={() => handleEdit(index)}
          >
            <ThemedText style={styles.actionText}>Edit</ThemedText>
          </Pressable>
        </Animated.View>
        <Animated.View
          style={[
            styles.actionButton,
            { transform: [{ translateX: translateDelete }] },
          ]}
        >
          <Pressable
            style={[styles.action, styles.deleteAction]}
            onPress={() => handleDelete(index)}
          >
            <ThemedText style={styles.actionText}>Delete</ThemedText>
          </Pressable>
        </Animated.View>
      </View>
    );
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}
        >
          Expenses
        </ThemedText>
      </ThemedView>

      <Pressable
        style={styles.addButton}
        onPress={() => router.push("/AddExpenseModal")}
      >
        <ThemedText style={styles.addButtonText}>+ Add Expense</ThemedText>
      </Pressable>

      <ThemedView style={styles.listContainer}>
        {expenses.map((expense, index) => (
          <Swipeable
            key={`${expense.label}-${index}`}
            renderRightActions={(progress, dragX) =>
              renderRightActions(progress, dragX, index)
            }
            overshootRight={false}
            friction={2}
            rightThreshold={40}
          >
            <View style={styles.expenseItem}>
              <View style={styles.expenseContent}>
                <View
                  style={[
                    styles.colorIndicator,
                    { backgroundColor: expense.color },
                  ]}
                />
                <ThemedText style={styles.expenseLabel}>
                  {expense.label}
                </ThemedText>
              </View>
              <ThemedText style={styles.expenseValue}>
                ${expense.value.toFixed(2)}
              </ThemedText>
            </View>
          </Swipeable>
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  listContainer: {
    gap: 0,
  },
  expenseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  expenseContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  colorIndicator: {
    width: 8,
    height: 40,
    borderRadius: 4,
  },
  expenseLabel: {
    fontSize: 17,
    fontWeight: "500",
    color: "#000",
  },
  expenseValue: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    height: "100%",
    justifyContent: "center",
  },
  action: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
  },
  editAction: {
    backgroundColor: "#007AFF",
  },
  deleteAction: {
    backgroundColor: "#FF3B30",
  },
  actionText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
