import { expenseData } from "@/constants/dummyFinances";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Pie, PolarChart } from "victory-native";

const income = 5000;

export default function DonutChart() {
  const totalExpenses = expenseData.reduce((sum, item) => sum + item.value, 0);
  const remaining = income - totalExpenses;

  if (Platform.OS === "web") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Monthly Financial Overview</Text>
        <View style={styles.summaryBox}>
          <Text style={styles.incomeText}>Monthly Income: ${income}</Text>
          <Text style={styles.expenseText}>
            Total Expenses: ${totalExpenses} (
            {((totalExpenses / income) * 100).toFixed(1)}%)
          </Text>
          <Text
            style={[
              styles.remainingText,
              remaining >= 0 ? styles.positive : styles.negative,
            ]}
          >
            Remaining: ${remaining} ({((remaining / income) * 100).toFixed(1)}%)
          </Text>
        </View>
        <Text style={styles.webMessage}>
          Chart visualization is only available on iOS and Android.
          {"\n"}Please use the mobile app to view charts.
        </Text>
        <View style={styles.legend}>
          {expenseData.map((item) => (
            <View key={item.label} style={styles.legendItem}>
              <View
                style={[styles.colorBox, { backgroundColor: item.color }]}
              />
              <Text style={styles.legendText}>
                {item.label}: ${item.value} (
                {((item.value / income) * 100).toFixed(1)}% of income)
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Financial Overview</Text>
      <View style={styles.summaryBox}>
        <Text style={styles.incomeText}>Monthly Income: ${income}</Text>
        <Text style={styles.expenseText}>
          Total Expenses: ${totalExpenses} (
          {((totalExpenses / income) * 100).toFixed(1)}%)
        </Text>
        <Text
          style={[
            styles.remainingText,
            remaining >= 0 ? styles.positive : styles.negative,
          ]}
        >
          Remaining: ${remaining} ({((remaining / income) * 100).toFixed(1)}%)
        </Text>
      </View>
      <View style={styles.chartContainer}>
        <PolarChart
          data={expenseData}
          labelKey={"label"}
          valueKey={"value"}
          colorKey={"color"}
        >
          <Pie.Chart innerRadius={"60%"} />
        </PolarChart>
      </View>
      <View style={styles.legend}>
        {expenseData.map((item) => (
          <View key={item.label} style={styles.legendItem}>
            <View style={[styles.colorBox, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>
              {item.label}: ${item.value} (
              {((item.value / income) * 100).toFixed(1)}% of income)
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  summaryBox: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  incomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2ECC71",
    marginBottom: 5,
  },
  expenseText: {
    fontSize: 16,
    color: "#E74C3C",
    marginBottom: 5,
  },
  remainingText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  positive: {
    color: "#2ECC71",
  },
  negative: {
    color: "#E74C3C",
  },
  webMessage: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  chartContainer: {
    height: 300,
    marginBottom: 20,
  },
  legend: {
    marginTop: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  colorBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 10,
  },
  legendText: {
    fontSize: 14,
  },
});
