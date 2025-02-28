import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
const guideContent = {
  earthquake: {
    beforeDisaster: [
      "Secure heavy furniture to walls",
      "Create an emergency kit",
      "Know safe spots in each room",
      "Practice drop, cover, and hold on",
    ],
    duringDisaster: [
      "Drop to the ground",
      "Take cover under sturdy furniture",
      "Hold on until shaking stops",
      "Stay away from windows",
    ],
    afterDisaster: [
      "Check for injuries",
      "Listen to emergency radio",
      "Avoid damaged areas",
      "Be prepared for aftershocks",
    ],
  },
  flood: {
    beforeDisaster: [
      "Elevate important items",
      "Prepare a flood kit",
      "Know evacuation routes",
      "Install check valves in plumbing",
    ],
    duringDisaster: [
      "Move to higher ground",
      "Avoid walking through floodwater",
      "Don't drive in flooded areas",
      "Turn off utilities if instructed",
    ],
    afterDisaster: [
      "Avoid floodwaters",
      "Clean and disinfect everything",
      "Don't use appliances that got wet",
      "Be aware of areas where water has receded",
    ],
  },
  hurricane: {
    beforeDisaster: [
      "Board up windows",
      "Secure outdoor objects",
      "Prepare an emergency kit",
      "Know your evacuation route",
    ],
    duringDisaster: [
      "Stay indoors",
      "Stay away from windows",
      "Listen to official instructions",
      "Be prepared for power outages",
    ],
    afterDisaster: [
      "Stay out of damaged buildings",
      "Avoid downed power lines",
      "Beware of flooding",
      "Document damage for insurance",
    ],
  },
  wildfire: {
    beforeDisaster: [
      "Create a defensible space around your home",
      "Use fire-resistant materials",
      "Prepare an emergency kit",
      "Plan evacuation routes",
    ],
    duringDisaster: [
      "Follow evacuation orders immediately",
      "Close all windows and doors",
      "Remove flammable curtains",
      "Turn on lights for visibility in smoke",
    ],
    afterDisaster: [
      "Don't return until authorities say it's safe",
      "Check for hot spots in your house",
      "Use caution when entering burned areas",
      "Wear protective clothing and gear",
    ],
  },
  typhoon: {
    beforeDisaster: [
      "Secure loose objects outdoors",
      "Reinforce windows and doors",
      "Stock up on emergency supplies",
      "Review evacuation plans",
    ],
    duringDisaster: [
      "Stay indoors in a safe room",
      "Keep away from windows",
      "Monitor weather updates",
      "Be prepared for power outages",
    ],
    afterDisaster: [
      "Stay alert for flooding and landslides",
      "Avoid downed power lines",
      "Document any damage",
      "Ensure the safety of drinking water",
    ],
  },
  landslide: {
    beforeDisaster: [
      "Learn about your area's landslide risk",
      "Install flexible pipe fittings",
      "Plant ground cover on slopes",
      "Build channels to direct water flow",
    ],
    duringDisaster: [
      "Stay alert for unusual sounds",
      "Move to higher ground immediately",
      "Stay away from the path of the landslide",
      "Listen to emergency instructions",
    ],
    afterDisaster: [
      "Avoid landslide-prone areas",
      "Check for injured or trapped persons",
      "Report broken utility lines",
      "Stay away from damaged areas",
    ],
  },
};

const GuideDetail = ({ route }) => {
  const params = useLocalSearchParams();
  const category = params.category ? JSON.parse(params.category) : {};

  const disasterType = category.title.toLowerCase();
  const content = guideContent[disasterType] || {};

  return (
    <ScrollView style={styles.container}>
      <Image
        source={category.image}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{category.title} Safety Guide</Text>
      <Text style={styles.location}>Category: {category.location}</Text>

      <View style={styles.content}>
        <Section
          title="Before Disaster"
          icon="alert-circle"
          items={content.beforeDisaster || []}
        />
        <Section
          title="During Disaster"
          icon="activity"
          items={content.duringDisaster || []}
        />
        <Section
          title="After Disaster"
          icon="check-circle"
          items={content.afterDisaster || []}
        />
      </View>
    </ScrollView>
  );
};

const Section = ({ title, icon, items }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Feather name={icon} size={24} color="#FF4444" />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    {items.map((item, index) => (
      <View key={index} style={styles.listItem}>
        <Feather name="check" size={18} color="#4CAF50" />
        <Text style={styles.listItemText}>{item}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  location: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  content: {
    marginTop: 20,
  },
  section: {
    marginBottom: 30,
    backgroundColor: "#F8F9FA",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#333",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  listItemText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#666",
  },
});

export default GuideDetail;
