import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { View, Text, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import ErrorField from '@/components/ErrorField';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useEffect, useState, useRef } from 'react';
import { router, useRouter } from 'expo-router';
import { toNumber } from '@/utils/number';

const AddNew = () => {
    const [ name, setName ] = useState('');
    const [ amount, setAmount ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState({ name: '', amount: '' });
    const submitted = useRef(false);

    const nRouter = useRouter(); 
    const close = () => router.back();

    //const verifyUniqueness = (id, data) => {
    //    for(let i = 0; i < data.length; i++) {
    //        const item = data[i];
    //        if(String(id) == String(item.id))
    //            return uuidv4();
    //    }

     //   return id;
    //}

    const handleSubmit = async () => {
        try {
            const nAmount = toNumber(amount);
            setErrorMessage({ name: '', amount: '' });
            if(!name) setErrorMessage(error => ({ ...error, name: 'Empty field.' }));
            if(nAmount <= 0) setErrorMessage(error => ({ ...error, amount: 'The amount must be greater than zero.' }));
            if(!name || nAmount <= 0) return;
                
            const debts = await AsyncStorage.getItem('debts') || '[]';
            const debtsList = JSON.parse(debts);

            const uuidGenId = uuidv4();
            const dateNow = new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: '2-digit'});;
            //const vId = verifyUniqueness(uuidGenId, debtsList);
            const newDebt = { 
                id: uuidGenId,
                borrower_name: name, 
                total_amount: nAmount, 
                remaining_balance: nAmount,
                transaction_summary_id: null,
                date: dateNow
            };

            debtsList.unshift(newDebt);
            const stringDebtList = JSON.stringify(debtsList);
            await AsyncStorage.setItem('debts', stringDebtList);

            nRouter.push('(tabs)/ListOfDebts');
        } catch(error) {
            console.log(error);
        }
 
        setName('');
        setAmount('');
    }

    return (
        <SafeAreaView className="relative flex-1 justify-center items-center p-4 bg-neutral-800">
            <Pressable onPress={close} className="absolute right-[30px] top-[50px]">
                <AntDesign name="closecircle" size={28} color="white" />
            </Pressable>
            <View className="w-full flex gap-4 p-4 -mt-[20px]">
                <Text className="text-2xl font-bold text-center text-white">Add New Borrower</Text>
                <View>
                    <Text className="text-lg font-semibold text-white">Name:</Text>
                    <TextInput
                        onChangeText={value => setName(value)}
                        value={name}
                        placeholder="Borrower's Name"
                        placeholderTextColor="rgba(255, 255, 255, 0.4)"
                        className="w-full h-[50px] border border-neutral-400 rounded-md p-4 text-white bg-neutral-700"
                    />
                    { errorMessage?.name && <ErrorField message={ errorMessage?.name } /> }
                </View>
                <View>
                    <Text className="text-lg font-semibold text-white">Amount:</Text>
                    <TextInput
                        onChangeText={value => setAmount(value)}
                        value={amount}
                        placeholder="0.00"
                        placeholderTextColor="rgba(255, 255, 255, 0.4)"
                        keyboardType="numeric"  
                        className="w-full h-[50px] border border-neutral-400 rounded-md p-4 text-white bg-neutral-700"
                    />
                    { errorMessage?.amount && <ErrorField message={ errorMessage?.amount } /> }
                </View>
                <View className="">
                    <Button text="Add" onPress={() => handleSubmit()} />
                </View>
            </View>
        </SafeAreaView>
    );
}

export default AddNew;
