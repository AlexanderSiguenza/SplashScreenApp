import React, { useEffect } from 'react';
import { Animated, Easing, Image, StyleSheet, Text, View } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const rotationValue = new Animated.Value(0);

  useEffect(() => {
    // Simulación de una carga de 5 segundos antes de redirigir a la pantalla de inicio de sesión
    setTimeout(() => {
      navigation.replace('LoginScreen'); // Reemplaza la pantalla actual por la pantalla de inicio de sesión
    }, 5000); // 5000 milisegundos = 5 segundos

    // Configuración de la animación giratoria
    Animated.loop(
      Animated.timing(rotationValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [navigation, rotationValue]);

  const rotateInterpolation = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenidos APP</Text>
      <Animated.Image
        source={require('./img/udb.png')} // Ruta de la imagen de la pantalla de presentación
        style={[styles.image, { transform: [{ rotate: rotateInterpolation }] }]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Color de fondo de la pantalla de presentación
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: '80%', // Ancho de la imagen (ajústalo según tus necesidades)
    height: '80%', // Alto de la imagen (ajústalo según tus necesidades)
  },
});

export default SplashScreen;
