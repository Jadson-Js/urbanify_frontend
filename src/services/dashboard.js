import { ReportStatusEnum } from "../utils/environment";
import { verifySeverityReport } from "../utils/verifySeverityReport";

export const filterReports = ({ reports, resolvedReports, filter }) => {
  if (reports.length === 0) return [];
  const startTarget = filter.date.start ? new Date(filter.date.start) : null;
  const endTarget = filter.date.start ? new Date(filter.date.end) : null;
  let reportsByStatus = [];

  // FILTER BY STATUS
  filter.status == ReportStatusEnum.CONCLUIDO
    ? (reportsByStatus = [...resolvedReports])
    : (reportsByStatus = [...reports]);

  // FILTER BY DATE
  const filteredReportsByDate = reportsByStatus.filter((report) => {
    const reportDate = new Date(report.created_at); // Converte para Date

    if (
      (reportDate >= startTarget && reportDate <= endTarget) ||
      (!startTarget && !endTarget)
    )
      return true;
  });

  // FILTER BY SEVERITY
  const filteredReportsBySeverity = filteredReportsByDate.filter((report) => {
    if (filter.severity == null) return true;
    const reportSeverity = verifySeverityReport(report);

    return reportSeverity == filter.severity;
  });

  // FILTER BY DISTRICT
  const filteredReportsByDistrict = filteredReportsBySeverity.filter(
    (report) => {
      if (!("districtTarget" in filter) || filter.districtTarget == "")
        return true;

      const reportDistrict = report.district;
      return reportDistrict == filter.districtTarget;
    },
  );

  return filteredReportsByDistrict;
};

export const totalReports = (reports) => {
  if (reports.length === 0) return 0;

  return reports.reduce((acc, item) => acc + item.childrens.length, 0);
};

export const incrementReports = (reports) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Definir o mês e ano do mês passado considerando a virada de ano
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1; // Ajusta para dezembro se for janeiro
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  let currentMonthCount = 0;
  let lastMonthCount = 0;

  reports.forEach((report) => {
    report.childrens.forEach((children) => {
      const createdAt = new Date(children.created_at);
      const childMonth = createdAt.getMonth();
      const childYear = createdAt.getFullYear();

      if (childYear === currentYear && childMonth === currentMonth) {
        currentMonthCount += 1; // Incrementa o contador do mês atual
      } else if (childYear === lastMonthYear && childMonth === lastMonth) {
        lastMonthCount += 1; // Incrementa o contador do mês passado
      }
    });
  });

  // Verifica se houve crescimento ou redução e calcula a porcentagem
  const result =
    lastMonthCount > 0
      ? ((currentMonthCount - lastMonthCount) / lastMonthCount) * 100
      : 0; // Evita divisão por zero

  return Math.round(result); // Retorna positivo para crescimento, negativo para redução
};

export const getUniqueDistricts = ({ reports, resolvedReports }) => {
  if (
    !reports ||
    reports.length === 0 ||
    !resolvedReports ||
    resolvedReports.length === 0
  )
    return [];

  const allReports = [...new Set([...reports, ...resolvedReports])];
  const bairrosSet = new Set();

  allReports.forEach((report) => bairrosSet.add(report.district));

  return Array.from(bairrosSet); // Converte o Set em um array
};

export const getDistrictsRanking = ({ reports }) => {
  if (!reports || reports.length === 0) return [];

  const allReports = [...new Set([...reports])];
  const cont_bairros = {};

  allReports.forEach((report) => {
    cont_bairros[report.district] = (cont_bairros[report.district] || 0) + 1;
  });

  return Object.entries(cont_bairros).map(([bairro, quant]) => ({
    nome_bairro: bairro,
    quanti_registrada: quant,
  }));
};

export const incrementDistrict = ({ reports, resolvedReports }) => {
  if (reports.length === 0 || resolvedReports.length === 0) return 0;

  const districts = getUniqueDistricts({ reports, resolvedReports }).length;

  const totalDistricts = 60; // Total de bairros possíveis (ajuste conforme necessário)

  const indice = ((totalDistricts - districts) / totalDistricts) * 100;

  return 100 - Math.round(indice);
};

export const getUsersServed = (users) => {
  if (users.length === 0) return 0; // Retorna 0 se a lista estiver vazia

  const counter = users.reduce((acc, user) => {
    if (user.service_counter !== 0) acc++;
    return acc;
  }, 0);

  return counter;
};

export const incrementUsersServed = (users) => {
  if (users.length === 0) return 0;

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Definir o mês e ano do mês passado considerando a virada de ano
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1; // Ajusta para dezembro se for janeiro
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  let currentMonthCount = 0;
  let lastMonthCount = 0;

  users.forEach((user) => {
    if (user.service_counter === 0) return; // Ignora usuários não atendidos

    const createdAt = new Date(user.created_at);
    const childMonth = createdAt.getMonth();
    const childYear = createdAt.getFullYear();

    if (childYear === currentYear && childMonth === currentMonth) {
      currentMonthCount += 1; // Incrementa o contador do mês atual
    } else if (childYear === lastMonthYear && childMonth === lastMonth) {
      lastMonthCount += 1; // Incrementa o contador do mês passado
    }
  });

  // Verifica se houve crescimento ou redução e calcula a porcentagem
  const result =
    lastMonthCount > 0
      ? ((currentMonthCount - lastMonthCount) / lastMonthCount) * 100
      : 0; // Evita divisão por zero

  return Math.round(result); // Retorna positivo para crescimento, negativo para redução
};

export const getUsersNotServed = (users) => {
  if (users.length === 0) return 0; // Retorna 0 se a lista estiver vazia

  const counter = users.reduce((acc, user) => {
    if (user.service_counter == 0) acc++;
    return acc;
  }, 0);

  return counter;
};

export const incrementUsersNotServed = (users) => {
  if (users.length === 0) return 0;

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Definir o mês e ano do mês passado considerando a virada de ano
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1; // Ajusta para dezembro se for janeiro
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  let currentMonthCount = 0;
  let lastMonthCount = 0;

  users.forEach((user) => {
    if (user.service_counter !== 0) return; // Ignora usuários não atendidos

    const createdAt = new Date(user.created_at);
    const childMonth = createdAt.getMonth();
    const childYear = createdAt.getFullYear();

    if (childYear === currentYear && childMonth === currentMonth) {
      currentMonthCount += 1; // Incrementa o contador do mês atual
    } else if (childYear === lastMonthYear && childMonth === lastMonth) {
      lastMonthCount += 1; // Incrementa o contador do mês passado
    }
  });

  // Verifica se houve crescimento ou redução e calcula a porcentagem
  const result =
    lastMonthCount > 0 ? ((lastMonth - currentMonth) / lastMonth) * 100 : 0; // Evita divisão por zero

  return Math.round(result); // Retorna positivo para crescimento, negativo para redução
};
