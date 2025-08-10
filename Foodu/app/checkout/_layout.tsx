import { Stack } from "expo-router";

export default function CheckoutLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="deliveryoption" options={{ title: "Delivery Options" }} />
      <Stack.Screen name="paymethod" options={{ title: "Payment Method" }} />
      <Stack.Screen name="discount" options={{ title: "Apply Discount" }} />
      <Stack.Screen name="placeorder" options={{ title: "Order Summary" }} />
    </Stack>
  );
}
