import { useEffect } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { SplashScreen, Stack, useRouter, useNavigation } from 'expo-router';
import { ThemeProvider } from '@react-navigation/native';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

export default function AppLayout() {
  const colorScheme = useColorScheme();
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
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
    </ThemeProvider>
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