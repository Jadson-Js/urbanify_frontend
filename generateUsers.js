import fs from "fs";

const rand = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateUsers = () => ({
  created_at: `2025-${String(rand(12, 1)).padStart(2, "0")}-${String(rand(28, 1)).padStart(2, "0")}T19:41:09.622Z`,
  report_counter: rand(100, 0),
  service_counter: rand(2, 0),
});

const users = Array.from({ length: 4 }, () => generateUsers());

fs.writeFile(
  "users.js",
  `export const data = ${JSON.stringify(users)}`,
  "utf8",
  (err) => {
    if (err) console.error("Erro ao escrever o arquivo:", err);
    else console.log("Arquivo criado com sucesso!");
  }
);
