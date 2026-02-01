import leafletImage from "leaflet-image";

export const takeScreenshot = async (map) => {
  return new Promise((resolve, reject) => {
    leafletImage(map, (err, canvas) => {
      if (err) return reject(err);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob); // Retorna o blob no formato JPEG
          } else {
            reject(new Error("Erro ao gerar o blob do canvas"));
          }
        },
        "image/jpeg", // Define o formato como JPEG
        0.95, // Qualidade da imagem (0 a 1)
      );
    });
  });
};
