// export const getDownloadData = async () => {
//   return result;
// };
export const getSingleDownlodData = async (name) => {
  const response = await fetch(
    `https://salty-citadel-03660.herokuapp.com/download/${name}`
  );
  const { result } = await response.json();
  return result;
};
