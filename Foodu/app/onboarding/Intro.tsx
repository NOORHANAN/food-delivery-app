import { router } from 'expo-router';
import React, { useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, Text, View } from 'react-native';

const Intro = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/onboarding/first'); 
    }, 2500);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <View style={styles.container}>
    
      <Text style={styles.title}>Foodu</Text>
   

    <LottieView
      source={require('../../assets/lottie/loader.json')}
      autoPlay
      loop
      style={{ position:'absolute',width: 200, height: 150, alignSelf: 'center',bottom:30,flex: 1 }}
      
    />    
</View>
  );
};
 
export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: '#3ac46e',
  },
});
