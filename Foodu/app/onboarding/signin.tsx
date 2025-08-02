import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Alert } from 'react-native';

import { router } from "expo-router";
import axios from 'axios';
import { ScrollView } from 'react-native';
import { IP_ADDRESS } from '@/constants/ip_address';



const  Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 // const [confirmpassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${IP_ADDRESS}/signup`, {
        username,
        email,
        password,
     
      });

      Alert.alert("Success", "Account created!");
      router.push('/onboarding/login') 
   
    } catch (error) {
      console.log("Signup error:", error);
    const message = error.response?.data?.error || "Signup failed";
      Alert.alert("Error", message);
    }
  }
 //onst handleLogin = () => {
                           
  return (
      
  
    <View style={styles.container}>
      <Image source={require('../../assets/images/welcome.png')} style={{ alignSelf: 'center', marginBottom: 70, width: 250, height: 250 }} />
      <Text style={styles.title}>Create New Account</Text>

      <TextInput placeholder='username' style={styles.input} value={username} onChangeText={setUsername} />
      <TextInput placeholder='email' style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder='password' style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.greenBtn} onPress={handleSignup}>
        <Text style={styles.greenBtnText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}> or continue with </Text>
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
        Already have an account?{" "}
        <Text style={styles.link} onPress={() => router.push("../../onboarding/login")}>
          Login
        </Text>
      </Text>

    </View>
    
  )
}

export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        
        padding: 30,
        paddingTop:60
       

    },
 
 iconContainer: {

  flexDirection: 'row',
  justifyContent: 'space-between',  
  marginHorizontal:20,  
  alignItems: 'center',
  paddingVertical: 10,
  
},
 
      

    input:{
         borderRadius:12,
         padding:14,
         backgroundColor:'lightgray',
         marginVertical:8
    },

    greenBtn: {
    backgroundColor: "green",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
icon: {
  borderCurve: 'continuous',
  width: 40,
  height: 40,
  marginHorizontal: 30, 
  borderWidth: 0.3,
  borderColor: '#ccc',
  borderStyle:'solid',
  borderRadius: 10,
},



    greenBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  footerText: {
    marginTop: 7,
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },

  link: {
    color: "green",
    fontWeight: "bold",
  },

   title: {
    
   }
    
})