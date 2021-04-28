import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from "../context/GlobalState";
import { Link, useHistory } from "react-router-dom";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

export const EditUser = (props) => {
  const { editUser, users } = useContext(GlobalContext);
  const [selectedUser, setSelectedUser] = useState({
    id: '',
    name: '',
    sector: '',
    office: '',
    admissionDate: ''
  })

  const history = useHistory();
  const currentUserId = props.match.params.id;

  useEffect(() => {
    const userId = currentUserId;
    const selectedUser = users.find(user => user.id === userId);
    setSelectedUser(selectedUser);    
  }, [currentUserId, users])

  const onChange = (e) => {
    console.log(e)
    setSelectedUser({ ...selectedUser, 
      [e.target.name]: e.target.value, 
      [e.target.sector]: e.target.sector,
      [e.target.admissionDate]: e.target.admissionDate,
      [e.target.office]: e.target.office })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    editUser(selectedUser);
    history.push("/")
  }

  return (
    <Form onSubmit={onSubmit} onChange={onChange}>
      <FormGroup>
        <Label>Nome</Label>
        <Input type="text" value={selectedUser.name}  name="name" placeholder="Enter user" required></Input>
      </FormGroup>
      <FormGroup>
        <Label>Nome</Label>
        <Input type="select" name="sector" value={selectedUser.sector} >
          <option>Manutenção</option>
          <option>Vendas</option>
          <option>Comercial</option>
          <option>Marketing</option>
          <option>Estoque</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label>Data de Admissão</Label>
        <Input
          type="date"
          name="admissionDate"          
          value={selectedUser.admissionDate} 
          
        />
      </FormGroup>
      <FormGroup>
        <Label >Cargo</Label>
        <Input type="textarea" name="office" value={selectedUser.office} />
      </FormGroup>
      <Button type="submit">Salvar</Button>
      <Link to="/" className="btn btn-danger ml-2">Cancelar</Link>
    </Form>
  )
}
