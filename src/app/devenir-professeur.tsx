import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NIVEAUX, ZONES } from '@/data/options';

const MATIERES = ['Maths', 'Français', 'Anglais', 'Physique-Chimie', 'SVT'];
const JOURS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

export default function DevenirProfesseurScreen() {
  const router = useRouter();
  const [etape, setEtape] = useState(1);

  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  const [photoAjoutee, setPhotoAjoutee] = useState(false);
  const [matiere, setMatiere] = useState<string | null>(null);
  const [niveaux, setNiveaux] = useState<string[]>([]);
  const [tarif, setTarif] = useState('');
  const [zone, setZone] = useState<string | null>(null);
  const [joursDispo, setJoursDispo] = useState<string[]>([]);
  const [bio, setBio] = useState('');

  const [pieceIdentiteAjoutee, setPieceIdentiteAjoutee] = useState(false);
  const [diplomeAjoute, setDiplomeAjoute] = useState(false);

  const etape1Valide = nom.trim() !== '' && email.trim() !== '' && telephone.trim() !== '' && motDePasse.length >= 6;
  const etape2Valide =
    matiere !== null &&
    niveaux.length > 0 &&
    tarif.trim() !== '' &&
    zone !== null &&
    joursDispo.length > 0;

  function toggleNiveau(niveau: string) {
    setNiveaux((actuels) =>
      actuels.includes(niveau) ? actuels.filter((n) => n !== niveau) : [...actuels, niveau],
    );
  }

  function toggleJour(jour: string) {
    setJoursDispo((actuels) =>
      actuels.includes(jour) ? actuels.filter((j) => j !== jour) : [...actuels, jour],
    );
  }

  function retour() {
    if (etape > 1) {
      setEtape(etape - 1);
    } else {
      router.back();
    }
  }

  function soumettre() {
    Alert.alert(
      'Merci !',
      'Votre profil a été envoyé. Notre équipe le vérifie avant de le rendre visible aux élèves.',
      [{ text: 'OK', onPress: () => router.replace('/profil') }],
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <Pressable onPress={retour}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.topBarTitre}>Devenir professeur</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.progressBar}>
        {[1, 2, 3].map((n) => (
          <View
            key={n}
            style={[styles.progressSegment, n <= etape && styles.progressSegmentActif]}
          />
        ))}
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.etapeLabel}>
          Étape {etape} sur 3 ·{' '}
          {etape === 1 ? 'Votre compte' : etape === 2 ? 'Votre profil' : 'Vérification'}
        </Text>

        {etape === 1 && (
          <View style={styles.section}>
            <View style={styles.champ}>
              <Text style={styles.label}>Nom complet</Text>
              <TextInput
                style={styles.input}
                placeholder="Aya Koné"
                placeholderTextColor="#8A8F98"
                value={nom}
                onChangeText={setNom}
              />
            </View>
            <View style={styles.champ}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="aya.kone@example.com"
                placeholderTextColor="#8A8F98"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={styles.champ}>
              <Text style={styles.label}>Téléphone</Text>
              <TextInput
                style={styles.input}
                placeholder="+225 07 00 00 00 00"
                placeholderTextColor="#8A8F98"
                keyboardType="phone-pad"
                value={telephone}
                onChangeText={setTelephone}
              />
            </View>
            <View style={styles.champ}>
              <Text style={styles.label}>Mot de passe</Text>
              <TextInput
                style={styles.input}
                placeholder="6 caractères minimum"
                placeholderTextColor="#8A8F98"
                secureTextEntry
                value={motDePasse}
                onChangeText={setMotDePasse}
              />
            </View>
          </View>
        )}

        {etape === 2 && (
          <View style={styles.section}>
            <Pressable style={styles.photoBouton} onPress={() => setPhotoAjoutee(true)}>
              <Ionicons
                name={photoAjoutee ? 'checkmark-circle' : 'camera-outline'}
                size={28}
                color={photoAjoutee ? '#2E7D5B' : '#8A8F98'}
              />
              <Text style={styles.photoTexte}>
                {photoAjoutee ? 'Photo ajoutée' : 'Ajouter une photo'}
              </Text>
            </Pressable>

            <View style={styles.champ}>
              <Text style={styles.label}>Matière principale</Text>
              <View style={styles.chipsWrap}>
                {MATIERES.map((m) => {
                  const selectionnee = m === matiere;
                  return (
                    <Pressable
                      key={m}
                      style={[styles.chip, selectionnee && styles.chipSelectionne]}
                      onPress={() => setMatiere(m)}>
                      <Text style={[styles.chipText, selectionnee && styles.chipTextSelectionne]}>
                        {m}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View style={styles.champ}>
              <Text style={styles.label}>Niveaux enseignés</Text>
              <View style={styles.chipsWrap}>
                {NIVEAUX.map((n) => {
                  const selectionne = niveaux.includes(n);
                  return (
                    <Pressable
                      key={n}
                      style={[styles.chip, selectionne && styles.chipSelectionne]}
                      onPress={() => toggleNiveau(n)}>
                      <Text style={[styles.chipText, selectionne && styles.chipTextSelectionne]}>
                        {n}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View style={styles.champ}>
              <Text style={styles.label}>Tarif / heure (FCFA)</Text>
              <TextInput
                style={styles.input}
                placeholder="2500"
                placeholderTextColor="#8A8F98"
                keyboardType="numeric"
                value={tarif}
                onChangeText={setTarif}
              />
            </View>

            <View style={styles.champ}>
              <Text style={styles.label}>Zone</Text>
              <View style={styles.chipsWrap}>
                {ZONES.map((z) => {
                  const selectionnee = z === zone;
                  return (
                    <Pressable
                      key={z}
                      style={[styles.chip, selectionnee && styles.chipSelectionne]}
                      onPress={() => setZone(z)}>
                      <Text style={[styles.chipText, selectionnee && styles.chipTextSelectionne]}>
                        {z}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View style={styles.champ}>
              <Text style={styles.label}>Disponibilités</Text>
              <View style={styles.chipsWrap}>
                {JOURS.map((jour) => {
                  const selectionne = joursDispo.includes(jour);
                  return (
                    <Pressable
                      key={jour}
                      style={[styles.chip, selectionne && styles.chipSelectionne]}
                      onPress={() => toggleJour(jour)}>
                      <Text style={[styles.chipText, selectionne && styles.chipTextSelectionne]}>
                        {jour}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View style={styles.champ}>
              <Text style={styles.label}>Bio</Text>
              <TextInput
                style={[styles.input, styles.inputMultiligne]}
                placeholder="Parlez de votre expérience, votre pédagogie..."
                placeholderTextColor="#8A8F98"
                value={bio}
                onChangeText={setBio}
                multiline
                numberOfLines={4}
              />
            </View>
          </View>
        )}

        {etape === 3 && (
          <View style={styles.section}>
            <Text style={styles.verificationTexte}>
              Les profils vérifiés inspirent confiance et apparaissent en priorité.
            </Text>

            <Pressable
              style={styles.verifCard}
              onPress={() => setPieceIdentiteAjoutee(true)}>
              <View style={styles.verifIcone}>
                <Ionicons name="card-outline" size={20} color="#B5502D" />
              </View>
              <View style={styles.verifInfo}>
                <Text style={styles.verifTitre}>Pièce d&apos;identité</Text>
                <Text style={styles.verifSousTitre}>
                  {pieceIdentiteAjoutee ? 'Ajoutée' : 'Obligatoire'}
                </Text>
              </View>
              <Ionicons
                name={pieceIdentiteAjoutee ? 'checkmark-circle' : 'add-circle-outline'}
                size={22}
                color={pieceIdentiteAjoutee ? '#2E7D5B' : '#B5502D'}
              />
            </Pressable>

            <Pressable style={styles.verifCard} onPress={() => setDiplomeAjoute(true)}>
              <View style={styles.verifIcone}>
                <Ionicons name="school-outline" size={20} color="#B5502D" />
              </View>
              <View style={styles.verifInfo}>
                <Text style={styles.verifTitre}>Diplôme</Text>
                <Text style={styles.verifSousTitre}>
                  {diplomeAjoute ? 'Ajouté' : 'Facultatif mais recommandé'}
                </Text>
              </View>
              <Ionicons
                name={diplomeAjoute ? 'checkmark-circle' : 'add-circle-outline'}
                size={22}
                color={diplomeAjoute ? '#2E7D5B' : '#B5502D'}
              />
            </Pressable>
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomBar}>
        {etape < 3 ? (
          <Pressable
            style={[
              styles.continuerButton,
              !(etape === 1 ? etape1Valide : etape2Valide) && styles.continuerButtonDesactive,
            ]}
            disabled={!(etape === 1 ? etape1Valide : etape2Valide)}
            onPress={() => setEtape(etape + 1)}>
            <Text style={styles.continuerText}>Continuer</Text>
          </Pressable>
        ) : (
          <Pressable
            style={[styles.continuerButton, !pieceIdentiteAjoutee && styles.continuerButtonDesactive]}
            disabled={!pieceIdentiteAjoutee}
            onPress={soumettre}>
            <Text style={styles.continuerText}>Soumettre pour validation</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
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
  progressBar: {
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#B5502D',
  },
  progressSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D98F6F',
  },
  progressSegmentActif: {
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  etapeLabel: {
    fontSize: 13,
    color: '#8A8F98',
    fontWeight: '600',
  },
  section: {
    gap: 16,
  },
  champ: {
    gap: 8,
  },
  label: {
    fontSize: 14,
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
  },
  inputMultiligne: {
    textAlignVertical: 'top',
    minHeight: 100,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  chipSelectionne: {
    backgroundColor: '#B5502D',
    borderColor: '#B5502D',
  },
  chipText: {
    fontSize: 14,
    color: '#4A4F58',
  },
  chipTextSelectionne: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  photoBouton: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    paddingVertical: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E1E6',
    borderStyle: 'dashed',
  },
  photoTexte: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8A8F98',
  },
  verificationTexte: {
    fontSize: 13,
    color: '#666B75',
    lineHeight: 18,
  },
  verifCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
  },
  verifIcone: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5E6DE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifInfo: {
    flex: 1,
  },
  verifTitre: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1D23',
  },
  verifSousTitre: {
    fontSize: 13,
    color: '#666B75',
    marginTop: 2,
  },
  bottomBar: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F3',
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
