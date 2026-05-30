import { useState } from "react";
import { useIeltsState, useIeltsDispatch } from "../context/IeltsContext";
import { writingTasks, writingBandDescriptors, writingTips } from "../data/writingData";

export default function Writing() {
  const state = useIeltsState();
  const dispatch = useIeltsDispatch();

  const [tab, setTab] = useState("task1"); // "task1" | "task2" | "tips" | "descriptors"
  const [selectedTask, setSelectedTask] = useState(null);
  const [showSample, setShowSample] = useState(false);

  const tasks = tab === "task1" ? writingTasks.task1 : writingTasks.task2;

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1>✍️ 写作训练</h1>
        <p>IELTS Writing · Task 1 (150词/20min) + Task 2 (250词/40min) · Task 2 占 2/3 分值</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {[
          { key: "task1", label: "📊 Task 1 图表写作" },
          { key: "task2", label: "📝 Task 2 大作文" },
          { key: "tips", label: "💡 写作技巧" },
          { key: "descriptors", label: "📋 评分标准" },
        ].map(t => (
          <button key={t.key}
            className={`btn ${tab === t.key ? "btn-primary" : "btn-outline"} btn-sm`}
            onClick={() => { setTab(t.key); setSelectedTask(null); setShowSample(false); }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tasks list */}
      {(tab === "task1" || tab === "task2") && !selectedTask && (
        <div className="grid-2">
          {tasks.map(t => (
            <div className="card" key={t.id} style={{ cursor: "pointer" }}
              onClick={() => { setSelectedTask(t.id); setShowSample(false); }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>{t.title}</h3>
                <span style={{ fontSize: "0.8rem", background: "var(--color-primary-bg)", color: "var(--color-primary)",
                  padding: "2px 10px", borderRadius: 20 }}>
                  {t.type || t.id.includes("t1") ? "Task 1" : "Task 2"}
                </span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", lineHeight: 1.6, display: "-webkit-box",
                WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {t.question}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
                <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
                  {t.wordCount ? `范文 ${t.wordCount} 词` : ""}
                  {t.score ? ` · Band ${t.score.ta}` : ""}
                </span>
                <button className="btn btn-primary btn-sm">查看详情 →</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Task detail */}
      {(tab === "task1" || tab === "task2") && selectedTask && (
        <div>
          <button className="btn btn-outline btn-sm" style={{ marginBottom: 16 }}
            onClick={() => { setSelectedTask(null); setShowSample(false); }}>
            ← 返回列表
          </button>

          {tasks.filter(t => t.id === selectedTask).map(t => (
            <div key={t.id}>
              {/* Question card */}
              <div className="card" style={{ marginBottom: 20 }}>
                <div className="card-title">📋 题目</div>
                <h3 style={{ marginBottom: 12 }}>{t.title}</h3>
                <p style={{ lineHeight: 1.8, marginBottom: 12 }}>{t.question}</p>
                {t.dataDescription && (
                  <div style={{
                    background: "var(--color-primary-bg)", padding: "12px 16px", borderRadius: "var(--radius-sm)",
                    fontSize: "0.85rem", color: "var(--color-text-secondary)",
                  }}>
                    <strong>数据描述：</strong>{t.dataDescription}
                  </div>
                )}
                {t.keywords && (
                  <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6 }}>
                    <strong style={{ fontSize: "0.85rem" }}>关键词：</strong>
                    {t.keywords.map(kw => (
                      <span key={kw} style={{
                        padding: "2px 10px", borderRadius: 20, background: "var(--color-border)",
                        fontSize: "0.8rem", color: "var(--color-text-secondary)",
                      }}>{kw}</span>
                    ))}
                  </div>
                )}
                {t.score && (
                  <div style={{ marginTop: 12, fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
                    范文评分: TA={t.score.ta} CC={t.score.cc} LR={t.score.lr} GRA={t.score.gra}
                  </div>
                )}
              </div>

              {/* Sample answer toggle */}
              <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                <button className={`btn ${showSample ? "btn-outline" : "btn-primary"} btn-sm`}
                  onClick={() => setShowSample(true)}>
                  📖 查看范文
                </button>
                {showSample && (
                  <button className="btn btn-outline btn-sm" onClick={() => setShowSample(false)}>
                    🔽 收起范文
                  </button>
                )}
              </div>

              {showSample && (
                <div className="card" style={{
                  marginBottom: 20, fontFamily: "var(--font-en)", lineHeight: 1.9,
                  fontSize: "0.92rem", maxHeight: 500, overflowY: "auto",
                }}>
                  <div className="card-title">📖 范文 (Band {t.score?.ta || "—"})</div>
                  {t.sampleAnswer.split("\n\n").map((para, i) => (
                    <p key={i} style={{ marginBottom: 14 }}>{para.trim()}</p>
                  ))}
                </div>
              )}

              {/* Writing instructions */}
              <div className="card" style={{ background: "var(--color-primary-bg)", borderColor: "var(--color-primary)" }}>
                <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>
                  💡 <strong>练习建议：</strong>设定计时器（Task 1: 20分钟，Task 2: 40分钟），手写后对照范文分析差距。关注同义表达、段落结构和逻辑连接词。可以用 <a href="https://ielts.idp.com/prepare/writing" target="_blank" rel="noopener">IDP</a> 或 <a href="https://takeielts.britishcouncil.org/prepare/writing" target="_blank" rel="noopener">British Council</a> 的写作评分服务获得专业反馈。
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tips */}
      {tab === "tips" && (
        <div className="grid-2">
          {writingTips.map(tip => (
            <div className="card" key={tip.id}>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8 }}>{tip.title}</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", lineHeight: 1.7 }}>{tip.detail}</p>
            </div>
          ))}
        </div>
      )}

      {/* Band descriptors */}
      {tab === "descriptors" && (
        <div>
          <h3 style={{ marginBottom: 16 }}>Task 1 评分标准 (TA = Task Achievement, CC = Coherence, LR = Lexical Resource, GRA = Grammar)</h3>
          <div className="card" style={{ marginBottom: 24, overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
                  <th style={{ padding: "8px 12px", textAlign: "left" }}>Band</th>
                  <th style={{ padding: "8px 12px", textAlign: "left" }}>TA</th>
                  <th style={{ padding: "8px 12px", textAlign: "left" }}>CC</th>
                  <th style={{ padding: "8px 12px", textAlign: "left" }}>LR</th>
                  <th style={{ padding: "8px 12px", textAlign: "left" }}>GRA</th>
                </tr>
              </thead>
              <tbody>
                {writingBandDescriptors.task1.map(row => (
                  <tr key={row.band} style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "8px 12px", fontWeight: 700 }}>Band {row.band}</td>
                    <td style={{ padding: "8px 12px" }}>{row.ta}</td>
                    <td style={{ padding: "8px 12px" }}>{row.cc}</td>
                    <td style={{ padding: "8px 12px" }}>{row.lr}</td>
                    <td style={{ padding: "8px 12px" }}>{row.gra}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 style={{ marginBottom: 16 }}>Task 2 评分标准</h3>
          <div className="card" style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
                  <th style={{ padding: "8px 12px", textAlign: "left" }}>Band</th>
                  <th style={{ padding: "8px 12px", textAlign: "left" }}>TA</th>
                  <th style={{ padding: "8px 12px", textAlign: "left" }}>CC</th>
                  <th style={{ padding: "8px 12px", textAlign: "left" }}>LR</th>
                  <th style={{ padding: "8px 12px", textAlign: "left" }}>GRA</th>
                </tr>
              </thead>
              <tbody>
                {writingBandDescriptors.task2.map(row => (
                  <tr key={row.band} style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "8px 12px", fontWeight: 700 }}>Band {row.band}</td>
                    <td style={{ padding: "8px 12px" }}>{row.ta}</td>
                    <td style={{ padding: "8px 12px" }}>{row.cc}</td>
                    <td style={{ padding: "8px 12px" }}>{row.lr}</td>
                    <td style={{ padding: "8px 12px" }}>{row.gra}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
