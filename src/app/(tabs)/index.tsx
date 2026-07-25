import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PROFESSEURS } from '@/data/professeurs';

const MATIERES = ['Maths', 'Français', 'Physique', 'Anglais'];

export default function RechercherScreen() {
  const [recherche, setRecherche] = useState('');

  const texteRecherche = recherche.trim().toLowerCase();
  const professeursFiltres = PROFESSEURS.filter((prof) => {
    if (!texteRecherche) return true;
    return (
      prof.nom.toLowerCase().includes(texteRecherche) ||
      prof.matiere.toLowerCase().includes(texteRecherche)
    );
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.localisation}>
          <Ionicons name="location" size={16} color="#F5DCD1" />
          <Text style={styles.localisationText}>Cocody, Abidjan</Text>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AB</Text>
          </View>
        </View>

        <Text style={styles.titre}>Quel prof cherchez-vous ?</Text>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#8A8F98" />
          <TextInput
            style={styles.searchInput}
            placeholder="Matière, niveau..."
            placeholderTextColor="#8A8F98"
            value={recherche}
            onChangeText={setRecherche}
          />
          {recherche.length > 0 && (
            <Pressable onPress={() => setRecherche('')}>
              <Ionicons name="close-circle" size={20} color="#8A8F98" />
            </Pressable>
          )}
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsRow}>
        {MATIERES.map((matiere) => {
          const selectionnee = recherche === matiere;
          return (
            <Pressable
              key={matiere}
              style={[styles.chip, selectionnee && styles.chipSelected]}
              onPress={() => setRecherche(selectionnee ? '' : matiere)}>
              <Text style={[styles.chipText, selectionnee && styles.chipTextSelected]}>
                {matiere}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.resultatsRow}>
        <Text style={styles.resultatsText}>{professeursFiltres.length} profs à proximité</Text>
        <Pressable style={styles.filtrerButton}>
          <Ionicons name="options-outline" size={16} color="#B5502D" />
          <Text style={styles.filtrerText}>Filtrer</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {professeursFiltres.length === 0 && (
          <Text style={styles.emptyText}>Aucun professeur trouvé.</Text>
        )}
        {professeursFiltres.map((prof) => (
          <Link key={prof.id} href={`/professeur/${prof.id}`} asChild>
            <Pressable style={styles.card}>
              <View style={styles.cardTop}>
                <View style={[styles.profAvatar, { backgroundColor: prof.couleur }]}>
                  <Text style={styles.profAvatarText}>
                    {prof.nom
                      .split(' ')
                      .map((mot) => mot.charAt(0))
                      .join('')}
                  </Text>
                </View>
                <View style={styles.cardInfo}>
                  <View style={styles.nomRow}>
                    <Text style={styles.cardName}>{prof.nom}</Text>
                    {prof.verifie && (
                      <Ionicons name="checkmark-circle" size={16} color="#2E7D5B" />
                    )}
                  </View>
                  <Text style={styles.cardDetail}>
                    {prof.matiere} · {prof.niveau}
                  </Text>
                  <View style={styles.noteRow}>
                    <Ionicons name="star" size={14} color="#E8A93D" />
                    <Text style={styles.noteText}>{prof.note}</Text>
                    <Text style={styles.avisText}>({prof.avis} avis)</Text>
                  </View>
                </View>
              </View>

              <View style={styles.cardBottom}>
                <Text style={styles.tarifText}>{prof.tarif.toLocaleString('fr-FR')} FCFA/h</Text>
                <View style={styles.contacterButton}>
                  <Text style={styles.contacterText}>Contacter</Text>
                </View>
              </View>
            </Pressable>
          </Link>
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
  header: {
    backgroundColor: '#B5502D',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
    gap: 12,
  },
  localisation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  localisationText: {
    flex: 1,
    fontSize: 14,
    color: '#F5DCD1',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#9C3F21',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  titre: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1A1D23',
  },
  chipsRow: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 8,
  },
  chip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E1E6',
  },
  chipSelected: {
    backgroundColor: '#B5502D',
    borderColor: '#B5502D',
  },
  chipText: {
    fontSize: 14,
    color: '#4A4F58',
  },
  chipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  resultatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  resultatsText: {
    fontSize: 13,
    color: '#666B75',
  },
  filtrerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  filtrerText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#B5502D',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: '#8A8F98',
    marginTop: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    gap: 12,
  },
  cardTop: {
    flexDirection: 'row',
    gap: 12,
  },
  profAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profAvatarText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cardInfo: {
    flex: 1,
    gap: 2,
  },
  nomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
  noteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  noteText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1D23',
  },
  avisText: {
    fontSize: 13,
    color: '#8A8F98',
  },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F3',
    paddingTop: 12,
  },
  tarifText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B5502D',
  },
  contacterButton: {
    backgroundColor: '#B5502D',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  contacterText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});
