import { Text, View } from 'react-native';
import Background from '@/components/Background';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { toNumber } from '@/utils/number';
import { useEffect, useState } from 'react';

const Summary = () => {
    const [ noOfDebts, setNoOfDebts ] = useState('');
    const [ noOfPaids, setNoOfPaids ] = useState('');
    const [ totalLendMoney, setTotalLendMoney ] = useState('');
    const [ totalRepaidPayment, setTotalRepaidPayment ] = useState('');
    const [ totalRemainingLent, setTotalRemainingLent ] = useState('');

    const pesoFormatter = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' });

    const populateData = async () => {
        try {
            const debts = await AsyncStorage.getItem('debts') || '[]';
            const debtsList = JSON.parse(debts);

            let noOfDebts = 0;
            let noOfPaids = 0;
            let totalMoney = 0;
            let repaid = 0;
            let remaining = 0;

            for(const debt of debtsList) {
                totalMoney = totalMoney + toNumber(debt?.total_amount);
                if(toNumber(debt?.remaining_balance) > 0) {
                    noOfDebts++;
                    remaining = remaining + toNumber(debt?.remaining_balance);
                } else if(toNumber(debt?.remaining_balance) === 0) {
                    noOfPaids++;
                    const payment = toNumber(debt?.total_amount) - toNumber(debt?.remaining_balance);
                    repaid = repaid + payment;
                }
            }

            setNoOfDebts(noOfDebts?.toString().padStart(2, '0'));
            setNoOfPaids(noOfPaids?.toString().padStart(2, '0'));
            setTotalLendMoney(pesoFormatter.format(totalMoney));
            setTotalRepaidPayment(pesoFormatter.format(repaid));
            setTotalRemainingLent(pesoFormatter.format(remaining));
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        populateData();
    }, []);

    return (
        <Background>
            <View className="flex flex-1 w-full p-4 space-y-2">
                <Text className="text-white text-xl font-bold pb-2">Summary</Text>
                <View className="grow space-4">
                    <View className="flex flex-row">
                        <View className="w-[48%] mr-[4%] aspect-square rounded-lg bg-sky-950 flex flex-col justify-center items-center border border-neutral-200">
                            <Text className="text-white text-[60px] font-bold">{ noOfDebts }</Text>
                            <Text className="text-neutral-200 text-lg font-thin">Debts</Text>
                        </View>
                        <View className="w-[48%] aspect-square rounded-lg bg-sky-950 flex flex-col justify-center items-center border border-neutral-200">
                            <Text className="text-white text-[60px] font-bold">{ noOfPaids }</Text>
                            <Text className="text-neutral-200 text-lg font-thin">Paids</Text>
                        </View>
                    </View>
                    <View className="w-full min-h-[100px] mt-[14px] rounded-lg bg-sky-950 flex flex-col justify-between border border-neutral-200 p-6">
                        <Text className="text-white text-[40px]">{ totalLendMoney }</Text>
                        <Text className="text-neutral-200 text-lg font-thin ml-auto">Total Lent Money</Text>
                    </View>
                    <View className="w-full min-h-[100px] mt-[14px] rounded-lg bg-sky-950 flex flex-col justify-between border border-neutral-200 p-6">
                        <Text className="text-neutral-200 text-lg font-semibold">Total Repaid Money</Text>
                        <Text className="text-white text-[40px] font-thin ml-auto">{ totalRepaidPayment }</Text>
                    </View>
                    <View className="w-full min-h-[100px] mt-[14px] rounded-lg bg-sky-950 flex flex-col justify-between border border-neutral-200 p-6">
                        <Text className="text-white text-[30px] font-thin">{ totalRemainingLent }</Text>
                        <Text className="text-neutral-200 text-lg font-thin ml-auto">Total Remaining Lent Money</Text>
                    </View>
                </View>
            </View>
        </Background>
    );
}

export default Summary;
