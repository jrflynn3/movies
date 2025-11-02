import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface Props {
  placeholder: string;
  onChangeText: (text: string) => void;
  onPress: () => void;
  value: string;
}

const SearchBar = ({ placeholder, onChangeText, onPress, value }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#AB8BFF"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#AB8BFF"
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};

export default SearchBar;
