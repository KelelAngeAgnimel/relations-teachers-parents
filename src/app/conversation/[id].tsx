import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CONVERSATIONS } from '@/data/conversations';
import { PROFESSEURS } from '@/data/professeurs';

type Message = { id: string; texte: string; deMoi: boolean; heure: string };

export default function ConversationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const professeur = PROFESSEURS.find((prof) => prof.id === id);
  const conversation = CONVERSATIONS.find((conv) => conv.id === id);

  const [messages, setMessages] = useState<Message[]>(
    conversation ? [...conversation.messages] : [],
  );
  const [texte, setTexte] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  if (!professeur || !conversation) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.introuvable}>Conversation introuvable.</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.retourLien}>Retour</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  function envoyer() {
    if (texte.trim() === '') return;
    setMessages((actuels) => [
      ...actuels,
      { id: String(actuels.length + 1), texte: texte.trim(), deMoi: true, heure: 'Maintenant' },
    ]);
    setTexte('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <View style={[styles.avatar, { backgroundColor: professeur.couleur }]}>
          <Text style={styles.avatarText}>{professeur.nom.charAt(0)}</Text>
        </View>
        <Text style={styles.topBarTitre}>{professeur.nom}</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          ref={scrollRef}
          style={styles.scroll}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}>
          {messages.map((message) => (
            <View
              key={message.id}
              style={[styles.bulleWrapper, message.deMoi && styles.bulleWrapperMoi]}>
              <View style={[styles.bulle, message.deMoi ? styles.bulleMoi : styles.bulleAutre]}>
                <Text style={[styles.bulleTexte, message.deMoi && styles.bulleTexteMoi]}>
                  {message.texte}
                </Text>
              </View>
              <Text style={styles.heure}>{message.heure}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            placeholder="Écrire un message..."
            placeholderTextColor="#8A8F98"
            value={texte}
            onChangeText={setTexte}
            multiline
          />
          <Pressable style={styles.envoyerButton} onPress={envoyer}>
            <Ionicons name="send" size={18} color="#FFFFFF" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  flex: {
    flex: 1,
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
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  topBarTitre: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  scroll: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    gap: 12,
  },
  bulleWrapper: {
    alignSelf: 'flex-start',
    gap: 2,
    maxWidth: '80%',
  },
  bulleWrapperMoi: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  bulle: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
  },
  bulleAutre: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
  },
  bulleMoi: {
    backgroundColor: '#B5502D',
    borderBottomRightRadius: 4,
  },
  bulleTexte: {
    fontSize: 15,
    color: '#1A1D23',
  },
  bulleTexteMoi: {
    color: '#FFFFFF',
  },
  heure: {
    fontSize: 11,
    color: '#8A8F98',
    marginHorizontal: 4,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F3',
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    fontSize: 15,
    color: '#1A1D23',
    maxHeight: 100,
  },
  envoyerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#B5502D',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
