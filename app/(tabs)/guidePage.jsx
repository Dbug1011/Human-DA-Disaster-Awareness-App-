import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

// Import images
import earthquake from "../../assets/images/hazards/earthquake.png";
import flood from "../../assets/images/hazards/flood.png";
import hurricane from "../../assets/images/hazards/hurricane.png";
import wildfire from "../../assets/images/hazards/wildfire.png";

const hazardCategories = [
  {
    id: 1,
    title: "Earthquake",
    location: "Ground Safety",
    image: earthquake,
    color: "#E6E6FA",
  },
  {
    id: 2,
    title: "Flood",
    location: "Water Safety",
    image: flood,
    color: "#B2EBF2",
  },
  {
    id: 3,
    title: "Hurricane",
    location: "Storm Safety",
    image: hurricane,
    color: "#B3E0FF",
  },
  {
    id: 4,
    title: "Wildfire",
    location: "Fire Safety",
    image: wildfire,
    color: "#FFCCBC",
  },
];

const GuidePage = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Emergency Guide</Text>
        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search emergency guides..."
            placeholderTextColor="#666"
          />
        </View>
      </View>

      <View style={styles.cardsContainer}>
        {hazardCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[styles.card, { backgroundColor: category.color }]}
            onPress={() => navigation.navigate("GuideDetail", { category })}
          >
            <View style={styles.cardContent}>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{category.title}</Text>
                <View style={styles.locationContainer}>
                  <Feather name="alert-triangle" size={12} color="#666" />
                  <Text style={styles.locationText}>{category.location}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.favoriteButton}>
                <Feather name="bookmark" size={20} color="#666" />
              </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={category.image}
                style={styles.cardImage}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  cardsContainer: {
    padding: 20,
  },
  card: {
    borderRadius: 20,
    marginBottom: 20,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  favoriteButton: {
    padding: 8,
  },
  imageContainer: {
    marginTop: 20,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
});

export default GuidePage;
