import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    private static final String URL = "jdbc:oracle:thin:@//localhost:1521/xe"; // O tu IP/nombre de host y nombre de servicio reales// Cambia esto según tu configuración
    private static final String USER = "co";
    private static final String PASSWORD = "codigo26";

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}