import Task from "./Task"

const styles = {
    navbar: {
         borderRadius: "5px 0 0 5px",
        height: "50%",
        width: 240,
        backgroundColor: "#1E90FF",
    },
    titulo: {
        margin: "20px 0",
        color: "#fff",
        height: 32,
        textAlign: "center"
    }
}

const Navbar = ({ taskList, cambiarTask }) => {
    return (
        <nav style={styles.navbar}>
            <h1 style={styles.titulo}>TODO LIST APP</h1>
            <Task taskList={taskList} cambiarTask={cambiarTask}/>
        </nav>
    );
}

export default Navbar;