export function filterNoneDecision() {
  return candidate => candidate.decision;
}

export function searchPhraseFilter(phrase) {
  const startsWith = phrase.length < 2;

  return candidate =>
    doesHaveThisPhrase(
      phrase,
      startsWith,
      candidate.name,
      candidate.lastname,
      candidate.email
    );
}

function doesHaveThisPhrase(phrase, startsWith, ...checkedTexts) {
  if (startsWith) {
    return (
      checkedTexts.find(text =>
        text.toLowerCase().startsWith(phrase.toLowerCase())
      ) !== undefined
    );
  }
  return (
    checkedTexts.find(text =>
      text.toLowerCase().includes(phrase.toLowerCase())
    ) !== undefined
  );
}
