import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

import java.sql.Connection;
import java.util.List;

class SimpleInsertTest {

    private static Connection conn;
    private static CustomerDAO customerDAO;

    @BeforeAll
    static void setUp() throws Exception {
        conn = DatabaseConnection.getConnection();
        customerDAO = new CustomerDAOImpl(conn);
    }

    @AfterAll
    static void tearDown() throws Exception {
        if (conn != null && !conn.isClosed()) {
            conn.close();
        }
    }

    @Test
    void testSimpleInsert() throws Exception {
        // Crear un customer con ID único
        long testId = System.currentTimeMillis(); // Usa timestamp para ID único
        Customer customer = new Customer(testId, "test@example.com", "Test User");

        System.out.println("🔄 Insertando customer con ID: " + testId);

        // Insertar
        customerDAO.add(customer);
        System.out.println("✅ Customer insertado");

        // Verificar que existe
        Customer retrieved = customerDAO.getById(testId);
        assertNotNull(retrieved, "El customer debería existir en la base de datos");

        System.out.println("✅ Customer verificado: " + retrieved.fullName());
        System.out.println("📧 Email: " + retrieved.emailAddress());

        // Mostrar todos los customers
        List<Customer> all = customerDAO.getAll();
        System.out.println("📊 Total customers en base: " + all.size());

        // Limpiar (opcional)
        customerDAO.delete(testId);
        System.out.println("🗑️ Customer de prueba eliminado");
    }
}