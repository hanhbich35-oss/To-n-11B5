export type QuestionType = 'multiple' | 'boolean';

export interface Question {
  id: number;
  type: QuestionType;
  text: string;
  context?: string;
  imageUrl?: string;
  customComponent?: string;
  options?: string[];
  correctAnswer: any; // string index for multiple, boolean for boolean
  explanation?: string;
}

export interface QuizResult {
  userName: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  timeSpent: number;
}
