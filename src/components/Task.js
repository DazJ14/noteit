const styles = {
    task: {
        boxSizing: "border-box",
        height: 55,
        width: "100%",
        /* backgroundColor: "lightblue", */
        borderRadius: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        cursor: "pointer",
        padding: "0 10px"
    },
    titulo: {
        fontSize: 16,
        padding: 0,
        margin: 0,
        width: "100%",
        borderBottom: "1px solid black",
        fontFamily: "Lato",
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 1,
        overflow: 'hidden'
    },
    taskContainer: {
        height: "calc(100% - 72px)",
        overflowY: "auto",
        padding: "0 16px",
    },
    descripcion: {
        color: "rgba(0, 0, 0, 0.5)",
        fontSize: 12,
        margin: 0,
        width: "100%",
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 1,
        overflow: 'hidden'
    }

}


        
const Task = ({ taskList, cambiarTask }) => {
    return (
        <div style={styles.taskContainer}>
            {taskList.map((x) =>
                <div key={x.id} style={{...styles.task, backgroundColor: x.terminado ? "green" : "lightblue"}} onClick={() => cambiarTask(x)}>
                    <h3 style={styles.titulo}>{x.titulo}</h3>
                    <p style={styles.descripcion}>{x.descripcion}</p>
                </div>
            )}
        </div>
    );
}

export default Task;