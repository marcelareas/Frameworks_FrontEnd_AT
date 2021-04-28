import React, { useState, useContext } from 'react';
import { GlobalContext } from "../context/GlobalState";
import { v4 as uuid } from "uuid";
import { Link, useHistory } from "react-router-dom";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

export const AddUser = () => {
  const [name, setName] = useState('');
  const [sector, setSector] = useState('');
  const [office, setOffice] = useState('');
  const [admissionDate, setadmissionDate] = useState('');
  const { addUser } = useContext(GlobalContext);
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: uuid(),
      name,
      sector,
      office,
      admissionDate
    }
    addUser(newUser);
    history.push("/");
  }

  const onChange = (e) => {
    setName(e.target.value);
  }

  const onChangeSector = (e) => {
    setSector(e.target.value);
  }

  const onChangeOffice = (e) => {
    setOffice(e.target.value);
  }

  const onChangeadmissionDate = (e) => {
    setadmissionDate(e.target.value)
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label>Nome</Label>
        <Input type="text" value={name} onChange={onChange} name="name" placeholder="Insira seu Nome" required></Input>
      </FormGroup>
      <FormGroup>
        <Label>Setor</Label>
        <Input type="select" name="sector" value={sector} onChange={onChangeSector} >
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
          value={admissionDate} 
          onChange={onChangeadmissionDate}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label >Cargo</Label>
        <Input type="textarea" 
          name="office" 
          value={office} 
          onChange={onChangeOffice}
          placeholder="Descrição do Cargo" 
          required/>
      </FormGroup>
      <Button type="submit" color="success">Salvar</Button>
      <Link to="/" className="btn btn-danger ml-2">Cancelar</Link>
    </Form>
  )
}
