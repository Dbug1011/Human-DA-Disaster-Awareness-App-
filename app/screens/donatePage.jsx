import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { db } from "@/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import * as Location from "expo-location";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function DonatePage() {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [donorName, setDonorName] = useState("");
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Allow location access to auto-fill location."
        );
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    } catch (error) {
      console.error("Error fetching location:", error);
      Alert.alert("Error", "Could not fetch location.");
    }
  };

  const handleSubmit = async () => {
    if (!itemName || !quantity || !location) {
      Alert.alert("Error", "Please fill all fields and allow location access.");
      return;
    }

    setIsLoading(true);
    try {
      await addDoc(collection(db, "donations"), {
        itemName,
        quantity: parseInt(quantity),
        donorName,
        location,
        status: "Pending",
        createdAt: new Date(),
      });

      Alert.alert("Success", "Thank you for your donation!");
      setItemName("");
      setQuantity("");
    } catch (error) {
      Alert.alert("Error", "Failed to submit donation. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Donate Items</Text>
        </View>

        <View style={styles.inputContainer}>
          <Feather name="box" size={24} color="#666" style={styles.inputIcon} />
          <TextInput
            value={itemName}
            onChangeText={setItemName}
            style={styles.input}
            placeholder="Item Name"
            placeholderTextColor="#999"
          />
        </View>
        <View style={styles.inputContainer}>
          <Feather
            name="user"
            size={24}
            color="#666"
            style={styles.inputIcon}
          />
          <TextInput
            value={donorName}
            onChangeText={setDonorName}
            style={styles.input}
            placeholder="Donor Name"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputContainer}>
          <Feather
            name="hash"
            size={24}
            color="#666"
            style={styles.inputIcon}
          />
          <TextInput
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            style={styles.input}
            placeholder="Quantity"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.locationContainer}>
          <Feather
            name="map-pin"
            size={24}
            color="#666"
            style={styles.inputIcon}
          />
          <Text style={styles.locationText}>
            {location
              ? `Lat: ${location.latitude.toFixed(
                  4
                )}, Lon: ${location.longitude.toFixed(4)}`
              : "Fetching location..."}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Feather
                name="heart"
                size={24}
                color="#fff"
                style={styles.buttonIcon}
              />
              <Text style={styles.submitButtonText}>Submit Donation</Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.thankYouText}>
          Your generosity can make a real difference in someone's life. Thank
          you for considering a donation!
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EED6D4",
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    paddingTop: 20,
  },
  backButton: {
    padding: 10,
  },
  title: {
    flex: 1,
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginRight: 34, // To center the title accounting for the back button width
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#D4B5B3",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#F5E8E7",
    borderRadius: 8,
  },
  locationText: {
    flex: 1,
    fontSize: 14,
    color: "#666",
  },
  submitButton: {
    backgroundColor: "#FF6B6B",
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonIcon: {
    marginRight: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  thankYouText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 14,
    color: "#4A4A4A",
    fontStyle: "italic",
  },
});
