import React, { useState, useEffect } from "react";
import {View,Text,FlatList,TouchableOpacity,StyleSheet,Alert,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import { IP_ADDRESS } from "@/constants/ip_address";

type Discount = {
  id: number;
  description: string;
  percentage: number;
};

export default function DiscountScreen() {
  const [selected, setSelected] = useState<number | null>(null);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchDiscounts();
  }, []);
const fetchDiscounts = async () => {

  try {
    const res = await axios.get(`${IP_ADDRESS}/discounts`);
    
    const formatted = res.data.map((d: any) => ({
      id: d.id,
      description: d.label,   
      percentage: d.percentage,
    }));

    setDiscounts(formatted);
  } catch (error) {
    console.error("Error fetching discounts:", error);
  }
};


  const handleSelect = (id: number) => setSelected(id);

  const handleApply = () => {
    if (selected === null) {
      Alert.alert("Please select a discount to apply");
      return;
    }

    
    router.push("/checkout/placeorder");
  };

  const renderItem = ({ item }: { item: Discount }) => (
    <TouchableOpacity
      style={[
        styles.option,
        selected === item.id && styles.selectedOption,
      ]}
      onPress={() => handleSelect(item.id)}
    >
      <Ionicons
        name={
          selected === item.id ? "radio-button-on" : "radio-button-off"
        }
        size={24}
        color="#1a974e"
      />
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{item.description}</Text>
        <Text style={styles.percentage}>{item.percentage}% OFF</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Discount</Text>
      <FlatList
        data={discounts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity onPress={handleApply} style={styles.applyBtn}>
        <Text style={styles.applyText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff", flex: 1 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedOption: {
    borderColor: "#1a974e",
    backgroundColor: "#e6f6ed",
  },
  labelContainer: {
    marginLeft: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  percentage: {
    color: "#1a974e",
    fontSize: 14,
  },
  applyBtn: {
    backgroundColor: "#1a974e",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  applyText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
