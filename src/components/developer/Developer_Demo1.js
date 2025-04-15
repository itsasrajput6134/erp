import React, { useRef } from "react";

const Developer_Demo1 = () => {
  const countRef = useRef(0);

  const handleClick = () => {
    countRef.current += 1;
    console.log(`Clicked ${countRef.current} times`);
  };
  console.log("Helllo");

  return (
    <>
      <div className="wrapper">
        <button onClick={handleClick}>Click me</button>;
      </div>
    </>
  );
};

export default Developer_Demo1;
