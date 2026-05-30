import { useIeltsState, useIeltsDispatch } from "../context/IeltsContext";

export default function Dashboard() {
  const state = useIeltsState();
  const dispatch = useIeltsDispatch();
  const { progress, examDate, targetOverall, targetScores, checkIns, learningTime } = state;

  // Countdown
  let daysLeft = null;
  if (examDate) {
    const diff = new Date(examDate) - new Date();
    daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  // Heatmap: last 12 weeks
  const heatmapDays = [];
  for (let i = 83; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    heatmapDays.push(d.toISOString().slice(0, 10));
  }

  // Today check-in
  const today = new Date().toISOString().slice(0, 10);
  const checkedInToday = checkIns[today];

  // Today learning minutes
  const todayMinutes = learningTime[today] || 0;
  const hours = Math.floor(todayMinutes / 60);
  const mins = todayMinutes % 60;

  // Total check-in count
  const totalCheckIns = Object.keys(checkIns).length;

  // Streak
  let streak = 0;
  for (let i = 0; i < heatmapDays.length; i++) {
    if (checkIns[heatmapDays[heatmapDays.length - 1 - i]]) {
      streak++;
    } else {
      break;
    }
  }

  // ProgressRing component
  function ProgressRing({ pct, size = 80, stroke = 6, color = "var(--color-primary)" }) {
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ - (Math.min(pct, 100) / 100) * circ;
    return (
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-border)" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
        <text x={size / 2} y={size / 2} textAnchor="middle" dominantBaseline="central"
          fontSize="16" fontWeight="700" fill="var(--color-text)">
          {pct}%
        </text>
      </svg>
    );
  }

  const skills = [
    { key: "listening", label: "听力", icon: "🎧" },
    { key: "reading", label: "阅读", icon: "📖" },
    { key: "writing", label: "写作", icon: "✍️" },
    { key: "speaking", label: "口语", icon: "💬" },
  ];

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1>📊 学习仪表盘</h1>
        <p>全面追踪你的雅思备考进度，目标总分 {targetOverall} 分</p>
      </div>

      {/* Top stats */}
      <div className="grid-3" style={{ marginBottom: 24 }}>
        {/* Countdown */}
        <div className="card">
          <div className="card-title">⏳ 考试倒计时</div>
          {examDate ? (
            <div className="countdown">
              <div className="countdown-days" style={{ color: daysLeft <= 30 ? "var(--color-danger)" : "var(--color-primary)" }}>
                {daysLeft < 0 ? "已过去" : daysLeft}
              </div>
              <div className="countdown-label">
                {daysLeft < 0 ? "建议更新考试日期" : daysLeft <= 7 ? "冲刺阶段！" : "天"}
              </div>
              <div className="text-muted" style={{ fontSize: "0.8rem", marginTop: 8 }}>
                {examDate}
              </div>
            </div>
          ) : (
            <div className="text-center" style={{ padding: 20 }}>
              <p className="text-muted">尚未设置考试日期</p>
              <button className="btn btn-primary btn-sm mt-4"
                onClick={() => {
                  const d = prompt("请输入考试日期 (YYYY-MM-DD)：", "2026-08-01");
                  if (d) dispatch({ type: "SET_EXAM_DATE", payload: d });
                }}>
                📅 设置日期
              </button>
            </div>
          )}
        </div>

        {/* Check-in */}
        <div className="card">
          <div className="card-title">🔥 今日打卡</div>
          <div className="text-center" style={{ padding: "12px 0" }}>
            <div style={{ fontSize: "3rem" }}>{checkedInToday ? "✅" : "⏰"}</div>
            <p style={{ fontWeight: 600, marginTop: 8 }}>
              {checkedInToday ? "今日已打卡！继续保持！" : "今天还没打卡哦"}
            </p>
            <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
              连续打卡 {streak} 天 · 累计 {totalCheckIns} 天
            </p>
            <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
              今日学习: {hours > 0 ? `${hours}小时` : ""}{mins}分钟
            </p>
            {!checkedInToday && (
              <button className="btn btn-primary btn-sm mt-4" onClick={() => dispatch({ type: "CHECK_IN_TODAY" })}>
                ✅ 打卡签到
              </button>
            )}
          </div>
        </div>

        {/* Target Setting */}
        <div className="card">
          <div className="card-title">🎯 目标分数</div>
          <div className="text-center" style={{ padding: "12px 0" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--color-primary)" }}>
              {targetOverall}
            </div>
            <div className="text-muted" style={{fontSize:"0.85rem"}}>总分目标</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 12, fontSize: "0.85rem" }}>
              {Object.entries(targetScores).map(([k, v]) => (
                <span key={k}><strong>{k}:</strong> {v}</span>
              ))}
            </div>
            <button className="btn btn-outline btn-sm mt-4" onClick={() => {
              const overall = parseFloat(prompt("目标总分：", targetOverall) || targetOverall);
              dispatch({ type: "SET_TARGET", payload: { overall, scores: targetScores } });
            }}>
              ✏️ 修改目标
            </button>
          </div>
        </div>
      </div>

      {/* Progress Rings */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-title">📈 各项进度</div>
        <div className="progress-rings">
          {skills.map(s => (
            <div className="progress-ring-item" key={s.key}>
              <ProgressRing pct={progress[s.key]} />
              <span className="ring-label">{s.icon} {s.label}</span>
              <span className="ring-pct">{progress[s.key]}%</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, textAlign: "center" }}>
          {skills.map(s => (
            <div key={s.key} style={{ display: "inline-flex", alignItems: "center", gap: 6, margin: "0 8px" }}>
              <input type="range" min="0" max="100" value={progress[s.key]}
                onChange={e => dispatch({ type: "UPDATE_PROGRESS", payload: { skill: s.key, value: +e.target.value } })}
                style={{ width: 80 }} />
              <span style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", width: 36 }}>{progress[s.key]}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Heatmap */}
      <div className="card">
        <div className="card-title">📅 打卡热力图（近12周）</div>
        <div className="heatmap-grid" style={{ justifyContent: "center" }}>
          {heatmapDays.map(dateStr => {
            const checked = checkIns[dateStr];
            let cls = "heatmap-cell";
            if (checked) cls += " checked"; // add level class later if needed
            return (
              <div key={dateStr} className={cls}
                title={dateStr + (checked ? " ✅已打卡" : "")}
              />
            );
          })}
        </div>
        <p className="text-muted text-center" style={{ marginTop: 12, fontSize: "0.8rem" }}>
          每个小方块代表一天，蓝色表示已打卡
        </p>
      </div>
    </div>
  );
}
