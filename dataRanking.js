let rankings = [];

for (let i = 0; i < 100; i++) {
  rankings.push({
    id: Math.floor(Math.random() * 10000),
    districts: "Liberdade",
    usersAttendeds: Math.floor(Math.random() * 10000),
    usersNotAttendeds: Math.floor(Math.random() * 10000),
    reports: Math.floor(Math.random() * 7000),
    severeReports: Math.floor(Math.random() * 5000),
    moderateReports: Math.floor(Math.random() * 3000),
    repairs: Math.floor(Math.random() * 7000),
    notRepaireds: Math.floor(Math.random() * 500),
  });
}

export default rankings;
