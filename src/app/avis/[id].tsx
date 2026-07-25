import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PROFESSEURS } from '@/data/professeurs';

export default function AvisScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const professeur = PROFESSEURS.find((prof) => prof.id === id);

  const [note, setNote] = useState(0);
  const [commentaire, setCommentaire] = useState('');

  if (!professeur) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.introuvable}>Professeur introuvable.</Text>
        <Pressable onPress={() => router.replace('/')}>
          <Text style={styles.retourLien}>Retour à l&apos;accueil</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const pretAPublier = note > 0;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitre}>Cours terminé</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.confirmation}>
          <Ionicons name="checkmark-circle" size={48} color="#2E7D5B" />
          <Text style={styles.confirmationTitre}>Paiement effectué</Text>
          <Text style={styles.confirmationTexte}>
            Comment s&apos;est passé votre cours avec {professeur.nom} ?
          </Text>
        </View>

        <View style={styles.etoilesRow}>
          {Array.from({ length: 5 }).map((_, index) => {
            const valeur = index + 1;
            return (
              <Pressable key={valeur} onPress={() => setNote(valeur)}>
                <Ionicons
                  name={valeur <= note ? 'star' : 'star-outline'}
                  size={36}
                  color="#E8A93D"
                />
              </Pressable>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitre}>Votre commentaire (facultatif)</Text>
          <TextInput
            style={styles.input}
            placeholder="Partagez votre expérience..."
            placeholderTextColor="#8A8F98"
            value={commentaire}
            onChangeText={setCommentaire}
            multiline
            numberOfLines={4}
          />
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Pressable
          style={[styles.publierButton, !pretAPublier && styles.publierButtonDesactive]}
          disabled={!pretAPublier}
          onPress={() =>
            Alert.alert('Merci !', 'Votre avis a bien été publié.', [
              { text: 'Retour à l’accueil', onPress: () => router.replace('/') },
            ])
          }>
          <Text style={styles.publierText}>Publier l&apos;avis</Text>
        </Pressable>
        <Pressable onPress={() => router.replace('/')}>
          <Text style={styles.passerLien}>Passer pour l&apos;instant</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  introuvable: {
    textAlign: 'center',
    marginTop: 40,
    color: '#666B75',
  },
  retourLien: {
    textAlign: 'center',
    marginTop: 12,
    color: '#B5502D',
    fontWeight: '600',
  },
  topBar: {
    backgroundColor: '#B5502D',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  topBarTitre: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 24,
  },
  confirmation: {
    alignItems: 'center',
    gap: 8,
    paddingTop: 12,
  },
  confirmationTitre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1D23',
  },
  confirmationTexte: {
    fontSize: 14,
    color: '#666B75',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  etoilesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  section: {
    gap: 8,
  },
  sectionTitre: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1D23',
  },
  input: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 15,
    color: '#1A1D23',
    borderWidth: 1,
    borderColor: '#E0E1E6',
    textAlignVertical: 'top',
    minHeight: 100,
  },
  bottomBar: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F3',
    gap: 12,
    alignItems: 'center',
  },
  publierButton: {
    alignSelf: 'stretch',
    backgroundColor: '#B5502D',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
  },
  publierButtonDesactive: {
    backgroundColor: '#E0E1E6',
  },
  publierText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
  passerLien: {
    fontSize: 13,
    color: '#8A8F98',
  },
});
