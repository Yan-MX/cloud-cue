import Ionicons from '@expo/vector-icons/Ionicons';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { WeatherProvider } from '../context/WeatherContext';

export default function AppLayout() {
  const loaded = true;

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <WeatherProvider>
      <Stack
        screenOptions={{
          headerShown: true,
          headerTransparent: true,
          header: ({ navigation, route }) => (
            <View style={styles.header}>
              {route.name !== 'index' && (
                <TouchableOpacity 
                  onPress={() => navigation.goBack()} 
                  style={styles.backButton}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <View style={styles.backButtonInner}>
                    <Ionicons name="arrow-back" size={24} color="#000000" />
                  </View>
                </TouchableOpacity>
              )}
              <View style={styles.headerAccent} />
            </View>
          ),
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="[location]" 
          options={{
            headerShown: true,
            title: '',
          }}
        />
      </Stack>
    </WeatherProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
    position: 'relative',
  },
  headerAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#DE0000',
  },
  backButton: {
    zIndex: 10,
  },
  backButtonInner: {
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});