import { useFormik } from "formik"

const styles = {
    newTask: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "lightblue",
        width: "70%",
        height: "70%",
        padding: "12px 20px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        borderRadius: 6

    },
    inputName: {
        display: "block",
        width: "100%",
        marginBottom: 16,
        padding: "6px 12px",
        boxSizing: "border-box",
        border: "none"
    },
    inputDescription: {
        display: "block",
        width: "100%",
        marginBottom: 16,
        resize: "none",
        flexGrow: "1",
        boxSizing: "border-box",
        padding: "6px 12px",
        border: "none"
    },
    inputSubmit: {
        display: "block",
        width: "100%",
        marginBottom: 16,
        border: "none",
        borderRadius: 4,
        padding: "8px 16px",
        backgroundColor: "#198754",
        color: "#fff",
        cursor: "pointer"
    },
    label: {
        fontSize: 20
    },
    titulo: {
        margin: 0,
        fontSize: "1.5rem",
        textAlign: "center"
    }
}

const validate = (values) => {
    const errors = {}
    if (!values.titulo) {
        errors.titulo = "Indica titulo de la tarea"
    }
    if (!values.descripcion) {
        errors.descripcion = "Indica la descripcion de la tarea"
    }
    
    return errors
}

const NewTask = ({ addTask, showMenu }) => {
    const formik = useFormik({
        initialValues: {
            titulo: "",
            descripcion: "",
        },
        validate,
        onSubmit: values => {
            addTask(values)
            console.log(values)
            showMenu()
        }
    })

    return (
        <form style={styles.newTask} onSubmit={formik.handleSubmit}>
            <h3 style={styles.titulo}>AGREGAR NUEVA TAREA</h3>
            <label style={styles.label} htmlFor="title">Task Name</label>
                <input type="text" id="title" style={styles.inputName} {...formik.getFieldProps("titulo")}/>
                {formik.touched.titulo && formik.errors.titulo ? <div>{formik.errors.titulo}</div> : null}
            <label style={styles.label} htmlFor="descripcion">Description</label>
                <textarea style={styles.inputDescription} id="descripcion" {...formik.getFieldProps("descripcion")}></textarea>
                {formik.touched.descripcion && formik.errors.descripcion ? <div>{formik.errors.descripcion}</div> : null}
            <input type="submit" style={styles.inputSubmit} value="AGREGAR"/>
        </form>
    )
}

export default NewTask;