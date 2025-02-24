import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";

const guidePage = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Image
        source={}
        style={styles.image}
      /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, alignItems: "center" },
  image: { width: "100%", height: 400, resizeMode: "contain" },
});

export default guidePage;
