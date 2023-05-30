import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    // Construir los datos de inicio de sesión en un objeto
    const loginData = {
      email: username,
      password: password,
    };

    fetch('http://192.168.0.102:8080/api/login.php/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then(response => {
        // Imprimir la respuesta completa
        //console.log(response);
        return response.json();
      })
      .then(data => {
        console.log(data); // Imprimir la respuesta JSON
        
        if (data.success) {
          // Inicio de sesión exitoso, redirigir al usuario a la pantalla Dashboard con el parámetro username
          Alert.alert('OK', data.message);
          navigation.navigate('DashboardScreen', { username: username });
        } else {
          // Credenciales incorrectas, mostrar un mensaje de error
          //Alert.alert('Error', 'Credenciales incorrectas');
          Alert.alert('Error', data.message);
        }
      })
      .catch(error => {
        // Manejar cualquier error de la solicitud
        console.error(error);     
        Alert.alert('Error', 'Ocurrió un error durante el inicio de sesión');
      });
    };

  const handleRegister = () => {
    // Redirigir al usuario a la pantalla RegisterScreen
    navigation.navigate('RegisterScreen');
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
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.registerLink}>¿No estás registrado? Regístrate aquí</Text>
      </TouchableOpacity>
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
  registerLink: {
    marginTop: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
