import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="professeur/[id]" />
      <Stack.Screen name="reservation/[id]" />
      <Stack.Screen name="paiement/[id]" />
      <Stack.Screen name="avis/[id]" />
      <Stack.Screen name="devenir-professeur" />
    </Stack>
  );
}
