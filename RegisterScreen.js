import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert , Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = () => {
    // Validar los datos de registro aquí
    if (username && password && password === confirmPassword) {
      // Construir los datos de registro en un objeto
      const registerData = {
        email: username,
        password: password,
      };

      // Realizar la solicitud POST a la API para registrar al usuario
      fetch('http://192.168.0.102:8080/api/login.php/register', {
        method: 'POST',
        headers: {
           Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data); // Imprimir la respuesta JSON
          // Verificar la respuesta de la API
          if (data.success) {
            // Registro exitoso, realizar alguna acción aquí
            Alert.alert('OK', data.message);
            setUsername(''); // Limpiar el campo de usuario
            setPassword(''); // Limpiar el campo de contraseña
            setConfirmPassword(''); // Limpiar el campo de confirmar contraseña          
            // Redirigir a la pantalla de inicio de sesión después de 5 segundos
            setTimeout(() => {
            navigation.navigate('LoginScreen');
             }, 5000);
          } else {
            Alert.alert('OK', data.message);
            // Error en el registro, mostrar un mensaje de error
            //Alert.alert('Error', 'Ocurrió un error durante el registro 1.');
          }
        })
        .catch(error => {
          // Manejar cualquier error de la solicitud
          console.error(error);
          Alert.alert('Error', 'Ocurrió un error durante el registro 2.');
        });
    } else {
      // Datos de registro incorrectos, mostrar un mensaje de error
      Alert.alert(
        'Error',
        'Por favor, ingrese todos los campos y asegúrese de que las contraseñas coincidan.'
      );
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
      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        onChangeText={text => setConfirmPassword(text)}
        value={confirmPassword}
        secureTextEntry
      />
      <Button title="Registrarse" onPress={handleRegister} />
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

export default RegisterScreen;
