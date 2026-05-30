// 听力 Section 数据（模拟剑桥雅思真题）
export const listeningSections = [
  {
    id: "s1",
    title: "Section 1: 租房咨询",
    description: "模拟剑桥雅思 Section 1 场景 —— 日常对话，填写个人信息表",
    difficulty: "easy",
    audioUrl: null, // placeholder — users can upload later
    questions: [
      { id: "s1q1", type: "fill", question: "申请人姓名：________", answer: "John Smith", hint: "注意拼写，首字母大写" },
      { id: "s1q2", type: "fill", question: "联系电话：________", answer: "0412-345-678", hint: "听数字注意 Australian number format" },
      { id: "s1q3", type: "fill", question: "入住日期：________", answer: "July 15th", hint: "注意月份 + 序数词" },
      { id: "s1q4", type: "fill", question: "月租金：$ ________", answer: "650", hint: "注意数字 + unit" },
      { id: "s1q5", type: "fill", question: "租房类型：________", answer: "two-bedroom apartment", hint: "复合词" },
      { id: "s1q6", type: "choice", question: "申请人希望的入住时长是？",
        options: ["A. 3个月", "B. 6个月", "C. 12个月"], answer: "B" },
      { id: "s1q7", type: "choice", question: "合约包括以下哪些？（多选）",
        options: ["A. 水费", "B. 网费", "C. 电费", "D. 停车费"], answer: "AC" },
      { id: "s1q8", type: "fill", question: "房东邮箱: ________@rent.com", answer: "sandra", hint: "rare name spelling" },
    ],
  },
  {
    id: "s2",
    title: "Section 2: 校园导览",
    description: "大学校园步行导览独白 —— 地图题 + 表格填空",
    difficulty: "medium",
    audioUrl: null,
    questions: [
      { id: "s2q1", type: "choice", question: "图书馆位于校园的哪个方向？",
        options: ["A. 北侧", "B. 南侧", "C. 东侧"], answer: "A" },
      { id: "s2q2", type: "fill", question: "体育馆开放时间：________ AM - 10 PM", answer: "6", hint: "注意时间数字" },
      { id: "s2q3", type: "fill", question: "学生中心食堂：2楼 - ________", answer: "cafeteria", hint: "听具体名字" },
      { id: "s2q4", type: "choice", question: "计算机房在哪个建筑？",
        options: ["A. Wilson Building", "B. Newton Building", "C. Darwin Building"], answer: "B" },
      { id: "s2q5", type: "fill", question: "停车场收费：每小时 £ ________", answer: "1.50", hint: "小数点" },
      { id: "s2q6", type: "choice", question: "新生入学报到地点？",
        options: ["A. Main Hall", "B. Gymnasium", "C. Lecture Theatre A"], answer: "C" },
    ],
  },
  {
    id: "s3",
    title: "Section 3: 学术讨论",
    description: "两名学生+导师学术讨论 —— 多选题 + 配对题",
    difficulty: "hard",
    audioUrl: null,
    questions: [
      { id: "s3q1", type: "choice", question: "研究主题是？",
        options: ["A. Climate Change", "B. Urban Planning", "C. Renewable Energy"], answer: "C" },
      { id: "s3q2", type: "fill", question: "研究时间跨度：________ 年", answer: "10", hint: "数据题" },
      { id: "s3q3", type: "choice", question: "导师建议使用什么研究方法？",
        options: ["A. Survey", "B. Case Study", "C. Experiment"], answer: "B" },
      { id: "s3q4", type: "fill", question: "问卷样本量：n = ________", answer: "200", hint: "样本数" },
      { id: "s3q5", type: "choice", question: "截止日期：",
        options: ["A. March 15", "B. March 30", "C. April 10"], answer: "B" },
    ],
  },
  {
    id: "s4",
    title: "Section 4: 学术讲座",
    description: "大学学术讲座独白 —— 笔记填空（最难题型）",
    difficulty: "hard",
    audioUrl: null,
    questions: [
      { id: "s4q1", type: "fill", question: "讲座主题：The History of ________", answer: "glass", hint: "只有一个词" },
      { id: "s4q2", type: "fill", question: "最早发现玻璃的年代：公元前 ________ 年", answer: "3500", hint: "年份数字" },
      { id: "s4q3", type: "fill", question: "罗马人改良了 ________ 技术", answer: "blowing", hint: "-ing 形式" },
      { id: "s4q4", type: "fill", question: "现代玻璃的主要原材料之一是 ________", answer: "silica sand", hint: "两个词" },
      { id: "s4q5", type: "fill", question: "浮法玻璃工艺由 ________ 发明", answer: "Pilkington", hint: "人名，首字母大写" },
      { id: "s4q6", type: "fill", question: "最大消费领域是 ________ industry", answer: "construction", hint: "行业名词" },
      { id: "s4q7", type: "choice", question: "未来趋势最强调的是？",
        options: ["A. 降低成本", "B. 提高能效", "C. 扩大生产"], answer: "B" },
    ],
  },
];

// 听力策略卡片
export const listeningTips = [
  { id: "t1", title: "审题策略", detail: "在听力开始前，快速浏览所有题目，圈出关键词（疑问词、数字、人名、地点）。特别注意题目的字数限制（NO MORE THAN X WORDS）。" },
  { id: "t2", title: "同义替换", detail: "雅思听力几乎每个答案都有同义替换。例如：cost → price, increase → rise/grow/go up, advantage → benefit。" },
  { id: "t3", title: "信号词", detail: "注意转折词（but, however, actually）、强调词（the main point is...）、举例词（for instance, such as）——答案常在之后。" },
  { id: "t4", title: "拼写注意", detail: "Section 1 常见人名、地名拼写，Section 4 常见学术词汇。British 拼写 (colour, centre) 优先，但 American 拼写也接受。" },
  { id: "t5", title: "跟不上时", detail: "如果一个答案没听到，迅速跳过看下一题。纠结会错过后续2-3题！听前已经标注了关键位置后，快速转移焦点。" },
  { id: "t6", title: "检查时间", detail: "每节后有 30 秒检查拼写和语法。用最后 10 分钟誊写答案，确保 CAPITAL LETTERS 或字迹清晰。" },
];
