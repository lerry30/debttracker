import { TouchableOpacity, View, Text } from 'react-native';

const BoxButton = ({ children, text, onPress, style, textStyle }) => {
    return (
        <TouchableOpacity 
                activeOpacity={0.4} 
                onPress={ onPress } 
                className="p-4 rounded-2xl flex justify-center items-center bg-neutral-900 min-w-[50px] min-h-[50px] border border-white"
                style={ style }>
            <View className="opacity-80">{ children }</View>
            <Text className="font-semibold text-center text-lg text-white mr-2" style={ textStyle }>{ text }</Text>
        </TouchableOpacity>
    );
}

export default BoxButton;
