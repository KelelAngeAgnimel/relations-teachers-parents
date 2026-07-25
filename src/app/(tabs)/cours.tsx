import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/screen-header';

const COURS = [
  {
    id: '1',
    matiere: 'Maths',
    icone: 'calculator-variant',
    couleur: '#E8F0FE',
    prof: 'Kouassi Aya',
    date: "Aujourd'hui, 16h00",
  },
  {
    id: '2',
    matiere: 'Anglais',
    icone: 'translate',
    couleur: '#E8FCEF',
    prof: 'Traoré Ibrahim',
    date: 'Demain, 10h00',
  },
  {
    id: '3',
    matiere: 'Physique-Chimie',
    icone: 'flask',
    couleur: '#F5E8FC',
    prof: 'Koffi Marie',
    date: 'Mercredi, 14h00',
  },
] as const;

export default function CoursScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title="Mes cours" />
      <ScrollView contentContainerStyle={styles.list}>
        {COURS.map((cours) => (
          <View key={cours.id} style={styles.card}>
            <View style={[styles.icone, { backgroundColor: cours.couleur }]}>
              <MaterialCommunityIcons name={cours.icone} size={24} color="#B5502D" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.matiere}>{cours.matiere}</Text>
              <Text style={styles.detail}>
                {cours.prof} · {cours.date}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
  },
  icone: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  matiere: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1D23',
  },
  detail: {
    fontSize: 13,
    color: '#666B75',
    marginTop: 2,
  },
});
