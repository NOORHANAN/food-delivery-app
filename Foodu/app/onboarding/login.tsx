import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import axios from 'axios';
import { IP_ADDRESS} from '@/constants/ip_address';



const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
     const response = await axios.post(`${IP_ADDRESS}/login`, {
  username,
  password,
});

      Alert.alert("Login Successfully");

      router.push('/(tabs)'); 
    } catch (error) {
      console.log("Login error:", error);
      const message = error.response?.data?.error || "Login failed";
      Alert.alert("Error", message);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Image 
        source={require('../../assets/images/welcome.png')} 
        style={styles.image} 
      />

      <Text style={styles.title}>Welcome Back</Text>

      <TextInput 
        placeholder='Username' 
        style={styles.input} 
        value={username} 
        onChangeText={setUsername} 
      />
      
      <TextInput 
        placeholder='Password' 
        style={styles.input} 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />

      <TouchableOpacity style={styles.greenBtn} onPress={handleLogin}>
        <Text style={styles.greenBtnText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>or continue with</Text>

      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <Image source={require("../../assets/images/facebook.png")} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require("../../assets/images/google.png")} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require("../../assets/images/apple.png")} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>
        Don't have an account?{' '}
        <Text style={styles.link} onPress={() => router.push("./tabs")}>

          Sign up
        </Text> 
      </Text>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
    paddingTop: 60,
    justifyContent: 'center',
  },

  image: {
    alignSelf: 'center',
    marginBottom: 40,
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#222',
  },

  input: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#f0f0f0',
    marginBottom: 16,
    fontSize: 16,
  },

  greenBtn: {
    backgroundColor: "#28a745",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  greenBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  footerText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginVertical: 10,
  },

  link: {
    color: "#28a745",
    fontWeight: "bold",
  },

  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },

  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 15,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 8,
  },
});
