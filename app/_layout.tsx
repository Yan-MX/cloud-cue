import { SplashScreen, Stack, useNavigation, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { WeatherProvider } from '../context/WeatherContext';
export default function AppLayout() {
  const router = useRouter();
  const navigation = useNavigation();
  const loaded = true; // Assuming loaded is true for simplicity

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const currentRouteName = navigation.getState().routes[navigation.getState().index]?.name;

  return (
    <WeatherProvider >
      <Stack
        screenOptions={{
          header: ({ navigation }) => (
            <View style={styles.header}>
              {currentRouteName !== 'index' && (
                <Button title="Back" onPress={() => router.back()} />
              )}
              <Text style={styles.headerTitle}>App Header</Text>
            </View>
          ),
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="[location]" />
      </Stack>
    </WeatherProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});