import { router } from 'expo-router'


import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { green } from 'react-native-reanimated/lib/typescript/Colors'

const Welcome = () => {
  const handleNext = () => {
    router.push('/onboarding/inwith'); 
  }
  return (
    <View style={styles.container}>
       <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBlock: 150 }}>
      
         <Text style={{ fontSize: 40, fontWeight: '900', color: '#3ac46e', }}>Fast Delivery</Text>
         <Text style={{ marginTop: 30, fontSize: 16, color: '#030503ff', textAlign: 'center', marginHorizontal: 30 }}>
                         Lorem ipsum dolor sit amet, consectetur adipiscing elit.sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    </Text>
      </View>
      <View style={{ position: 'absolute', bottom: 30 }}>
        <TouchableOpacity
          onPress={handleNext}
          style={{
            backgroundColor: 'green',
            padding: 20,
            borderRadius: 30,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
  container: {
    flex: 1.2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
})