import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { SplashScreen, Stack } from 'expo-router';
//import { SafeAreaProvider } from 'react-native-safe-area-context';

// prevents splash screen to immediately close and waits untils the all assets are loaded
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    const [ fontsLoaded, error ] = useFonts({ 
        'Roboto-Moto': require('../assets/fonts/RobotoMono-Regular.ttf') });

    useEffect(() => {
        if(error) throw error;
        if(fontsLoaded) SplashScreen.hideAsync();
    }, [ fontsLoaded, error ]);

    if(!fontsLoaded) return null;

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(modal)/add-new" options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name="(modal)/confirmation/[debtId]" options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name="(modal)/record-payment/[debtId]" options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name="(modal)/summary/[debtId]" options={{ headerShown: false, presentation: 'modal' }} />
        </Stack>
    );
}

export default RootLayout;
