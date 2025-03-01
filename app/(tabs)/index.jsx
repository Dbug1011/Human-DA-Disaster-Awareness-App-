import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  useColorScheme,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Alert,
  Linking,
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
import { LinearGradient } from "expo-linear-gradient";

const emergencyNumbers = {
  Ambulance: "09193424793",
  Hospital: "5039636",
  Police: "09985986414",
  Firefighter: "5039636",
};

const { width } = Dimensions.get("window");

const requestPermission = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Permission Denied", "Location permission is required.");
    return;
  }
};

// Function to make a call
const handleCall = async (phoneNumber) => {
  if (!phoneNumber) {
    Alert.alert("Error", "No contact number available.");
    return;
  }

  let formattedNumber = `tel:${phoneNumber}`;

  const supported = await Linking.canOpenURL(formattedNumber);
  if (supported) {
    await Linking.openURL(formattedNumber);
  } else {
    Alert.alert("Error", "This device cannot make phone calls.");
  }
};

// Emergency Service Component with Call Functionality
const EmergencyService = ({ title, icon }) => (
  <TouchableOpacity
    onPress={() => handleCall(emergencyNumbers[title])}
    style={styles.serviceItem}
  >
    <View style={styles.serviceIconContainer}>
      <Image source={icon} style={styles.serviceIcon} />
    </View>
    <Text style={styles.serviceText}>{title}</Text>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const colorScheme = useColorScheme();

  const handleDonatePress = () => {
    router.push("/screens/donatePage");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView>
        <View style={styles.coverContainer}>
          <Image source={logo} style={styles.coverImage} resizeMode="cover" />
          <LinearGradient
            colors={["transparent", "rgba(255,228,225,0.9)", "#FFE4E1"]}
            style={styles.gradient}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>HUMAN DA</Text>
            <Text style={styles.subtitle}>Emergency Response App</Text>
          </View>
        </View>

        <View style={styles.content}>
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

          <Text style={styles.sectionTitle}>Emergency Services</Text>
          <View style={styles.servicesGrid}>
            <EmergencyService title="Ambulance" icon={ambulance} />
            <EmergencyService title="Hospital" icon={hospital} />
            <EmergencyService title="Police" icon={police} />
            <EmergencyService title="Firefighter" icon={firefighter} />
          </View>

          <Text style={styles.sectionTitle}>Your Location</Text>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 9.700264381904576,
                longitude: 123.8931939503095,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE4E1",
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
    padding: 20,
  },
  donateButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF4444",
    padding: 15,
    borderRadius: 25,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  donateIcon: {
    marginRight: 10,
  },
  donateButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  serviceItem: {
    width: width / 2 - 30,
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  serviceIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FFE4E1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  serviceIcon: {
    width: 40,
    height: 40,
  },
  serviceText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  mapContainer: {
    height: 200,
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  map: {
    flex: 1,
  },
});
