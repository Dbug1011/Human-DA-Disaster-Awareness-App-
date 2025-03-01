"use client";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

// Import images
import earthquake from "../../assets/images/hazards/earthquake.png";
import flood from "../../assets/images/hazards/flood.png";
import hurricane from "../../assets/images/hazards/hurricane.png";
import wildfire from "../../assets/images/hazards/wildfire.png";
import landslide from "../../assets/images/hazards/landslide.png";
import typhoon from "../../assets/images/hazards/typhoon.png";
import logo from "../../assets/safe.png";

const { width } = Dimensions.get("window");

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
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.coverContainer}>
          <Image source={logo} style={styles.coverImage} resizeMode="cover" />
          <LinearGradient
            colors={["transparent", "rgba(255,228,225,0.9)", "#FFE4E1"]}
            style={styles.gradient}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Emergency Guide</Text>
            <Text style={styles.subtitle}>Stay Prepared, Stay Safe</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Hazard Categories</Text>
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
                      <Feather
                        name="alert-triangle"
                        size={12}
                        color="#FF4444"
                      />
                      <Text style={styles.locationText}>
                        {category.location}
                      </Text>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE4E1",
  },
  scrollContent: {
    flexGrow: 1,
  },
  coverContainer: {
    height: 250,
    width: "100%",
    position: "relative",
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
  },
  titleContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFF",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#FFF",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  content: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: width - 20,
    borderRadius: 15,
    marginBottom: 20,
    padding: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  favoriteButton: {
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 20,
  },
  imageContainer: {
    marginTop: 15,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: {
    width: "80%",
    height: "80%",
  },
});

export default GuidePage;
