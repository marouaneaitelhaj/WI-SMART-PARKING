import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const History: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<number | null>(null);

  const handleButtonPress = (index: number) => {
    setSelectedButton(selectedButton === index? null : index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === 0? { backgroundColor: '#24aaa1', borderWidth: 0 } : {},
          ]}
          onPress={() => handleButtonPress(0)}
        >
          <Text style={styles.buttonText}>Ongoing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === 1? { backgroundColor: '#24aaa1', borderWidth: 0 } : {},
          ]}
          onPress={() => handleButtonPress(1)}
        >
          <Text style={styles.buttonText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === 2? { backgroundColor: '#24aaa1', borderWidth: 0 } : {},
          ]}
          onPress={() => handleButtonPress(2)}
        >
          <Text style={styles.buttonText}>Cancelled</Text>
        </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    width: 150,
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default History;