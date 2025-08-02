import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import axios from "axios";
import { IP_ADDRESS } from "@/constants/ip_address";
import { Ionicons } from "@expo/vector-icons";

export default function MenuItemDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
    const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchMenuItem();
  }, [id]);

  const fetchMenuItem = async () => {
    try {
      const res = await axios.get(`${IP_ADDRESS}/menu/${id}`);
      setItem(Array.isArray(res.data) ? res.data[0] : res.data);
    } catch (error) {
      console.log("Error fetching item:", error.message);
    }
  };

  const addToBasket = async () => {
    try {
      await axios.post(`${IP_ADDRESS}/orders`, {
        item_id: id,
        quantity,
        note,
      });
      router.push("/orders");
    } catch (error) {
      console.log("Error adding to basket:", error);
    }
  };

  if (!item) return <Text style={styles.loading}>Loading...</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item.image_url }} style={styles.image} />
        <TouchableOpacity style={styles.topLeftIcon} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
      <TouchableOpacity
        style={styles.topRightIcon}
        onPress={() => setIsFavorite(!isFavorite)}
      >
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={26}
          color="red"
        />
      </TouchableOpacity>
      </View>

      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.qtyBtn}>
          <Text style={styles.qtyText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qtyText}>{quantity}</Text>
        <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.qtyBtn}>
          <Text style={styles.qtyText}>+</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Note to Restaurant (optional)"
        value={note}
        onChangeText={setNote}
        style={styles.noteInput}
      />

      <TouchableOpacity style={styles.addButton} onPress={addToBasket}>
        <Text style={styles.addButtonText}>Add to Basket - ${item.price}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    marginTop: 70,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    height: 350,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  topLeftIcon: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 8,
    borderRadius: 20,
  },
  topRightIcon: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 8,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  qtyBtn: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 6,
    marginHorizontal: 10,
  },
  qtyText: {
    fontSize: 18,
    fontWeight: "600",
  },
  noteInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#1a974e",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
