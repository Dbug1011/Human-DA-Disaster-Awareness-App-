import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const checklistData = {
  "Basic Necessities": [
    "Water (1 gallon per person per day)",
    "Non-perishable food",
    "Manual can opener",
    "Cash and change",
    "Important documents (ID, insurance, etc.)",
  ],
  "Lighting & Power": [
    "Flashlights",
    "Extra batteries",
    "Solar-powered or hand-crank radio",
    "Portable phone charger",
    "Glow sticks",
  ],
  "First Aid & Medical Supplies": [
    "First aid kit",
    "Prescription medications",
    "Pain relievers",
    "Bandages and gauze",
    "Antiseptic wipes",
  ],
  "Personal Hygiene": [
    "Hand sanitizer",
    "Toilet paper",
    "Feminine supplies",
    "Soap",
    "Toothbrush and toothpaste",
  ],
  "Emergency Tools": [
    "Multi-tool or knife",
    "Duct tape",
    "Rope",
    "Whistle",
    "Fire extinguisher",
  ],
  "Clothing & Shelter": [
    "Change of clothes",
    "Sturdy shoes",
    "Rain gear",
    "Blankets or sleeping bags",
    "Emergency tent",
  ],
};

const ChecklistItem = ({ item, isChecked, onToggle }) => (
  <TouchableOpacity style={styles.checklistItem} onPress={onToggle}>
    <View style={[styles.checkbox, isChecked && styles.checkedBox]}>
      {isChecked && <Feather name="check" size={16} color="#FFF" />}
    </View>
    <Text style={[styles.checklistText, isChecked && styles.checkedText]}>
      {item}
    </Text>
  </TouchableOpacity>
);

const CheckListPage = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const toggleItem = (category, item) => {
    setCheckedItems((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: !prev[category]?.[item],
      },
    }));
  };

  const renderCategory = ({ item: category }) => (
    <View style={styles.categoryContainer}>
      <TouchableOpacity
        style={styles.categoryHeader}
        onPress={() => toggleCategory(category)}
      >
        <Text style={styles.categoryTitle}>{category}</Text>
        <Feather
          name={expandedCategory === category ? "chevron-up" : "chevron-down"}
          size={24}
          color="#FFF"
        />
      </TouchableOpacity>
      {expandedCategory === category && (
        <FlatList
          data={checklistData[category]}
          renderItem={({ item }) => (
            <ChecklistItem
              item={item}
              isChecked={checkedItems[category]?.[item] || false}
              onToggle={() => toggleItem(category, item)}
            />
          )}
          keyExtractor={(item) => item}
        />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFE4E1" />
      <Text style={styles.header}>Emergency Checklist</Text>
      <FlatList
        data={Object.keys(checklistData)}
        renderItem={renderCategory}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE4E1",
    top: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
    paddingTop: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  categoryContainer: {
    marginBottom: 15,
    backgroundColor: "#FFF",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FFF",
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "00000",
  },
  checklistItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#0b7fa4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkedBox: {
    backgroundColor: "#0b7fa4",
  },
  checklistText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  checkedText: {
    textDecorationLine: "line-through",
    color: "#888",
  },
});

export default CheckListPage;
