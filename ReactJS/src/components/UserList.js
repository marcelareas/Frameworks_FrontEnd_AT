import React, { useContext } from 'react';
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";
import {
  Table,  
  Button,
  Alert
} from "reactstrap";

export const UserList = () => {
  const { users, removeUser } = useContext(GlobalContext);

  return (
    <Table className="mt-4">
      <thead>
        <tr>          
          <th>Nome</th>          
          <th>Setor</th>
          <th>Data de Admissão</th>
          <th>Cargo</th>
          <th>#</th>
        </tr>        
      </thead>

      <tbody>
      {users.length > 0 ? (
        <>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.sector}</td>
              <td>{user.admissionDate}</td>
              <td>{user.office}</td>
              <td>
                <Link to={`/edit/${user.id}`} color="warning" className="btn btn-warning mr-1">Editar</Link>
                <Button onClick={() => removeUser(user.id)} color="danger">Deletar</Button>
              </td>
            </tr>
          ))}
        </>
      ) : (
          <tr >
            <td></td>
            <td></td>
            <td><Alert color="danger">NENHUM FUNCIONÁRIO CADASTRADO</Alert></td>
            <td></td>
            <td></td>
          </tr>
        )}
      </tbody>
    </Table>    
  )
}
