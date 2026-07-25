import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/screen-header';

const MENU = [
  { id: '1', label: 'Modifier le profil', icone: 'person-outline', bientot: true },
  { id: '2', label: 'Mes favoris', icone: 'heart-outline', route: '/mes-favoris' },
  { id: '3', label: 'Devenir professeur', icone: 'school-outline', route: '/devenir-professeur' },
  { id: '4', label: 'Mes cours', icone: 'book-outline', bientot: true },
  { id: '5', label: 'Paramètres', icone: 'settings-outline', bientot: true },
  { id: '6', label: 'Aide', icone: 'help-circle-outline', bientot: true },
  { id: '7', label: 'Déconnexion', icone: 'log-out-outline' },
] as const;

export default function ProfilScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title="Profil" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.identite}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AB</Text>
          </View>
          <Text style={styles.nom}>Aïcha Bamba</Text>
          <Text style={styles.email}>aicha.bamba@example.com</Text>
        </View>

        <View style={styles.menu}>
          {MENU.map((item) => {
            const contenu = (
              <>
                <Ionicons name={item.icone} size={20} color="#B5502D" />
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={18} color="#C0C4CC" />
              </>
            );
            if ('route' in item) {
              return (
                <Link key={item.id} href={item.route} asChild>
                  <Pressable style={styles.menuItem}>{contenu}</Pressable>
                </Link>
              );
            }
            if ('bientot' in item) {
              return (
                <Pressable
                  key={item.id}
                  style={styles.menuItem}
                  onPress={() =>
                    Alert.alert('Bientôt disponible', `« ${item.label} » arrive dans une prochaine étape.`)
                  }>
                  {contenu}
                </Pressable>
              );
            }
            return (
              <Pressable key={item.id} style={styles.menuItem}>
                {contenu}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 24,
    gap: 24,
  },
  identite: {
    alignItems: 'center',
    gap: 4,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#F5E6DE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#B5502D',
  },
  nom: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1D23',
  },
  email: {
    fontSize: 13,
    color: '#666B75',
  },
  menu: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F3',
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    color: '#1A1D23',
  },
});
