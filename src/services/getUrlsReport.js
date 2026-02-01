import { GET } from "./requestHTTP";

export const getUrlsReport = async (arg) => {
  if (!arg) return;
  const response = await GET(
    `/report/address/${arg.address}/geohash/${arg.geohash}`
  );

  return response.data.data.urls;
};

export const getUrlsResolvedReport = async (arg) => {
  if (!arg) return;
  const response = await GET(
    `/registration/id/${arg.id}/created_at/${arg.created_at}`
  );

  return response.data.data.urls;
};
