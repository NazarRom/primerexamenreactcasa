import React, { Component } from "react";
import axios from "axios";
import Global from "../Global";
export default class TablaDoctores extends Component {
  state = {
    doctor: [],
    status: false,
  };
  loadDoctores = () => {
    var esp = this.props.esp;
    var request = "/api/Doctores/DoctoresEspecialidad/" + esp;
    var url = Global.urlDoctores + request;
    axios.get(url).then((res) => {
      this.setState({
        doctor: res.data,
        status: true,
      });
    });
  };
  componentDidUpdate = (oldProps) => {
    if (oldProps.esp != this.props.esp) this.loadDoctores();
  };
  render() {
    if (this.props.statusPut == true) {
      this.loadDoctores();
    }
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Apellido</th>
              <th>Especialidad</th>
              <th>Salario</th>
            </tr>
          </thead>
          <tbody>
            {this.state.status == true &&
              this.state.doctor.map((doc, index) => {
                return (
                  <tr key={doc.idDoctor}>
                    <td>{doc.apellido}</td>
                    <td>{doc.especialidad}</td>
                    <td>{doc.salario}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}
