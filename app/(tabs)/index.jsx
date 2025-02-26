import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  useColorScheme,
} from "react-native";
import MapView from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import ambulance from "../../assets/ambulance.png";
import hospital from "../../assets/hospital.png";
import police from "../../assets/police.png";
import firefighter from "../../assets/firefighter.png";
import logo from "../../assets/HUMAN_DA.jpg";
import { Colors } from "@/constants/Colors";

const requestPermission = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Permission Denied", "Location permission is required.");
    return;
  }
};

const EmergencyService = ({ title, icon }) => (
  <View style={styles.serviceItem}>
    <Image source={icon} style={styles.serviceIcon} />
    <Text style={styles.serviceText}>{title}</Text>
  </View>
);

export default function HomeScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const colorScheme = useColorScheme();

  const handleDonatePress = () => {
    router.push("/screens/donatePage");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
      </View>

      <Text style={styles.sectionTitle}>Emergency Call</Text>
      <View style={styles.servicesGrid}>
        <EmergencyService title="Ambulance" icon={ambulance} />
        <EmergencyService title="Hospital" icon={hospital} />
        <EmergencyService title="Police" icon={police} />
        <EmergencyService title="Firefighter" icon={firefighter} />
      </View>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
      <TouchableOpacity
        style={[
          styles.donateButton,
          { backgroundColor: Colors[colorScheme ?? "light"].tint },
        ]}
        onPress={handleDonatePress}
      >
        <Ionicons
          name="heart"
          size={24}
          color="white"
          style={styles.donateIcon}
        />
        <Text style={styles.donateButtonText}>Donate Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE4E1",
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  logo: {
    width: "100%",
    height: 60,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 15,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    justifyContent: "space-around",
  },
  serviceItem: {
    width: "22%",
    alignItems: "center",
    marginBottom: 15,
  },
  serviceIcon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  serviceText: {
    fontSize: 12,
    textAlign: "center",
  },
  mapContainer: {
    height: 200,
    margin: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
  map: {
    flex: 1,
  },
  donateButton: {
    backgroundColor: "#FF4444",
    padding: 15,
    margin: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  donateButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  navItem: {
    alignItems: "center",
    flex: 1,
  },
  navIcon: {
    width: 24,
    height: 24,
  },
  navText: {
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },
  navHome: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 25,
  },
  homeIcon: {
    width: 24,
    height: 24,
    tintColor: "#fff",
  },
});
