import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function VolunteerDashboardPage() {
  const [role, setRole] = useState(null);
  const [adminCode, setAdminCode] = useState("");
  const [donations, setDonations] = useState([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const CORRECT_ADMIN_CODE = "1234";

  useEffect(() => {
    const donationsRef = collection(db, "donations");

    const unsubscribe = onSnapshot(donationsRef, (snapshot) => {
      const donationData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDonations(donationData);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, "donations", id), { status: newStatus });
      Alert.alert("Success", `Donation status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      Alert.alert("Error", "Failed to update donation status");
    }
  };

  const renderDonationItem = ({ item }) => (
    <View style={styles.donationItem}>
      <View style={styles.donationHeader}>
        <Text style={styles.itemName}>{item.itemName}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.itemDetail}>Quantity: {item.quantity}</Text>
      <Text style={styles.itemDetail}>
        Location: {formatLocation(item.location)}
      </Text>

      {role === "admin" &&
        isAdminAuthenticated &&
        item.status === "Pending" && (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#4CAF50" }]}
            onPress={() => updateStatus(item.id, "In Transit")}
          >
            <Feather name="truck" size={18} color="#fff" />
            <Text style={styles.buttonText}>Accept Donation</Text>
          </TouchableOpacity>
        )}

      {role === "admin" &&
        isAdminAuthenticated &&
        item.status === "In Transit" && (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#2196F3" }]}
            onPress={() => updateStatus(item.id, "Delivered")}
          >
            <Feather name="check-circle" size={18} color="#fff" />
            <Text style={styles.buttonText}>Mark as Delivered</Text>
          </TouchableOpacity>
        )}
    </View>
  );

  const handleAdminLogin = () => {
    if (adminCode === CORRECT_ADMIN_CODE) {
      setIsAdminAuthenticated(true);
    } else {
      Alert.alert("Access Denied", "Incorrect admin code.");
      setAdminCode("");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#FFA000";
      case "In Transit":
        return "#2196F3";
      case "Delivered":
        return "#4CAF50";
      default:
        return "#757575";
    }
  };

  const formatLocation = (location) => {
    if (
      typeof location === "object" &&
      location.latitude &&
      location.longitude
    ) {
      return `Lat: ${location.latitude.toFixed(
        4
      )}, Lon: ${location.longitude.toFixed(4)}`;
    }
    return "Location not available";
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {role === null ? (
          <View style={styles.roleSelectionContainer}>
            <Text style={styles.title}>Welcome to Volunteer Dashboard</Text>
            <Text style={styles.subtitle}>Please select your role:</Text>
            <TouchableOpacity
              style={[styles.roleButton, styles.adminButton]}
              onPress={() => setRole("admin")}
            >
              <Feather name="shield" size={24} color="#fff" />
              <Text style={styles.roleButtonText}>I am an Admin</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roleButton, styles.userButton]}
              onPress={() => setRole("user")}
            >
              <Feather name="user" size={24} color="#fff" />
              <Text style={styles.roleButtonText}>I am a User</Text>
            </TouchableOpacity>
          </View>
        ) : role === "admin" && !isAdminAuthenticated ? (
          <View style={styles.adminAuthContainer}>
            <TouchableOpacity onPress={() => navigation.goBack}>
              <Feather name="arrow-left" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.title}>Admin</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter admin code"
              value={adminCode}
              onChangeText={setAdminCode}
              secureTextEntry
              placeholderTextColor="#999"
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAdminLogin}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => setRole(null)}
                style={styles.backButton}
              >
                <Feather name="arrow-left" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>
                {role === "admin" ? "Admin Dashboard" : "Donated Goods"}
              </Text>
            </View>

            <FlatList
              data={donations}
              keyExtractor={(item) => item.id}
              renderItem={renderDonationItem}
              contentContainerStyle={styles.listContent}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EED6D4",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EED6D4",
  },
  roleSelectionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  adminAuthContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
  },
  roleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: "80%",
  },
  adminButton: {
    backgroundColor: "#FF6B6B",
  },
  userButton: {
    backgroundColor: "#4CAF50",
  },
  roleButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: "80%",
    fontSize: 16,
    backgroundColor: "#fff",
  },
  submitButton: {
    backgroundColor: "#FF6B6B",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 20,
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#333",
  },
  listContent: {
    paddingBottom: 20,
  },
  donationItem: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  donationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  itemName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  itemDetail: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
