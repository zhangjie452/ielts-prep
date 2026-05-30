import { useState, useMemo } from "react";
import { useIeltsState, useIeltsDispatch } from "../context/IeltsContext";
import { listeningSections, listeningTips } from "../data/listeningData";

export default function Listening() {
  const state = useIeltsState();
  const dispatch = useIeltsDispatch();

  const [mode, setMode] = useState("sections"); // "sections" | "practice" | "tips"
  const [activeSection, setActiveSection] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showHints, setShowHints] = useState(false);

  const section = listeningSections.find(s => s.id === activeSection);

  function startSection(sectionId) {
    setActiveSection(sectionId);
    setUserAnswers({});
    setSubmitted(false);
    setShowHints(false);
    setMode("practice");
  }

  function handleAnswer(questionId, value) {
    if (submitted) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: value }));
  }

  function submitSection() {
    if (!section) return;
    setSubmitted(true);

    let correct = 0;
    const total = section.questions.length;
    const wrongEntries = [];

    section.questions.forEach(q => {
      const userAns = (userAnswers[q.id] || "").trim();
      const correctAns = q.type === "choice" ? q.answer : q.answer;
      // For fill, case-insensitive compare
      const isCorrect = q.type === "choice"
        ? userAns.toUpperCase() === correctAns.toUpperCase()
        : userAns.toLowerCase() === correctAns.toLowerCase();

      if (isCorrect) {
        correct++;
      } else {
        wrongEntries.push({
          module: "listening",
          questionId: q.id,
          userAnswer: userAns || "(未作答)",
          correctAnswer: correctAns,
        });
      }
    });

    const score = Math.round((correct / total) * 40); // scale to IELTS 40-mark listening
    const estimatedBand = scoreToBand(score);

    dispatch({ type: "ADD_SCORE", payload: { module: "listening", score: `${correct}/${total}`, total: 40, band: estimatedBand } });
    wrongEntries.forEach(w => dispatch({ type: "ADD_WRONG", payload: w }));

    // Update progress
    const pct = Math.round((correct / total) * 100);
    dispatch({ type: "UPDATE_PROGRESS", payload: { skill: "listening", value: Math.max(state.progress.listening, pct) } });

    // Add learning time
    dispatch({ type: "ADD_LEARNING_TIME", payload: { minutes: 15 } });
  }

  function scoreToBand(rawScore) {
    // Rough IELTS Listening band mapping (out of 40)
    if (rawScore >= 39) return "9.0";
    if (rawScore >= 37) return "8.5";
    if (rawScore >= 35) return "8.0";
    if (rawScore >= 32) return "7.5";
    if (rawScore >= 30) return "7.0";
    if (rawScore >= 26) return "6.5";
    if (rawScore >= 23) return "6.0";
    if (rawScore >= 18) return "5.5";
    if (rawScore >= 16) return "5.0";
    return "4.5及以下";
  }

  const difficultyLabel = { easy: "🟢 基础", medium: "🟡 中等", hard: "🔴 困难" };

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1>🎧 听力训练</h1>
        <p>IELTS Listening · 4个Section · 40道题 · 30分钟 + 10分钟誊写</p>
      </div>

      {/* Mode tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {["sections", "tips"].map(m => (
          <button key={m}
            className={`btn ${mode === m ? "btn-primary" : "btn-outline"} btn-sm`}
            onClick={() => { setMode(m); if (m !== "practice") { setActiveSection(null); setSubmitted(false); } }}>
            {m === "sections" ? "📋 模拟真题" : m === "practice" ? "✏️ 答题中" : "💡 备考策略"}
          </button>
        ))}
      </div>

      {/* Sections list */}
      {mode === "sections" && (
        <div className="grid-2">
          {listeningSections.map(sec => {
            const latestScore = state.scoreHistory
              .filter(s => s.module === "listening")
              .slice(-1)[0];
            return (
              <div className="card" key={sec.id} style={{ cursor: "pointer" }}
                onClick={() => startSection(sec.id)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 8 }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>{sec.title}</h3>
                  <span style={{ fontSize: "0.8rem" }}>{difficultyLabel[sec.difficulty]}</span>
                </div>
                <p style={{ fontSize: "0.88rem", color: "var(--color-text-secondary)", marginBottom: 12 }}>
                  {sec.description}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
                    {sec.questions.length} 题
                  </span>
                  <button className="btn btn-primary btn-sm">开始练习 →</button>
                </div>
                {latestScore && (
                  <div style={{ marginTop: 8, fontSize: "0.8rem", color: "var(--color-primary)" }}>
                    最近得分: {latestScore.score} / {latestScore.total} (Band {latestScore.band})
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Practice mode */}
      {mode === "practice" && section && (
        <div>
          {/* Back & header */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <button className="btn btn-outline btn-sm" onClick={() => setMode("sections")}>← 返回</button>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 600 }}>{section.title}</h2>
            <span style={{ fontSize: "0.8rem" }}>{difficultyLabel[section.difficulty]}</span>
            <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.85rem", cursor: "pointer", marginLeft: "auto" }}>
              <input type="checkbox" checked={showHints} onChange={e => setShowHints(e.target.checked)} />
              显示提示
            </label>
          </div>

          {/* Simulated audio bar */}
          <div className="card" style={{ marginBottom: 20, textAlign: "center", padding: "16px 24px", background: "var(--color-primary-bg)", borderColor: "var(--color-primary)" }}>
            <span style={{ fontSize: "1.1rem" }}>🔊 模拟听力播放中...</span>
            <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginTop: 4 }}>
              实际使用时，请上传剑桥雅思真题音频或使用 <a href="https://ielts.idp.com/prepare/listening" target="_blank" rel="noopener">IDP官方听力练习</a>
            </p>
          </div>

          {/* Questions */}
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="card-title">📝 答题区 ({section.questions.length} 题)</div>
            {section.questions.map((q, idx) => (
              <div key={q.id} style={{
                padding: "14px 0",
                borderBottom: "1px solid var(--color-border)",
              }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, color: "var(--color-primary)", minWidth: 28 }}>
                    Q{idx + 1}
                  </span>
                  <span style={{ fontWeight: 500 }}>{q.question}</span>
                </div>

                {/* Fill-in */}
                {q.type === "fill" && (
                  <div style={{ marginLeft: 36 }}>
                    <input
                      type="text"
                      value={userAnswers[q.id] || ""}
                      onChange={e => handleAnswer(q.id, e.target.value)}
                      disabled={submitted}
                      placeholder="输入你的答案..."
                      style={{
                        padding: "8px 14px", border: "1.5px solid var(--color-border)", borderRadius: "var(--radius-sm)",
                        width: "100%", maxWidth: 400, background: "var(--color-surface)", color: "var(--color-text)",
                        fontSize: "0.95rem",
                      }}
                    />
                    {submitted && (
                      <div style={{ marginTop: 6, fontSize: "0.85rem" }}>
                        {(userAnswers[q.id] || "").trim().toLowerCase() === q.answer.toLowerCase() ? (
                          <span style={{ color: "var(--color-success)" }}>✅ 正确！答案: {q.answer}</span>
                        ) : (
                          <span style={{ color: "var(--color-danger)" }}>❌ 你的答案: "{userAnswers[q.id] || "(未作答)"}" → 正确答案: {q.answer}</span>
                        )}
                      </div>
                    )}
                    {showHints && q.hint && !submitted && (
                      <div style={{ marginTop: 4, fontSize: "0.8rem", color: "var(--color-info)" }}>💡 {q.hint}</div>
                    )}
                    {submitted && (
                      <button className="btn btn-sm btn-outline" style={{ marginTop: 6 }}
                        onClick={() => {
                          dispatch({ type: "REMOVE_WRONG", payload: { module: "listening", questionId: q.id } });
                        }}>
                        🗑 从错题本移除
                      </button>
                    )}
                  </div>
                )}

                {/* Choice */}
                {q.type === "choice" && (
                  <div style={{ marginLeft: 36, display: "flex", flexDirection: "column", gap: 6 }}>
                    {q.options.map(opt => {
                      const optKey = opt.slice(0, 1); // "A. xxx" → "A"
                      const isSelected = (userAnswers[q.id] || "").toUpperCase() === optKey.toUpperCase();
                      const isCorrectAnswer = submitted && optKey.toUpperCase() === q.answer.toUpperCase();
                      const isWrong = submitted && isSelected && optKey.toUpperCase() !== q.answer.toUpperCase();

                      let bgColor = "transparent";
                      if (submitted && isCorrectAnswer) bgColor = "#dcfce7";
                      else if (isWrong) bgColor = "#fee2e2";
                      else if (isSelected) bgColor = "var(--color-primary-bg)";

                      return (
                        <label key={opt} style={{
                          display: "flex", alignItems: "center", gap: 8, padding: "8px 12px",
                          borderRadius: "var(--radius-sm)", cursor: submitted ? "default" : "pointer",
                          background: bgColor, border: isSelected ? "1.5px solid var(--color-primary)" : "1px solid var(--color-border)",
                          fontSize: "0.9rem",
                        }}>
                          <input
                            type="radio" name={q.id} value={optKey}
                            checked={isSelected}
                            onChange={() => handleAnswer(q.id, optKey)}
                            disabled={submitted}
                          />
                          {opt}
                          {submitted && isCorrectAnswer && <span style={{ marginLeft: 8 }}>✅</span>}
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Submit / Retry */}
          <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
            {!submitted ? (
              <button className="btn btn-primary" onClick={submitSection}
                disabled={Object.keys(userAnswers).length === 0}>
                📤 提交答案
              </button>
            ) : (
              <>
                <button className="btn btn-primary" onClick={() => startSection(section.id)}>
                  🔄 重新练习
                </button>
                <button className="btn btn-outline" onClick={() => setMode("sections")}>
                  📋 返回列表
                </button>
              </>
            )}
          </div>

          {/* Results summary */}
          {submitted && (
            <div className="card" style={{ marginBottom: 32 }}>
              <div className="card-title">📊 成绩分析</div>
              {(() => {
                const correct = section.questions.filter(q => {
                  const ua = (userAnswers[q.id] || "").trim();
                  return q.type === "choice"
                    ? ua.toUpperCase() === q.answer.toUpperCase()
                    : ua.toLowerCase() === q.answer.toLowerCase();
                }).length;
                const total = section.questions.length;
                const pct = Math.round((correct / total) * 100);
                const scaledScore = Math.round((correct / total) * 40);
                const band = scoreToBand(scaledScore);
                return (
                  <div>
                    <p><strong>正确: {correct} / {total}</strong> ({pct}%)</p>
                    <p>估算原始得分: {scaledScore}/40 → 对应 Band: <strong>{band}</strong></p>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginTop: 8 }}>
                      目标 Band 7.0 需要 30/40 正确率 (75%)。当前: {pct >= 75 ? "✅ 已达标" : `还需要 +${75 - pct}%`}
                    </p>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* Tips mode */}
      {mode === "tips" && (
        <div className="grid-2">
          {listeningTips.map(tip => (
            <div className="card" key={tip.id}>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>{tip.title}</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", lineHeight: 1.7 }}>{tip.detail}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
