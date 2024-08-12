import { TouchableOpacity, View, Text } from 'react-native';

const Button = ({ children, text, onPress, style, textStyle }) => {
    return (
        <TouchableOpacity 
                activeOpacity={0.4} 
                onPress={ onPress } 
                className={ `p-2 rounded-md leading-none flex flex-row justify-center items-center bg-white` }
                style={ style }>
            <View className="mx-1">{ children }</View>
            <Text className="font-semibold text-lg mr-2" style={ textStyle }>{ text }</Text>
        </TouchableOpacity>
    );
}

export default Button;
