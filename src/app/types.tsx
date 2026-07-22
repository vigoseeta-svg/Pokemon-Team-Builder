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

export default function TypesScreen() {
  const [types, setTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [pokemonByType, setPokemonByType] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/type?limit=20")
      .then((res) => res.json())
      .then((data) => {
        setTypes(data.results);
        setLoading(false);
      });
  }, []);

  const handleSelectType = (typeName: string) => {
    setSelectedType(typeName);
    fetch(`https://pokeapi.co/api/v2/type/${typeName}`)
      .then((res) => res.json())
      .then((data) => setPokemonByType(data.pokemon.slice(0, 20)));
  };

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

      <Text style={styles.headerTitle}>เลือกโปเกม่อนตามชนิด</Text>

      <View style={styles.typesRow}>
        {types.map((t) => (
          <TouchableOpacity
            key={t.name}
            style={[
              styles.typeBtn,
              selectedType === t.name && styles.activeTypeBtn,
            ]}
            onPress={() => handleSelectType(t.name)}
          >
            <Text style={styles.typeText}>{t.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedType && (
        <View style={styles.resultBox}>
          <Text style={styles.subTitle}>โปเกม่อนประเภท {selectedType}:</Text>
          <FlatList
            data={pokemonByType}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={styles.pokemonName}>- {item.pokemon.name}</Text>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8", paddingTop: 50 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  backBtn: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 8,
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 10,
  },
  backText: { fontSize: 16, fontWeight: "bold" },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  typesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  typeBtn: {
    backgroundColor: "white",
    padding: 10,
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  activeTypeBtn: { backgroundColor: "lightblue", borderColor: "blue" },
  typeText: { textTransform: "capitalize", fontWeight: "bold" },
  resultBox: { marginTop: 20, paddingHorizontal: 20, flex: 1 },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textTransform: "capitalize",
  },
  pokemonName: { fontSize: 16, padding: 5, textTransform: "capitalize" },
});
