/*
 * WIDA-aligned speaking assessment content.
 *
 * The rubric descriptors below are teacher-friendly paraphrases of the
 * WIDA Speaking Rubric's three criteria across the six English language
 * proficiency levels. This module is a classroom progress-monitoring
 * tool — it does not produce official ACCESS for ELLs scores.
 */

export const widaLevels = [
  { level: 1, name: "Entering" },
  { level: 2, name: "Emerging" },
  { level: 3, name: "Developing" },
  { level: 4, name: "Expanding" },
  { level: 5, name: "Bridging" },
  { level: 6, name: "Reaching" },
] as const;

export type WidaLevel = (typeof widaLevels)[number]["level"];

export type RubricCriterion = {
  key: "complexity" | "vocabulary" | "control";
  name: string;
  question: string;
  descriptors: Record<WidaLevel, string>;
};

export const speakingRubric: RubricCriterion[] = [
  {
    key: "complexity",
    name: "Linguistic Complexity",
    question: "How much language does the student produce, and how is it organized?",
    descriptors: {
      1: "Single words, set phrases, or memorized chunks of language.",
      2: "Phrases and short sentences, often following formulaic patterns.",
      3: "Simple and some expanded sentences; emerging detail in responses.",
      4: "A variety of sentence lengths and structures; ideas start to connect across sentences.",
      5: "Multiple complex sentences; organized, cohesive expression of ideas.",
      6: "Extended, well-organized speech comparable to English-proficient peers.",
    },
  },
  {
    key: "vocabulary",
    name: "Vocabulary Usage",
    question: "How specific and varied are the words the student chooses?",
    descriptors: {
      1: "Highest-frequency everyday words; may rely on gestures or the home language.",
      2: "General everyday vocabulary plus some social and school words.",
      3: "General vocabulary and some content words; may pause to search for words.",
      4: "Specific and some technical content-area words; word choice usually fits.",
      5: "Technical, content-area vocabulary; precise word choice for the topic.",
      6: "Rich, precise vocabulary comparable to English-proficient peers, including idioms.",
    },
  },
  {
    key: "control",
    name: "Language Control",
    question: "How clearly does the message come through despite errors?",
    descriptors: {
      1: "Individual words may be understandable, but connected meaning needs strong support.",
      2: "Errors often get in the way of meaning; simple structures partly controlled.",
      3: "Everyday meaning comes through; errors may block newer or more complex ideas.",
      4: "Meaning is generally clear; errors rarely interfere and some self-correction appears.",
      5: "Errors are minor and infrequent; speech approaches English-proficient peers.",
      6: "Fluency and accuracy comparable to English-proficient peers.",
    },
  },
];

/*
 * Speaking task prompts by WIDA grade cluster, modeled on the task types
 * students meet on the speaking test: recount/describe, explain, and
 * argue/justify. Each ramps up expected language.
 */
export type SpeakingTask = {
  cluster: "2–3" | "4–5" | "6–8";
  type: "Recount" | "Explain" | "Argue";
  prompt: string;
  emoji: string;
};

export const speakingTasks: SpeakingTask[] = [
  {
    cluster: "2–3",
    type: "Recount",
    prompt: "Tell me about what you did at recess today. What happened first, next, and last?",
    emoji: "⚽",
  },
  {
    cluster: "2–3",
    type: "Recount",
    prompt: "Describe your favorite animal. What does it look like, and what can it do?",
    emoji: "🐘",
  },
  {
    cluster: "2–3",
    type: "Explain",
    prompt: "How do you get ready for school in the morning? Tell me the steps.",
    emoji: "🌅",
  },
  {
    cluster: "2–3",
    type: "Argue",
    prompt: "Which is better: summer or winter? Tell me why you think so.",
    emoji: "☀️",
  },
  {
    cluster: "4–5",
    type: "Recount",
    prompt: "Tell me about a time you learned something difficult. What happened, and how did you feel?",
    emoji: "🧗",
  },
  {
    cluster: "4–5",
    type: "Explain",
    prompt: "Explain how to play a game you know well, so that someone who has never played could try it.",
    emoji: "🎲",
  },
  {
    cluster: "4–5",
    type: "Explain",
    prompt: "Look at the two pictures your teacher shows you. Explain how they are alike and how they are different.",
    emoji: "🖼️",
  },
  {
    cluster: "4–5",
    type: "Argue",
    prompt: "Should students have homework every day? Give at least two reasons for your opinion.",
    emoji: "📝",
  },
  {
    cluster: "6–8",
    type: "Recount",
    prompt: "Describe an important event from your life and explain why it mattered to you.",
    emoji: "🌟",
  },
  {
    cluster: "6–8",
    type: "Explain",
    prompt: "Explain a process you learned about in science or math class. What are the steps, and why do they work?",
    emoji: "🔬",
  },
  {
    cluster: "6–8",
    type: "Argue",
    prompt: "Your school wants to ban phones during lunch. Do you agree or disagree? Support your position with reasons and examples.",
    emoji: "📱",
  },
  {
    cluster: "6–8",
    type: "Argue",
    prompt: "Is it better to work alone or in a group on a school project? Defend your answer with evidence from your experience.",
    emoji: "🤝",
  },
];

export type RubricScore = {
  complexity: WidaLevel;
  vocabulary: WidaLevel;
  control: WidaLevel;
  notes: string;
  scoredAt: number;
};

export function levelName(level: WidaLevel): string {
  return widaLevels.find((l) => l.level === level)?.name ?? String(level);
}

/* Suggested overall level: average of the three criteria, rounded down —
 * the teacher always has the final say in their notes. */
export function suggestedOverall(score: {
  complexity: WidaLevel;
  vocabulary: WidaLevel;
  control: WidaLevel;
}): number {
  return Math.floor(
    ((score.complexity + score.vocabulary + score.control) / 3) * 10,
  ) / 10;
}
