import { router } from 'expo-router';
import react from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
;
const Intro = () => {
    const handleNext = () => {
        router.push('/onboarding/welcome'); // Navigate to the welcome screen
    }
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../assets/images/pizza.jpg')}
                style={{ height: '100%', width: '100%' }} resizeMode='cover'>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBlock: 150 }}>
                    <Text style={{ fontSize: 40, fontWeight: '900', color: '#3ac46e', }}>Welcome to </Text>
                    <Text style={{ fontSize: 40, fontWeight: '900', color: '#3ac46e', }}>Foodu!</Text>
                    <Text style={{ marginTop: 40, fontSize: 16, color: '#bfff', textAlign: 'center', marginHorizontal: 20 }}>
                        Foodu is a platform that allows you to find the best food in your area.
                        You can find the best food in your area and you can also find the best food in your area.
                    </Text>
                </View>
                <View style={{ position: 'absolute', bottom: 30, left: 0, right: 0, marginHorizontal: 70 }}>
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
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Next</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

export default Intro

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
})