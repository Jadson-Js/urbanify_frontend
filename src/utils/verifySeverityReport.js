import { filterSeverityEnum } from "./environment";

export const verifySeverityReport = (report) => {
  let severeCounter = 0;
  let moderateCounter = 0;

  report.childrens.forEach((children) => {
    children.severity == filterSeverityEnum.SEVERE
      ? severeCounter++
      : moderateCounter++;
  });

  return severeCounter > moderateCounter
    ? filterSeverityEnum.SEVERE
    : filterSeverityEnum.MODERATE;
};
