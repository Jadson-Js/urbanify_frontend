import ExcelJS from "exceljs";

export async function generateExcel(data) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Relatório");

  worksheet.columns = [
    { header: "Bairro", key: "district", width: 20 },
    { header: "Moradores Atendidos", key: "attendeds", width: 20 },
    { header: "Moradores A Serem Atendidos", key: "notAttendeds", width: 20 },
    { header: "N° Relatos Graves", key: "severeReports", width: 20 },
    { header: "N° Relatos Moderados", key: "moderateReports", width: 20 },
    { header: "Índice De Gravidade", key: "severesIndex", width: 20 },
    { header: "Reparos Realizados", key: "repairs", width: 20 },
    { header: "Reparos Pendentes", key: "notRepaireds", width: 20 },
    { header: "Índice De Reparos", key: "repairedsIndex", width: 20 },
  ];

  data.forEach((item) => {
    worksheet.addRow({
      district: item.district,
      attendeds: item.attendeds,
      notAttendeds: item.notAttendeds,
      severeReports: item.severeReports,
      moderateReports: item.moderateReports,
      severesIndex: item.severeIndex,
      repairs: item.repairs,
      notRepaireds: item.notRepaireds,
      repairedsIndex: item.repairedsIndex,
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "relatorio.xlsx";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
