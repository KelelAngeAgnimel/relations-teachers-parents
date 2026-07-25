import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { estFavori, toggleFavori } from '@/data/favoris';
import { PROFESSEURS } from '@/data/professeurs';

export default function ProfesseurScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const professeur = PROFESSEURS.find((prof) => prof.id === id);
  const [favori, setFavori] = useState(() => (professeur ? estFavori(professeur.id) : false));

  function handleToggleFavori() {
    if (!professeur) return;
    toggleFavori(professeur.id);
    setFavori((actuel) => !actuel);
  }

  if (!professeur) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.introuvable}>Professeur introuvable.</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.retourLien}>Retour</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const initiales = professeur.nom
    .split(' ')
    .map((mot) => mot.charAt(0))
    .join('');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Pressable onPress={handleToggleFavori}>
          <Ionicons
            name={favori ? 'heart' : 'heart-outline'}
            size={24}
            color={favori ? '#FF4D4D' : '#FFFFFF'}
          />
        </Pressable>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.identiteRow}>
          <View style={[styles.avatar, { backgroundColor: professeur.couleur }]}>
            <Text style={styles.avatarText}>{initiales}</Text>
          </View>
          <View style={styles.identiteInfo}>
            <View style={styles.nomRow}>
              <Text style={styles.nom}>{professeur.nom}</Text>
              {professeur.verifie && (
                <Ionicons name="checkmark-circle" size={18} color="#2E7D5B" />
              )}
            </View>
            <Text style={styles.sousTitre}>Enseigne les cours de {professeur.matiere}</Text>
          </View>
        </View>

        <View style={styles.noteRow}>
          <Ionicons name="star" size={16} color="#E8A93D" />
          <Text style={styles.noteText}>{professeur.note}</Text>
          <Text style={styles.detailText}>
            · {professeur.avis} avis · {professeur.ville}
          </Text>
        </View>

        <View style={styles.boitesRow}>
          <View style={styles.boite}>
            <Text style={styles.boiteLabel}>Tarif</Text>
            <Text style={styles.boiteValeur}>
              {professeur.tarif.toLocaleString('fr-FR')} FCFA/h
            </Text>
          </View>
          <View style={styles.boite}>
            <Text style={styles.boiteLabel}>Répond en</Text>
            <Text style={styles.boiteValeur}>{professeur.reponse}</Text>
          </View>
        </View>

        {(professeur.identiteVerifiee || professeur.diplomeVerifie) && (
          <View style={styles.badgesRow}>
            {professeur.identiteVerifiee && (
              <View style={styles.badge}>
                <Ionicons name="shield-checkmark" size={14} color="#2E7D5B" />
                <Text style={styles.badgeText}>Identité vérifiée</Text>
              </View>
            )}
            {professeur.diplomeVerifie && (
              <View style={styles.badge}>
                <Ionicons name="school" size={14} color="#2E7D5B" />
                <Text style={styles.badgeText}>Diplôme vérifié</Text>
              </View>
            )}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitre}>À propos</Text>
          <Text style={styles.aproposText}>{professeur.apropos}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitre}>Matières & niveaux</Text>
          <View style={styles.tagsRow}>
            {professeur.matieresNiveaux.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitre}>Avis récents</Text>
          {professeur.avisRecents.length === 0 ? (
            <Text style={styles.detailText}>Aucun avis pour l&apos;instant.</Text>
          ) : (
            professeur.avisRecents.map((avis) => (
              <View key={avis.id} style={styles.avisCard}>
                <View style={styles.avisHeader}>
                  <Text style={styles.avisAuteur}>{avis.auteur}</Text>
                  <View style={styles.avisEtoiles}>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Ionicons
                        key={index}
                        name={index < avis.note ? 'star' : 'star-outline'}
                        size={12}
                        color="#E8A93D"
                      />
                    ))}
                  </View>
                </View>
                <Text style={styles.avisCommentaire}>{avis.commentaire}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Pressable
          style={styles.contacterButtonSecondaire}
          onPress={() =>
            Alert.alert('Contacter', `La messagerie avec ${professeur.nom} arrive bientôt !`)
          }>
          <Ionicons name="chatbubble-outline" size={20} color="#B5502D" />
        </Pressable>
        <Pressable
          style={styles.reserverButton}
          onPress={() => router.push(`/reservation/${professeur.id}`)}>
          <Text style={styles.reserverText}>Réserver un cours</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 20,
  },
  identiteRow: {
    flexDirection: 'row',
    gap: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  identiteInfo: {
    flex: 1,
    justifyContent: 'center',
    gap: 2,
  },
  nomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  nom: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1D23',
  },
  sousTitre: {
    fontSize: 14,
    color: '#666B75',
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  noteText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1D23',
  },
  detailText: {
    fontSize: 14,
    color: '#666B75',
  },
  boitesRow: {
    flexDirection: 'row',
    gap: 12,
  },
  boite: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    gap: 4,
  },
  boiteLabel: {
    fontSize: 12,
    color: '#8A8F98',
  },
  boiteValeur: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1D23',
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E7F3EC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2E7D5B',
  },
  section: {
    gap: 8,
  },
  sectionTitre: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1D23',
  },
  aproposText: {
    fontSize: 14,
    color: '#4A4F58',
    lineHeight: 20,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#F5E6DE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#B5502D',
  },
  avisCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    gap: 6,
  },
  avisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avisAuteur: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1D23',
  },
  avisEtoiles: {
    flexDirection: 'row',
    gap: 2,
  },
  avisCommentaire: {
    fontSize: 13,
    color: '#4A4F58',
    lineHeight: 18,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F3',
  },
  contacterButtonSecondaire: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#B5502D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reserverButton: {
    flex: 1,
    backgroundColor: '#B5502D',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
  },
  reserverText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
});
