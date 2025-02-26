// trackingPage.jsx
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { db } from "@/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

export default function trackingPage() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const donationsRef = collection(db, "donations");

    const unsubscribe = onSnapshot(donationsRef, (snapshot) => {
      const donationData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDonations(donationData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 10.3157, // Default latitude (adjust as needed)
          longitude: 123.8854, // Default longitude (adjust as needed)
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {donations.map((donation) => (
          <Marker
            key={donation.id}
            coordinate={{
              latitude: parseFloat(donation.location.split(",")[0]), // Assuming "lat,lng" format
              longitude: parseFloat(donation.location.split(",")[1]),
            }}
            title={donation.itemName}
            description={`Status: ${donation.status}`}
          />
        ))}
      </MapView>
    </View>
  );
}
