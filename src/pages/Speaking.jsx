import { useState } from "react";
import { speakingTopics, speakingTips, speakingBandDescriptors } from "../data/speakingData";

export default function Speaking() {
  const [tab, setTab] = useState("part1"); // "part1" | "part2" | "part3" | "tips" | "descriptors"
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showSample, setShowSample] = useState(false);

  // Part 2 timer
  const [timerOn, setTimerOn] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(120);

  function startTimer() {
    setTimerOn(true);
    setSecondsLeft(120);
    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) { clearInterval(interval); setTimerOn(false); return 0; }
        return prev - 1;
      });
    }, 1000);
  }

  function stopTimer() {
    setTimerOn(false);
    setSecondsLeft(120);
  }

  const formatTime = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1>💬 口语训练</h1>
        <p>IELTS Speaking · 11-14分钟 · Part 1 (日常问答) · Part 2 (独白) · Part 3 (深度讨论)</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {[
          { key: "part1", label: "🗣️ Part 1" },
          { key: "part2", label: "🎤 Part 2" },
          { key: "part3", label: "💭 Part 3" },
          { key: "tips", label: "💡 口语技巧" },
          { key: "descriptors", label: "📋 评分标准" },
        ].map(t => (
          <button key={t.key}
            className={`btn ${tab === t.key ? "btn-primary" : "btn-outline"} btn-sm`}
            onClick={() => { setTab(t.key); setSelectedTopic(null); setShowSample(false); stopTimer(); }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Part 1 */}
      {tab === "part1" && (
        <div className="grid-2">
          {speakingTopics.part1.map(topic => (
            <div className="card" key={topic.id} style={{ cursor: "pointer" }}
              onClick={() => { setSelectedTopic(topic.id); setShowSample(false); }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>{topic.topic}</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                {topic.questions.length} 道问题
              </p>
              <button className="btn btn-primary btn-sm" style={{ marginTop: 12 }}>开始练习 →</button>
            </div>
          ))}
        </div>
      )}

      {/* Part 1 selected */}
      {tab === "part1" && selectedTopic && (
        <div>
          <button className="btn btn-outline btn-sm" style={{ marginBottom: 16 }}
            onClick={() => setSelectedTopic(null)}>← 返回</button>
          {speakingTopics.part1.filter(t => t.id === selectedTopic).map(t => (
            <div className="card" key={t.id}>
              <div className="card-title">🗣️ {t.topic}</div>
              <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginBottom: 16 }}>
                Part 1 (4-5 min) — 简短回答，每个问题约 20-30 秒。回答时给出 1-2 个要点即可，不要过度扩展。
              </p>
              {t.questions.map((q, i) => (
                <div key={i} style={{ padding: "14px 0", borderBottom: "1px solid var(--color-border)" }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "start" }}>
                    <span style={{ fontWeight: 700, color: "var(--color-primary)", minWidth: 24 }}>Q{i + 1}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 500, marginBottom: 8 }}>{q}</p>
                      <button className="btn btn-sm btn-outline"
                        onClick={() => {
                          // Simple text-to-speech via Web Speech API hint
                          window.alert(`请大声朗读并回答以下问题：\n\n"${q}"\n\n录音建议：使用手机录音功能，回答后回听分析自己的表现。`);
                        }}>
                        🎤 练习此题
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Part 2 */}
      {tab === "part2" && (
        <div className="grid-2">
          {speakingTopics.part2.map(t => (
            <div className="card" key={t.id} style={{ cursor: "pointer" }}
              onClick={() => { setSelectedTopic(t.id); setShowSample(false); stopTimer(); }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>{t.topic}</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
                {t.cueItems.map((ci, i) => (
                  <span key={i} style={{ fontSize: "0.75rem", background: "var(--color-primary-bg)",
                    color: "var(--color-primary)", padding: "2px 8px", borderRadius: 20 }}>
                    {ci}
                  </span>
                ))}
              </div>
              <button className="btn btn-primary btn-sm">查看详情 →</button>
            </div>
          ))}
        </div>
      )}

      {/* Part 2 selected */}
      {tab === "part2" && selectedTopic && (
        <div>
          <button className="btn btn-outline btn-sm" style={{ marginBottom: 16 }}
            onClick={() => { setSelectedTopic(null); stopTimer(); }}>← 返回</button>
          {speakingTopics.part2.filter(t => t.id === selectedTopic).map(t => (
            <div key={t.id}>
              {/* Cue card */}
              <div className="card" style={{ marginBottom: 20, border: "2px solid var(--color-primary)" }}>
                <div className="card-title">🎤 Part 2 Cue Card (准备 1 分钟 + 说 1-2 分钟)</div>
                <h3 style={{ marginBottom: 12 }}>{t.topic}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginBottom: 8 }}>你应该说：</p>
                <ul style={{ marginLeft: 20, marginBottom: 16, lineHeight: 2 }}>
                  {t.cueItems.map((ci, i) => (
                    <li key={i} style={{ fontSize: "0.9rem" }}>{ci}</li>
                  ))}
                </ul>

                {/* Timer */}
                <div style={{
                  textAlign: "center", padding: 16,
                  background: timerOn ? (secondsLeft <= 30 ? "#fee2e2" : "var(--color-primary-bg)") : "var(--color-border)",
                  borderRadius: "var(--radius-md)",
                }}>
                  <div style={{ fontSize: "2rem", fontWeight: 800, fontVariantNumeric: "tabular-nums", marginBottom: 8 }}>
                    {timerOn ? formatTime(secondsLeft) : "2:00"}
                  </div>
                  {!timerOn ? (
                    <button className="btn btn-primary btn-sm" onClick={startTimer}>
                      ▶️ 开始计时 (2分钟)
                    </button>
                  ) : (
                    <button className="btn btn-danger btn-sm" onClick={stopTimer}>
                      ⏹ 停止计时
                    </button>
                  )}
                  <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginTop: 8 }}>
                    练习时尽量说到 1:45 - 2:00
                  </p>
                </div>
              </div>

              {/* Sample answer toggle */}
              <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                <button className={`btn ${showSample ? "btn-outline" : "btn-primary"} btn-sm`}
                  onClick={() => setShowSample(true)}>📖 查看范文</button>
                {showSample && (
                  <button className="btn btn-outline btn-sm" onClick={() => setShowSample(false)}>🔽 收起</button>
                )}
              </div>

              {showSample && (
                <div className="card" style={{ lineHeight: 1.9, fontSize: "0.92rem", maxHeight: 500, overflowY: "auto" }}>
                  <div className="card-title">📖 范文</div>
                  {t.sampleAnswer.split("\n\n").map((para, i) => (
                    <p key={i} style={{ marginBottom: 14 }}>{para.trim()}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Part 3 */}
      {tab === "part3" && (
        <div className="grid-2">
          {speakingTopics.part3.map(t => (
            <div className="card" key={t.id} style={{ cursor: "pointer" }}
              onClick={() => { setSelectedTopic(t.id); setShowSample(false); }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 4 }}>{t.topic}</h3>
              <p style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginBottom: 8 }}>
                相关: {t.relatedTo}
              </p>
              <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                {t.questions.length} 道讨论题
              </p>
              <button className="btn btn-primary btn-sm" style={{ marginTop: 12 }}>进入练习 →</button>
            </div>
          ))}
        </div>
      )}

      {/* Part 3 selected */}
      {tab === "part3" && selectedTopic && (
        <div>
          <button className="btn btn-outline btn-sm" style={{ marginBottom: 16 }}
            onClick={() => { setSelectedTopic(null); setShowSample(false); }}>← 返回</button>
          {speakingTopics.part3.filter(t => t.id === selectedTopic).map(t => (
            <div className="card" key={t.id}>
              <div className="card-title">💭 {t.topic}</div>
              <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginBottom: 16 }}>
                Part 3 (4-5 min) — 抽象讨论，每个回答约 45-60秒。使用 A.R.E. 结构：Answer → Reason → Example。
              </p>
              {t.questions.map((q, i) => (
                <div key={i} style={{ padding: "14px 0", borderBottom: "1px solid var(--color-border)" }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "start" }}>
                    <span style={{ fontWeight: 700, color: "var(--color-primary)", minWidth: 24 }}>Q{i + 1}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 500, marginBottom: 8 }}>{q}</p>
                      {t.sampleIdeas && t.sampleIdeas[`q${i + 1}`] && (
                        <details style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", cursor: "pointer" }}>
                          <summary style={{ color: "var(--color-info)", fontWeight: 500 }}>💡 查看思路要点</summary>
                          <p style={{ marginTop: 8, lineHeight: 1.7 }}>{t.sampleIdeas[`q${i + 1}`]}</p>
                        </details>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Tips */}
      {tab === "tips" && (
        <div className="grid-2">
          {speakingTips.map(tip => (
            <div className="card" key={tip.id}>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>{tip.title}</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", lineHeight: 1.7 }}>{tip.detail}</p>
            </div>
          ))}
        </div>
      )}

      {/* Descriptors */}
      {tab === "descriptors" && (
        <div className="card" style={{ overflowX: "auto" }}>
          <div className="card-title">📋 口语评分标准 (FC = Fluency, LR = Lexical Resource, GRA = Grammar, PR = Pronunciation)</div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
                <th style={{ padding: "8px 12px", textAlign: "left" }}>Band</th>
                <th style={{ padding: "8px 12px", textAlign: "left" }}>FC</th>
                <th style={{ padding: "8px 12px", textAlign: "left" }}>LR</th>
                <th style={{ padding: "8px 12px", textAlign: "left" }}>GRA</th>
                <th style={{ padding: "8px 12px", textAlign: "left" }}>PR</th>
              </tr>
            </thead>
            <tbody>
              {speakingBandDescriptors.map(row => (
                <tr key={row.band} style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "8px 12px", fontWeight: 700 }}>Band {row.band}</td>
                  <td style={{ padding: "8px 12px" }}>{row.fc}</td>
                  <td style={{ padding: "8px 12px" }}>{row.lr}</td>
                  <td style={{ padding: "8px 12px" }}>{row.gra}</td>
                  <td style={{ padding: "8px 12px" }}>{row.pr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
