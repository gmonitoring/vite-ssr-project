import httpClient from 'src/plugins/axiosService';

export type housesRequestParams = {
  page: number;
  pageSize: number;
};

export type House = {
  url: string;
  name: string;
  region: string;
  coatOfArms: string;
};

export const getHousesApi = async (params: housesRequestParams): Promise<Array<House>> => {
  return await httpClient.get(`houses`, {
    params: params,
  });
};

export const getHouseApi = async (params: { id: string }): Promise<House> => {
  return await httpClient.get(`houses/${params.id}`);
};
