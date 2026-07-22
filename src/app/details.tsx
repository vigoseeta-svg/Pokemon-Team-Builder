import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useFavorites } from "../context/FavoritesContext";

export default function DetailsScreen() {
  const { name } = useLocalSearchParams();
  const router = useRouter();
  const { favorites, toggleFavorite } = useFavorites();

  const pokemonName = Array.isArray(name) ? name[0] : name;
  const isFavorite = favorites.includes(pokemonName);

  const [pokemonData, setPokemonData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemonData(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>⬅️ กลับ</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Image
          source={{
            uri:
              pokemonData.sprites.other["official-artwork"].front_default ||
              pokemonData.sprites.front_default,
          }}
          style={styles.image}
        />
        <Text style={styles.pokemonName}>{pokemonName}</Text>
        <Text style={styles.infoText}>
          ส่วนสูง: {pokemonData.height / 10} m
        </Text>
        <Text style={styles.infoText}>
          น้ำหนัก: {pokemonData.weight / 10} kg
        </Text>
        <Text style={styles.infoText}>
          ประเภท: {pokemonData.types.map((t: any) => t.type.name).join(", ")}
        </Text>

        {/* ปุ่มกดถูกใจ */}
        <TouchableOpacity
          onPress={() => toggleFavorite(pokemonName as string)}
          style={styles.heartBtn}
        >
          <Text style={styles.heart}>
            {isFavorite ? "❤️ อยู่ในรายการโปรด" : "🤍 เพิ่มเป็นรายการโปรด"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingTop: 50,
    alignItems: "center",
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  backBtn: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 8,
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 20,
  },
  backText: { fontSize: 16, fontWeight: "bold" },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    width: "90%",
    elevation: 3,
  },
  image: { width: 150, height: 150, marginBottom: 10 },
  pokemonName: {
    fontSize: 28,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 15,
  },
  infoText: { fontSize: 16, marginBottom: 5, textTransform: "capitalize" },
  heartBtn: {
    marginTop: 20,
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  heart: { fontSize: 16, fontWeight: "bold" },
});
