import React, { useState } from 'react';
import { Button, Text, View, StyleSheet, Alert } from 'react-native';
import { addData, getData, db } from '../firebase/firebaseConfig';

export const FirebaseTest = () => {
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const testFirebaseConnection = async () => {
    setIsLoading(true);
    setTestResult(null);

    try {
      // Test data to add to Firestore
      const testData = {
        message: 'Test connection successful',
        timestamp: new Date().toISOString(),
      };

      // Add data to a test collection
      const docId = await addData('test-connection', testData);
      
      // Get data back to verify it worked
      const data = await getData('test-connection');
      
      // Show success
      setTestResult(`Connection successful! Created document with ID: ${docId}`);
    } catch (error) {
      // Show error
      setTestResult(`Error: ${error instanceof Error ? error.message : String(error)}`);
      Alert.alert('Connection Error', 'Failed to connect to Firebase. Check your configuration and internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firebase Connection Test</Text>
      <Button 
        title={isLoading ? "Testing..." : "Test Connection"} 
        onPress={testFirebaseConnection}
        disabled={isLoading} 
      />
      {testResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{testResult}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    width: '100%',
  },
  resultText: {
    fontSize: 14,
  },
});