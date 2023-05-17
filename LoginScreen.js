import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Image } from 'react-native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Validar los datos de inicio de sesión aquí
    if (username === 'usuario' && password === 'contraseña') {
      // Inicio de sesión exitoso, realizar alguna acción aquí
      Alert.alert('¡Inicio de sesión exitoso!');
    } else {
      // Credenciales incorrectas, mostrar un mensaje de error
      Alert.alert('Error', 'Credenciales incorrectas');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('./img/udb.png')} style={styles.image} resizeMode="contain" />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />   
      <Button title="Iniciar sesión" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200, // Ajusta el tamaño de la imagen según tus necesidades
    height: 200, // Ajusta el tamaño de la imagen según tus necesidades
  },
});

export default LoginScreen;