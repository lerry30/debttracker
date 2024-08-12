import { Text } from 'react-native';
import { Tabs } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const PageLayout = () => {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#77ee88'
        }}>
            <Tabs.Screen 
                name="Summary"
                options={{
                    tabBarLabel: () => <Text className="text-[12px]">Summary</Text>,
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="view-dashboard" size={30} color="black" />
                    )
                }}
            />
            <Tabs.Screen 
                name="ListOfDebts"
                options={{
                    tabBarLabel: () => <Text className="text-[12px]">Debts</Text>,
                    tabBarIcon: ({color}) => (
                       <Entypo name="list" size={30} color="black" /> 
                    )
                }}
            />
           <Tabs.Screen 
                name="ListOfPaids"
                options={{
                    tabBarLabel: () => <Text className="text-[12px]">Paids</Text>,
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="playlist-check" size={30} color="black" />
                    )
                }}
            />
        </Tabs>
    );
}

export default PageLayout;
