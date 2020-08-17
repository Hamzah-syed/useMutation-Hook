import React from "react";

import "./App.css";
import { gql, useMutation, useQuery } from "@apollo/client";
const ADD_Users = gql`
  mutation addStudent {
    adduser(input: { id: 6, name: "aali", email: "aalibaba@abc.com" }) {
      id
      name
      email
    }
  }
`;

const Users = gql`
  query users {
    users {
      id
      name
      email
    }
  }
`;

function App() {
  const { loading, data } = useQuery(Users);
  const [addUser] = useMutation(ADD_Users);

  if (loading) {
    return <h1>loading....</h1>;
  }
  const { users } = data;

  console.log(data);
  // const { users } = data;
  return (
    <div className="App">
      <h1>Users List</h1>
      <table border="2" width="500">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, ind) => {
            return (
              <tr key={ind}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button
        onClick={() =>
          addUser({
            variables: { id: 7, name: "asim", email: "asim@abc.com" },
            refetchQueries: [{ query: Users }],
          })
        }
      >
        Add User
      </button>
    </div>
  );
}
export default App;
