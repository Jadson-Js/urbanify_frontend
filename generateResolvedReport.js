import fs from "fs";

const rand = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min;
const randStr = (length, chars = "abcdefghijklmnopqrstuvwxyz0123456789") =>
  Array.from({ length }, () => chars[rand(0, chars.length - 1)]).join("");

const baseReports = [
  { district: "Liberdade", street: "Rua Machado De Assis" },
  { district: "Monte Castelo", street: "Rua Paulo Fontin" },
];

const generateReport = (base) => ({
  ...base,
  status: 2,
  subregion: "São Luís",
  id: rand(999999, 111111),
  address: "São Luís_" + base.district,
  geohash: `7p8986c`,
  created_at: `2025-${String(rand(12, 1)).padStart(2, "0")}-${String(rand(28, 1)).padStart(2, "0")}T19:41:09.622Z`,
  coordinates: {
    latitude: `-2.${randStr(8, "0123456789")}`,
    longitude: `-44.${randStr(8, "0123456789")}`,
  },
  childrens: Array.from({ length: rand(10, 1) }, () => ({
    severity: 2,
    created_at: `2025-${String(rand(12, 1)).padStart(2, "0")}-${String(rand(28, 1)).padStart(2, "0")}T19:41:09.622Z`,
  })),
});

const reports = baseReports.flatMap((r) =>
  Array.from({ length: 1 }, () => generateReport(r))
);

fs.writeFile(
  "resolvedReports.js",
  `export const data = ${JSON.stringify(reports)}`,
  "utf8",
  (err) => {
    if (err) console.error("Erro ao escrever o arquivo:", err);
    else console.log("Arquivo criado com sucesso!");
  }
);
