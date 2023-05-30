import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const DashboardScreen = ({ route }) => {
  const { username } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido</Text>
      <Text style={styles.usernameText}>{username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E5EF',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  usernameText: {
    fontSize: 18,
    fontStyle: 'italic',
  },
});

export default DashboardScreen;
