import { Text, View, FlatList, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Background from '@/components/Background';
import SearchBar from '@/components/SearchBar';
import Entypo from '@expo/vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { toNumber } from '@/utils/number';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { DEBTSSEEDS, TRANSACTIONSSEEDS } from '@/constants/data';

const ListOfDebts = () => {
    const [ allDebts, setAllDebts ] = useState([]); // fixed
    const [ searchResult, setSearchResult ] = useState([]);
    const [ search, setSearch ] = useState('');

    const router = useRouter();
    const pesoFormatter = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' });

    const handleSearch = (value) => {
        setSearch(value);

        const regex = new RegExp(`${value}`, 'i');
        setSearchResult(allDebts);
        setSearchResult(debts => debts.filter(item => regex.test(item?.borrower_name)));
    }


    const clearStorage = async () => {
        try {
            await AsyncStorage.setItem('debts', '');
            await AsyncStorage.setItem('seeded', '');
            await AsyncStorage.setItem('transactions', '');
        } catch(error) {}
    }

    const populateData = async () => {
        try {
            //await clearStorage();return;
            const debts = await AsyncStorage.getItem('debts') || '[]';
            const debtsList = JSON.parse(debts); 

            const isSeeded = JSON.parse(await AsyncStorage.getItem('seeded') || 'false');
            if(!isSeeded) {
                const nDebts = [ ...debtsList, ...DEBTSSEEDS ];
                const stringDebtList = JSON.stringify(nDebts);
                await AsyncStorage.setItem('debts', stringDebtList);
                await AsyncStorage.setItem('seeded', 'true');

                setAllDebts(nDebts);
                setSearchResult(nDebts);

                // create summary
                await AsyncStorage.setItem('transactions', JSON.stringify(TRANSACTIONSSEEDS));
            } else {
                const nDebtsList = debtsList.filter(item => toNumber(item?.remaining_balance) > 0);
                setAllDebts(nDebtsList);
                setSearchResult(nDebtsList);
            }
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        populateData();
    }, []);

    return (
        <Background>
            <View className="flex-1 w-full p-4 space-y-2">
                <View className="flex flex-row justify-between items-center pb-2">
                    <Text className="text-white text-xl font-bold">Debts</Text> 
                    <Pressable 
                        onPress={() => router.push('(modal)/add-new')}
                        className="px-2"
                    >
                        <Entypo name="plus" size={30} color="white" />
                    </Pressable>
                </View>
                <SearchBar value={search} onChange={handleSearch} />
                <View className="flex-1">
                    <FlatList
                        data={searchResult}
                        contentContainerStyle={{ 
                            paddingTop: 10,
                            paddingBottom: 150, 
                            display: 'flex',
                            gap: 6,
                        }}
                        keyExtractor={item => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            const prevPayment = toNumber(item?.total_amount) - toNumber(item?.remaining_balance);
                            return (
                                <View className="bg-neutral-900 rounded-lg p-4 border border-neutral-100">
                                    <View className="flex flex-row justify-between">
                                        <Pressable onPress={() => router.push(`(modal)/summary/${item?.id}`)}
                                            className="flex flex-row justify-between grow">
                                            <Text className="text-white font-semibold">{ item?.borrower_name }</Text> 
                                            <View className="flex flex-col items-end">
                                                <Text className="text-neutral-200 text-[10px] font-semibold">{ pesoFormatter.format(item?.total_amount) }</Text>
                                                { prevPayment > 0 && <Text className="text-neutral-200/75 text-[10px]">-{ prevPayment }</Text> }
                                            </View>
                                            <Text className="text-green-400 font-semibold">{ pesoFormatter.format(item?.remaining_balance) }</Text>
                                        </Pressable>
                                        <Pressable onPress={ () => router.push(`(modal)/record-payment/${item?.id}`) } className="w-[50px] pr-[6px] pl-[14px] flex justify-center">
                                            <MaterialCommunityIcons name="playlist-edit" size={24} color="white" />
                                        </Pressable>
                                        <Pressable onPress={ () => router.push(`(modal)/confirmation/${item?.id}`) } className="w-[30px] flex justify-center">
                                            <Ionicons name="trash-bin" size={20} color="red" />
                                        </Pressable>
                                    </View>
                                </View>
                            )
                        }}
                    />
                </View>
            </View>
        </Background>
    );
}

export default ListOfDebts;
