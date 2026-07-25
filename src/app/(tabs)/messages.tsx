import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/screen-header';
import { CONVERSATIONS } from '@/data/conversations';
import { PROFESSEURS } from '@/data/professeurs';

export default function MessagesScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title="Messages" />
      <ScrollView contentContainerStyle={styles.list}>
        {CONVERSATIONS.map((conv) => {
          const professeur = PROFESSEURS.find((prof) => prof.id === conv.id);
          if (!professeur) return null;
          const dernierMessage = conv.messages[conv.messages.length - 1];
          return (
            <Link key={conv.id} href={`/conversation/${conv.id}`} asChild>
              <Pressable style={styles.card}>
                <View style={[styles.avatar, { backgroundColor: professeur.couleur }]}>
                  <Text style={styles.avatarText}>{professeur.nom.charAt(0)}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.nom}>{professeur.nom}</Text>
                  <Text style={styles.message} numberOfLines={1}>
                    {dernierMessage.texte}
                  </Text>
                </View>
                <Text style={styles.heure}>{dernierMessage.heure}</Text>
              </Pressable>
            </Link>
          );
        })}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
