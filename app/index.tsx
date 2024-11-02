import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Home!</Text>
      <Link
        href={{
          pathname: '/[location]',
          params: { location: 'berlin' }
        }}
      >
        <Text style={styles.link}>See weather detail based on location</Text>
      </Link>
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  link: {
    fontSize: 18,
    color: 'blue',
  },
});
