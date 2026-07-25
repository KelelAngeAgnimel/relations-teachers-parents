export const CONVERSATIONS = [
  {
    id: '1',
    messages: [
      {
        id: '1',
        texte: 'Bonjour, je cherche un prof de maths pour mon fils en 3e.',
        deMoi: true,
        heure: '09:58',
      },
      {
        id: '2',
        texte: 'Bonjour ! Avec plaisir, quel est son niveau actuel ?',
        deMoi: false,
        heure: '10:05',
      },
      {
        id: '3',
        texte: 'Il a des difficultés en algèbre, mais ça va sinon.',
        deMoi: true,
        heure: '10:12',
      },
      {
        id: '4',
        texte: "D'accord, à demain 14h !",
        deMoi: false,
        heure: '10:24',
      },
    ],
  },
  {
    id: '2',
    messages: [
      {
        id: '1',
        texte: "Merci pour le cours de physique aujourd'hui !",
        deMoi: true,
        heure: 'Hier, 18:02',
      },
      {
        id: '2',
        texte: "Avec plaisir, continuez à réviser les exercices qu'on a vus.",
        deMoi: false,
        heure: 'Hier, 18:10',
      },
    ],
  },
  {
    id: '3',
    messages: [
      {
        id: '1',
        texte: 'Bonjour, êtes-vous disponible mercredi pour un cours de français ?',
        deMoi: false,
        heure: 'lun. 09:15',
      },
    ],
  },
] as const;
