import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import { IP_ADDRESS } from "@/constants/ip_address";

const Orders = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${IP_ADDRESS}/orders/cart`);
      setItems(res.data);
    } catch (err) {
      console.log("Error fetching cart:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Basket</Text>
      {items.length === 0 ? (
        <Text style={styles.emptyText}>No items in your basket</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Text>Note: {item.note || "None"}</Text>
              <Text style={styles.price}>${item.price * item.quantity}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  emptyText: { textAlign: "center", marginTop: 50 },
  item: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  name: { fontSize: 18, fontWeight: "bold" },
  price: { marginTop: 5, fontWeight: "bold", color: "#1a974e" },
});

export default Orders;
