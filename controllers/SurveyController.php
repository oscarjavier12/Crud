<?php

namespace controllers;

use core\TemplateEngine;
use model\Database;
use model\SurveyModel;

class SurveyController {
    private $conn;

    // Constructor que acepta la conexión como parámetro
    public function __construct($conn) {
        $this->conn = $conn;
    }

    public static function save() {
        $docente = $_POST['docente'] ?? '';
        $p1 = (int) ($_POST['pregunta1'] ?? 0);
        $p2 = (int) ($_POST['pregunta2'] ?? 0);
        $p3 = (int) ($_POST['pregunta3'] ?? 0);
        $comentarios = $_POST['comentarios'] ?? '';
        $conn = Database::getConnection();
        $surveyModel = new SurveyModel($conn);
        [$success, $message] = $surveyModel->save($docente, $p1, $p2, $p3, $comentarios);

        $response = (object)[
            'success' => $success,
            'message' => $message,
            'data' => []
        ];

        TemplateEngine::render("response", ['response' => $response]);
    }

    public static function add() {
        TemplateEngine::render("survey_add");
    }
    public static function update() {
        $conn = Database::getConnection();
        $surveyModel = new SurveyModel($conn);
        $teachers = $surveyModel->queryAllTeachers();
        TemplateEngine::render("survey_update", ['teachers' => $teachers]);

    }
    public static function delete() {
        $conn = Database::getConnection();
        $surveyModel = new SurveyModel($conn);
        $teachers = $surveyModel->queryAllTeachers();
        TemplateEngine::render("survey_delete", ['teachers' => $teachers]);
    }
    public static function actualizar() {
        $docente = $_POST['teacher'] ?? '';
        $p1 = (int) ($_POST['pregunta1'] ?? 0);
        $p2 = (int) ($_POST['pregunta2'] ?? 0);
        $p3 = (int) ($_POST['pregunta3'] ?? 0);
        $comentarios = $_POST['comentarios'] ?? '';
        $conn = Database::getConnection();
        $surveyModel = new SurveyModel($conn);
        [$success, $message] = $surveyModel->update($docente, $p1, $p2, $p3, $comentarios);

        $response = (object)[
            'success' => $success,
            'message' => $message,
            'data' => []
        ];

        TemplateEngine::render("response", ['response' => $response]);
    }
    public static function eliminar() {

        $docente = $_POST['teacher'] ?? '';
        $conn = Database::getConnection();
        $surveyModel = new SurveyModel($conn);
        [$success, $message] = $surveyModel->delete($docente);

        $response = (object)[
            'success' => $success,
            'message' => $message,
            'data' => []
        ];

        TemplateEngine::render("response", ['response' => $response]);
    }
    public static function graph() {
        $conn = Database::getConnection();
        $surveyModel = new SurveyModel($conn);
        $teachers = $surveyModel->queryAllTeachers();
        TemplateEngine::render("survey_graph", ['teachers' =>$teachers]);
    }
    public static function statistics() {
        //--- Obtener el cuerpo crudo de la solicitud POST
        $rawData = file_get_contents("php://input");

        //--- Decodificar el JSON
        $data = json_decode($rawData, true); //--- true para obtener un array asociativo

        //--- Acceder al parámetro 'teacher'
        $teacher = $data['teacher'] ?? "Ambrosio Cardoso";

        $conn = Database::getConnection();
        $surveyModel = new SurveyModel($conn);
        $data = $surveyModel->queryByTeacher($teacher);

        $response = json_encode([
            'success' => count($data) > 0,
            'message' => count($data) > 0?'Datos recuperados':'No hay datos',
            'data' => $data
        ]);
        header('Content-Type: application/json');
        echo $response;
    }

}

