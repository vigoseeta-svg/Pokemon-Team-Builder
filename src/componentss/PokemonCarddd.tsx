import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFavorites } from "../context/FavoritesContext";

export default function PokemonCard({ index, name, isSelected, onPress }: any) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(name);
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.selectedCard]}
      onPress={onPress}
    >
      <Image
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        }}
        style={styles.pokemonImage}
      />
      <View style={styles.info}>
        <Text style={styles.pokemonName}>
          {index + 1}. {name}
        </Text>
        {/* ปุ่มลิงก์ไปหน้ารายละเอียด */}
        <TouchableOpacity
          onPress={() => router.push(`/details?name=${name}` as any)}
        >
          <Text style={styles.detailsLink}>ดูรายละเอียด</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => toggleFavorite(name)}
        style={styles.heartBtn}
      >
        <Text style={styles.heart}>{isFavorite ? "❤️" : "🤍"}</Text>
      </TouchableOpacity>

      {isSelected && <Text style={styles.checkmark}>✅</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  selectedCard: {
    borderColor: "blue",
    backgroundColor: "#eff6ff",
  },
  pokemonImage: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  pokemonName: {
    fontSize: 18,
    textTransform: "capitalize",
    fontWeight: "bold",
    marginBottom: 5,
  },
  detailsLink: {
    color: "blue",
    fontSize: 14,
  },
  heartBtn: {
    padding: 5,
  },
  heart: {
    fontSize: 20,
  },
  checkmark: {
    fontSize: 24,
    marginLeft: 10,
  },
});
