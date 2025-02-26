// volunteerDashboardPage.jsx
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { db } from "@/firebaseConfig";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";

export default function volunteerDashboardPage() {
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

  const updateStatus = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, "donations", id), { status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={donations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}>
            <Text>Item: {item.itemName}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Location: {item.location}</Text>
            <Text>Status: {item.status}</Text>

            {item.status === "Pending" && (
              <Button
                title="Accept Donation"
                onPress={() => updateStatus(item.id, "In Transit")}
              />
            )}

            {item.status === "In Transit" && (
              <Button
                title="Mark as Delivered"
                onPress={() => updateStatus(item.id, "Delivered")}
              />
            )}
          </View>
        )}
      />
    </View>
  );
}
