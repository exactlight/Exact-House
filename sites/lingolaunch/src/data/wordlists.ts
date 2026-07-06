/*
 * Built-in ESL word lists for grades 3–8.
 *
 * Content rules that the tools depend on:
 *  - `example` is a single short sentence (5–10 words) that contains the
 *    term — Sentence Scramble splits it into tiles, so word order must be
 *    unambiguous when reassembled.
 *  - `definition` is written at a kid-friendly reading level.
 *  - Every list has at least 9 words so Bingo can fill a 3×3 card.
 */

export type PartOfSpeech =
  | "noun"
  | "verb"
  | "adjective"
  | "adverb"
  | "phrase";

export type Word = {
  term: string;
  pos: PartOfSpeech;
  definition: string;
  example: string;
  emoji: string;
};

export type GradeBand = "3–5" | "6–8";

export type WordList = {
  id: string;
  name: string;
  gradeBand: GradeBand;
  description: string;
  emoji: string;
  words: Word[];
};

export const builtinLists: WordList[] = [
  {
    id: "school-day",
    name: "My School Day",
    gradeBand: "3–5",
    description: "Everyday words for the classroom and school routines.",
    emoji: "🎒",
    words: [
      {
        term: "backpack",
        pos: "noun",
        definition: "A bag you wear on your back to carry your things.",
        example: "My backpack is full of books today.",
        emoji: "🎒",
      },
      {
        term: "homework",
        pos: "noun",
        definition: "School work you do at home.",
        example: "I finished my homework before dinner.",
        emoji: "📝",
      },
      {
        term: "recess",
        pos: "noun",
        definition: "A short break at school to play outside.",
        example: "We played soccer during recess today.",
        emoji: "⚽",
      },
      {
        term: "raise",
        pos: "verb",
        definition: "To lift something up, like your hand.",
        example: "Please raise your hand to ask a question.",
        emoji: "🙋",
      },
      {
        term: "borrow",
        pos: "verb",
        definition: "To use something that belongs to someone else for a short time.",
        example: "May I borrow a pencil from you?",
        emoji: "✏️",
      },
      {
        term: "cafeteria",
        pos: "noun",
        definition: "The big room at school where students eat lunch.",
        example: "The cafeteria smells like pizza today.",
        emoji: "🍕",
      },
      {
        term: "library",
        pos: "noun",
        definition: "A quiet place full of books you can borrow.",
        example: "We read stories in the library on Fridays.",
        emoji: "📖",
      },
      {
        term: "practice",
        pos: "verb",
        definition: "To do something many times so you get better at it.",
        example: "I practice reading English every night.",
        emoji: "🔁",
      },
      {
        term: "schedule",
        pos: "noun",
        definition: "A plan that shows what happens and when.",
        example: "Our schedule says math comes after lunch.",
        emoji: "🗓️",
      },
      {
        term: "partner",
        pos: "noun",
        definition: "A person you work or play with.",
        example: "Choose a partner for the reading game.",
        emoji: "🤝",
      },
    ],
  },
  {
    id: "feelings",
    name: "Feelings & Emotions",
    gradeBand: "3–5",
    description: "Words to say how you feel — and ask how others feel.",
    emoji: "😊",
    words: [
      {
        term: "proud",
        pos: "adjective",
        definition: "Happy about something you did well.",
        example: "I felt proud after my speech.",
        emoji: "🏆",
      },
      {
        term: "nervous",
        pos: "adjective",
        definition: "A little scared about what might happen.",
        example: "She was nervous before the big test.",
        emoji: "😬",
      },
      {
        term: "excited",
        pos: "adjective",
        definition: "Very happy about something that is coming.",
        example: "We are excited about the field trip.",
        emoji: "🤩",
      },
      {
        term: "lonely",
        pos: "adjective",
        definition: "Sad because you are alone.",
        example: "He felt lonely at his new school.",
        emoji: "😔",
      },
      {
        term: "surprised",
        pos: "adjective",
        definition: "Feeling shocked by something you did not expect.",
        example: "I was surprised by the birthday party.",
        emoji: "😮",
      },
      {
        term: "calm",
        pos: "adjective",
        definition: "Quiet, relaxed, and not worried.",
        example: "Take a deep breath and stay calm.",
        emoji: "😌",
      },
      {
        term: "jealous",
        pos: "adjective",
        definition: "Wanting something that another person has.",
        example: "My brother was jealous of my new bike.",
        emoji: "😒",
      },
      {
        term: "grateful",
        pos: "adjective",
        definition: "Thankful for something good.",
        example: "I am grateful for my kind teacher.",
        emoji: "🙏",
      },
      {
        term: "confused",
        pos: "adjective",
        definition: "Not able to understand something.",
        example: "The map made me feel confused.",
        emoji: "😵",
      },
      {
        term: "brave",
        pos: "adjective",
        definition: "Not afraid to do something hard or scary.",
        example: "The brave girl spoke in front of everyone.",
        emoji: "🦁",
      },
    ],
  },
  {
    id: "food",
    name: "Food & Mealtime",
    gradeBand: "3–5",
    description: "Talking about food, taste, and eating together.",
    emoji: "🍎",
    words: [
      {
        term: "delicious",
        pos: "adjective",
        definition: "Tasting very, very good.",
        example: "This soup is absolutely delicious!",
        emoji: "😋",
      },
      {
        term: "vegetable",
        pos: "noun",
        definition: "A plant we eat, like carrots or broccoli.",
        example: "My favorite vegetable is sweet corn.",
        emoji: "🥕",
      },
      {
        term: "breakfast",
        pos: "noun",
        definition: "The first meal of the day, in the morning.",
        example: "I ate eggs and toast for breakfast.",
        emoji: "🍳",
      },
      {
        term: "thirsty",
        pos: "adjective",
        definition: "Needing something to drink.",
        example: "Running outside made me very thirsty.",
        emoji: "🥤",
      },
      {
        term: "recipe",
        pos: "noun",
        definition: "Steps that tell you how to cook something.",
        example: "Grandma taught me her soup recipe.",
        emoji: "📜",
      },
      {
        term: "slice",
        pos: "noun",
        definition: "One flat piece cut from something bigger.",
        example: "Can I have a slice of watermelon?",
        emoji: "🍉",
      },
      {
        term: "spicy",
        pos: "adjective",
        definition: "Having a hot, strong taste, like chili.",
        example: "The salsa was too spicy for me.",
        emoji: "🌶️",
      },
      {
        term: "snack",
        pos: "noun",
        definition: "A small bit of food between meals.",
        example: "Apples make a healthy afternoon snack.",
        emoji: "🍏",
      },
      {
        term: "share",
        pos: "verb",
        definition: "To give part of what you have to others.",
        example: "Let's share these crackers with everyone.",
        emoji: "🤲",
      },
      {
        term: "sour",
        pos: "adjective",
        definition: "Tasting sharp, like a lemon.",
        example: "The sour candy made my face scrunch.",
        emoji: "🍋",
      },
    ],
  },
  {
    id: "weather",
    name: "Weather & Seasons",
    gradeBand: "3–5",
    description: "Describing the sky, the seasons, and what to wear.",
    emoji: "🌦️",
    words: [
      {
        term: "cloudy",
        pos: "adjective",
        definition: "When the sky is covered with clouds.",
        example: "It was too cloudy to see the sun.",
        emoji: "☁️",
      },
      {
        term: "storm",
        pos: "noun",
        definition: "Strong wind and rain, sometimes with thunder.",
        example: "The storm knocked over our small tree.",
        emoji: "⛈️",
      },
      {
        term: "freezing",
        pos: "adjective",
        definition: "Extremely cold.",
        example: "Wear your gloves — it's freezing outside!",
        emoji: "🥶",
      },
      {
        term: "autumn",
        pos: "noun",
        definition: "The season when leaves fall; also called fall.",
        example: "In autumn the leaves turn orange.",
        emoji: "🍂",
      },
      {
        term: "breeze",
        pos: "noun",
        definition: "A soft, gentle wind.",
        example: "A cool breeze blew through the window.",
        emoji: "🍃",
      },
      {
        term: "forecast",
        pos: "noun",
        definition: "A guess about tomorrow's weather.",
        example: "The forecast says rain on Saturday.",
        emoji: "📺",
      },
      {
        term: "puddle",
        pos: "noun",
        definition: "A small pool of rainwater on the ground.",
        example: "My boots splashed in a big puddle.",
        emoji: "💧",
      },
      {
        term: "sunny",
        pos: "adjective",
        definition: "Bright with sunshine.",
        example: "We had a picnic on a sunny day.",
        emoji: "☀️",
      },
      {
        term: "temperature",
        pos: "noun",
        definition: "How hot or cold something is.",
        example: "The temperature dropped fast last night.",
        emoji: "🌡️",
      },
      {
        term: "rainbow",
        pos: "noun",
        definition: "A curve of colors in the sky after rain.",
        example: "A rainbow appeared after the morning rain.",
        emoji: "🌈",
      },
    ],
  },
  {
    id: "places",
    name: "Places in Town",
    gradeBand: "3–5",
    description: "Getting around the neighborhood and asking for directions.",
    emoji: "🏙️",
    words: [
      {
        term: "neighborhood",
        pos: "noun",
        definition: "The area around your home.",
        example: "Kids play outside in my neighborhood.",
        emoji: "🏘️",
      },
      {
        term: "corner",
        pos: "noun",
        definition: "The place where two streets meet.",
        example: "The bakery is on the corner.",
        emoji: "📍",
      },
      {
        term: "across",
        pos: "phrase",
        definition: "On the other side of something.",
        example: "The park is across the street.",
        emoji: "↔️",
      },
      {
        term: "hospital",
        pos: "noun",
        definition: "A place where doctors help sick people.",
        example: "The hospital is next to the school.",
        emoji: "🏥",
      },
      {
        term: "museum",
        pos: "noun",
        definition: "A building with interesting things to look at.",
        example: "We saw dinosaur bones at the museum.",
        emoji: "🦖",
      },
      {
        term: "playground",
        pos: "noun",
        definition: "An outdoor place with swings and slides.",
        example: "Meet me at the playground after school.",
        emoji: "🛝",
      },
      {
        term: "bakery",
        pos: "noun",
        definition: "A shop that makes and sells bread and cakes.",
        example: "The bakery sells warm bread every morning.",
        emoji: "🥖",
      },
      {
        term: "traffic",
        pos: "noun",
        definition: "All the cars moving on a road.",
        example: "Heavy traffic made the bus late.",
        emoji: "🚗",
      },
      {
        term: "between",
        pos: "phrase",
        definition: "In the middle of two things.",
        example: "The bank is between two tall buildings.",
        emoji: "🔀",
      },
      {
        term: "crosswalk",
        pos: "noun",
        definition: "The striped place where people cross the street.",
        example: "Always cross at the crosswalk.",
        emoji: "🚸",
      },
    ],
  },
  {
    id: "academic-verbs",
    name: "Academic Power Verbs",
    gradeBand: "6–8",
    description: "Verbs that show up in directions, tests, and essays.",
    emoji: "🧠",
    words: [
      {
        term: "analyze",
        pos: "verb",
        definition: "To look at something carefully, piece by piece.",
        example: "We will analyze the poem line by line.",
        emoji: "🔍",
      },
      {
        term: "compare",
        pos: "verb",
        definition: "To show how two things are alike and different.",
        example: "Compare the two characters in the story.",
        emoji: "⚖️",
      },
      {
        term: "summarize",
        pos: "verb",
        definition: "To retell only the most important parts.",
        example: "Summarize the chapter in three sentences.",
        emoji: "📋",
      },
      {
        term: "predict",
        pos: "verb",
        definition: "To make a smart guess about what happens next.",
        example: "Predict how the experiment will end.",
        emoji: "🔮",
      },
      {
        term: "support",
        pos: "verb",
        definition: "To back up an idea with proof or examples.",
        example: "Support your answer with evidence from the text.",
        emoji: "🧱",
      },
      {
        term: "define",
        pos: "verb",
        definition: "To tell exactly what a word means.",
        example: "Define the word before you use it.",
        emoji: "📖",
      },
      {
        term: "explain",
        pos: "verb",
        definition: "To make an idea clear with details.",
        example: "Explain your thinking to your partner.",
        emoji: "💡",
      },
      {
        term: "identify",
        pos: "verb",
        definition: "To find and name something.",
        example: "Identify the main idea of the paragraph.",
        emoji: "🎯",
      },
      {
        term: "conclude",
        pos: "verb",
        definition: "To decide something after looking at the facts.",
        example: "What can you conclude from the graph?",
        emoji: "🏁",
      },
      {
        term: "revise",
        pos: "verb",
        definition: "To change your writing to make it better.",
        example: "Revise your essay after reading my comments.",
        emoji: "✍️",
      },
    ],
  },
  {
    id: "idioms",
    name: "Idioms & Expressions",
    gradeBand: "6–8",
    description: "Sayings that don't mean what the words say — tricky and fun!",
    emoji: "🗣️",
    words: [
      {
        term: "piece of cake",
        pos: "phrase",
        definition: "Something very easy to do.",
        example: "That math quiz was a piece of cake.",
        emoji: "🍰",
      },
      {
        term: "break the ice",
        pos: "phrase",
        definition: "To help people feel comfortable when they first meet.",
        example: "A funny game helped break the ice.",
        emoji: "🧊",
      },
      {
        term: "hit the books",
        pos: "phrase",
        definition: "To study hard.",
        example: "I need to hit the books tonight.",
        emoji: "📚",
      },
      {
        term: "under the weather",
        pos: "phrase",
        definition: "Feeling a little sick.",
        example: "Maria stayed home because she felt under the weather.",
        emoji: "🤒",
      },
      {
        term: "cost an arm and a leg",
        pos: "phrase",
        definition: "To be very expensive.",
        example: "Those new sneakers cost an arm and a leg.",
        emoji: "💸",
      },
      {
        term: "on the same page",
        pos: "phrase",
        definition: "Agreeing and understanding each other.",
        example: "Let's make sure we are on the same page.",
        emoji: "🤝",
      },
      {
        term: "butterflies in my stomach",
        pos: "phrase",
        definition: "A nervous, fluttery feeling.",
        example: "I had butterflies in my stomach before the play.",
        emoji: "🦋",
      },
      {
        term: "raining cats and dogs",
        pos: "phrase",
        definition: "Raining very hard.",
        example: "Take an umbrella — it's raining cats and dogs!",
        emoji: "🐈",
      },
      {
        term: "in a nutshell",
        pos: "phrase",
        definition: "Said in a very short, simple way.",
        example: "In a nutshell, the field trip is canceled.",
        emoji: "🥜",
      },
      {
        term: "hang in there",
        pos: "phrase",
        definition: "Keep trying and don't give up.",
        example: "Hang in there — the test is almost over.",
        emoji: "💪",
      },
    ],
  },
  {
    id: "story-elements",
    name: "Story Elements",
    gradeBand: "6–8",
    description: "The building blocks of every story you read or write.",
    emoji: "📕",
    words: [
      {
        term: "character",
        pos: "noun",
        definition: "A person or animal in a story.",
        example: "The main character is a clever fox.",
        emoji: "🦊",
      },
      {
        term: "setting",
        pos: "noun",
        definition: "Where and when a story happens.",
        example: "The setting is a village long ago.",
        emoji: "🏞️",
      },
      {
        term: "plot",
        pos: "noun",
        definition: "The events that happen in a story.",
        example: "The plot has a surprising twist.",
        emoji: "🎢",
      },
      {
        term: "conflict",
        pos: "noun",
        definition: "The problem a character must face.",
        example: "The conflict begins when the map disappears.",
        emoji: "⚔️",
      },
      {
        term: "dialogue",
        pos: "noun",
        definition: "The words characters say to each other.",
        example: "The dialogue between the friends was funny.",
        emoji: "💬",
      },
      {
        term: "narrator",
        pos: "noun",
        definition: "The voice that tells the story.",
        example: "The narrator knows every character's secret.",
        emoji: "🎙️",
      },
      {
        term: "theme",
        pos: "noun",
        definition: "The big idea or lesson of a story.",
        example: "The theme of the book is friendship.",
        emoji: "🌟",
      },
      {
        term: "climax",
        pos: "noun",
        definition: "The most exciting moment of the story.",
        example: "The climax happens during the storm at sea.",
        emoji: "🌊",
      },
      {
        term: "resolution",
        pos: "noun",
        definition: "How the story's problem gets solved.",
        example: "The resolution brings the family back together.",
        emoji: "🧩",
      },
      {
        term: "point of view",
        pos: "phrase",
        definition: "Who is telling the story and how they see it.",
        example: "The story is told from the dog's point of view.",
        emoji: "👀",
      },
    ],
  },
  {
    id: "science-talk",
    name: "Science Talk",
    gradeBand: "6–8",
    description: "Words for labs, experiments, and explaining the natural world.",
    emoji: "🔬",
    words: [
      {
        term: "hypothesis",
        pos: "noun",
        definition: "A smart guess you can test with an experiment.",
        example: "My hypothesis is that plants grow faster in sunlight.",
        emoji: "🌱",
      },
      {
        term: "observe",
        pos: "verb",
        definition: "To watch something carefully.",
        example: "Observe the ice cube as it melts.",
        emoji: "👁️",
      },
      {
        term: "evidence",
        pos: "noun",
        definition: "Facts that show something is true.",
        example: "The footprints were evidence of a raccoon.",
        emoji: "🐾",
      },
      {
        term: "experiment",
        pos: "noun",
        definition: "A careful test to learn something new.",
        example: "Our experiment used vinegar and baking soda.",
        emoji: "🧪",
      },
      {
        term: "measure",
        pos: "verb",
        definition: "To find the size or amount of something.",
        example: "Measure the water before you pour it.",
        emoji: "📏",
      },
      {
        term: "energy",
        pos: "noun",
        definition: "The power to move or change things.",
        example: "The sun gives energy to growing plants.",
        emoji: "⚡",
      },
      {
        term: "gravity",
        pos: "noun",
        definition: "The force that pulls things toward the ground.",
        example: "Gravity pulled the apple to the ground.",
        emoji: "🍎",
      },
      {
        term: "dissolve",
        pos: "verb",
        definition: "To mix into a liquid and seem to disappear.",
        example: "Watch the sugar dissolve in warm water.",
        emoji: "🥄",
      },
      {
        term: "temperature",
        pos: "noun",
        definition: "How hot or cold something is.",
        example: "Record the temperature every ten minutes.",
        emoji: "🌡️",
      },
      {
        term: "conclusion",
        pos: "noun",
        definition: "What you decide after studying the results.",
        example: "Our conclusion matched the class prediction.",
        emoji: "✅",
      },
    ],
  },
];

/*
 * Conversation prompt cards for pair/group speaking practice.
 * "starter" cards suit newcomers; "stretch" cards push for longer answers.
 */
export type TalkPrompt = {
  text: string;
  emoji: string;
  level: "starter" | "stretch";
};

export const talkPrompts: TalkPrompt[] = [
  { text: "What is your favorite food? Describe how it tastes.", emoji: "🍜", level: "starter" },
  { text: "Who lives in your home? Tell us about one person.", emoji: "🏠", level: "starter" },
  { text: "What do you like to do after school?", emoji: "⚽", level: "starter" },
  { text: "Describe the weather today using three words.", emoji: "🌤️", level: "starter" },
  { text: "What animal would you like as a pet? Why?", emoji: "🐢", level: "starter" },
  { text: "What is your favorite place in this city?", emoji: "🗺️", level: "starter" },
  { text: "Name three things in your backpack right now.", emoji: "🎒", level: "starter" },
  { text: "What did you eat for breakfast this morning?", emoji: "🥞", level: "starter" },
  { text: "Which season do you like best? Why?", emoji: "❄️", level: "starter" },
  { text: "What game do you play with your friends?", emoji: "🎮", level: "starter" },
  { text: "What is one word from your first language you love? Teach it to us!", emoji: "🌍", level: "starter" },
  { text: "Would you rather fly or be invisible? Why?", emoji: "🦸", level: "starter" },
  { text: "If you could visit any country, where would you go and what would you do there?", emoji: "✈️", level: "stretch" },
  { text: "Tell us about a time you helped someone. What happened?", emoji: "🤝", level: "stretch" },
  { text: "If you opened a restaurant, what would you serve and what would you name it?", emoji: "👨‍🍳", level: "stretch" },
  { text: "What is something that is different between school here and school in another country you know?", emoji: "🏫", level: "stretch" },
  { text: "Describe your perfect Saturday from morning to night.", emoji: "🌞", level: "stretch" },
  { text: "If animals could talk, which one would be the funniest? What would it say?", emoji: "🦜", level: "stretch" },
  { text: "What would you invent to make school easier? How would it work?", emoji: "🤖", level: "stretch" },
  { text: "Tell the story of your name. Who chose it? Does it mean something?", emoji: "📛", level: "stretch" },
  { text: "If you could have dinner with anyone, real or from a story, who would it be?", emoji: "🍽️", level: "stretch" },
  { text: "What is a tradition your family celebrates? Describe it.", emoji: "🎉", level: "stretch" },
  { text: "You find a mysterious door in the school library. What is behind it?", emoji: "🚪", level: "stretch" },
  { text: "What advice would you give to a new student on their first day?", emoji: "💌", level: "stretch" },
];

export function getListById(
  id: string,
  customLists: WordList[] = [],
): WordList | undefined {
  return (
    builtinLists.find((list) => list.id === id) ??
    customLists.find((list) => list.id === id)
  );
}

/* Deterministic Word of the Day: same word for everyone on a given date. */
export function wordOfTheDay(date: Date): { word: Word; list: WordList } {
  const pool: { word: Word; list: WordList }[] = builtinLists.flatMap((list) =>
    list.words.map((word) => ({ word, list })),
  );
  const daysSinceEpoch = Math.floor(date.getTime() / 86_400_000);
  // Stride by a prime so consecutive days hop across lists instead of
  // walking through one list at a time.
  const index = (daysSinceEpoch * 37) % pool.length;
  return pool[index];
}
