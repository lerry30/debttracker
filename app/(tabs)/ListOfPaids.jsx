import { Text, View, FlatList, Pressable } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Background from '@/components/Background';
import SearchBar from '@/components/SearchBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { toNumber } from '@/utils/number';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

const ListOfPaids = () => {
    const [ allDebts, setAllDebts ] = useState([]);
    const [ searchResult, setSearchResult ] = useState([]);
    const [ search, setSearch ] = useState('');

    const pesoFormatter = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' });
    const nRouter = useRouter();

    const handleSearch = (value) => {
        setSearch(value);

        const regex = new RegExp(`${value}`, 'i');
        setSearchResult(allDebts);
        setSearchResult(debts => debts.filter(item => regex.test(item?.borrower_name)));
    }

    const populateData = async () => {
        try {
            const debts = await AsyncStorage.getItem('debts') || '[]';
            const debtsList = JSON.parse(debts); 

            const nPaidsList = debtsList.filter(item => toNumber(item?.remaining_balance) === 0);
            setAllDebts(nPaidsList);
            setSearchResult(nPaidsList);
        } catch(error) {}
    }

    useEffect(() => {
        populateData();
    }, []);

    return (
        <Background>
            <View className="flex-1 w-full p-4 space-y-2">
                <Text className="text-white text-xl font-bold pb-2">Paids</Text>
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
                        renderItem={({ item }) => (
                            <Pressable onPress={() => nRouter.push(`(modal)/summary/${item?.id}`)} className="bg-neutral-900 rounded-lg p-4 border border-neutral-100">
                                <View className="flex flex-row justify-between">
                                    <Text className="text-white font-semibold">{ item?.borrower_name }</Text> 
                                    <Text className="text-white text-[12px] font-thin">{ item?.date }</Text> 
                                    <Text className="text-green-400 font-semibold">{ pesoFormatter.format(item?.total_amount) }</Text>
                                    <Feather name="check" size={24} color="#77ee88" />
                                </View>
                            </Pressable>
                        )}
                    />
                </View>
            </View>
        </Background>
    );
}

export default ListOfPaids;
