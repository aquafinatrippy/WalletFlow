import { router } from "expo-router";
import { useState } from "react";
import { Alert, Animated, Pressable, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { expenseData } from "@/constants/dummyFinances";
import { Image } from "expo-image";
import { styles } from "./styling";

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
        <Image
          source={require("@/assets/images/expenses_banner.png")}
          style={styles.bannerLogo}
        />
      }
    >
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
