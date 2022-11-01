import React, { Component } from "react";
import axios from "axios";
import Global from "../Global";
import TablaDoctores from "./TablaDoctores";
export default class DetallesMenu extends Component {
  cajaSelectRef = React.createRef();
  cajaSalarioref = React.createRef();

  state = {
    especialidades: [],
    especialidad: "",
    status: false,
    statusPut:false
  };

  loadSelect = () => {
    var request = "api/Doctores/Especialidades";
    var url = Global.urlDoctores + request;
    axios.get(url).then((res) => {
      this.setState({
        especialidades: res.data,
        status: true
      });
    });
  };

  loadEspecialidad = (e) => {
    e.preventDefault();
    var especialidad = this.cajaSelectRef.current.value;
    this.setState({
      especialidad: especialidad,
    });
  };

  updateSalario = (e) => {
    e.preventDefault();
    var especialidad = this.cajaSelectRef.current.value;
    var salario = this.cajaSalarioref.current.value;
    var request = "/api/Doctores/" + especialidad + "/" + salario;
    var url = Global.urlDoctores + request;
    axios.put(url).then(res=>{
        this.setState({
            statusPut:true
        })
    })
  };
  componentDidMount = () => {
    this.loadSelect();
  };

  render() {
    return (
      <div>
        <h1>Invremento salarial doctores</h1>
        <form onSubmit={this.updateSalario}>
          <label>Seleccione una especialidad</label>
          <br />
          <select onChange={this.loadEspecialidad} ref={this.cajaSelectRef}>
            {this.state.status == true &&
              this.state.especialidades.map((esp, index) => {
                return (
                  <option key={index} value={esp}>
                    {esp}
                  </option>
                );
              })}
          </select>
          <br />
          <label>Incremento salarial</label>
          <br />
          <input type="text" ref={this.cajaSalarioref} />
          <br />
          <button>Incrementa salario</button>
        </form>

        <TablaDoctores esp={this.state.especialidad} statusPut={this.state.statusPut}/>
      </div>
    );
  }
}
