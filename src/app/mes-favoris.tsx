import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/screen-header';
import { getFavoris, toggleFavori } from '@/data/favoris';
import { PROFESSEURS } from '@/data/professeurs';

export default function MesFavorisScreen() {
  const [idsFavoris, setIdsFavoris] = useState(getFavoris);
  const professeursFavoris = PROFESSEURS.filter((prof) => idsFavoris.includes(prof.id));

  function retirer(id: string) {
    toggleFavori(id);
    setIdsFavoris(getFavoris());
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title="Mes favoris" />

      {professeursFavoris.length === 0 ? (
        <View style={styles.videContainer}>
          <Ionicons name="heart-outline" size={48} color="#C0C4CC" />
          <Text style={styles.videTitre}>Aucun favori pour l&apos;instant</Text>
          <Text style={styles.videTexte}>
            Appuie sur le cœur d&apos;une fiche professeur pour l&apos;ajouter ici.
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {professeursFavoris.map((prof) => (
            <View key={prof.id} style={styles.card}>
              <Link href={`/professeur/${prof.id}`} asChild>
                <Pressable style={styles.cardMain}>
                  <View style={[styles.avatar, { backgroundColor: prof.couleur }]}>
                    <Text style={styles.avatarText}>
                      {prof.nom
                        .split(' ')
                        .map((mot) => mot.charAt(0))
                        .join('')}
                    </Text>
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardName}>{prof.nom}</Text>
                    <Text style={styles.cardDetail}>
                      {prof.matiere} · {prof.niveau}
                    </Text>
                    <Text style={styles.cardTarif}>
                      {prof.tarif.toLocaleString('fr-FR')} FCFA/h
                    </Text>
                  </View>
                </Pressable>
              </Link>
              <Pressable style={styles.heartButton} onPress={() => retirer(prof.id)}>
                <Ionicons name="heart" size={22} color="#FF4D4D" />
              </Pressable>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  videContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 32,
  },
  videTitre: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A4F58',
    marginTop: 8,
  },
  videTexte: {
    fontSize: 13,
    color: '#8A8F98',
    textAlign: 'center',
  },
  list: {
    padding: 16,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingRight: 14,
  },
  cardMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cardInfo: {
    flex: 1,
    gap: 2,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1D23',
  },
  cardDetail: {
    fontSize: 13,
    color: '#666B75',
  },
  cardTarif: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#B5502D',
    marginTop: 2,
  },
  heartButton: {
    padding: 6,
  },
});
