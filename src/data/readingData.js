// 阅读 Section 数据（模拟剑桥雅思真题）
export const readingPassages = [
  {
    id: "r1",
    title: "Passage 1: The History of Tea",
    description: "人类饮茶史——从中国起源到全球普及。题型：True/False/Not Given + 填空题",
    difficulty: "easy",
    wordCount: 870,
    passage: `Tea is one of the world's most popular beverages, second only to water. Its story begins in China around 2737 BCE, when, according to legend, Emperor Shen Nong discovered tea when leaves from a wild tree blew into his pot of boiling water. The resulting infusion was refreshing and aromatic, and tea drinking quickly spread among the Chinese aristocracy.

By the Tang Dynasty (618–907 CE), tea had become a staple of Chinese daily life. The famous tea master Lu Yu wrote "The Classic of Tea" (Cha Jing), which detailed the cultivation, preparation, and appreciation of tea. Tea culture then spread to Japan in the 9th century, where it evolved into the elaborate Japanese tea ceremony, chanoyu.

European contact with tea began in the early 16th century through Portuguese traders. However, it was the Dutch who first brought tea to Europe in large quantities in 1610. Tea became wildly popular in Britain after Charles II's Portuguese queen, Catherine of Braganza, introduced it to the English court in 1662. The British East India Company monopolized the tea trade, leading to significant historical events including the Boston Tea Party of 1773.

Modern tea production is dominated by China and India, which together account for over 50% of global output. There are six main types: white, green, yellow, oolong, black, and pu'erh, all derived from the same plant, Camellia sinensis. The differences arise from the processing methods, particularly the degree of oxidation.

Recent scientific research has confirmed many of tea's traditional health benefits. Polyphenols in tea, especially catechins, have been shown to reduce inflammation, lower cholesterol, and improve cardiovascular health. A 2022 meta-analysis published in the European Journal of Epidemiology found that regular tea consumption was associated with a 20% lower risk of stroke and a 15% lower risk of all-cause mortality.`,

    questions: [
      { id: "r1q1", type: "tfng", question: "Tea was discovered by accident.", answer: "TRUE", explanation: "据传说，茶叶意外落入神农的沸水中被发现" },
      { id: "r1q2", type: "tfng", question: "The Dutch were the first Europeans to trade tea.", answer: "FALSE", explanation: "文中提到Portuguese最早接触茶，Dutch只是第一个大量带入欧洲" },
      { id: "r1q3", type: "tfng", question: "The British East India Company was founded in the 18th century.", answer: "NOT GIVEN", explanation: "文中提到该公司的垄断角色，但未提供成立时间" },
      { id: "r1q4", type: "tfng", question: "Green tea and black tea come from different plants.", answer: "FALSE", explanation: "所有六种茶都来自同一种植物 Camellia sinensis" },
      { id: "r1q5", type: "fill", question: "Lu Yu's book on tea was titled \"The Classic of Tea\" or ________ in Chinese.", answer: "Cha Jing", hint: "注意大小写和拼音" },
      { id: "r1q6", type: "fill", question: "Regular tea drinking was linked to a ________% lower risk of stroke.", answer: "20", hint: "数字题，从最后一段直接提取" },
      { id: "r1q7", type: "fill", question: "The tea ceremony in Japan is called ________.", answer: "chanoyu", hint: "注意拼写" },
      { id: "r1q8", type: "choice", question: "What is the main factor that differentiates tea types?",
        options: ["A. Plant variety", "B. Oxidation degree", "C. Growing altitude", "D. Harvest season"],
        answer: "B" },
    ],
  },
  {
    id: "r2",
    title: "Passage 2: Urban Bees and Biodiversity",
    description: "城市养蜂热潮的生态反思。题型：Matching Headings + 多选题",
    difficulty: "medium",
    wordCount: 750,
    passage: `In recent years, urban beekeeping has surged in popularity across major cities worldwide. From London to New York, from Berlin to Tokyo, rooftop apiaries have become a symbol of environmental consciousness. However, a growing body of scientific evidence suggests that the unchecked proliferation of urban honeybees may paradoxically harm native wild bee populations and urban biodiversity.

Wild bees — including bumblebees, mason bees, and mining bees — are the unsung heroes of pollination. Unlike domesticated honeybees (Apis mellifera), which are managed in hives by beekeepers, wild bees are solitary creatures that nest in soil, dead wood, or hollow plant stems. Research indicates that wild bees are often more efficient pollinators than honeybees, and some crops, such as tomatoes and blueberries, depend almost exclusively on them.

The fundamental problem is competition. A single honeybee hive contains 30,000 to 50,000 individuals, creating an enormous demand for nectar and pollen. In cities where green spaces are already fragmented, this can lead to resource depletion for wild species. A 2023 study at the University of Berlin found that in neighborhoods with high hive density (more than 10 hives per square kilometer), wild bee diversity declined by 42% over a five-year period.

Moreover, honeybees can transmit diseases to wild populations. Deformed Wing Virus (DWV) and Nosema ceranae, both common in managed hives, have been detected in wild bumblebee populations with increasing frequency. The close proximity of commercial and wild bees in urban settings accelerates this pathogen spillover.

Conservationists are now calling for "bee-conscious" urban planning. Recommendations include limiting hive density, planting diverse native flora to support all pollinator species, and creating "bee hotels" — artificial nesting structures specifically designed for solitary bees. The goal is not to eliminate urban beekeeping but to integrate it within a broader pollinator conservation strategy.`,

    questions: [
      { id: "r2q1", type: "choice", question: "What is the main argument of this passage?",
        options: [
          "A. Urban beekeeping should be banned entirely",
          "B. Honeybees are more efficient than wild bees",
          "C. Urban honeybees may damage biodiversity",
          "D. Cities lack enough flowers for all bees"
        ],
        answer: "C"
      },
      { id: "r2q2", type: "fill", question: "Wild bees differ from honeybees in that they are ________.", answer: "solitary", hint: "从第二段提取形容词" },
      { id: "r2q3", type: "fill", question: "At high hive density (>10/km²), wild bee diversity dropped by ________% in five years.", answer: "42", hint: "数字题" },
      { id: "r2q4", type: "tfng", question: "Solitary bees live in large colonies like honeybees.", answer: "FALSE", explanation: "文中明确说wild bees are solitary" },
      { id: "r2q5", type: "tfng", question: "Deformed Wing Virus only affects honeybees.", answer: "FALSE", explanation: "文中提到DWV已在野生大黄蜂种群中检测到" },
      { id: "r2q6", type: "choice", question: "Which crop depends almost exclusively on wild bees?",
        options: ["A. Wheat", "B. Tomatoes", "C. Rice", "D. Apples"], answer: "B" },
      { id: "r2q7", type: "fill", question: "Artificial nesting structures for solitary bees are called \"bee ________\".", answer: "hotels", hint: "最后一段直接提取" },
    ],
  },
  {
    id: "r3",
    title: "Passage 3: The Psychology of Procrastination",
    description: "学术文章——拖延症神经科学。题型：Summary填空题 + Yes/No/Not Given",
    difficulty: "hard",
    wordCount: 820,
    passage: `Procrastination is universally experienced yet poorly understood. The conventional wisdom holds that procrastination is a time-management problem; that lazy people simply lack the discipline to start work early. Neuroscience research over the past two decades has thoroughly dismantled this view. Procrastination, it turns out, is a complex emotional regulation failure rooted in the architecture of the brain.

At the heart of the issue lies the conflict between the limbic system and the prefrontal cortex (PFC). The limbic system, which includes the amygdala and hippocampus, is one of the oldest brain regions evolutionarily and is responsible for processing emotion, including fear and reward. When faced with an aversive task, the limbic system generates discomfort, triggering an immediate desire to escape. The PFC, by contrast, is responsible for planning, impulse control, and long-term goal pursuit. Procrastination occurs when the limbic system overrides the PFC — a momentary victory of emotion over reason.

A landmark 2014 fMRI study by Pychyl and Sirois revealed that self-identified procrastinators showed heightened amygdala activation when contemplating future tasks, compared to non-procrastinators. Moreover, procrastinators exhibited weaker functional connectivity between the amygdala and the dorsolateral prefrontal cortex, suggesting a reduced capacity for emotional regulation. This finding was corroborated by a 2022 longitudinal study at the University of Munich, which followed 300 university students over four years and found that amygdala-PFC connectivity at baseline predicted academic procrastination with 74% accuracy.

Intervention strategies have evolved accordingly. Traditional time-management training has proven largely ineffective in isolation. Instead, cognitive-behavioral therapy (CBT) approaches targeting emotional responses — such as mindfulness, self-compassion exercises, and "implementation intentions" (specific if-then plans) — have demonstrated significant success. A 2023 randomized controlled trial in the Journal of Behavioral Medicine showed that an 8-week self-compassion intervention reduced procrastination by 36% and improved academic performance by 0.4 GPA points on average.

These findings carry profound implications for education and workplace productivity. The punitive approach — criticizing procrastinators as lazy — is not only ineffective but potentially harmful, compounding the shame and anxiety that drive the behavior in the first place. Instead, institutions should adopt empathy-based strategies that strengthen emotional regulation skills.`,

    questions: [
      { id: "r3q1", type: "ynng", question: "Procrastination is primarily a time-management issue.", answer: "NO", explanation: "文中明确驳斥此观点，说神经科学研究已dismantled this view" },
      { id: "r3q2", type: "ynng", question: "The limbic system is evolutionarily older than the prefrontal cortex.", answer: "YES", explanation: "文中说 limbic system is one of the oldest brain regions" },
      { id: "r3q3", type: "ynng", question: "Procrastinators show reduced brain activity when thinking about the future.", answer: "NO", explanation: "实际上 procrastinators showed heightened amygdala activation" },
      { id: "r3q4", type: "ynng", question: "The Munich study found that brain connectivity could predict procrastination with 74% accuracy.", answer: "YES", explanation: "从最后一句直接提取" },
      { id: "r3q5", type: "fill", question: "The brain region responsible for planning and impulse control is the ________.", answer: "prefrontal cortex", hint: "从文中提取术语" },
      { id: "r3q6", type: "fill", question: "The 2023 RCT showed that self-compassion intervention reduced procrastination by ________%.", answer: "36", hint: "数字题" },
      { id: "r3q7", type: "choice", question: "Which approach does the author recommend for addressing procrastination?",
        options: ["A. Punitive criticism", "B. Time management training", "C. Empathy-based emotional regulation", "D. Strict deadline enforcement"],
        answer: "C"
      },
      { id: "r3q8", type: "fill", question: "Specific if-then plans are also known as \"________ intentions\".", answer: "implementation", hint: "文中术语" },
    ],
  },
];

// 阅读策略卡片
export const readingTips = [
  { id: "rt1", title: "Skimming & Scanning", detail: "先花 2-3 分钟 Skim（略读每段首末句），再用关键词 Scan（扫读）定位。不要在寻找信息时逐字读完全文。" },
  { id: "rt2", title: "TFNG vs YNNG", detail: "True/False/Not Given 针对事实陈述；Yes/No/Not Given 针对作者观点/claim。区分两者的标志词：author claims / suggests / believes → YNNG。" },
  { id: "rt3", title: "Not Given 陷阱", detail: "NG 不等于 False。False 是原文明确矛盾的陈述。NG 是原文完全没有提到——即使是常识也不能选 True/False。" },
  { id: "rt4", title: "时间分配", detail: "Passage 1 (易): 15-17min, Passage 2 (中): 20min, Passage 3 (难): 23-25min。留 5 分钟检查/猜答案。永不空题。" },
  { id: "rt5", title: "同义替换", detail: "阅读出题的核心是同义替换。原文: 'decline' → 题目: 'decrease/fall/reduction'。在做题时划出对应的同义词。" },
  { id: "rt6", title: "Summary填空题", detail: "先确定填空词性 (noun/verb/adj)，再看文中同义区域。答案一定是原文原词，不需要变形。注意字数限制。" },
];
