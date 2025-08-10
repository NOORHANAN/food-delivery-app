import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import { IP_ADDRESS } from "@/constants/ip_address";

export default function DeliveryOptionsScreen() {
  const [selected, setSelected] = useState<number | null>(null);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newAddress, setNewAddress] = useState("");

  const router = useRouter();
  const userId = 1; // Replace with your auth userId

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await axios.get(`${IP_ADDRESS}/delivery-options/${userId}`);
      setAddresses(res.data);
    } catch (err) {
      console.log("Error fetching addresses:", err.response?.data || err);
    }
  };

  const handleSelect = (id: number) => setSelected(id);

  const handleApply = () => {
    if (!selected) {
      return Alert.alert("Please select a delivery address");
    }
    router.push("/checkout/paymethod");
  };

  const handleAddAddress = async () => {
    if (!newLabel.trim() || !newAddress.trim()) {
      return Alert.alert("Please enter both label and address");
    }

    // Expecting "Street, City, State, PostalCode"
    const parts = newAddress.split(",");
    const street = parts[0]?.trim();
    const city = parts[1]?.trim();
    const state = parts[2]?.trim() || null;
    const postal_code = parts[3]?.trim() || null;

    if (!street || !city) {
      return Alert.alert("Please enter at least 'Street, City'");
    }

    try {
      await axios.post(`${IP_ADDRESS}/delivery-options`, {
        user_id: userId,
        label: newLabel.trim(),
        street,
        city,
        state,
        postal_code,
        country: "Pakistan",
        is_default: false,
      });

      setNewLabel("");
      setNewAddress("");
      setModalVisible(false);
      fetchAddresses();
    } catch (err) {
      console.log("Error adding address:", err.response?.data || err);
      Alert.alert("Failed to add address");
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => handleSelect(item.id)}
      style={[styles.option, selected === item.id && styles.selectedOption]}
    >
      <Ionicons
        name={selected === item.id ? "radio-button-on" : "radio-button-off"}
        size={24}
        color="#1a974e"
      />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.label}>{item.label}</Text>
        <Text style={styles.subLabel}>
          {item.street}, {item.city}
          {item.state ? `, ${item.state}` : ""}{" "}
          {item.postal_code ? `(${item.postal_code})` : ""}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Delivery Address</Text>

      <FlatList
        data={addresses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addText}>+ Add New Address</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleApply} style={styles.applyBtn}>
        <Text style={styles.applyText}>Apply</Text>
      </TouchableOpacity>

      {/* Add Address Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New Address</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter address label (e.g. Office, Apartment)"
              value={newLabel}
              onChangeText={setNewLabel}
            />

            <TextInput
              style={styles.input}
              placeholder="Street, City, State, PostalCode"
              value={newAddress}
              onChangeText={setNewAddress}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[styles.modalBtn, { backgroundColor: "#ccc" }]}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAddAddress}
                style={[styles.modalBtn, { backgroundColor: "#1a974e" }]}
              >
                <Text style={{ color: "#fff" }}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  label: { fontSize: 16, fontWeight: "500" },
  subLabel: { fontSize: 14, color: "#555" },
  addButton: {
    marginVertical: 20,
    padding: 10,
    alignItems: "center",
  },
  addText: { color: "#1a974e", fontWeight: "bold" },
  applyBtn: {
    backgroundColor: "#1a974e",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  applyText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  modalBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
});
