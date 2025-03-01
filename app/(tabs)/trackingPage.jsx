import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  Animated,
  ScrollView,
  StatusBar,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { db } from "@/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

const { width, height } = Dimensions.get("window");

export default function TrackingPage() {
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const mapRef = useRef(null);
  const modalAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const donationsRef = collection(db, "donations");

    const unsubscribe = onSnapshot(donationsRef, (snapshot) => {
      const donationData = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(
          (donation) =>
            donation.location?.latitude && donation.location?.longitude
        );

      setDonations(donationData);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (donations.length > 0 && mapRef.current) {
      const coordinates = donations.map((donation) => ({
        latitude: donation.location.latitude,
        longitude: donation.location.longitude,
      }));

      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
        animated: true,
      });
    }
  }, [donations]);

  const handleMarkerPress = (donation) => {
    setSelectedDonation(donation);
    setModalVisible(true);
    Animated.spring(modalAnimation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(modalAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 9.700419720763279,
          longitude: 123.8932990116588,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {donations.map((donation) => (
          <Marker
            key={donation.id}
            coordinate={{
              latitude: donation.location.latitude,
              longitude: donation.location.longitude,
            }}
            title={donation.itemName}
            pinColor={
              donation.status === "Pending"
                ? "orange"
                : donation.status === "In Transit"
                ? "blue"
                : "green"
            }
            onPress={() => handleMarkerPress(donation)}
          />
        ))}
      </MapView>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <BlurView intensity={100} style={StyleSheet.absoluteFill} />
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [
                {
                  translateY: modalAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [height, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <ScrollView contentContainerStyle={styles.modalContent}>
            {selectedDonation && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>
                    {selectedDonation.itemName}
                  </Text>
                  <TouchableOpacity
                    onPress={closeModal}
                    style={styles.closeButton}
                  >
                    <Feather name="x" size={24} color="#333" />
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor: getStatusColor(selectedDonation.status),
                    },
                  ]}
                >
                  <Text style={styles.statusText}>
                    {selectedDonation.status}
                  </Text>
                </View>
                <View style={styles.detailsContainer}>
                  <DetailItem
                    icon="package"
                    label="Quantity"
                    value={selectedDonation.quantity}
                  />

                  <DetailItem
                    icon="user"
                    label="Donor"
                    value={selectedDonation.donorName || "Anonymous"}
                  />
                </View>
              </>
            )}
          </ScrollView>
        </Animated.View>
      </Modal>
    </View>
  );
}

const DetailItem = ({ icon, label, value }) => (
  <View style={styles.detailItem}>
    <Feather name={icon} size={20} color="#666" style={styles.detailIcon} />
    <View>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  map: {
    width: width,
    height: height,
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    maxHeight: height * 0.8,
  },
  modalContent: {
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    padding: 5,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20,
  },
  statusText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  detailsContainer: {
    backgroundColor: "#F0F0F0",
    borderRadius: 12,
    padding: 15,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  detailIcon: {
    marginRight: 15,
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});
