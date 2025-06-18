import { MainProvider } from './src/contexts/MainContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import QuizScreen from './src/views/QuizView';
import Header from './src/components/core/Header';
import { StyleSheet, View } from 'react-native';

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <MainProvider>
          <View style={styles.container}>
                <Header headerTitle={'Heartburn checker'}/>
                <QuizScreen />
          </View>
        </MainProvider>
      </SafeAreaProvider>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
});
