import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { View, Text, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { router, useLocalSearchParams, useRouter } from 'expo-router';
import { formattedDateAndTime } from '@/utils/fDate';

const Confirmation = () => {
    const close = () => router.back();
    const { debtId } = useLocalSearchParams();
    const nRouter = useRouter();

    const fullyPaid = async () => {
        try {
            let ramainingBalance = 0;
            const debts = JSON.parse(await AsyncStorage.getItem('debts') || '[]');
            const debtDetails = debts.map(item => {
                if(String(item?.id) == String(debtId)) {
                    if(!item?.hasOwnProperty('remaining_balance')) return item;
                    remainingBalance = item.remaining_balance;
                    item.remaining_balance = 0;
                }
                
                return item;
            });

            await AsyncStorage.setItem('debts', JSON.stringify(debtDetails));

            // create summary
            const transactions = JSON.parse(await AsyncStorage.getItem('transactions') || '{}');
            const prevTransaction = transactions[String(debtId)] || [];
            const transactionNow = {
                id: uuidv4(),
                payment: remainingBalance,
                date: formattedDateAndTime(new Date())
            }

            prevTransaction.push(transactionNow);

            const nTransactionNow = JSON.stringify({ ...transactions, [String(debtId)]: prevTransaction });
            await AsyncStorage.setItem('transactions', nTransactionNow);

            nRouter.push('(tabs)/ListOfDebts');
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView className="relative flex-1 justify-center items-center p-4 bg-neutral-800">
            <Pressable onPress={close} className="absolute right-[30px] top-[50px]">
                <AntDesign name="closecircle" size={28} color="white" />
            </Pressable>
            <View className="w-full flex p-4 -mt-[20px] space-y-4">
                <Text className="text-xl font-semibold text-center text-white">Are you sure you want to remove this person's debt?</Text>
                <Text className="text-lg font-thin text-center text-white">Removing this will finalize all transactions and mark the debt as fully paid.</Text>
                <Button text="Proceed" onPress={fullyPaid} style={{ backgroundColor: 'red' }} textStyle={{ color: 'white' }} />
                <Button text="Cancel" onPress={close} />
            </View>
        </SafeAreaView>
    );
}

export default Confirmation;
