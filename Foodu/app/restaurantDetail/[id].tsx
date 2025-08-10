import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity } from "react-native";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { IP_ADDRESS } from "@/constants/ip_address";
import { Ionicons } from "@expo/vector-icons";

export default function RestaurantDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [restaurant, setRestaurant] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);


  useEffect(() => {
    fetchRestaurant();
  }, [id]);

  const fetchRestaurant = async () => {
    try {
      const res = await axios.get(`${IP_ADDRESS}/restaurants/${id}`);
      setRestaurant(res.data);
    } catch (error) {
      console.log("Error fetching restaurant:", error);
    }
  };

  if (!restaurant) return <Text style={{ marginTop: 50, textAlign: "center" }}>Loading...</Text>;

  return (
    <ScrollView style={styles.container}>
      {/* Banner Image with overlay icons */}
      <View style={styles.bannerWrapper}>
        <Image source={{ uri: restaurant.image_url }} style={styles.bannerImage} />
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

      {/* Restaurant Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{restaurant.name}</Text>
        <View style={styles.row}>
          <Ionicons name="star" size={16} color="#FFA500" />
          <Text style={styles.ratingText}> {restaurant.avg_rating} </Text>
          <Text style={styles.subText}>({restaurant.rating_count} reviews)</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="location" size={16} color="#1a974e" />
          <Text style={styles.subText}> 2.4 km  •  ${restaurant.delivery_fee} Delivery</Text>
        </View>
        {restaurant.offers && (
  <TouchableOpacity onPress={() => router.push("/offers")}>
    <Text style={styles.offerText}> Offers are available</Text>
  </TouchableOpacity>
)}

      </View>

      {/* For You - Horizontal Scroll */}
      <Text style={styles.sectionTitle}>For You</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={restaurant.for_you}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.forYouCard}
            onPress={() => router.push(`/menu/${item.id}`)}
          >
            <Image source={{ uri: item.image_url }} style={styles.forYouImage} />
            {item.tag && <Text style={styles.tagLabel}>{item.tag}</Text>}
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardPrice}>${item.price}</Text>
          </TouchableOpacity>
        )}
        style={{ marginBottom: 20, paddingLeft: 10 }}
      />

      {/* Menu */}
      <Text style={styles.sectionTitle}>Menu</Text>
      {restaurant.menu.map((item, i) => (
        <TouchableOpacity
          key={item.id || i}
          style={styles.menuCard}
          onPress={() => router.push(`/menu/${item.id}`)}
        >
          <View>
            <Text style={styles.cardTitle}>{item.name}</Text>
            {item.tag && <Text style={styles.newTag}>{item.tag}</Text>}
            <Text style={styles.cardPrice}>${item.price}</Text>
          </View>
          {item.image_url && <Image source={{ uri: item.image_url }} style={styles.menuImage} />}
        </TouchableOpacity>
      ))}

      {/* Drinks */}
      <Text style={styles.sectionTitle}>Drink</Text>
      {restaurant.drinks.map((item, i) => (
        <TouchableOpacity
          key={item.id || i}
          style={styles.menuCard}
          onPress={() => router.push(`/drink/${item.id}`)}
        >
          <View>
            <Text style={styles.cardTitle}>{item.name}</Text>
            {item.tag && <Text style={styles.promoTag}>{item.tag}</Text>}
            <Text style={styles.cardPrice}>${item.price}</Text>
          </View>
          {item.image_url && <Image source={{ uri: item.image_url }} style={styles.menuImage} />}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  bannerWrapper: {
    position: "relative",
    width: "100%",
    height: 220,
    marginBottom: 10,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
  infoContainer: {
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: "bold"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  subText: {
    fontSize: 13,
    color: "#555"
  },
  offerText: {
    fontSize: 14,
    color: "#1a974e",
    marginTop: 4
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginHorizontal: 16,
    marginBottom: 10
  },
  forYouCard: {
    width: 140,
    marginRight: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2
  },
  forYouImage: {
    width: "100%",
    height: 100,
    borderRadius: 8
  },
  tagLabel: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "#1a974e",
    color: "#fff",
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 6
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1a974e"
  },
  menuCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2
  },
  menuImage: {
    width: 70,
    height: 70,
    borderRadius: 10
  },
  newTag: {
    color: "#1a974e",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 2
  },
  promoTag: {
    color: "#ff6600",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 2
  }
});
