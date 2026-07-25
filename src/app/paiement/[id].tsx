import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PROFESSEURS } from '@/data/professeurs';

const MOYENS_PAIEMENT = ['Wave', 'Orange Money', 'MTN MoMo', 'Moov Money'];

function heureDeFin(heureDebut: string) {
  const [heures] = heureDebut.split(':');
  const heureFin = (Number(heures) + 1) % 24;
  return `${String(heureFin).padStart(2, '0')}h`;
}

export default function PaiementScreen() {
  const { id, jour, horaire } = useLocalSearchParams<{
    id: string;
    jour?: string;
    horaire?: string;
  }>();
  const router = useRouter();
  const professeur = PROFESSEURS.find((prof) => prof.id === id);

  const [moyenChoisi, setMoyenChoisi] = useState('Wave');
  const [numero, setNumero] = useState('');

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

  const pretAPayer = numero.trim().length >= 8;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.topBarTitre}>Paiement</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <View style={styles.recapCard}>
          <View style={[styles.avatar, { backgroundColor: professeur.couleur }]}>
            <Text style={styles.avatarText}>
              {professeur.nom
                .split(' ')
                .map((mot) => mot.charAt(0))
                .join('')}
            </Text>
          </View>
          <View>
            <Text style={styles.recapNom}>Cours avec {professeur.nom}</Text>
            <Text style={styles.recapDetail}>
              {professeur.matiere}
              {jour ? ` · ${jour}` : ''}
              {horaire ? ` · ${horaire}–${heureDeFin(horaire)}` : ''}
            </Text>
          </View>
        </View>

        <View style={styles.montantSection}>
          <Text style={styles.montantLabel}>Montant à payer</Text>
          <Text style={styles.montantValeur}>
            {professeur.tarif.toLocaleString('fr-FR')} FCFA
          </Text>
          <Text style={styles.montantDetail}>1 heure de cours</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitre}>Payer avec</Text>
          <View style={styles.moyensGrid}>
            {MOYENS_PAIEMENT.map((moyen) => {
              const selectionne = moyen === moyenChoisi;
              return (
                <Pressable
                  key={moyen}
                  style={[styles.moyenCard, selectionne && styles.moyenCardSelectionne]}
                  onPress={() => setMoyenChoisi(moyen)}>
                  <Ionicons
                    name="wallet-outline"
                    size={20}
                    color={selectionne ? '#B5502D' : '#666B75'}
                  />
                  <Text style={[styles.moyenText, selectionne && styles.moyenTextSelectionne]}>
                    {moyen}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitre}>Numéro {moyenChoisi}</Text>
          <TextInput
            style={styles.input}
            placeholder="+225 07 00 00 00 00"
            placeholderTextColor="#8A8F98"
            keyboardType="phone-pad"
            value={numero}
            onChangeText={setNumero}
          />
        </View>

        <View style={styles.securiteBox}>
          <Ionicons name="lock-closed" size={16} color="#2E7D5B" />
          <Text style={styles.securiteText}>
            Paiement sécurisé. Le montant n&apos;est versé au professeur qu&apos;après votre
            cours.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Pressable
          style={[styles.payerButton, !pretAPayer && styles.payerButtonDesactive]}
          disabled={!pretAPayer}
          onPress={() =>
            Alert.alert(
              'Paiement réussi',
              `Le paiement de ${professeur.tarif.toLocaleString('fr-FR')} FCFA via ${moyenChoisi} a été simulé avec succès.`,
              [{ text: 'Continuer', onPress: () => router.replace(`/avis/${professeur.id}`) }],
            )
          }>
          <Text style={styles.payerText}>
            Payer {professeur.tarif.toLocaleString('fr-FR')} FCFA
          </Text>
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
  recapCard: {
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
  recapNom: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1D23',
  },
  recapDetail: {
    fontSize: 13,
    color: '#666B75',
    marginTop: 2,
  },
  montantSection: {
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
  },
  montantLabel: {
    fontSize: 13,
    color: '#666B75',
  },
  montantValeur: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1D23',
  },
  montantDetail: {
    fontSize: 13,
    color: '#8A8F98',
  },
  section: {
    gap: 12,
  },
  sectionTitre: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1D23',
  },
  moyensGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  moyenCard: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E1E6',
  },
  moyenCardSelectionne: {
    borderColor: '#B5502D',
    backgroundColor: '#F5E6DE',
  },
  moyenText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A4F58',
  },
  moyenTextSelectionne: {
    color: '#B5502D',
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
  },
  securiteBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#E7F3EC',
    padding: 12,
    borderRadius: 12,
  },
  securiteText: {
    flex: 1,
    fontSize: 12,
    color: '#2E7D5B',
    lineHeight: 17,
  },
  bottomBar: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F3',
  },
  payerButton: {
    backgroundColor: '#B5502D',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
  },
  payerButtonDesactive: {
    backgroundColor: '#E0E1E6',
  },
  payerText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
});
