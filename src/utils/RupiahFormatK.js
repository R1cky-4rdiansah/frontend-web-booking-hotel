export default (val) => {
  const k = val / 1000;

  return new Intl.NumberFormat("id-ID").format(k);
};
