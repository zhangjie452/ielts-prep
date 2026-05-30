// IELTS App - 全局 Context 和状态管理
import { createContext, useContext, useReducer, useEffect } from "react";

const IeltsContext = createContext(null);
const IeltsDispatch = createContext(null);

const STORAGE_KEY = "ielts_app_data";

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore */ }
  return null;
}

function saveToStorage(state) {
  try {
    // don"t persist UI-only transient fields
    const { uiTheme, ...persistable } = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persistable));
  } catch (e) { /* ignore */ }
}

const initialState = {
  // theme
  darkMode: false,

  // exam target
  examDate: null,             // ISO date string
  targetOverall: 7.0,
  targetScores: { L: 6.5, R: 6.5, W: 6.5, S: 6.5 },

  // progress trackers (0-100 % per skill)
  progress: { listening: 0, reading: 0, writing: 0, speaking: 0 },

  // daily check-in: map dateStr -> true
  checkIns: {},

  // module scores history: [{module, score, total, date}]
  scoreHistory: [],

  // wrong answers: [{module, questionId, userAnswer, correctAnswer, date}]
  wrongBook: [],

  // learning time in minutes per day: { dateStr: minutes }
  learningTime: {},

  // settings
  examType: "academic",       // "academic" | "general"
};

function reducer(state, action) {
  let next;
  switch (action.type) {
    case "TOGGLE_DARK_MODE":
      next = { ...state, darkMode: !state.darkMode };
      break;

    case "SET_EXAM_DATE":
      next = { ...state, examDate: action.payload };
      break;

    case "SET_TARGET":
      next = { ...state, targetOverall: action.payload.overall, targetScores: { ...state.targetScores, ...action.payload.scores } };
      break;

    case "UPDATE_PROGRESS":
      next = {
        ...state,
        progress: { ...state.progress, [action.payload.skill]: Math.min(100, Math.max(0, action.payload.value)) }
      };
      break;

    case "CHECK_IN_TODAY": {
      const today = new Date().toISOString().slice(0, 10);
      if (state.checkIns[today]) return state;
      next = { ...state, checkIns: { ...state.checkIns, [today]: true } };
      break;
    }

    case "ADD_SCORE": {
      const entry = { ...action.payload, date: new Date().toISOString() };
      next = { ...state, scoreHistory: [...state.scoreHistory, entry] };
      break;
    }

    case "ADD_WRONG": {
      const entry = { ...action.payload, date: new Date().toISOString() };
      // avoid duplicate
      const exists = state.wrongBook.find(w => w.module === entry.module && w.questionId === entry.questionId);
      if (exists) return state;
      next = { ...state, wrongBook: [...state.wrongBook, entry] };
      break;
    }

    case "REMOVE_WRONG":
      next = { ...state, wrongBook: state.wrongBook.filter(w => !(w.module === action.payload.module && w.questionId === action.payload.questionId)) };
      break;

    case "ADD_LEARNING_TIME":
      const d = new Date().toISOString().slice(0, 10);
      next = { ...state, learningTime: { ...state.learningTime, [d]: (state.learningTime[d] || 0) + (action.payload.minutes || 0) } };
      break;

    case "SET_EXAM_TYPE":
      next = { ...state, examType: action.payload };
      break;

    case "IMPORT_DATA":
      try {
        const imported = typeof action.payload === "string" ? JSON.parse(action.payload) : action.payload;
        next = { ...state, ...imported };
      } catch (e) {
        return state;
      }
      break;

    case "RESET_ALL":
      next = { ...initialState };
      break;

    default:
      return state;
  }
  saveToStorage(next);
  return next;
}

// Hydrate from localStorage
function useInitState() {
  const saved = loadFromStorage();
  if (saved) {
    return { ...initialState, ...saved, darkMode: initialState.darkMode };
  }
  return initialState;
}

export function IeltsProvider({ children }) {
  const init = useInitState();
  const [state, dispatch] = useReducer(reducer, init);

  // persist dark mode preference to <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", state.darkMode ? "dark" : "light");
  }, [state.darkMode]);

  return (
    <IeltsContext.Provider value={state}>
      <IeltsDispatch.Provider value={dispatch}>
        {children}
      </IeltsDispatch.Provider>
    </IeltsContext.Provider>
  );
}

export function useIeltsState() {
  const ctx = useContext(IeltsContext);
  if (ctx === null) throw new Error("useIeltsState must be inside IeltsProvider");
  return ctx;
}

export function useIeltsDispatch() {
  const ctx = useContext(IeltsDispatch);
  if (ctx === null) throw new Error("useIeltsDispatch must be inside IeltsProvider");
  return ctx;
}
