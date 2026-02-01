export const countSeveritiesReport = (report) => {
  const countSevere = report.childrens.reduce((acc, item) => {
    return item.severity === 0 ? acc + 1 : acc;
  }, 0);

  const countModerate = report.childrens.length - countSevere;

  return { severe: countSevere, moderate: countModerate };
};
