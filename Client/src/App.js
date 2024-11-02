import React, { useEffect, useState } from "react";
import EmployeeList from "./components/EmployeeList";

function App() {
  const [backendData, setbackendData] = useState([{}]);

  // useEffect(() => {
  //   fetch("/api")
  //     .then((response) => response.json)
  //     .then((data) => {
  //       setbackendData(data);
  //     });
  // }, []);
  useEffect(() => {
    fetch("http://localhost:3001/api/employees", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        const sortedData = data.data.sort((a, b) => {
          if (a[0] < b[0]) return -1;
          if (a[0] > b[0]) return 1;
          return 0;
        });
        setbackendData(sortedData);
      })
      .catch((error) =>
        console.error("Error fetching employee data results:", error)
      );
  }, []);
  return (
    <div>
      <h1>Zoo manager</h1>
      <EmployeeList employees={backendData} />
    </div>
  );
}

export default App;
