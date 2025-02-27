// donatePage.jsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { db } from "@/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function donatePage() {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async () => {
    if (!itemName || !quantity || !location) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "donations"), {
        itemName,
        quantity: parseInt(quantity),
        location,
        status: "Pending",
        createdAt: new Date(),
      });

      Alert.alert("Success", "Donation submitted!");
      setItemName("");
      setQuantity("");
      setLocation("");
    } catch (error) {
      Alert.alert("Error", "Failed to submit donation.");
      console.error(error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Item Name:</Text>
      <TextInput
        value={itemName}
        onChangeText={setItemName}
        style={{ borderWidth: 1, padding: 8 }}
      />

      <Text>Quantity:</Text>
      <TextInput
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8 }}
      />

      <Text>Location:</Text>
      <TextInput
        value={location}
        onChangeText={setLocation}
        style={{ borderWidth: 1, padding: 8 }}
      />
      <View style={{ margin: 10, padding: 10 }} />

      <Button
        title="Submit Donation"
        onPress={handleSubmit}
        style={{ borderWidth: 1, padding: 8 }}
      />
    </View>
  );
}
