import { useEffect, useState } from "react";
import {View,Text,StyleSheet,FlatList,Image,TouchableOpacity,ActivityIndicator,} from "react-native";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { IP_ADDRESS } from "@/constants/ip_address";
import { Ionicons } from "@expo/vector-icons";

export default function CategoryRestaurants() {
  const rawParams = useLocalSearchParams();
  const id = rawParams?.id ?? null;
  const router = useRouter();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchRestaurants();
  }, [id]);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${IP_ADDRESS}/restaurants/category/${id}`);
      setRestaurants(response.data);
    } catch (error) {
      console.log("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!id) {
    return (
      <View style={styles.centered}>
        <Text>Invalid or missing category ID</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={24} color="#010d06ff" />
        </TouchableOpacity>
        <Text style={styles.title}>List of Restaurants</Text>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#1a974e" />
        </View>
      ) : (
        <FlatList
          data={restaurants}
          keyExtractor={(item) => item.restaurant_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(`/restaurantDetail/${item.restaurant_id}`)}
            >
              <Image source={{ uri: item.image_url }} style={styles.image} />

              <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>

                <View style={styles.row}>
                  <Text style={styles.metaText}>1.2 km</Text>
                  <Text style={styles.dot}> • </Text>
                  <Text style={styles.metaText}>
                   <Text style={styles.infoText}>
            <Ionicons name="star" size={14} color="#FFA500" /> {item.avg_rating} <Text style={styles.dot}> • </Text>({item.rating_count} )
           
          </Text>
                  </Text>
              
                
                </View>

                <View style={styles.bottomRow}>
                  <Text style={styles.price}>${item.price ?? ""}</Text>
                  <Ionicons name="heart-outline" size={20} color="#f44" />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 16,
  },
  iconBtn: {
    marginRight: 8,
    padding: 4,
  },
  title: { fontSize: 22, fontWeight: "bold" },
  card: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
  },
 details: {
  flex: 1,
  justifyContent: "flex-start", 
},

  name: {
  fontSize: 16,
  fontWeight: "bold",
  marginBottom: 4,
  flexWrap: "wrap",
},

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  metaText: {
    fontSize: 13,
    color: "#555",
  },
  dot: {
    fontSize: 13,
    color: "#aaa",
    marginHorizontal: 4,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1a974e",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
