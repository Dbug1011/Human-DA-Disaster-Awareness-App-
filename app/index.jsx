import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function landingPage() {
  const router = useRouter();

  return (
    <LinearGradient colors={["#EED6D4", "#DAC2C2"]} style={styles.container}>
      {/* Logo */}
      <Image source={"assets/images/HUMAN DA.jpg"} style={styles.logo} />

      {/* Emergency Quick Dial */}
      <Text style={styles.header}>Emergency Quick Dial</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => alert("Calling Ambulance")}
        >
          <Image source={"../assets/ambulance.png"} style={styles.icon} />
          <Text style={styles.iconText}>Ambulance</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => alert("Calling Hospital")}
        >
          <Image source={"../assets/hospital.png"} style={styles.icon} />
          <Text style={styles.iconText}>Hospital</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => alert("Calling Police")}
        >
          <Image source={"../assets/police.png"} style={styles.icon} />
          <Text style={styles.iconText}>Police</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => alert("Calling Firefighter")}
        >
          <Image source={"../assets/firefighter.png"} style={styles.icon} />
          <Text style={styles.iconText}>Firefighter</Text>
        </TouchableOpacity>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/guidePage")}
        >
          <Text style={styles.buttonText}>🛟 Survival Guide</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/checkListPage")}
        >
          <Text style={styles.buttonText}>✅ Checklist</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 80,
    resizeMode: "contain",
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 30,
  },
  iconContainer: {
    alignItems: "center",
    width: 80,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 5,
  },
  iconText: {
    fontSize: 14,
    color: "#E1F5FE",
    textAlign: "center",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    backgroundColor: "#F4A261",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
});
