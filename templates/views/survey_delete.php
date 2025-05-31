<div class="container">
    <div class="row">
        <div class="col-md-8">
            <h1 class="mb-4 text-center">Encuesta de Evaluación Docente</h1>

            <form method="POST" action="/survey/eliminar" id="surveyForm" class="card p-4 shadow bg-white rounded-3">
                <div class="mb-3">
                    <label for="teacher">Docente:</label>
                    <select id="teacher" name="teacher" style="width: 100%;" class="form-select" required>
                        <?php
                        foreach ($teachers as $teacher){
                            echo ("<option value='" . $teacher['docente'] . "'>" . $teacher['docente'] ."</optio>" );
                        }
                        ?>
                    </select>
                </div>
                <div class="text-center">
                    <button type="submit" id="deleteSurveyButton" class="btn btn-primary">eliminar evaluación</button>
                </div>
            </form>
            <div id="responseMessage"></div>
        </div>
    </div>
</div>


