import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

const styles = {
    container: {
        height: "calc(100% - 55px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    Taskheader: {
        borderBottom: "1px solid lightgray",
        margin: "20px 0",
        /* textDecoration: "line-through",
        color: "rgba(0, 0, 0, 0.5)" */
    },
    taskOptions: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 10
    },
    buttonCheck: {
        backgroundColor: "#198754",
        border: "none",
        padding: "8px 12px",
        borderRadius: 6,
        color: "#fff",
        cursor: "pointer"
    },
    buttonTrash: {
        backgroundColor: "#dc3545",
        border: "none",
        padding: "8px 12px",
        borderRadius: 6,
        color: "#fff",
        cursor: "pointer"
    },
    spanMargin: {
        marginLeft: 6,
    }
}

const TaskBody = ({ mostrarTask, terminarTask, eliminarTask }) => {
    

    return (
        <div style={styles.container}>
            <div>
                <h2 style={styles.Taskheader}>{mostrarTask.titulo}</h2>
                <p>{mostrarTask.descripcion}</p>
            </div>
            <div style={styles.taskOptions}>
                <button style={styles.buttonCheck} onClick={terminarTask}>
                    <FontAwesomeIcon icon={faCheck} />
                    <span style={styles.spanMargin}>Tarea Finalizada</span>
                </button>
                <button style={styles.buttonTrash} onClick={eliminarTask}>
                    <FontAwesomeIcon icon={faTrash} />
                    <span style={styles.spanMargin}>Borrar Tarea</span>
                </button>
            </div>
        </div>
    );
}

export default TaskBody;