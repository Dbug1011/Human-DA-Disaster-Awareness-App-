import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { db } from "@/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

export default function TrackingPage() {
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
          latitude: 9.700419720763279, // Default latitude (adjust as needed)
          longitude: 123.8932990116588, // Default longitude (adjust as needed)
          latitudeDelta: 0.000000001,
          longitudeDelta: 0.000000001,
        }}
      >
        {donations.map((donation) => {
          const [latitude, longitude] = donation.location
            .split(",")
            .map(parseFloat);
          return (
            <Marker
              key={donation.id}
              coordinate={{ latitude, longitude }}
              title={donation.itemName}
              pinColor={
                donation.status === "Pending"
                  ? "orange"
                  : donation.status === "In Transit"
                  ? "blue"
                  : "green"
              } // Color indicators
            >
              <Callout>
                <View>
                  <Text style={{ fontWeight: "bold" }}>
                    {donation.itemName}
                  </Text>
                  <Text>Status: {donation.status}</Text>
                  <Text>From: {donation.origin || "Unknown"}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}
