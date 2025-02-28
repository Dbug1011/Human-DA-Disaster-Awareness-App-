import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

// Import images
import earthquake from "../../assets/images/hazards/earthquake.png";
import flood from "../../assets/images/hazards/flood.png";
import hurricane from "../../assets/images/hazards/hurricane.png";
import wildfire from "../../assets/images/hazards/wildfire.png";
import landslide from "../../assets/images/hazards/landslide.png";
import typhoon from "../../assets/images/hazards/typhoon.png";

const hazardCategories = [
  {
    id: 1,
    title: "Earthquake",
    location: "Ground Safety",
    image: earthquake,
    color: "#FFD6D6",
  },
  {
    id: 2,
    title: "Flood",
    location: "Water Safety",
    image: flood,
    color: "#D6E6FF",
  },
  {
    id: 3,
    title: "Hurricane",
    location: "Storm Safety",
    image: hurricane,
    color: "#FFE4D6",
  },
  {
    id: 4,
    title: "Wildfire",
    location: "Fire Safety",
    image: wildfire,
    color: "#FFD6D6",
  },
  {
    id: 5,
    title: "Landslide",
    location: "Ground Safety",
    image: landslide,
    color: "#D6FFE4",
  },
  {
    id: 6,
    title: "Typhoon",
    location: "Storm Safety",
    image: typhoon,
    color: "#E4D6FF",
  },
];

const GuidePage = () => {
  const router = useRouter();

  const handlePress = (category) => {
    router.push({
      pathname: "/screens/GuideDetail",
      params: { category: JSON.stringify(category) },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFE4E1" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Emergency Guide</Text>
        </View>

        <View style={styles.cardsContainer}>
          {hazardCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.card, { backgroundColor: category.color }]}
              onPress={() => handlePress(category)}
            >
              <View style={styles.cardContent}>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{category.title}</Text>
                  <View style={styles.locationContainer}>
                    <Feather name="alert-triangle" size={12} color="#FF4444" />
                    <Text style={styles.locationText}>{category.location}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.favoriteButton}>
                  <Feather name="bookmark" size={20} color="#FF4444" />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 20,
    flex: 1,
    backgroundColor: "#FFE4E1",
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    padding: 0,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 25,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    elevation: 5,
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
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 20,
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
