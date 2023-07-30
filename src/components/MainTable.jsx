import React, { Fragment } from "react";
import { Table } from "reactstrap";

function MainTable(props) {
  return (
    <Fragment>
      <div className="my-5">
        <h1 className="text-center py-3">Empolyee Information</h1>
        <Table className="p-3">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Profile</th>
              <th>Name</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Phone No</th>
              <th>Gender</th>
              <th>Language</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* main array ni jagyae direct filter array par map chalavyo che so jo koi filter check nai karyu hoy tyare badha undefine hase ane full array a filter array ma return aavse ane a table ma dekhase ane jyare filter karsu tyare to filter array j batavano che */}
            {/* {console.log(props.filterArray)} */}
            {props.filterArray.map((x, i) => {
              return (
                <tr key={i}>
                  <td>{x.id}</td>
                  <td>
                    <img src={x.profile} width={100} height={100} alt="img" />
                  </td>
                  <td>{x.username}</td>
                  <td>{x.lastname}</td>
                  <td>{x.email}</td>
                  <td>{x.phoneno}</td>
                  <td>{x.gender}</td>
                  <td>{x.language?.join(",")}</td>
                  <td>
                    <button
                      className="me-2"
                      onClick={() => props.editfun(x.id)}
                    >
                      Edit
                    </button>
                    <button onClick={() => props.deletefun(x.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </Fragment>
  );
}

export default MainTable;
