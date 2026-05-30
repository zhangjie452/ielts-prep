// 口语 Part 1, Part 2, Part 3 题库
export const speakingTopics = {
  part1: [
    { id: "sp1_1", topic: "Home & Accommodation", questions: [
      "Do you live in a house or an apartment?",
      "What is your favorite room in your home?",
      "What would you like to change about your home?",
      "Do you plan to live there for a long time?",
    ]},
    { id: "sp1_2", topic: "Work / Study", questions: [
      "Do you work or are you a student?",
      "Why did you choose your current job/field of study?",
      "What do you enjoy most about your work/studies?",
      "Would you like to change your job/subject in the future?",
    ]},
    { id: "sp1_3", topic: "Hometown", questions: [
      "Where is your hometown?",
      "What is your hometown famous for?",
      "Has your hometown changed much in recent years?",
      "Do you think your hometown is a good place for young people?",
    ]},
    { id: "sp1_4", topic: "Daily Routine", questions: [
      "What is your typical daily routine?",
      "What time of day do you feel most productive?",
      "Has your routine changed compared to a few years ago?",
      "Do you prefer to plan your day or be spontaneous?",
    ]},
    { id: "sp1_5", topic: "Technology", questions: [
      "How often do you use your smartphone?",
      "What is your favorite app?",
      "Do you think technology makes life easier or more complicated?",
      "How has technology changed the way people work?",
    ]},
  ],
  part2: [
    {
      id: "sp2_1",
      topic: "Describe a book that you recently read",
      cueItems: [
        "What the book was about",
        "When and where you read it",
        "Why you chose to read it",
        "And explain how you felt about this book"
      ],
      sampleAnswer: `I'd like to talk about a fascinating book I recently read called "Sapiens: A Brief History of Humankind" by Yuval Noah Harari.

The book provides a sweeping overview of human history, from the emergence of Homo sapiens in Africa to the present day. It examines three major revolutions — the Cognitive Revolution, the Agricultural Revolution, and the Scientific Revolution — and how each fundamentally transformed human societies. What makes it unique is the author's ability to connect seemingly unrelated historical events and present thought-provoking perspectives on why our species came to dominate the planet.

I read this book over the course of about three weeks, mostly in the evenings before bed and during my commute on the subway. I chose it because several friends had recommended it, saying it changed the way they think about history and society. I was also curious because the book had been a bestseller in multiple countries.

What I found most compelling was Harari's argument that human beings' unique ability to believe in shared fictions — like money, nations, and laws — is what enables large-scale cooperation. This idea really made me reflect on how so many aspects of our lives are built on collective imagination rather than objective reality.

Overall, I found the book deeply thought-provoking. It expanded my understanding of history beyond mere chronology, offering a framework for thinking about where humanity might be heading. I would absolutely recommend it to anyone interested in understanding the broader forces that have shaped our world.`,
    },
    {
      id: "sp2_2",
      topic: "Describe a person who has influenced you",
      cueItems: [
        "Who this person is",
        "How you know this person",
        "What qualities this person has",
        "And explain how this person has influenced you"
      ],
      sampleAnswer: `The person I'd like to talk about is my high school English teacher, Mrs. Chen.

I first met her when I was in my second year of high school. At that time, I was quite shy and lacked confidence in speaking English, even though my reading and writing skills were decent. Mrs. Chen noticed this and made a conscious effort to encourage me to participate more actively in class discussions.

What sets Mrs. Chen apart is her genuine passion for teaching. Unlike many teachers who simply follow textbooks, she brought literature to life through animated storytelling and encouraged us to think critically rather than memorize answers. She was also remarkably patient — she never made students feel foolish for making mistakes, and instead would say that errors are "stepping stones to mastery."

The most significant way she influenced me was by instilling a love for the English language. She recommended books that were slightly above my level, which pushed me to improve. Beyond academics, she taught me the value of perseverance: she once told me that talent is common, but the willingness to work hard is rare. That advice has stayed with me throughout my university years and into my professional life.

Looking back, I realize that without her guidance, I might never have pursued further studies in English or developed the confidence to communicate with people from different cultures. She remains one of the most influential figures in my life.`,
    },
    {
      id: "sp2_3",
      topic: "Describe a memorable trip you have taken",
      cueItems: [
        "Where you went",
        "Who you went with",
        "What you did there",
        "And explain why this trip was memorable"
      ],
      sampleAnswer: `I'd like to describe a truly unforgettable trip I took to Zhangjiajie in Hunan Province about two years ago.

Zhangjiajie is famous for its towering sandstone pillars, which actually inspired the floating mountains in the movie Avatar. I went with two close friends during the National Day holiday. We had been planning this trip for months, and the anticipation made it even more exciting.

During our four-day stay, we visited the Zhangjiajie National Forest Park, where we hiked along the Golden Whip Stream and took the Bailong Elevator — which, by the way, is the world's tallest outdoor elevator, built into the side of a cliff. The most breathtaking moment was standing on the glass skywalk at Tianmen Mountain: looking down through the transparent floor at a 1,400-meter drop was simultaneously terrifying and exhilarating.

What made this trip truly memorable, however, was not just the scenery but an unexpected encounter. On our last day, we got lost while hiking and were helped by a local elderly man who not only guided us back to the main trail but also invited us to his home for tea. He shared stories about growing up in the mountains and how tourism had transformed the region. This genuine human connection in an unfamiliar place left a deeper impression on me than any scenic view could.

The trip taught me that the best travel experiences often come from unplanned moments and the kindness of strangers. It remains one of my most cherished memories.`,
    },
  ],
  part3: [
    {
      id: "sp3_1",
      topic: "Education Systems",
      relatedTo: "Describe a person who has influenced you",
      questions: [
        "What qualities do you think make a good teacher?",
        "How has the role of teachers changed in the digital age?",
        "Do you think standardized testing is a fair way to assess students?",
        "Should education focus more on practical skills or academic knowledge?",
      ],
      sampleIdeas: {
        q1: "Patience, passion for subject, ability to inspire curiosity, empathy, adaptability. Not just knowledge transmission but mentorship. Active listening skills.",
        q2: "From 'sage on the stage' to 'guide on the side'. Digital tools supplement but do not replace human connection. Teachers now curate information, teach critical thinking, and provide emotional support.",
        q3: "Pros: objective, comparable, identifies gaps. Cons: teaching to the test, narrow curriculum, favors certain learning styles, creates anxiety. Finland model: minimal standardized testing yet high outcomes.",
        q4: "Balance needed. Academic foundations matter (critical thinking, literacy) but practical skills (communication, financial literacy, digital competence) are increasingly important for employability.",
      },
    },
    {
      id: "sp3_2",
      topic: "Travel & Culture",
      relatedTo: "Describe a memorable trip",
      questions: [
        "Why do you think people enjoy traveling?",
        "What are the negative impacts of mass tourism?",
        "How can countries preserve their cultural heritage while promoting tourism?",
        "Do you think virtual tourism could ever replace real travel?",
      ],
      sampleIdeas: {
        q1: "Novelty seeking, escape from routine, cultural curiosity, personal growth. Travel broadens perspective, builds adaptability, creates lasting memories. Social media has amplified this.",
        q2: "Environmental degradation, overcrowding (Venice, Barcelona), commercialization of local culture, rising living costs for locals, carbon footprint of air travel.",
        q3: "Sustainable tourism policies: visitor caps, heritage site preservation funds, community-based tourism that benefits locals, authentic cultural experiences vs. staged performances.",
        q4: "VR/AR can supplement (preview, education, accessibility for disabled/elderly) but cannot replicate sensory immersion: smells, tastes, spontaneous encounters, physical presence. Likely complementary, not substitutive.",
      },
    },
  ],
};

// Speaking tips
export const speakingTips = [
  {
    id: "st1", title: "Fluency & Coherence (FC)",
    detail: "Keep talking — silence kills your fluency score. Use fillers naturally: 'Well...', 'That's an interesting question...', 'Let me think...'. Connect ideas with discourse markers: 'Firstly... Additionally... On the other hand...'."
  },
  {
    id: "st2", title: "Lexical Resource (LR)",
    detail: "Show vocabulary range: instead of 'good' use 'beneficial / advantageous / favorable'. Use idiomatic expressions appropriately: 'a double-edged sword', 'the icing on the cake', 'every cloud has a silver lining'."
  },
  {
    id: "st3", title: "Grammar Range & Accuracy (GRA)",
    detail: "Use complex structures: conditionals ('If I had the chance, I would...'), passive voice, relative clauses, perfect tenses. Self-correct when you make an error — this actually demonstrates awareness."
  },
  {
    id: "st4", title: "Pronunciation",
    detail: "Not about accent — about clarity. Focus on: word stress (PHOtograph vs. phoTOgrapher), sentence stress, intonation, connected speech. Practice shadowing native speakers."
  },
  {
    id: "st5", title: "Part 2 Strategy",
    detail: "Use the 1-minute prep time wisely: write keywords only, not full sentences. Structure: Introduction → Point 1 → Point 2 → Point 3 → Conclusion/Feelings. Aim for 1:45-2:00 minutes. The examiner will stop you at 2 minutes."
  },
  {
    id: "st6", title: "Part 3 Strategy",
    detail: "These are abstract discussion questions. Use the A.R.E. formula: Answer directly → Reason/Explain → Example. Compare, speculate, and evaluate: 'In the past... but nowadays...', 'It depends on the context...'."
  },
];

// Band descriptors for speaking
export const speakingBandDescriptors = [
  { band: 6, fc: "Can keep going comprehensibly; some hesitation and repetition", lr: "Adequate range of vocabulary for familiar topics", gra: "Uses a mix of simple and complex forms; some errors", pr: "Can generally be understood; some mispronunciation" },
  { band: 7, fc: "Speaks at length without noticeable effort; some hesitation for language", lr: "Flexible use of vocabulary; some less common and idiomatic items", gra: "Produces frequent error-free sentences; good control", pr: "Good pronunciation; occasional errors in individual words" },
  { band: 8, fc: "Speaks fluently with only occasional repetition; develops topics coherently", lr: "Wide vocabulary resource; skillful use of uncommon items", gra: "Wide range of structures; majority error-free", pr: "Uses a wide range of pronunciation features; accent has minimal impact" },
];
