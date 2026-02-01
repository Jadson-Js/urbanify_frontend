const getAttendeds = ({ reports, resolvedReports, districtTarget }) => {
  const attendeds = resolvedReports.reduce((acc, report) => {
    report.district === districtTarget && (acc += report.childrens.length);

    return acc;
  }, 0);

  const notAttendeds = reports.reduce((acc, report) => {
    report.district === districtTarget && (acc += report.childrens.length);

    return acc;
  }, 0);

  const reportsCounter = reports.reduce((acc, report) => {
    report.district === districtTarget && acc++;

    return acc;
  }, 0);

  return { attendeds, notAttendeds, reports: reportsCounter };
};

const getGravityReports = ({ reports, districtTarget }) => {
  let severes = 0;
  let moderates = 0;

  reports.forEach((report) => {
    if (report.district !== districtTarget) return;

    report.childrens.forEach((children) => {
      children.severity == 0 ? severes++ : moderates++;
    });
  });

  const total = severes + moderates;
  const gravityIndex = total > 0 ? (severes / total) * 100 : 0;

  return { severes, moderates, gravityIndex: Math.round(gravityIndex) };
};

const getRepairs = ({ resolvedReports, districtTarget }) => {
  return resolvedReports.reduce((acc, report) => {
    report.district === districtTarget && acc++;

    return acc;
  }, 0);
};

export const filterReports = ({ data, filter }) => {
  if (data?.length === 0) return [];

  const startTarget = filter.date.start ? new Date(filter.date.start) : null;
  const endTarget = filter.date.start ? new Date(filter.date.end) : null;

  // FILTER BY DATE
  const filteredReportsByDate = data.filter((report) => {
    const reportDate = new Date(report.created_at); // Converte para Date

    if (
      (reportDate >= startTarget && reportDate <= endTarget) ||
      (!startTarget && !endTarget)
    )
      return true;
  });

  // FILTER BY DISTRICT
  const filteredReportsByDistrict = filteredReportsByDate.filter((report) => {
    if (filter.districtTarget == "") return true;
    const reportDistrict = report.district;
    return reportDistrict == filter.districtTarget;
  });

  return filteredReportsByDistrict;
};

export const formatDistricts = ({ reports, resolvedReports }) => {
  const districtsMap = new Map(); // Usa um Map para garantir unicidade

  reports.forEach((report) => {
    // Verifica se o distrito já existe no Map
    if (!districtsMap.has(report.district)) {
      // Adiciona o distrito com os valores iniciais se ainda não existir
      districtsMap.set(report.district, {
        district: report.district,
        attendeds: 0,
        notAttendeds: 0,
        reports: 0,
        severeReports: 0,
        moderateReports: 0,
        severesIndex: 0,
        repairs: 0,
        notRepaireds: 0,
        repairedsIndex: 0,
      });
    }

    // Obtém o distrito atual

    const currentDistrict = districtsMap.get(report.district);
    const districtTarget = report.district;
    const attendeds = getAttendeds({
      reports,
      resolvedReports,
      districtTarget,
    });
    const gravityReports = getGravityReports({
      reports,
      districtTarget,
    });
    const repairs = getRepairs({
      resolvedReports,
      districtTarget,
    });
    const repairedsIndex = (repairs / (repairs + attendeds.reports)) * 100;

    // Atualiza o valor de attendeds
    districtsMap.set(report.district, {
      ...currentDistrict,
      attendeds: attendeds.attendeds,
      notAttendeds: attendeds.notAttendeds,
      severeReports: gravityReports.severes,
      moderateReports: gravityReports.moderates,
      severeIndex: gravityReports.gravityIndex + "%",
      repairs: repairs,
      notRepaireds: attendeds.reports,
      repairedsIndex: Math.round(repairedsIndex) + "%",
    });
  });

  return Array.from(districtsMap.values());
};
