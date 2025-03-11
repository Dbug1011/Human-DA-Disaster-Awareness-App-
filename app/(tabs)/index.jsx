"use client";

import { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Text,
  Linking,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
  SafeAreaView,
  StatusBar,
  Modal,
  Image,
  useColorScheme,
} from "react-native";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import MapView from "react-native-maps";
import { Ionicons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";

import ambulance from "../../assets/ambulance.png";
import hospital from "../../assets/hospital.png";
import police from "../../assets/police.png";
import firefighter from "../../assets/firefighter.png";
import logo from "../../assets/HUMAN_DA.jpg";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const colorScheme = useColorScheme();
  const [location, setLocation] = useState(null);
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: "Ambulance", phone: "09193424793", icon: ambulance },
    { name: "Hospital", phone: "5039636", icon: hospital },
    { name: "Police", phone: "09985986414", icon: police },
    { name: "Firefighter", phone: "5039636", icon: firefighter },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", phone: "" });

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required.");
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, [fadeAnim]);

  const handleCall = (phoneNumber) => {
    if (!phoneNumber) {
      Alert.alert("Error", "No contact number available.");
      return;
    }
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleSendSMS = (phoneNumber) => {
    if (!location) {
      Alert.alert(
        "Location not available",
        "Please enable location services or enter location manually."
      );
      return;
    }
    const message = `Emergency! Need urgent assistance. Location: \nLatitude: ${location.latitude}, Longitude: ${location.longitude}.`;
    Linking.openURL(`sms:${phoneNumber}?body=${encodeURIComponent(message)}`);
  };

  const handleDonatePress = () => {
    router.push("/screens/donatePage");
  };

  const addEmergencyContact = () => {
    if (!newContact.name || !newContact.phone) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    setEmergencyContacts([...emergencyContacts, { ...newContact, icon: null }]);
    setNewContact({ name: "", phone: "" });
    setModalVisible(false);
  };

  const EmergencyService = ({ title, icon, phone }) => (
    <TouchableOpacity
      onPress={() => handleCall(phone)}
      onLongPress={() => handleSendSMS(phone)}
      style={styles.serviceItem}
    >
      <View style={styles.serviceIconContainer}>
        {icon ? (
          <Image source={icon} style={styles.serviceIcon} />
        ) : (
          <Text style={styles.iconText}>{title[0].toUpperCase()}</Text>
        )}
      </View>
      <Text style={styles.serviceText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View style={[styles.coverContainer, { opacity: fadeAnim }]}>
          <Image source={logo} style={styles.coverImage} resizeMode="cover" />
          <LinearGradient
            colors={["transparent", "rgba(255,228,225,0.9)", "#FFE4E1"]}
            style={styles.gradient}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>HUMAN DA</Text>
            <Text style={styles.subtitle}>Emergency Response App</Text>
          </View>
        </Animated.View>

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
            {emergencyContacts.map((contact, index) => (
              <EmergencyService
                key={index}
                title={contact.name}
                icon={contact.icon}
                phone={contact.phone}
              />
            ))}
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Feather name="plus-circle" size={24} color="#FF4444" />
            <Text style={styles.addButtonText}>Add Contact</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Your Location</Text>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location ? location.latitude : 9.700264381904576,
                longitude: location ? location.longitude : 123.8931939503095,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              showsUserLocation={true}
            />
          </View>
        </View>
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Emergency Contact</Text>
            <TextInput
              style={styles.input}
              placeholder="Contact Name"
              value={newContact.name}
              onChangeText={(text) =>
                setNewContact({ ...newContact, name: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={newContact.phone}
              onChangeText={(text) =>
                setNewContact({ ...newContact, phone: text })
              }
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={addEmergencyContact}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Feather name="x" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

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
    marginBottom: 20,
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
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
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
  iconText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF4444",
  },
  serviceText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  addButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#FF4444",
    fontWeight: "bold",
  },
  mapContainer: {
    height: 200,
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  map: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: "#FF4444",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
