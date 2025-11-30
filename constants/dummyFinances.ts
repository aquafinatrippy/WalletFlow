type FinanceDataPoint = {
  label: string;
  value: number;
  color: string;
};

export const incomeData: FinanceDataPoint[] = [
  { label: "Salary", value: 4000, color: "#2ECC71" },
  { label: "Freelance", value: 800, color: "#27AE60" },
  { label: "Investments", value: 200, color: "#1ABC9C" },
];

export const expenseData: FinanceDataPoint[] = [
  { label: "Housing", value: 1200, color: "#FF6B6B" },
  { label: "Food", value: 600, color: "#4ECDC4" },
  { label: "Transportation", value: 400, color: "#45B7D1" },
  { label: "Entertainment", value: 300, color: "#FFA07A" },
  { label: "Utilities", value: 250, color: "#98D8C8" },
  { label: "Savings", value: 800, color: "#6C5CE7" },
];
