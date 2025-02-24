import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const LandingScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("../assets/logo.png")} style={styles.logo} />

      {/* Emergency Quick Dial */}
      <Text style={styles.header}>Emergency Call</Text>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => alert("Calling Ambulance")}>
          <Image
            source={require("../assets/ambulance.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("Calling Hospital")}>
          <Image
            source={require("../assets/hospital.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("Calling Police")}>
          <Image source={require("../assets/police.png")} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("Calling Firefighter")}>
          <Image
            source={require("../assets/firefighter.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate("SurvivalGuide")}>
          <Text style={styles.buttonText}>🛟 Survival Guide</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Checklist")}>
          <Text style={styles.buttonText}>✅ Checklist</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F8F9FA",
  },
  logo: { width: 200, height: 80, resizeMode: "contain", marginBottom: 10 },
  header: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  icon: { width: 60, height: 60, margin: 10 },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  buttonText: { fontSize: 16, fontWeight: "bold", color: "#007AFF" },
});

export default LandingScreen;
