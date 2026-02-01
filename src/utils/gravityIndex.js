export const gravityIndex = (report) => {
  if (!report) return;

  let severes = 0;
  let moderates = 0;

  report.childrens.forEach((children) => {
    children.severity == 0 ? severes++ : moderates++;
  });

  const total = severes + moderates;
  const gravityIndex = total > 0 ? (severes / total) * 100 : 0;

  return Math.round(gravityIndex);
};
