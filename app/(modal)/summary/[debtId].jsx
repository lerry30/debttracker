import { View, Text, TextInput, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState, useRef } from 'react';
import { toNumber } from '@/utils/number';

const Summary = () => {
    const [ selectedDebt, setSelectedDebt ] = useState([]);
    const [ debtTransaction, setDebtTransaction ] = useState([]);
    
    const amountHolder = useRef(0);

    const close = () => router.back();
    const { debtId } = useLocalSearchParams();
    const pesoFormatter = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' });

    const getTransactionHistory = async () => {
        try {
            const debts = JSON.parse(await AsyncStorage.getItem('debts') || '[]');
            for(const item of debts) {
                if(String(item?.id) == String(debtId)) {
                    setSelectedDebt(item);
                    amountHolder.current = item?.total_amount;
                    break;
                }   
            }

            const transactions = JSON.parse(await AsyncStorage.getItem('transactions') || '{}');
            const transactionHistory = transactions[String(debtId)] || [];
            setDebtTransaction(transactionHistory);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTransactionHistory();
    }, []);

    return (
        <SafeAreaView className="relative flex-1 justify-center items-center p-4 bg-neutral-800">
            <Pressable onPress={close} className="absolute right-[30px] top-[50px]">
                <AntDesign name="closecircle" size={28} color="white" />
            </Pressable>
            <View className="w-full flex flex-1 pt-[50px] px-4 space-y-8">
                <Text className="text-xl font-semibold text-center text-white">Debt Details & Transaction History</Text>
                <View className="flex gap-2">
                    <View className="flex flex-row items-center justify-between bg-red-900/25">
                        <Text className="text-md font-semibold text-white">Borrower's Name:</Text>
                        <Text className="text-lg font-thin text-white">{ selectedDebt?.borrower_name }</Text>
                    </View>
                    <View className="flex flex-row items-center justify-between bg-blue-900/25">
                        <Text className="text-md font-semibold text-white">Total Amount:</Text>
                        <Text className="text-lg font-thin text-white">{ pesoFormatter.format(toNumber(selectedDebt?.total_amount)) }</Text>
                    </View>
                    <View className="flex flex-row items-center justify-between bg-red-900/25">
                        <Text className="text-md font-semibold text-white">Remaining Balance:</Text>
                        <Text className="text-lg font-thin text-white">{ pesoFormatter.format(toNumber(selectedDebt?.remaining_balance)) }</Text>
                    </View>
                    <View className="flex flex-row items-center justify-between bg-blue-900/25">
                        <Text className="text-md font-semibold text-white">Date Borrowed:</Text>
                        <Text className="text-lg font-thin text-white">{ selectedDebt?.date }</Text>
                    </View>
                </View>

                {
                    debtTransaction.length > 0 && 
                        <Text className="text-md font-semibold text-white">History</Text>
                }

                <FlatList
                    data={debtTransaction}
                    contentContainerStyle={{ 
                        paddingTop: 10,
                        paddingBottom: 10, 
                        display: 'flex',
                        gap: 6,
                    }}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        let toDeduct = 0;
                        for(let i = 0; i <= index; i++) {
                            toDeduct = toDeduct + toNumber(debtTransaction[i]?.payment);
                        }

                        const totalBalanceForEveryTransaction = toNumber(selectedDebt?.total_amount) - toDeduct;
                        return (
                            <View className="flex gap-2">
                                <View className="flex flex-col justify-center">
                                    <View className="flex flex-row justify-between items-center">
                                        <Text className="text-md font-thin text-white">{item?.date}</Text>
                                        <Text className="text-md text-neutral-100/80">-{item?.payment}</Text>
                                    </View>
                                    <Text className="text-md font-semibold text-white ml-auto">{pesoFormatter.format(totalBalanceForEveryTransaction)}</Text>
                                </View>
                            </View>
                        )
                    }}
                />
                <Button text="Close" onPress={close} />
            </View>
        </SafeAreaView>
    );
}

export default Summary;
