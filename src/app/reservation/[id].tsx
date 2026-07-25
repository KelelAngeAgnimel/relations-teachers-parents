import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PROFESSEURS } from '@/data/professeurs';

const HORAIRES = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

function genererJours() {
  const jours = [];
  const aujourdhui = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(aujourdhui);
    date.setDate(aujourdhui.getDate() + i);
    jours.push({
      cle: date.toISOString().slice(0, 10),
      libelle: date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' }),
    });
  }
  return jours;
}

export default function ReservationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const professeur = PROFESSEURS.find((prof) => prof.id === id);

  const [jours] = useState(genererJours);
  const [jourChoisi, setJourChoisi] = useState<string | null>(null);
  const [horaireChoisi, setHoraireChoisi] = useState<string | null>(null);

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

  const jourSelectionne = jours.find((jour) => jour.cle === jourChoisi);
  const pretAContinuer = jourChoisi !== null && horaireChoisi !== null;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.topBarTitre}>Réserver un cours</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.profCard}>
          <View style={[styles.avatar, { backgroundColor: professeur.couleur }]}>
            <Text style={styles.avatarText}>
              {professeur.nom
                .split(' ')
                .map((mot) => mot.charAt(0))
                .join('')}
            </Text>
          </View>
          <View>
            <Text style={styles.profNom}>{professeur.nom}</Text>
            <Text style={styles.profMatiere}>{professeur.matiere}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitre}>Choisissez un jour</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.joursRow}>
            {jours.map((jour) => {
              const selectionne = jour.cle === jourChoisi;
              return (
                <Pressable
                  key={jour.cle}
                  style={[styles.jourChip, selectionne && styles.chipSelectionne]}
                  onPress={() => setJourChoisi(jour.cle)}>
                  <Text style={[styles.jourText, selectionne && styles.chipTextSelectionne]}>
                    {jour.libelle}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitre}>Choisissez un horaire</Text>
          <View style={styles.horairesGrid}>
            {HORAIRES.map((horaire, index) => {
              const indisponible = index % 3 === 0;
              const selectionne = horaire === horaireChoisi;
              return (
                <Pressable
                  key={horaire}
                  disabled={indisponible}
                  style={[
                    styles.horaireChip,
                    selectionne && styles.chipSelectionne,
                    indisponible && styles.horaireIndisponible,
                  ]}
                  onPress={() => setHoraireChoisi(horaire)}>
                  <Text
                    style={[
                      styles.horaireText,
                      selectionne && styles.chipTextSelectionne,
                      indisponible && styles.horaireTextIndisponible,
                    ]}>
                    {horaire}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.recap}>
          <Text style={styles.recapLabel}>
            {jourSelectionne && horaireChoisi
              ? `${jourSelectionne.libelle} · ${horaireChoisi}`
              : 'Choisissez un jour et un horaire'}
          </Text>
          <Text style={styles.recapTarif}>
            {professeur.tarif.toLocaleString('fr-FR')} FCFA/h
          </Text>
        </View>
        <Pressable
          style={[styles.continuerButton, !pretAContinuer && styles.continuerButtonDesactive]}
          disabled={!pretAContinuer}
          onPress={() =>
            router.push({
              pathname: '/paiement/[id]',
              params: { id: professeur.id, jour: jourSelectionne?.libelle ?? '', horaire: horaireChoisi ?? '' },
            })
          }>
          <Text style={styles.continuerText}>Continuer</Text>
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
  topBarTitre: {
    fontSize: 16,
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
  profCard: {
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
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profNom: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1D23',
  },
  profMatiere: {
    fontSize: 13,
    color: '#666B75',
  },
  section: {
    gap: 12,
  },
  sectionTitre: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1D23',
  },
  joursRow: {
    gap: 8,
  },
  jourChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E1E6',
  },
  jourText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4A4F58',
    textTransform: 'capitalize',
  },
  horairesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  horaireChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E1E6',
  },
  horaireText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A4F58',
  },
  horaireIndisponible: {
    backgroundColor: '#F0F0F3',
    borderColor: '#F0F0F3',
  },
  horaireTextIndisponible: {
    color: '#C0C4CC',
  },
  chipSelectionne: {
    backgroundColor: '#B5502D',
    borderColor: '#B5502D',
  },
  chipTextSelectionne: {
    color: '#FFFFFF',
  },
  bottomBar: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F3',
    gap: 12,
  },
  recap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recapLabel: {
    fontSize: 13,
    color: '#666B75',
    flex: 1,
  },
  recapTarif: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B5502D',
  },
  continuerButton: {
    backgroundColor: '#B5502D',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
  },
  continuerButtonDesactive: {
    backgroundColor: '#E0E1E6',
  },
  continuerText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
});
