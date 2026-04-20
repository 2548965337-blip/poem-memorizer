const poems = [
  {
    id: 1,
    title: "静夜思",
    author: "李白",
    dynasty: "唐",
    content: "床前明月光，疑是地上霜。\n举头望明月，低头思故乡。"
  },
  {
    id: 2,
    title: "登鹳雀楼",
    author: "王之涣",
    dynasty: "唐",
    content: "白日依山尽，黄河入海流。\n欲穷千里目，更上一层楼。"
  },
  {
    id: 3,
    title: "春晓",
    author: "孟浩然",
    dynasty: "唐",
    content: "春眠不觉晓，处处闻啼鸟。\n夜来风雨声，花落知多少。"
  },
  {
    id: 4,
    title: "望庐山瀑布",
    author: "李白",
    dynasty: "唐",
    content: "日照香炉生紫烟，遥看瀑布挂前川。\n飞流直下三千尺，疑是银河落九天。"
  }
];

const poemSelect = document.getElementById("poemSelect");
const poemTitle = document.getElementById("poemTitle");
const poemMeta = document.getElementById("poemMeta");
const hintText = document.getElementById("hintText");
const fullPoemText = document.getElementById("fullPoemText");
const fullPoemDetails = document.getElementById("fullPoemDetails");
const practiceInput = document.getElementById("practiceInput");
const resultBox = document.getElementById("resultBox");

const showHintBtn = document.getElementById("showHintBtn");
const showAnswerBtn = document.getElementById("showAnswerBtn");
const checkBtn = document.getElementById("checkBtn");
const clearBtn = document.getElementById("clearBtn");

function normalize(text) {
  return text
    .replace(/[，。！？；、,.!?;\s]/g, "")
    .trim();
}

function getCurrentPoem() {
  const id = Number(poemSelect.value);
  return poems.find((poem) => poem.id === id) || poems[0];
}

function makeHint(content) {
  return content
    .split("\n")
    .map((line) => {
      const clean = line.trim();
      if (clean.length <= 2) {
        return clean;
      }
      return `${clean.slice(0, 2)}...${clean.slice(-2)}`;
    })
    .join("\n");
}

function renderPoem() {
  const poem = getCurrentPoem();
  poemTitle.textContent = poem.title;
  poemMeta.textContent = `${poem.dynasty} · ${poem.author}`;
  hintText.textContent = "";
  fullPoemText.textContent = poem.content;
  fullPoemDetails.open = false;
  resultBox.textContent = "";
  resultBox.className = "result";
  practiceInput.value = "";
}

function initPoemList() {
  const optionsHtml = poems
    .map((poem) => `<option value="${poem.id}">${poem.title}（${poem.author}）</option>`)
    .join("");
  poemSelect.innerHTML = optionsHtml;
}

function showHint() {
  const poem = getCurrentPoem();
  hintText.textContent = `提示：\n${makeHint(poem.content)}`;
}

function showAnswer() {
  fullPoemDetails.open = true;
}

function checkAnswer() {
  const poem = getCurrentPoem();
  const expected = normalize(poem.content);
  const actual = normalize(practiceInput.value);

  if (!actual) {
    resultBox.textContent = "请先默写后再检查。";
    resultBox.className = "result warn";
    return;
  }

  let score = Math.round((Math.min(actual.length, expected.length) / expected.length) * 100);

  if (actual === expected) {
    resultBox.textContent = "太棒了！默写完全正确，得分 100 分。";
    resultBox.className = "result good";
    return;
  }

  const prefixLen = longestCommonPrefix(expected, actual);
  score = Math.max(Math.round((prefixLen / expected.length) * 100), 10);

  resultBox.textContent = `继续加油，当前准确度约 ${score} 分。建议对照原文查漏补缺。`;
  resultBox.className = "result warn";
}

function longestCommonPrefix(a, b) {
  const len = Math.min(a.length, b.length);
  let i = 0;
  while (i < len && a[i] === b[i]) {
    i += 1;
  }
  return i;
}

function clearInput() {
  practiceInput.value = "";
  resultBox.textContent = "已清空，可重新默写。";
  resultBox.className = "result";
}

poemSelect.addEventListener("change", renderPoem);
showHintBtn.addEventListener("click", showHint);
showAnswerBtn.addEventListener("click", showAnswer);
checkBtn.addEventListener("click", checkAnswer);
clearBtn.addEventListener("click", clearInput);

initPoemList();
renderPoem();
