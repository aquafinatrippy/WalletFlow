import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 2,
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
  bannerLogo: {
    height: 550,
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  actionsHint: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
  },
});
