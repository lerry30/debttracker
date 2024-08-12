import { View, Text } from 'react-native';
import BoxButton from '@/components/BoxButton';
import Background from '@/components/Background';
import Entypo from '@expo/vector-icons/Entypo';

import { useRouter } from 'expo-router';

const App = () => {
    const router = useRouter();

    return (
        <View className="flex-1">
            <Background>
                <Text className="text-white text-3xl font-semibold pb-4">My Debts Tracker</Text>
                <Text className="text-white text-center text-lg font-thin pb-10">Easily manage who owes you. Keep a clear record of all debts by adding names, amounts, and tracking payments—your personal ledger, simplified.</Text>
                <View className="flex gap-2">
                    <BoxButton 
                        text="Add New" 
                        onPress={ () => router.push('/(modal)/add-new') }
                        style={{ flexDirection: 'row', gap: 4 }}
                    >
                        <Entypo name="plus" size={26} color="white" />
                    </BoxButton>
                    <BoxButton 
                        text="List of Debts" 
                        onPress={ () => router.push('/(tabs)/ListOfDebts') }
                        style={{ flexDirection: 'row', gap: 4 }}
                    >
                        <Entypo name="list" size={24} color="white" />
                    </BoxButton>
                </View>
            </Background>
        </View>
    );
}

export default App;
