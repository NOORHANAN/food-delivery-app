import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    if (!loaded) {
        // Async font loading only occurs in development.
        return null;
    }

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="onboarding/Intro" />
                <Stack.Screen name="onboarding/first" />
                <Stack.Screen name="onboarding/welcome" />
                <Stack.Screen name="onboarding/easypay" />
                <Stack.Screen name="onboarding/delivery" />
                <Stack.Screen name="onboarding/inwith" />
                <Stack.Screen name="onboarding/login" />
                <Stack.Screen name="onboarding/signin" />
               
            
                <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}
