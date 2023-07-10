import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import { useState } from "react";

const App = () => {

    const [tasks, setTask] = useState([]);
    const [showing, setShowing] = useState(null);

    const cambiarTask = (i) => {
      setShowing(i)
    }

    const agregarTask = (value) => {
        const nuevaId = generarId();
        setTask([...tasks,{ id: nuevaId, ...value, terminado: false}]);
        console.log(tasks)
    }
    
    const eliminarTask = () => {
      setTask(tasks.filter(t => t.id !== showing.id))
      setShowing(null)
    }

    const terminarTask = () => {
      setTask(tasks.map(t => {
        if(t.id === showing.id) {
          return {...t, terminado: !t.terminado}
        }
        return t
      }))
    }

    const generarId = () => {
      let id = Date.now().toString();
      return id;
    }

    console.log(tasks)

    return (
        <>
            <Navbar taskList={tasks} cambiarTask={cambiarTask}/>
            <Layout addTask={agregarTask} mostrarTask={showing} terminarTask={terminarTask} taskList={tasks} eliminarTask={eliminarTask}/>
        </>
    );
}

export default App;
