import { useState } from "react";
import {
  vocabularyCategories, grammarPoints, synonymBank, vocabularyTips
} from "../data/vocabularyData";

function Flashcard({ word, onNext }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div style={{
      perspective: "800px", width: "100%", maxWidth: 380, height: 200, margin: "0 auto",
      cursor: "pointer",
    }} onClick={() => setFlipped(!flipped)}>
      <div style={{
        width: "100%", height: "100%", position: "relative",
        transformStyle: "preserve-3d", transition: "transform 0.5s",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
      }}>
        {/* Front */}
        <div style={{
          position: "absolute", width: "100%", height: "100%", backfaceVisibility: "hidden",
          borderRadius: "var(--radius-md)", border: "2px solid var(--color-border)",
          background: "var(--color-surface)", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", padding: 20,
        }}>
          <div style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: 4, fontFamily: "var(--font-en)" }}>
            {word.word}
          </div>
          <div style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>{word.pos}</div>
          <div style={{ fontSize: "0.8rem", marginTop: 8, padding: "2px 10px",
            borderRadius: 20, background: "var(--color-primary-bg)", color: "var(--color-primary)" }}>
            Band {word.band}
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: 12 }}>点击翻转查看释义</p>
        </div>
        {/* Back */}
        <div style={{
          position: "absolute", width: "100%", height: "100%", backfaceVisibility: "hidden",
          borderRadius: "var(--radius-md)", border: "2px solid var(--color-primary)",
          background: "var(--color-primary-bg)", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", padding: 20,
          transform: "rotateY(180deg)",
        }}>
          <div style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 8, textAlign: "center" }}>
            {word.meaning}
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", textAlign: "center",
            lineHeight: 1.6, fontStyle: "italic" }}>
            "{word.example}"
          </p>
          <button className="btn btn-primary btn-sm" style={{ marginTop: 12 }}
            onClick={e => { e.stopPropagation(); onNext(); }}>
            👉 下一个
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Vocabulary() {
  const [tab, setTab] = useState("flashcard"); // "flashcard" | "list" | "synonyms" | "grammar" | "tips"
  const [activeCat, setActiveCat] = useState("v1");
  const [cardIdx, setCardIdx] = useState(0);
  const [synonymSearch, setSynonymSearch] = useState("");
  const [grammarTab, setGrammarTab] = useState("g1");

  const currentCat = vocabularyCategories.find(c => c.id === activeCat);
  const currentWords = currentCat?.words || [];
  const currentWord = currentWords[cardIdx % currentWords.length];

  const filteredSynonyms = synonymBank.filter(s =>
    s.basic.toLowerCase().includes(synonymSearch.toLowerCase())
  );

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1>📚 词汇 & 语法</h1>
        <p>雅思核心词汇+同义替换+语法要点 — Band 7+ 必备基础</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {[
          { key: "flashcard", label: "🃏 闪卡记忆" },
          { key: "list", label: "📋 词汇列表" },
          { key: "synonyms", label: "🔄 同义替换" },
          { key: "grammar", label: "📐 语法要点" },
          { key: "tips", label: "💡 学习技巧" },
        ].map(t => (
          <button key={t.key}
            className={`btn ${tab === t.key ? "btn-primary" : "btn-outline"} btn-sm`}
            onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Flashcard mode */}
      {tab === "flashcard" && (
        <div>
          {/* Category selector */}
          <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
            {vocabularyCategories.map(cat => (
              <button key={cat.id}
                className={`btn ${activeCat === cat.id ? "btn-primary" : "btn-outline"} btn-sm`}
                onClick={() => { setActiveCat(cat.id); setCardIdx(0); }}>
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          {/* Card */}
          {currentWord && (
            <Flashcard word={currentWord} onNext={() => setCardIdx(i => (i + 1) % currentWords.length)} />
          )}

          {/* Progress */}
          <div style={{ textAlign: "center", marginTop: 16, fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
            {cardIdx + 1} / {currentWords.length} · {currentCat?.name}
          </div>
        </div>
      )}

      {/* List mode */}
      {tab === "list" && (
        <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            {vocabularyCategories.map(cat => (
              <button key={cat.id}
                className={`btn ${activeCat === cat.id ? "btn-primary" : "btn-outline"} btn-sm`}
                onClick={() => setActiveCat(cat.id)}>
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
          <div className="card" style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
                  <th style={{ padding: "8px 12px", textAlign: "left", width: "20%" }}>词汇</th>
                  <th style={{ padding: "8px 12px", textAlign: "left", width: "10%" }}>词性</th>
                  <th style={{ padding: "8px 12px", textAlign: "left", width: "25%" }}>释义</th>
                  <th style={{ padding: "8px 12px", textAlign: "left" }}>例句</th>
                  <th style={{ padding: "8px 12px", textAlign: "center", width: "10%" }}>Band</th>
                </tr>
              </thead>
              <tbody>
                {currentWords.map((w, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "8px 12px", fontWeight: 600, fontFamily: "var(--font-en)" }}>{w.word}</td>
                    <td style={{ padding: "8px 12px", color: "var(--color-text-secondary)" }}>{w.pos}</td>
                    <td style={{ padding: "8px 12px" }}>{w.meaning}</td>
                    <td style={{ padding: "8px 12px", fontSize: "0.85rem", color: "var(--color-text-secondary)",
                      fontStyle: "italic" }}>{w.example}</td>
                    <td style={{ padding: "8px 12px", textAlign: "center" }}>
                      <span style={{
                        padding: "2px 8px", borderRadius: 20, fontSize: "0.8rem",
                        background: w.band === "8+" ? "#fef3c7" : "var(--color-primary-bg)",
                        color: w.band === "8+" ? "#92400e" : "var(--color-primary)",
                      }}>{w.band}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Synonyms */}
      {tab === "synonyms" && (
        <div>
          <input type="text" placeholder="🔍 搜索基础词 (如: important, good, increase...)"
            value={synonymSearch} onChange={e => setSynonymSearch(e.target.value)}
            style={{
              padding: "10px 16px", border: "1.5px solid var(--color-border)", borderRadius: "var(--radius-sm)",
              width: "100%", maxWidth: 400, marginBottom: 20, fontSize: "0.95rem",
              background: "var(--color-surface)", color: "var(--color-text)",
            }} />
          <div className="grid-2">
            {filteredSynonyms.map(s => (
              <div className="card" key={s.basic}>
                <div style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 8, fontFamily: "var(--font-en)" }}>
                  {s.basic}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {s.advanced.map((adv, i) => (
                    <span key={i} style={{
                      padding: "4px 12px", borderRadius: 20, fontSize: "0.85rem",
                      background: "var(--color-primary-bg)", color: "var(--color-primary)",
                    }}>{adv}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grammar */}
      {tab === "grammar" && (
        <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
            {grammarPoints.map(gp => (
              <button key={gp.id}
                className={`btn ${grammarTab === gp.id ? "btn-primary" : "btn-outline"} btn-sm`}
                onClick={() => setGrammarTab(gp.id)}>
                {gp.title}
              </button>
            ))}
          </div>
          {grammarPoints.filter(gp => gp.id === grammarTab).map(gp => (
            <div className="card" key={gp.id} style={{ overflowX: "auto" }}>
              <h3 style={{ marginBottom: 16 }}>{gp.title}</h3>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
                    <th style={{ padding: "8px 12px", textAlign: "left", width: "20%" }}>类型</th>
                    <th style={{ padding: "8px 12px", textAlign: "left", width: "28%" }}>结构</th>
                    <th style={{ padding: "8px 12px", textAlign: "left" }}>例句</th>
                    <th style={{ padding: "8px 12px", textAlign: "left", width: "18%" }}>用法</th>
                  </tr>
                </thead>
                <tbody>
                  {gp.examples.map((ex, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid var(--color-border)" }}>
                      <td style={{ padding: "8px 12px", fontWeight: 600 }}>{ex.type}</td>
                      <td style={{ padding: "8px 12px", fontFamily: "var(--font-mono)", fontSize: "0.82rem",
                        color: "var(--color-primary)" }}>{ex.structure}</td>
                      <td style={{ padding: "8px 12px", fontStyle: "italic", fontSize: "0.84rem" }}>{ex.example}</td>
                      <td style={{ padding: "8px 12px", color: "var(--color-text-secondary)", fontSize: "0.82rem" }}>{ex.usage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {/* Tips */}
      {tab === "tips" && (
        <div className="grid-2">
          {vocabularyTips.map(tip => (
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
