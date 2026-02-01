export const reportsByYear = async (reports) => {
  let months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  reports.forEach((report) => {
    report.childrens.forEach((children) => {
      const index = new Date(children.created_at).getMonth();

      months[index]++;
    });
  });

  return months;
};

export const reportsByMonth = async ({ reports, monthTarget }) => {
  let days = Array(31).fill(0);

  reports.forEach((report) => {
    report.childrens.forEach((children) => {
      const dayIndex = new Date(children.created_at).getDate() - 1;
      const monthIndex = new Date(children.created_at).getMonth();

      monthIndex == monthTarget && (days[dayIndex] += 1);
    });
  });

  return days;
};

export const attendedsUsersXnotAttendeds = async (users) => {
  const counterUserAttendeds = users.reduce((acc, user) => {
    if (user.service_counter !== 0) acc++;
    return acc;
  }, 0);

  const counterUserNotAttendeds = users.length - counterUserAttendeds;

  return [counterUserAttendeds, counterUserNotAttendeds];
};

export const fixedsXnotFixedes = async ({ reports, resolvedReports }) => {
  const getDistrictStats = (reports) => {
    const bairrosSet = new Set();
    const bairrosCount = {};

    reports.forEach((report) => {
      bairrosSet.add(report.district);
      bairrosCount[report.district] = (bairrosCount[report.district] || 0) + 1;
    });

    return {
      bairros: Array.from(bairrosSet),
      bairrosCount,
    };
  };

  const { bairros: bairrosNotAttendeds } = getDistrictStats(reports);
  const { bairros: bairrosAttendeds } = getDistrictStats(resolvedReports);

  const difference = bairrosNotAttendeds.filter(
    (item) => !bairrosAttendeds.includes(item)
  ).length;

  return [difference, bairrosAttendeds.length];
};

export const severeXmoderate = async ({ reports, intervalTarget }) => {
  let counterSevereReports = 0;
  let counterModerateReports = 0;

  const startTarget = intervalTarget.start
    ? new Date(intervalTarget.start)
    : undefined;
  const endTarget = intervalTarget.start
    ? new Date(intervalTarget.end)
    : undefined;

  reports.forEach((report) => {
    report.childrens.forEach((children) => {
      const childrenDate = new Date(children.created_at); // Converte para Date

      if (
        (childrenDate >= startTarget && childrenDate <= endTarget) ||
        (!startTarget && !endTarget)
      ) {
        // Incrementa o contador com base na gravidade
        children.severity === 0
          ? counterSevereReports++
          : counterModerateReports++;
      }
    });
  });

  return [counterModerateReports, counterSevereReports];
};

export const attendedsUsersByYear = async (users) => {
  let months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  users.forEach((user) => {
    const monthIndex = new Date(user.created_at).getMonth();

    months[monthIndex]++;
  });

  return months;
};

export const attendedsUsersByMonth = async (users) => {
  let usersActivePerMonth = Array(12).fill(0);

  users.forEach(({ created_at }) => {
    const date = new Date(created_at);
    const monthIndex = date.getMonth(); // Obtém o índice do mês (0 = Jan, 11 = Dez)
    usersActivePerMonth[monthIndex]++;
  });

  for (let i = 1; i < usersActivePerMonth.length; i++) {
    usersActivePerMonth[i] += usersActivePerMonth[i - 1];
  }

  return usersActivePerMonth;
};
