import React from "react";

const Test = ({ result }) => {
  console.log(result);
  return (
    <div>
      {result.map((data, i) => (
        <p key={i}>{data.name}</p>
      ))}
    </div>
  );
};

export default Test;
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://themefisher.herokuapp.com/download/data`);
  const { result } = await res.json();

  // Pass data to the page via props
  return { props: { result } };
}
