export const getDownloadData = async () => {
  const response = await fetch(
    "https://themefisher.herokuapp.com/download/data"
  );

  const { result } = await response.json();
  return result;
};
export const getSingleDownlodData = async (name) => {
  const response = await fetch(
    `https://themefisher.herokuapp.com/download/${name}`
  );
  const { result } = await response.json();
  return result;
};
