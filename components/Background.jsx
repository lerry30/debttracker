import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const Background = ({ children }) => {
    return (
        <LinearGradient 
            colors={[ '#161b2e', '#0a4d4a', '#fc3468']}
            className="flex-1">
            <SafeAreaView className="flex-1 justify-center items-center backdrop-blur-xl">
                { children }
                <StatusBar style="light" />
            </SafeAreaView>
        </LinearGradient>
    );
}

export default Background;
