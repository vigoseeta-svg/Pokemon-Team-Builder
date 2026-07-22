import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import EmptyState from "../componentss/EmptyState";
import PokemonCard from "../componentss/PokemonCarddd";
import PokemonSearchBar from "../componentss/PokemonSearchBar";

export default function Index() {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1025")
      .then((response) => response.json())
      .then((data) => {
        setPokemonList(data.results);
        setLoading(false);
      });
  }, []);

  const toggleTeam = (name: string) => {
    if (team.includes(name)) {
      setTeam(team.filter((p) => p !== name));
    } else {
      if (team.length < 6) {
        setTeam([...team, name]);
      } else {
        alert("ทีมเต็มแล้ว! (สูงสุด 6 ตัว)");
      }
    }
  };

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.menuRow}>
        <TouchableOpacity
          style={styles.menuBtn}
          onPress={() => router.push("/favorites" as any)}
        >
          <Text style={styles.menuText}>❤️ รายการโปรด</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuBtn}
          onPress={() => router.push("/types" as any)}
        >
          <Text style={styles.menuText}>🔥 เลือกตามชนิด</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.headerTitle}>Pokédex Team Builder</Text>
      <Text style={styles.teamText}>My Team: {team.length} / 6</Text>

      <PokemonSearchBar value={searchText} onChangeText={setSearchText} />

      {filteredPokemon.length === 0 ? (
        <EmptyState message={`ไม่พบโปเกม่อนชื่อ "${searchText}"`} />
      ) : (
        <FlatList
          data={filteredPokemon}
          keyExtractor={(item) => item.name}
          renderItem={({ item, index }) => (
            <PokemonCard
              index={index}
              name={item.name}
              isSelected={team.includes(item.name)}
              onPress={() => toggleTeam(item.name)}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8", paddingTop: 50 },
  menuRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  menuBtn: { backgroundColor: "#ddd", padding: 10, borderRadius: 8 },
  menuText: { fontSize: 14, fontWeight: "bold" },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  teamText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
    color: "#555",
    fontWeight: "bold",
  },
});
