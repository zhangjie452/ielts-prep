// 词汇分类数据（雅思核心词汇 + 语法要点）
export const vocabularyCategories = [
  {
    id: "v1",
    name: "教育",
    icon: "🎓",
    words: [
      { word: "curriculum", pos: "n.", meaning: "课程体系", example: "Schools should design a broad and balanced ~.", band: "7+" },
      { word: "pedagogy", pos: "n.", meaning: "教学法", example: "Modern ~ emphasizes student-centered learning.", band: "8+" },
      { word: "compulsory", pos: "adj.", meaning: "强制性的", example: "Education is ~ for children aged 6-16.", band: "6+" },
      { word: "vocational", pos: "adj.", meaning: "职业的", example: "~ training can bridge the skills gap.", band: "7+" },
      { word: "literacy", pos: "n.", meaning: "读写能力；素养", example: "Digital ~ is essential in today's job market.", band: "6+" },
      { word: "dissertation", pos: "n.", meaning: "学位论文", example: "She spent a year researching her ~.", band: "7+" },
      { word: "alleviate", pos: "v.", meaning: "减轻，缓解", example: "Scholarships can ~ financial burdens.", band: "7+" },
      { word: "holistic", pos: "adj.", meaning: "整体的，全面的", example: "A ~ approach to education develops the whole child.", band: "8+" },
    ],
  },
  {
    id: "v2",
    name: "科技",
    icon: "💻",
    words: [
      { word: "innovation", pos: "n.", meaning: "创新", example: "Technological ~ drives economic growth.", band: "6+" },
      { word: "automation", pos: "n.", meaning: "自动化", example: "~ threatens certain manual jobs.", band: "7+" },
      { word: "ubiquitous", pos: "adj.", meaning: "无处不在的", example: "Smartphones have become ~.", band: "8+" },
      { word: "obsolete", pos: "adj.", meaning: "过时的，淘汰的", example: "CD players are now largely ~.", band: "7+" },
      { word: "cryptocurrency", pos: "n.", meaning: "加密货币", example: "~ has disrupted traditional banking.", band: "8+" },
      { word: "algorithm", pos: "n.", meaning: "算法", example: "Social media ~s shape what we see online.", band: "7+" },
      { word: "exponential", pos: "adj.", meaning: "指数的", example: "AI capabilities are growing at an ~ rate.", band: "8+" },
      { word: "breakthrough", pos: "n.", meaning: "突破", example: "CRISPR was a major ~ in genetic science.", band: "7+" },
    ],
  },
  {
    id: "v3",
    name: "环境",
    icon: "🌍",
    words: [
      { word: "sustainable", pos: "adj.", meaning: "可持续的", example: "~ development balances economy and ecology.", band: "7+" },
      { word: "biodiversity", pos: "n.", meaning: "生物多样性", example: "~ loss threatens ecosystem stability.", band: "7+" },
      { word: "carbon footprint", pos: "n.", meaning: "碳足迹", example: "We should try to reduce our ~.", band: "7+" },
      { word: "renewable", pos: "adj.", meaning: "可再生的", example: "Solar and wind are ~ energy sources.", band: "6+" },
      { word: "deforestation", pos: "n.", meaning: "砍伐森林", example: "~ contributes significantly to climate change.", band: "7+" },
      { word: "mitigate", pos: "v.", meaning: "缓解，减轻", example: "Planting trees can ~ the effects of CO2.", band: "8+" },
      { word: "exacerbate", pos: "v.", meaning: "加剧", example: "Pollution can ~ respiratory diseases.", band: "8+" },
      { word: "conservation", pos: "n.", meaning: "保护", example: "Wildlife ~ requires international cooperation.", band: "6+" },
    ],
  },
  {
    id: "v4",
    name: "社会",
    icon: "👥",
    words: [
      { word: "inequality", pos: "n.", meaning: "不平等", example: "Income ~ has widened in many countries.", band: "7+" },
      { word: "demographic", pos: "adj./n.", meaning: "人口的/人口统计", example: "An aging ~ poses fiscal challenges.", band: "7+" },
      { word: "urbanization", pos: "n.", meaning: "城市化", example: "Rapid ~ strains public infrastructure.", band: "7+" },
      { word: "marginalized", pos: "adj.", meaning: "边缘化的", example: "Policies should support ~ communities.", band: "8+" },
      { word: "cohesion", pos: "n.", meaning: "凝聚力", example: "Social ~ is vital for a stable society.", band: "7+" },
      { word: "polarization", pos: "n.", meaning: "两极分化", example: "Political ~ has increased in recent years.", band: "8+" },
      { word: "philanthropy", pos: "n.", meaning: "慈善事业", example: "~ plays a crucial role in poverty alleviation.", band: "8+" },
      { word: "infrastructure", pos: "n.", meaning: "基础设施", example: "Investment in ~ boosts long-term growth.", band: "6+" },
    ],
  },
  {
    id: "v5",
    name: "健康",
    icon: "🏥",
    words: [
      { word: "sedentary", pos: "adj.", meaning: "久坐的", example: "A ~ lifestyle increases health risks.", band: "7+" },
      { word: "epidemic", pos: "n.", meaning: "流行病；泛滥", example: "Obesity has become a global ~.", band: "7+" },
      { word: "mental well-being", pos: "n.", meaning: "心理健康", example: "Employers should prioritize ~.", band: "7+" },
      { word: "preventive", pos: "adj.", meaning: "预防性的", example: "~ medicine reduces long-term healthcare costs.", band: "7+" },
      { word: "chronic", pos: "adj.", meaning: "慢性的", example: "~ diseases strain healthcare systems.", band: "7+" },
      { word: "immunization", pos: "n.", meaning: "免疫接种", example: "~ programs save millions of lives annually.", band: "7+" },
      { word: "longevity", pos: "n.", meaning: "长寿", example: "Diet and exercise contribute to ~.", band: "8+" },
      { word: "detrimental", pos: "adj.", meaning: "有害的", example: "Excessive screen time can be ~ to health.", band: "8+" },
    ],
  },
];

// 语法要点
export const grammarPoints = [
  {
    id: "g1",
    title: "条件句 (Conditionals)",
    examples: [
      { type: "Zero Conditional", structure: "If + present simple, present simple", example: "If water reaches 100°C, it boils.", usage: "科学事实，普遍真理" },
      { type: "First Conditional", structure: "If + present simple, will + infinitive", example: "If it rains tomorrow, I will stay home.", usage: "可能的未来事件" },
      { type: "Second Conditional", structure: "If + past simple, would + infinitive", example: "If I had more time, I would travel more.", usage: "不太可能/假设的现在/未来" },
      { type: "Third Conditional", structure: "If + past perfect, would have + p.p.", example: "If I had studied harder, I would have passed.", usage: "对过去的假设（已无法改变）" },
      { type: "Mixed Conditional", structure: "If + past perfect, would + infinitive", example: "If I had saved more money, I would be richer now.", usage: "过去的条件→现在的结果" },
    ],
  },
  {
    id: "g2",
    title: "被动语态 (Passive Voice)",
    examples: [
      { type: "Present Passive", structure: "am/is/are + past participle", example: "English is spoken worldwide.", usage: "动作者未知或不重要" },
      { type: "Past Passive", structure: "was/were + p.p.", example: "The book was published in 2020.", usage: "突出动作承受者" },
      { type: "Present Perfect Passive", structure: "has/have been + p.p.", example: "The building has been renovated.", usage: "强调当前结果" },
      { type: "Future Passive", structure: "will be + p.p.", example: "The results will be announced next week.", usage: "学术/正式语境" },
      { type: "Modal Passive", structure: "can/must/should be + p.p.", example: "Plastic waste should be recycled.", usage: "建议/义务/可能性" },
    ],
  },
  {
    id: "g3",
    title: "关系从句 (Relative Clauses)",
    examples: [
      { type: "Defining (who)", structure: "...who/that...", example: "Students who study consistently perform better.", usage: "限定所指对象，不可省略" },
      { type: "Defining (which)", structure: "...which/that...", example: "The policy which was introduced last year has been effective.", usage: "修饰事物" },
      { type: "Non-defining (, which)", structure: "..., which...", example: "IELTS, which is recognized globally, tests four skills.", usage: "附加信息，前后加逗号" },
      { type: "Whose", structure: "...whose...", example: "The scientist whose research changed the field received the award.", usage: "表示所属关系" },
      { type: "Preposition + which", structure: "...in which / to whom...", example: "This is the city in which I grew up.", usage: "正式/书面语境" },
    ],
  },
  {
    id: "g4",
    title: "连接词 / 过渡词 (Cohesive Devices)",
    examples: [
      { type: "Addition", structure: "moreover, furthermore, in addition", example: "The plan is costly; moreover, it is impractical.", usage: "补充论点" },
      { type: "Contrast", structure: "however, nevertheless, on the contrary", example: "Some support the idea; however, others disagree.", usage: "转折对比" },
      { type: "Cause-Effect", structure: "therefore, consequently, as a result", example: "Demand rose; consequently, prices increased.", usage: "因果关系" },
      { type: "Exemplification", structure: "for instance, to illustrate, namely", example: "Many countries, for instance, Sweden...", usage: "举例说明" },
      { type: "Conclusion", structure: "in conclusion, to sum up, overall", example: "In conclusion, both sides have valid points.", usage: "总结全文" },
    ],
  },
];

// 同义替换表
export const synonymBank = [
  { basic: "important", advanced: ["significant", "crucial", "vital", "paramount", "essential"] },
  { basic: "good", advanced: ["beneficial", "advantageous", "favorable", "positive"] },
  { basic: "bad", advanced: ["detrimental", "harmful", "adverse", "unfavorable", "deleterious"] },
  { basic: "big", advanced: ["substantial", "considerable", "enormous", "immense", "significant"] },
  { basic: "small", advanced: ["minor", "marginal", "negligible", "trivial", "insignificant"] },
  { basic: "increase", advanced: ["rise", "grow", "surge", "soar", "escalate", "climb"] },
  { basic: "decrease", advanced: ["decline", "fall", "drop", "plummet", "diminish", "dwindle"] },
  { basic: "show", advanced: ["demonstrate", "illustrate", "indicate", "reveal", "depict", "highlight"] },
  { basic: "think", advanced: ["believe", "argue", "contend", "assert", "maintain", "deem"] },
  { basic: "people", advanced: ["individuals", "citizens", "the public", "dwellers", "inhabitants"] },
  { basic: "problem", advanced: ["issue", "challenge", "concern", "dilemma", "obstacle"] },
  { basic: "solve", advanced: ["address", "tackle", "resolve", "remedy", "mitigate", "alleviate"] },
];

// Tips
export const vocabularyTips = [
  { id: "vt1", title: "主题分类记忆", detail: "按话题（教育、科技、环境等）记单词，而非按字母表。考试时按话题联想更高效。每个话题准备 8-10 个 Band 7+ 词汇。" },
  { id: "vt2", title: "搭配比单词更重要", detail: "不要只记单词，要记搭配(collocation)。例如：make a decision (不是 do), highly likely (不是 strongly), pose a threat (不是 give)。" },
  { id: "vt3", title: "同义替换", detail: "雅思每个答案都涉及同义替换。建立自己的同义词库。写作中避免重复同一单词——用你学到的 advanced 词汇代替 basic 词汇。" },
  { id: "vt4", title: "语法范围", detail: "Band 7 要求'sufficient range'，尝试使用多种时态、被动语态、条件句和关系从句。但不要强行堆砌——准确性先于复杂性。" },
];
