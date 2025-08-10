import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { IP_ADDRESS } from "@/constants/ip_address";

type BasketItem = {
  item_id: number;
  name: string;
  quantity: number;
  price: number;
};

export default function PlaceOrderScreen() {
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const router = useRouter();

  const user_id = 1; // Replace with actual logged-in user's ID

  useEffect(() => {
    fetchBasketItems();
  }, []);

  const fetchBasketItems = async () => {
    try {
      const res = await axios.get(`${IP_ADDRESS}/basket`, {
        params: { user_id },
      });

      setBasketItems(res.data);

      const calculatedTotal = res.data.reduce(
        (sum: number, item: BasketItem) => sum + item.price * item.quantity,
        0
      );
      setTotal(calculatedTotal);
    } catch (err) {
      console.error("Error fetching basket:", err);
    }
  };

  const handlePlaceOrder = async () => {
    if (!basketItems.length) {
      Alert.alert("Your basket is empty!");
      return;
    }

    try {
      const orderItems = basketItems.map((item) => ({
        item_id: item.item_id,
        quantity: item.quantity,
        note: null, // Can make dynamic if needed
      }));

      const res = await axios.post(`${IP_ADDRESS}/orders`, {
        user_id,
        items: orderItems,
      });

      // Show backend message & order ID
      Alert.alert(
        "Success",
        `${res.data.message}\nOrder ID: ${res.data.order_id}`
      );

      // Clear local basket state
      setBasketItems([]);
      setTotal(0);

      // Redirect to orders page
      router.push("/(tabs)/orders");
    } catch (error) {
      console.error("Error placing order:", error);
      Alert.alert("Failed to place order");
    }
  };

  const renderItem = ({ item }: { item: BasketItem }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.detail}>
        {item.quantity} x ${item.price.toFixed(2)}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review Your Order</Text>
      <FlatList
        data={basketItems}
        keyExtractor={(item) => item.item_id.toString()}
        renderItem={renderItem}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
      </View>
      <TouchableOpacity onPress={handlePlaceOrder} style={styles.placeBtn}>
        <Text style={styles.placeText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  name: { fontSize: 16, fontWeight: "600" },
  detail: { fontSize: 14, color: "#777" },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  totalLabel: { fontSize: 18, fontWeight: "bold" },
  totalAmount: { fontSize: 18, fontWeight: "bold", color: "#1a974e" },
  placeBtn: {
    backgroundColor: "#1a974e",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  placeText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
