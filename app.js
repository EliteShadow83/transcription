const presetWordsByLanguage = {
  English: ["Hello", "Please", "Thank you", "Yes", "No", "How are you?"],
  Hebrew: ["שלום", "בבקשה", "תודה", "כן", "לא", "מה שלומך?"]
};

const languageSelect = document.getElementById("language-select");
const wordBank = document.getElementById("word-bank");
const textblock = document.getElementById("textblock");
const customInput = document.getElementById("custom-input");
const addCustomButton = document.getElementById("add-custom");
const addPresetButton = document.getElementById("add-preset");
const clearButton = document.getElementById("clear");
const copyButton = document.getElementById("copy");
const status = document.getElementById("status");

function appendToTextblock(token) {
  const trimmedToken = token.trim();
  if (!trimmedToken) return;

  const spacer = textblock.value.trim().length ? " " : "";
  textblock.value += `${spacer}${trimmedToken}`;
  textblock.focus();
}

function renderWordButtons(language) {
  wordBank.innerHTML = "";

  presetWordsByLanguage[language].forEach((word) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "word-btn";
    button.textContent = word;
    button.addEventListener("click", () => appendToTextblock(word));
    wordBank.appendChild(button);
  });
}

function addCustomInputAsPreset() {
  const newPreset = customInput.value.trim();
  if (!newPreset) {
    status.textContent = "Type a word or phrase before adding a preset.";
    return;
  }

  const language = languageSelect.value;
  if (presetWordsByLanguage[language].includes(newPreset)) {
    status.textContent = `"${newPreset}" already exists in ${language} presets.`;
    return;
  }

  presetWordsByLanguage[language].push(newPreset);
  renderWordButtons(language);
  status.textContent = `Added "${newPreset}" to ${language} presets.`;
  customInput.value = "";
  customInput.focus();
}

Object.keys(presetWordsByLanguage).forEach((language) => {
  const option = document.createElement("option");
  option.value = language;
  option.textContent = language;
  languageSelect.appendChild(option);
});

languageSelect.addEventListener("change", () => {
  renderWordButtons(languageSelect.value);
  status.textContent = "";
});

addCustomButton.addEventListener("click", () => {
  appendToTextblock(customInput.value);
  customInput.value = "";
  customInput.focus();
  status.textContent = "";
});

addPresetButton.addEventListener("click", addCustomInputAsPreset);

customInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addCustomButton.click();
  }
});

clearButton.addEventListener("click", () => {
  textblock.value = "";
  status.textContent = "Textblock cleared.";
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(textblock.value);
    status.textContent = "Textblock copied to clipboard.";
  } catch {
    status.textContent = "Could not copy automatically. Please copy manually.";
  }
});

languageSelect.value = "English";
renderWordButtons(languageSelect.value);
