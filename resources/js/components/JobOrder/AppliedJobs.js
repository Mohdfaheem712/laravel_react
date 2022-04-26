import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function AppliedJobs() {

    const [employeeList, setEmployeeList] = useState([]);
    const [employeeListStatus, setEmployeeListStatus] = useState(400);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
      // Update the document title using the browser API
      let listEmployeeUrl = `${window.api_url}/jobs/applied-list`;
      window.$axios.post(listEmployeeUrl, {}).then((res) => {
        if (res.data.status == 200) {
            const employeeData = res.data.response;
            setEmployeeList(employeeData);

            setEmployeeListStatus(200);
          //setEmployeeList(employeeLists);
        }
      });
    }, []);

    const loadEmployeeList = () => {
            if(employeeListStatus == 200){
                return (
                  <>
                    {employeeList.map((employee, index) => (
                      <tr key={index}>
                        <td scope="row">{index + 1}</td>
                        <td scope="row">{employee.first_name}</td>
                        <td>{employee.last_name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.mobile}</td>
                        <td><a href={employee.resume}><i className="bi bi-download"></i></a></td>
                      </tr>
                    ))}
                  </>
                );
            }else{
                return (
                  <tr>
                    <td cols="10">No record available!!!</td>
                  </tr>
                );
            }
    }

    return (
      <>
        <div className="container mt-3 mb-3">
          <div className="row">
            <h2>List Emplyee</h2>
          </div>
          <div className="mt-3">
            <table className="table">
              <thead className="table-light">
                <tr>
                  <th scope="row">#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loadEmployeeList()}
               
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
}

export default AppliedJobs;
