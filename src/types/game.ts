export type WordCategory = 'objects' | 'nature' | 'people_body' | 'hair' | 'appearance' | 'face';

export interface VocabularyItem {
  id: string;
  word: string;
  displayLabel: string; // e.g. "short (pencil)"
  targetConcept: string; // e.g. "pencil", "hair", "book", "tree", "people"
  category: WordCategory;
  categoryLabel: string;
  phonetic: string;
  phonics: string[]; // ['sh', 'or', 't'] or ['s', 'h', 'o', 'r', 't']
  meaning: string;
  sentence: string;
  pairId?: string; // Opposite pair word ID
  pairRelation?: string; // e.g. "opposite"
  funTip: string;
  colorTheme: {
    bg: string;
    border: string;
    badge: string;
    accent: string;
  };
}

export type AppMode = 'puzzle' | 'pk' | 'memory' | 'flashcard' | 'teacher';

export interface PKPlayerState {
  name: string;
  score: number;
  combo: number;
  lastAnswerCorrect?: boolean;
}
