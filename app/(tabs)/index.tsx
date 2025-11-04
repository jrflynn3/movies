import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const {
    data: movies,
    loading,
    error,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginTop: 10,
          marginBottom: 10,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="flex-1 mt-5">
              <SearchBar
                onChangeText={() => {}}
                onFocus={() => router.push("/search")}
                placeholder="Search for a movie"
                value=""
              />
            </View>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000FF"
                className="mt-10 self-center"
              />
            )}
            {error && <Text>Error: {error?.message}</Text>}
            {!loading && !error && (
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>
            )}
          </>
        }
      />
    </View>
  );
}
