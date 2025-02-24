import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const data = [
  'Basic Necessities', 'Lighting & Power', 'First Aid & Medical Supplies', 
  'Personal Hygiene', 'Emergency Tools', 'Clothing & Shelter'
];

const checkListPage = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}>
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  item: { padding: 15, marginVertical: 5, backgroundColor: '#F8F9FA', borderRadius: 8 },
  text: { fontSize: 16, fontWeight: 'bold' }
});

export default checkListPage;
