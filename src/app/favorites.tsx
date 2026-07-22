import { useRouter } from "expo-router";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import EmptyState from "../componentss/EmptyState";
import { useFavorites } from "../context/FavoritesContext";

export default function FavoritesScreen() {
  const { favorites } = useFavorites();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>⬅️ กลับ</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>❤️ โปเกม่อนที่ชื่นชอบ</Text>

      {favorites.length === 0 ? (
        <EmptyState message="ยังไม่มีรายการโปรด ลองกดหัวใจที่โปเกม่อนดูสิ!" />
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <Text style={styles.tempText}>{item}</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8", paddingTop: 50 },
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
  tempText: {
    fontSize: 18,
    padding: 15,
    backgroundColor: "white",
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    textTransform: "capitalize",
  },
});
