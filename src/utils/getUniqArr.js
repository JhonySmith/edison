export const getUniqArr = (data, param) => {
  const datas = new Set(data.map((dt) => dt[param]));
  return [...datas];
};
