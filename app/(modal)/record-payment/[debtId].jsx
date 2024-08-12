import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { View, Text, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import ErrorField from '@/components/ErrorField';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { router, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { toNumber } from '@/utils/number';
import { formattedDateAndTime } from '@/utils/fDate';

const RecordPayment = () => {
    const [ allDebts, setAllDebts ] = useState([]);
    const [ selectedPerson, setSelectedPerson ] = useState([]);
    const [ payment, setPayment ] = useState(0);
    const [ errorMessage, setErrorMessage ] = useState({ amount: '' });

    const { debtId } = useLocalSearchParams();
    const nRouter = useRouter();
    const close = () => router.back();
    const pesoFormatter = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' });

    const getDebt = async () => {
        try {
            const debts = JSON.parse(await AsyncStorage.getItem('debts') || '[]');
            const nDebts = debts.filter(data => {
                if(String(data?.id) == String(debtId)) {
                    setSelectedPerson(data);
                    return false
                }

                return true;
            });

            setAllDebts(nDebts);
        } catch(error) {
            console.log(error);
        }
    }

    const handlePayment = async () => {
        try {
            const nPayment = toNumber(payment);
            const nRemainingBalance = toNumber(selectedPerson?.remaining_balance);
            setErrorMessage({ amount: '' });
            if(nPayment <= 0) setErrorMessage({ amount: 'Payment should not less than zero.' });
            if(nPayment > nRemainingBalance) setErrorMessage({ amount: 'Payment should not exceed the remaining balance.' });
            if(nPayment <= 0 || nPayment > nRemainingBalance) return;

            const nBalance = nRemainingBalance - nPayment;
            const nSelectedPerson = { ...selectedPerson, remaining_balance: nBalance };
            const nData = JSON.stringify([ nSelectedPerson, ...allDebts ]);

            await AsyncStorage.setItem('debts', nData);

            // create summary
            const transactions = JSON.parse(await AsyncStorage.getItem('transactions') || '{}');
            const prevTransaction = transactions[String(debtId)] || [];
            const transactionNow = {
                id: uuidv4(),
                payment: nPayment,
                date: formattedDateAndTime(new Date())
            }

            prevTransaction.push(transactionNow);

            const nTransactionNow = JSON.stringify({ ...transactions, [String(debtId)]: prevTransaction });
            await AsyncStorage.setItem('transactions', nTransactionNow);

            nRouter.push('(tabs)/ListOfDebts');
            setPayment(0);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDebt();
    }, []);

    return (
        <SafeAreaView className="relative flex-1 justify-center items-center p-4 bg-neutral-800">
            <Pressable onPress={close} className="absolute right-[30px] top-[50px]">
                <AntDesign name="closecircle" size={28} color="white" />
            </Pressable>
            <View className="w-full flex gap-4 p-4 -mt-[20px]">
                <Text className="text-2xl font-bold text-center text-white">Record Payment</Text>
                <View className="flex gap-2">
                    <View className="flex flex-row items-center justify-between bg-red-900/25">
                        <Text className="text-md font-semibold text-white">Borrower's Name:</Text>
                        <Text className="text-lg font-thin text-white">{ selectedPerson?.borrower_name }</Text>
                    </View>
                    <View className="flex flex-row items-center justify-between bg-blue-900/25">
                        <Text className="text-md font-semibold text-white">Total Amount:</Text>
                        <Text className="text-lg font-thin text-white">{ pesoFormatter.format(toNumber(selectedPerson?.total_amount)) }</Text>
                    </View>
                    <View className="flex flex-row items-center justify-between bg-red-900/25">
                        <Text className="text-md font-semibold text-white">Remaining Balance:</Text>
                        <Text className="text-lg font-thin text-white">{ pesoFormatter.format(toNumber(selectedPerson?.remaining_balance)) }</Text>
                    </View>
                    <View className="flex flex-row items-center justify-between bg-blue-900/25">
                        <Text className="text-md font-semibold text-white">Date Borrowed:</Text>
                        <Text className="text-lg font-thin text-white">{ selectedPerson?.date }</Text>
                    </View>
                </View>
                <View>
                    <Text className="text-lg font-semibold text-white">Payment:</Text>
                    <TextInput
                        onChangeText={setPayment}
                        value={payment}
                        placeholder="0.00"
                        placeholderTextColor="rgba(255, 255, 255, 0.4)"
                        keyboardType="numeric"  
                        className="w-full h-[50px] border border-neutral-400 rounded-md p-4 text-white bg-neutral-700"
                    />
                    { errorMessage?.amount && <ErrorField message={ errorMessage?.amount } /> }
                </View>
                <View className="">
                    <Button text="Pay" onPress={handlePayment} />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default RecordPayment;
