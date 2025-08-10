import { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet,TouchableOpacity, Button } from "react-native";
import axios from "axios";
import { IP_ADDRESS } from "@/constants/ip_address";
import { useRouter } from "expo-router"; // ✅ import router

interface BasketItem {
  item_id: number;
  quantity: number;
  note: string | null;
  price: string;
  name: string;
  image_url: string;
  restaurant_name: string;
}

export default function BasketScreen() {
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const userId = 1; // Replace with actual user ID or fetch from auth context
  const router = useRouter(); // ✅ initialize router

  useEffect(() => {
    fetchBasket();
  }, []);

  const fetchBasket = async () => {
    try {
      const res = await axios.get(`${IP_ADDRESS}/basket?user_id=1`);
      setBasketItems(res.data);
    } catch (err) {
      console.error("Error fetching basket:", err);
    }
  };

  const renderItem = ({ item }: { item: BasketItem }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.restaurant}>{item.restaurant_name}</Text>
        <Text style={styles.price}>$. {item.price}</Text>
        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
        {item.note && <Text style={styles.note}>Note: {item.note}</Text>}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      
    <FlatList
  data={basketItems}
  keyExtractor={(item, index) =>
    `${item.item_id}-${item.restaurant_name}-${item.quantity}-${item.note}-${index}`
  }
  renderItem={renderItem}
  ListEmptyComponent={<Text>No items in basket</Text>}
/>



      {/* ✅ Add proceed to checkout button */}
    {basketItems.length > 0 && (
  <View style={styles.checkoutButtonContainer}>
   <TouchableOpacity
    style={styles.continueButton}
    onPress={() => router.push("/")}
  >
    <Text style={styles.continueButtonText}>Continue Shopping</Text>
  </TouchableOpacity>

  <View style={styles.separatorContainer}>
  <View style={styles.line} />
  <Text style={styles.separatorText}>or</Text>
  <View style={styles.line} />
</View>

    <TouchableOpacity
      style={styles.checkoutButton}
      onPress={() => router.push("/checkout/deliveryoption")}
    >
      <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
       
    </TouchableOpacity>
  </View>
)}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 12,
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  restaurant: {
    fontSize: 14,
    color: "#888",
  },
  price: {
    fontSize: 14,
    marginTop: 4,
  },
  quantity: {
    fontSize: 14,
    marginTop: 2,
  },
  note: {
    fontSize: 12,
    color: "#444",
    marginTop: 4,
  },
  checkoutButton: {
    marginTop: 5,
    padding:1,
    marginBottom:5,
   
    borderRadius:10,
   alignItems: "center", 
   justifyContent: "center"
  },
checkoutButtonText: {
  backgroundColor: "#1a974e",
  padding: 11,
  paddingHorizontal: 70,
  borderRadius: 25,
  color: "#fff",
  fontSize: 16,
  fontWeight: "bold",
  textAlign: "center",
},
  checkoutButtonContainer:{
      marginTop: 1,
    padding:10,
    marginBottom:10,
   
    borderRadius:10,
   alignItems: "center", 
   justifyContent: "center"

  },
  
continueButton: {
  backgroundColor: "#1a974e",
  padding: 11,
  paddingHorizontal: 77,
  borderRadius: 20,
  marginBottom: 5, 
  
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"

},

  separatorContainer: {
  flexDirection: "row",
  alignItems: "center",
  marginVertical: 5,
},
line: {
  flex: 1,
  height: 1,
  backgroundColor: "#ccc",
},
separatorText: {
  marginHorizontal: 10,
  fontSize: 14,
  color: "#888",
  fontWeight: "500",
},

});
