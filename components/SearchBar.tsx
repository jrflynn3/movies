import { icons } from "@/constants/icons";
import React, { useEffect, useRef } from "react";
import { Image, TextInput, View } from "react-native";

interface Props {
  autofocus: boolean;
  placeholder: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  value?: string;
}

const SearchBar = ({
  autofocus,
  placeholder,
  onChangeText,
  onPress,
  value = "",
}: Props) => {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (autofocus) inputRef.current?.focus();
  }, []);

  return (
    <View className="flex-row items-center p-2">
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
        className=" text-white ml-2 flex-1"
        ref={inputRef}
      />
    </View>
  );
};

export default SearchBar;
