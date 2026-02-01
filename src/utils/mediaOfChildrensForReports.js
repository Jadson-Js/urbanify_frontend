function mediaOfChildrensForReports(reports) {
  const somatoria = reports.reduce(
    (acc, report) => acc + report.childrens.length,
    0
  );
  const media = Math.round(somatoria / reports.length);

  return media;
}

export default mediaOfChildrensForReports;
