import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Button = () => {

    const styles = {
        button: {
            backgroundColor: "#32CD32",
            border: "none",
            padding: "8px 12px",
            borderRadius: 6,
            color: "#fff",
            cursor: "pointer"
        }
    }

    return (
        <button style={styles.button} onClick={() => console.log("hara que agregues una nueva instancia de lista")}>
            <FontAwesomeIcon icon={faPlus} />
        </button>
    );
}

export default Button;