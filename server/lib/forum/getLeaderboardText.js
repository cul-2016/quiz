module.exports = function(results) {
  const validResults = results.filter(r => r.total_score > 0);
  let text = "The following students are the top scorers this week:\n"

  validResults.forEach((r,i) => {
    if (i < 5) {
      text += `${r.username}: ${r.total_score} points\n`;
    }
  })

  return text;
}
