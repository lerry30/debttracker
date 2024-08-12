import { View, TextInput } from 'react-native';

const SearchBar = ({ value, onChange }) => {
    return (
        <View>
            <TextInput 
                onChangeText={onChange}
                value={value}
                placeholder="Search"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                className="w-full h-[40px] border border-neutral-400 rounded-full py-2 px-4 text-white bg-neutral-700"
            />
        </View>
    );
}

export default SearchBar;
