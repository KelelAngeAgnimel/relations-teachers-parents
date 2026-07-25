import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/screen-header';

const CONVERSATIONS = [
  {
    id: '1',
    nom: 'Kouassi Aya',
    dernierMessage: "D'accord, à demain 14h !",
    heure: '10:24',
  },
  {
    id: '2',
    nom: 'Traoré Ibrahim',
    dernierMessage: "Merci pour le cours d'aujourd'hui",
    heure: 'Hier',
  },
  {
    id: '3',
    nom: 'Koffi Marie',
    dernierMessage: 'Vous êtes disponible mercredi ?',
    heure: 'Lun',
  },
];

export default function MessagesScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title="Messages" />
      <ScrollView contentContainerStyle={styles.list}>
        {CONVERSATIONS.map((conv) => (
          <View key={conv.id} style={styles.card}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{conv.nom.charAt(0)}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.nom}>{conv.nom}</Text>
              <Text style={styles.message} numberOfLines={1}>
                {conv.dernierMessage}
              </Text>
            </View>
            <Text style={styles.heure}>{conv.heure}</Text>
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
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5E6DE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B5502D',
  },
  textContainer: {
    flex: 1,
  },
  nom: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1D23',
  },
  message: {
    fontSize: 13,
    color: '#666B75',
    marginTop: 2,
  },
  heure: {
    fontSize: 12,
    color: '#8A8F98',
  },
});
