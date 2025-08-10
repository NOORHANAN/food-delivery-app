import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type PaymentOption = {
  id: string;
  label: string;
};

const paymentOptions: PaymentOption[] = [
  { id: "cash", label: "Cash on Delivery" },
  { id: "card", label: "Credit/Debit Card" },
  { id: "wallet", label: "Wallet Balance" },
];

export default function PaymentMethodsScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const handleSelect = (id: string) => setSelected(id);

  const handleApply = () => {
    if (!selected) {
      return Alert.alert("Please select a payment method");
    }
    router.push("/checkout/placeorder");
  };

  const renderItem = ({ item }: { item: PaymentOption }) => (
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
      <Text style={styles.label}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Payment Method</Text>

      <FlatList
        data={paymentOptions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
  label: { marginLeft: 10, fontSize: 16 },
  applyBtn: {
    backgroundColor: "#1a974e",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  applyText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
