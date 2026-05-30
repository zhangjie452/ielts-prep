import { useState } from "react";
import { useIeltsState, useIeltsDispatch } from "../context/IeltsContext";
import { readingPassages, readingTips } from "../data/readingData";

export default function Reading() {
  const state = useIeltsState();
  const dispatch = useIeltsDispatch();

  const [mode, setMode] = useState("passages"); // "passages" | "practice" | "tips"
  const [activePassage, setActivePassage] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPassage, setShowPassage] = useState(true);

  const passage = readingPassages.find(p => p.id === activePassage);

  function startPassage(pid) {
    setActivePassage(pid);
    setUserAnswers({});
    setSubmitted(false);
    setShowPassage(true);
    setMode("practice");
  }

  function handleAnswer(questionId, value) {
    if (submitted) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: value }));
  }

  function submitPassage() {
    if (!passage) return;
    setSubmitted(true);

    let correct = 0;
    const total = passage.questions.length;
    const wrongEntries = [];

    passage.questions.forEach(q => {
      const userAns = (userAnswers[q.id] || "").trim();
      const correctAns = q.answer;
      let isCorrect = false;

      if (q.type === "tfng" || q.type === "ynng") {
        isCorrect = userAns.toUpperCase() === correctAns.toUpperCase();
      } else if (q.type === "choice") {
        isCorrect = userAns.toUpperCase() === correctAns.toUpperCase();
      } else {
        // fill
        isCorrect = userAns.toLowerCase() === correctAns.toLowerCase();
      }

      if (isCorrect) {
        correct++;
      } else {
        wrongEntries.push({
          module: "reading",
          questionId: q.id,
          userAnswer: userAns || "(未作答)",
          correctAnswer: correctAns,
        });
      }
    });

    const score = Math.round((correct / total) * 40);
    const band = scoreToBand(score);

    dispatch({ type: "ADD_SCORE", payload: { module: "reading", score: `${correct}/${total}`, total: 40, band } });
    wrongEntries.forEach(w => dispatch({ type: "ADD_WRONG", payload: w }));
    dispatch({ type: "UPDATE_PROGRESS", payload: { skill: "reading", value: Math.round((correct / total) * 100) } });
    dispatch({ type: "ADD_LEARNING_TIME", payload: { minutes: 25 } });
  }

  function scoreToBand(rawScore) {
    // Academic Reading band mapping (out of 40)
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
        <h1>📖 阅读理解</h1>
        <p>IELTS Academic Reading · 3篇文章 · 40道题 · 60分钟</p>
      </div>

      {/* Mode tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {["passages", "tips"].map(m => (
          <button key={m}
            className={`btn ${mode === m ? "btn-primary" : "btn-outline"} btn-sm`}
            onClick={() => { setMode(m); if (m !== "practice") { setActivePassage(null); setSubmitted(false); } }}>
            {m === "passages" ? "📄 模拟文章" : "💡 阅读策略"}
          </button>
        ))}
      </div>

      {/* Passages list */}
      {mode === "passages" && (
        <div className="grid-2">
          {readingPassages.map(p => (
            <div className="card" key={p.id} style={{ cursor: "pointer" }}
              onClick={() => startPassage(p.id)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 8 }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>{p.title}</h3>
                <span style={{ fontSize: "0.8rem" }}>{difficultyLabel[p.difficulty]}</span>
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--color-text-secondary)", marginBottom: 12 }}>
                {p.description}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
                  {p.wordCount} 词 · {p.questions.length} 题
                </span>
                <button className="btn btn-primary btn-sm">开始阅读 →</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Practice mode */}
      {mode === "practice" && passage && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <button className="btn btn-outline btn-sm" onClick={() => setMode("passages")}>← 返回</button>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 600 }}>{passage.title}</h2>
            <span>{difficultyLabel[passage.difficulty]}</span>
            <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
              {passage.wordCount} 词 · {passage.questions.length} 题
            </span>
            <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.85rem", cursor: "pointer", marginLeft: "auto" }}>
              <input type="checkbox" checked={showPassage} onChange={e => setShowPassage(e.target.checked)} />
              显示文章
            </label>
          </div>

          {/* Passage text */}
          {showPassage && (
            <div className="card" style={{
              marginBottom: 20, maxHeight: 360, overflowY: "auto",
              background: "var(--color-primary-bg)", borderColor: "var(--color-primary)",
              fontFamily: "var(--font-en)", lineHeight: 1.9, fontSize: "0.92rem",
            }}>
              {passage.passage.split("\n\n").map((para, i) => (
                <p key={i} style={{ marginBottom: 14 }}>{para.trim()}</p>
              ))}
            </div>
          )}

          {/* Questions */}
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="card-title">📝 题目 ({passage.questions.length} 题)</div>
            {passage.questions.map((q, idx) => (
              <div key={q.id} style={{ padding: "14px 0", borderBottom: "1px solid var(--color-border)" }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, color: "var(--color-primary)", minWidth: 28 }}>
                    Q{idx + 1}
                  </span>
                  <span style={{ fontWeight: 500 }}>
                    {q.question}
                    {(q.type === "tfng" || q.type === "ynng") && (
                      <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginLeft: 8 }}>
                        [{q.type.toUpperCase()}]
                      </span>
                    )}
                  </span>
                </div>

                {/* TFNG / YNNG */}
                {(q.type === "tfng" || q.type === "ynng") && (
                  <div style={{ marginLeft: 36 }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      {(q.type === "tfng"
                        ? ["TRUE", "FALSE", "NOT GIVEN"]
                        : ["YES", "NO", "NOT GIVEN"]
                      ).map(opt => {
                        const selected = (userAnswers[q.id] || "").toUpperCase() === opt;
                        const isCorrectAnswer = submitted && opt === q.answer;
                        const isWrong = submitted && selected && opt !== q.answer;
                        let bg = "transparent";
                        if (submitted && isCorrectAnswer) bg = "#dcfce7";
                        else if (isWrong) bg = "#fee2e2";
                        else if (selected) bg = "var(--color-primary-bg)";
                        return (
                          <button key={opt}
                            className={`btn btn-sm ${selected ? "btn-primary" : "btn-outline"}`}
                            style={{ background: bg, fontSize: "0.8rem" }}
                            onClick={() => handleAnswer(q.id, opt)}
                            disabled={submitted}>
                            {opt}{submitted && isCorrectAnswer ? " ✅" : ""}
                          </button>
                        );
                      })}
                    </div>
                    {submitted && (
                      <div style={{ marginTop: 6, fontSize: "0.85rem" }}>
                        {(userAnswers[q.id] || "").toUpperCase() === q.answer.toUpperCase() ? (
                          <span style={{ color: "var(--color-success)" }}>✅ 正确！</span>
                        ) : (
                          <span style={{ color: "var(--color-danger)" }}>
                            ❌ 正确答案: {q.answer}
                          </span>
                        )}
                        {q.explanation && <span style={{ color: "var(--color-text-secondary)", marginLeft: 8 }}>({q.explanation})</span>}
                      </div>
                    )}
                  </div>
                )}

                {/* Fill */}
                {q.type === "fill" && (
                  <div style={{ marginLeft: 36 }}>
                    <input type="text" value={userAnswers[q.id] || ""}
                      onChange={e => handleAnswer(q.id, e.target.value)}
                      disabled={submitted}
                      placeholder="输入答案..."
                      style={{
                        padding: "8px 14px", border: "1.5px solid var(--color-border)", borderRadius: "var(--radius-sm)",
                        width: "100%", maxWidth: 400, background: "var(--color-surface)", color: "var(--color-text)",
                      }} />
                    {submitted && (
                      <div style={{ marginTop: 6, fontSize: "0.85rem" }}>
                        {(userAnswers[q.id] || "").trim().toLowerCase() === q.answer.toLowerCase() ? (
                          <span style={{ color: "var(--color-success)" }}>✅ 正确！</span>
                        ) : (
                          <span style={{ color: "var(--color-danger)" }}>
                            ❌ 正确答案: {q.answer}
                          </span>
                        )}
                        {q.explanation && <span style={{ color: "var(--color-text-secondary)", marginLeft: 8 }}>({q.explanation})</span>}
                      </div>
                    )}
                  </div>
                )}

                {/* Choice */}
                {q.type === "choice" && (
                  <div style={{ marginLeft: 36, display: "flex", flexDirection: "column", gap: 6 }}>
                    {q.options.map(opt => {
                      const optKey = opt.slice(0, 1);
                      const selected = (userAnswers[q.id] || "").toUpperCase() === optKey.toUpperCase();
                      const correct = submitted && optKey.toUpperCase() === q.answer.toUpperCase();
                      const wrong = submitted && selected && !correct;
                      let bg = "transparent";
                      if (submitted && correct) bg = "#dcfce7";
                      else if (wrong) bg = "#fee2e2";
                      else if (selected) bg = "var(--color-primary-bg)";
                      return (
                        <label key={opt} style={{
                          display: "flex", alignItems: "center", gap: 8, padding: "8px 12px",
                          borderRadius: "var(--radius-sm)", cursor: submitted ? "default" : "pointer",
                          background: bg, border: selected ? "1.5px solid var(--color-primary)" : "1px solid var(--color-border)",
                          fontSize: "0.9rem",
                        }}>
                          <input type="radio" name={q.id} value={optKey}
                            checked={selected}
                            onChange={() => handleAnswer(q.id, optKey)}
                            disabled={submitted} />
                          {opt}
                          {submitted && correct && <span>✅</span>}
                        </label>
                      );
                    })}
                    {submitted && (
                      <div style={{ fontSize: "0.85rem", marginTop: 4 }}>
                        {(userAnswers[q.id] || "").toUpperCase() === q.answer.toUpperCase() ? (
                          <span style={{ color: "var(--color-success)" }}>✅ 正确！</span>
                        ) : (
                          <span style={{ color: "var(--color-danger)" }}>❌ 正确答案: {q.answer}</span>
                        )}
                        {q.explanation && <span style={{ color: "var(--color-text-secondary)", marginLeft: 8 }}>({q.explanation})</span>}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Submit */}
          <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
            {!submitted ? (
              <button className="btn btn-primary" onClick={submitPassage}>
                📤 提交答案
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => startPassage(passage.id)}>
                🔄 重新练习
              </button>
            )}
          </div>

          {/* Results */}
          {submitted && (
            <div className="card">
              <div className="card-title">📊 成绩分析</div>
              {(() => {
                const correct = passage.questions.filter(q => {
                  const ua = (userAnswers[q.id] || "").trim();
                  const correctAns = q.answer;
                  if (q.type === "fill") return ua.toLowerCase() === correctAns.toLowerCase();
                  return ua.toUpperCase() === correctAns.toUpperCase();
                }).length;
                const total = passage.questions.length;
                const pct = Math.round((correct / total) * 100);
                const scaled = Math.round((correct / total) * 40);
                const band = scoreToBand(scaled);
                return (
                  <div>
                    <p><strong>正确: {correct} / {total}</strong> ({pct}%)</p>
                    <p>估算得分: {scaled}/40 → Band: <strong>{band}</strong></p>
                    <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginTop: 8 }}>
                      目标 Band 7.0 = 30/40 (75%)。当前: {pct >= 75 ? "✅ 已达标" : `还需 +${75 - pct}%`}
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
          {readingTips.map(tip => (
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
