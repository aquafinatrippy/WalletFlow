import { expenseData, incomeData } from "@/constants/dummyFinances";
import React from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { Pie, PolarChart } from "victory-native";

export default function DonutChart() {
  const totalIncome = incomeData.reduce((sum, item) => sum + item.value, 0);
  const totalExpenses = expenseData.reduce((sum, item) => sum + item.value, 0);
  const remaining = totalIncome - totalExpenses;

  if (Platform.OS === "web") {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Monthly Financial Overview</Text>
        <View style={styles.summaryBox}>
          <Text style={styles.incomeText}>Total Income: ${totalIncome}</Text>
          <Text style={styles.expenseText}>
            Total Expenses: ${totalExpenses} (
            {((totalExpenses / totalIncome) * 100).toFixed(1)}%)
          </Text>
          <Text
            style={[
              styles.remainingText,
              remaining >= 0 ? styles.positive : styles.negative,
            ]}
          >
            Remaining: ${remaining} (
            {((remaining / totalIncome) * 100).toFixed(1)}%)
          </Text>
        </View>
        <Text style={styles.webMessage}>
          Chart visualization is only available on iOS and Android.
          {"\n"}Please use the mobile app to view charts.
        </Text>

        <Text style={styles.sectionTitle}>Income Sources</Text>
        <View style={styles.legend}>
          {incomeData.map((item) => (
            <View key={item.label} style={styles.legendItem}>
              <View
                style={[styles.colorBox, { backgroundColor: item.color }]}
              />
              <Text style={styles.legendText}>
                {item.label}: ${item.value} (
                {((item.value / totalIncome) * 100).toFixed(1)}% of income)
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Expenses</Text>
        <View style={styles.legend}>
          {expenseData.map((item) => (
            <View key={item.label} style={styles.legendItem}>
              <View
                style={[styles.colorBox, { backgroundColor: item.color }]}
              />
              <Text style={styles.legendText}>
                {item.label}: ${item.value} (
                {((item.value / totalIncome) * 100).toFixed(1)}% of income)
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Monthly Financial Overview</Text>
      <View style={styles.summaryBox}>
        <Text style={styles.incomeText}>Total Income: ${totalIncome}</Text>
        <Text style={styles.expenseText}>
          Total Expenses: ${totalExpenses} (
          {((totalExpenses / totalIncome) * 100).toFixed(1)}%)
        </Text>
        <Text
          style={[
            styles.remainingText,
            remaining >= 0 ? styles.positive : styles.negative,
          ]}
        >
          Remaining: ${remaining} (
          {((remaining / totalIncome) * 100).toFixed(1)}%)
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Income Sources</Text>
      <View style={styles.chartContainer}>
        <PolarChart
          data={incomeData}
          labelKey={"label"}
          valueKey={"value"}
          colorKey={"color"}
        >
          <Pie.Chart innerRadius={"60%"} />
        </PolarChart>
      </View>
      <View style={styles.legend}>
        {incomeData.map((item) => (
          <View key={item.label} style={styles.legendItem}>
            <View style={[styles.colorBox, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>
              {item.label}: ${item.value} (
              {((item.value / totalIncome) * 100).toFixed(1)}% of income)
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Budget Breakdown</Text>
      <View style={styles.chartContainer}>
        <PolarChart
          data={[
            ...expenseData,
            {
              label: "Remaining",
              value: remaining > 0 ? remaining : 0,
              color: remaining > 0 ? "#2ECC71" : "#95A5A6",
            },
          ]}
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
              {((item.value / totalIncome) * 100).toFixed(1)}% of income)
            </Text>
          </View>
        ))}
        <View style={styles.legendItem}>
          <View
            style={[
              styles.colorBox,
              { backgroundColor: remaining > 0 ? "#2ECC71" : "#95A5A6" },
            ]}
          />
          <Text style={[styles.legendText, styles.remainingLegend]}>
            Remaining: ${remaining > 0 ? remaining : 0} (
            {((Math.max(remaining, 0) / totalIncome) * 100).toFixed(1)}% of
            income)
          </Text>
        </View>
      </View>
    </ScrollView>
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
  remainingLegend: {
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
});
