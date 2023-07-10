import TaskBody from "./TaskBody";
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import NewTask from "./NewTask";
  
const styles = {
        layout: {
            boxSizing: "border-box",
            backgroundColor: "#F5F5F5",
            width: "30%",
            maxWidth: 1200,
            borderRadius: "0 5px 5px 0",
            height: "50%",
            padding: 20,
            position: "relative",
        },
        button: {
            backgroundColor: "#32CD32",
            border: "none",
            padding: "8px 12px",
            borderRadius: 6,
            color: "#fff",
            cursor: "pointer"
        }
    }

const Layout = ({ addTask, mostrarTask, terminarTask, taskList, eliminarTask }) => {

    const [show, setShow] = useState(false);
    const showMenu = () => setShow(!show)

    return (
        <div style={styles.layout}>
            <button onClick={showMenu} style={styles.button}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
            {show
            ? <NewTask addTask={addTask} showMenu={showMenu}/>
            : null}
            {mostrarTask !== null ?
            <TaskBody mostrarTask={mostrarTask} terminarTask={terminarTask} taskList={taskList} eliminarTask={eliminarTask}/> :
            <h2>Selecciona o crea una nueva tarea c:</h2>
            }
            
        </div>
    );
}

export default Layout;