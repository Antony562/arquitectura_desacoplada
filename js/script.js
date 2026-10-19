// Interacciones del reproductor local y del cuestionario.
document.addEventListener("DOMContentLoaded", () => {
    const yearElement = document.getElementById("currentYear");
    if (yearElement) yearElement.textContent = new Date().getFullYear();

    // Cierra el menú de Bootstrap tras elegir un destino en pantallas pequeñas.
    document.querySelectorAll("#menuPrincipal .nav-link, #menuPrincipal .nav-quiz").forEach((link) => {
        link.addEventListener("click", () => {
            const menu = document.getElementById("menuPrincipal");
            if (menu.classList.contains("show") && window.bootstrap) {
                window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
            }
        });
    });

    const videoInput = document.getElementById("videoFile");
    const videoPlayer = document.getElementById("videoPlayer");
    const videoFrame = document.querySelector(".video-frame");
    const videoName = document.getElementById("videoFileName");
    const videoStatus = document.getElementById("videoStatus");
    const resetVideoButton = document.getElementById("resetVideo");
    const defaultVideoName = "arquitectura desacoplada.mp4";
    let activeVideoUrl = null;

    videoName.textContent = defaultVideoName;
    videoName.title = defaultVideoName;
    setVideoStatus("Video educativo del proyecto listo para reproducir.", "success");

    function setVideoStatus(message, state = "") {
        videoStatus.textContent = message;
        videoStatus.classList.remove("is-error", "is-success");
        if (state) videoStatus.classList.add(`is-${state}`);
    }

    function releaseVideoUrl() {
        if (activeVideoUrl) {
            URL.revokeObjectURL(activeVideoUrl);
            activeVideoUrl = null;
        }
    }

    videoInput.addEventListener("change", () => {
        const file = videoInput.files[0];
        if (!file) return;

        const extension = file.name.split(".").pop().toLowerCase();
        const supportedExtensions = ["mp4", "webm"];
        const supportedMimeTypes = ["video/mp4", "video/webm"];
        const mimeType = file.type.toLowerCase();
        const extensionIsSupported = supportedExtensions.includes(extension);
        const mimeIsSupported = supportedMimeTypes.includes(mimeType);
        const mimeCanUseExtension = !mimeType || mimeType === "application/octet-stream";

        if (!extensionIsSupported || (!mimeIsSupported && !mimeCanUseExtension)) {
            setVideoStatus("Formato no compatible. Selecciona un archivo MP4 o WebM.", "error");
            videoInput.value = "";
            return;
        }

        releaseVideoUrl();
        activeVideoUrl = URL.createObjectURL(file);
        videoPlayer.pause();
        videoPlayer.src = activeVideoUrl;
        videoPlayer.load();
        videoFrame.classList.add("has-video");
        videoName.textContent = file.name;
        videoName.title = file.name;
        resetVideoButton.disabled = false;
        setVideoStatus("Video listo. Usa los controles para reproducirlo.", "success");
    });

    videoPlayer.addEventListener("error", () => {
        setVideoStatus("No se pudo reproducir este video. Comprueba que el archivo y su códec sean compatibles.", "error");
    });

    resetVideoButton.addEventListener("click", () => {
        videoPlayer.pause();
        videoPlayer.removeAttribute("src");
        videoPlayer.load();
        releaseVideoUrl();
        videoInput.value = "";
        videoFrame.classList.add("has-video");
        videoName.textContent = defaultVideoName;
        videoName.title = defaultVideoName;
        resetVideoButton.disabled = true;
        setVideoStatus("Video educativo del proyecto listo para reproducir.", "success");
    });

    // Las respuestas correctas y sus explicaciones solo se consultan al finalizar.
    const questions = [
        {
            question: "¿Qué caracteriza principalmente a una arquitectura de microservicios?",
            answers: ["Una aplicación única con módulos inseparables", "Servicios autónomos organizados por capacidades del negocio", "Un sistema que no necesita comunicación entre componentes", "Una base de datos compartida obligatoriamente por todos los equipos"],
            correct: 1,
            explanation: "Los microservicios son servicios autónomos, centrados en capacidades del negocio y coordinados mediante contratos."
        },
        {
            question: "¿Cuál es una diferencia habitual entre un monolito y los microservicios?",
            answers: ["El monolito no puede tener módulos", "Los microservicios se despliegan siempre como una sola unidad", "Un monolito suele desplegarse como una unidad; los servicios pueden hacerlo por separado", "El monolito no puede utilizar una API"],
            correct: 2,
            explanation: "La diferencia clave está en los límites y despliegues: un monolito se publica como una unidad; los microservicios pueden evolucionar por separado."
        },
        {
            question: "¿Para qué sirve una API en una arquitectura distribuida?",
            answers: ["Para definir un contrato de comunicación entre componentes", "Para impedir que un servicio tenga datos", "Para reemplazar las pruebas automatizadas", "Para ejecutar todos los servicios en el mismo proceso"],
            correct: 0,
            explanation: "Una API especifica cómo solicitar capacidades de otro servicio sin depender de su implementación interna."
        },
        {
            question: "¿Cuál es una función habitual de un API Gateway?",
            answers: ["Guardar todos los datos de negocio", "Compilar los servicios en una aplicación", "Crear automáticamente las reglas del negocio", "Recibir solicitudes y dirigirlas a los servicios correspondientes"],
            correct: 3,
            explanation: "El gateway puede ser un punto de entrada que aplica políticas comunes y enruta solicitudes a los servicios."
        },
        {
            question: "¿Qué significa que un servicio sea independiente?",
            answers: ["Nunca se comunica con otros servicios", "Puede desarrollarse y desplegarse con autonomía dentro de contratos acordados", "Debe usar un lenguaje de programación distinto", "No puede compartir infraestructura"],
            correct: 1,
            explanation: "La autonomía permite que un servicio evolucione y se despliegue por separado, aunque colabore mediante contratos definidos."
        },
        {
            question: "¿Qué permite la escalabilidad independiente?",
            answers: ["Aumentar recursos solo para los servicios que lo necesitan", "Eliminar la necesidad de monitoreo", "Evitar toda comunicación de red", "Garantizar que el sistema nunca falle"],
            correct: 0,
            explanation: "Se pueden asignar más instancias o recursos a un servicio con alta demanda sin escalar todo el sistema."
        },
        {
            question: "¿Cuál es una práctica frecuente para proteger la autonomía de los datos?",
            answers: ["Permitir que todos escriban en todas las tablas", "Usar una única base compartida como requisito", "Asignar a cada servicio la propiedad de sus datos", "Eliminar las bases de datos y mantener todo en memoria"],
            correct: 2,
            explanation: "La propiedad de los datos por servicio reduce dependencias; la estrategia concreta depende del dominio y sus necesidades."
        },
        {
            question: "¿Qué reto es común en sistemas de microservicios?",
            answers: ["No se pueden automatizar las pruebas", "No es posible desplegar servicios por separado", "El sistema deja de necesitar seguridad", "Aumenta el esfuerzo de observabilidad y diagnóstico distribuido"],
            correct: 3,
            explanation: "Trazar solicitudes, correlacionar registros y diagnosticar fallos entre servicios requiere observabilidad distribuida."
        },
        {
            question: "¿Cómo se puede reducir el impacto de un fallo en una dependencia remota?",
            answers: ["Reintentar para siempre cada solicitud", "Combinar tiempos de espera, reintentos limitados y patrones de resiliencia", "Ignorar todos los errores", "Hacer que todos los servicios compartan proceso"],
            correct: 1,
            explanation: "Los tiempos de espera y reintentos controlados, junto con patrones como circuit breaker, ayudan a contener fallos."
        },
        {
            question: "¿Cuándo puede ser más apropiado empezar con un monolito modular?",
            answers: ["Cuando el producto y el equipo son pequeños y se busca reducir la carga operativa", "Cuando se necesita desplegar cada capacidad en una región distinta desde el primer día", "Cuando existen muchos equipos autónomos con necesidades muy diferentes", "Siempre, porque los microservicios no escalan"],
            correct: 0,
            explanation: "Un monolito modular puede ser una opción más sencilla para equipos pequeños; la arquitectura debe responder al contexto real."
        }
    ];

    const questionText = document.getElementById("questionText");
    const answerList = document.getElementById("answerList");
    const quizStepLabel = document.getElementById("quizStepLabel");
    const answeredLabel = document.getElementById("answeredLabel");
    const questionCounter = document.getElementById("questionCounter");
    const quizProgress = document.getElementById("quizProgress");
    const quizProgressBar = document.getElementById("quizProgressBar");
    const quizFeedback = document.getElementById("quizFeedback");
    const previousButton = document.getElementById("previousQuestion");
    const nextButton = document.getElementById("nextQuestion");
    const finishButton = document.getElementById("finishQuiz");
    const quizStage = document.getElementById("quizStage");
    const quizResult = document.getElementById("quizResult");
    const answers = Array(questions.length).fill(null);
    let currentQuestion = 0;

    function renderQuestion() {
        const item = questions[currentQuestion];
        const questionNumber = currentQuestion + 1;
        const answeredCount = answers.filter((answer) => answer !== null).length;
        questionText.textContent = item.question;
        answerList.replaceChildren();
        item.answers.forEach((answer, answerIndex) => {
            const optionId = `answer-${currentQuestion}-${answerIndex}`;
            const label = document.createElement("label");
            label.className = "answer-option";
            label.htmlFor = optionId;

            const input = document.createElement("input");
            input.type = "radio";
            input.name = `question-${currentQuestion}`;
            input.id = optionId;
            input.value = answerIndex;
            input.checked = answers[currentQuestion] === answerIndex;
            input.addEventListener("change", () => {
                answers[currentQuestion] = answerIndex;
                quizFeedback.textContent = "";
                updateProgress();
            });

            const answerText = document.createElement("span");
            answerText.textContent = answer;
            label.append(input, answerText);
            answerList.append(label);
        });

        quizStepLabel.textContent = `PREGUNTA ${String(questionNumber).padStart(2, "0")} DE ${questions.length}`;
        questionCounter.textContent = `${String(questionNumber).padStart(2, "0")} / ${questions.length}`;
        answeredLabel.textContent = `${answeredCount} RESPONDIDAS`;
        previousButton.disabled = currentQuestion === 0;
        nextButton.hidden = currentQuestion === questions.length - 1;
        finishButton.hidden = currentQuestion !== questions.length - 1;
        quizFeedback.textContent = "";
        updateProgress();
    }

    function updateProgress() {
        const answeredCount = answers.filter((answer) => answer !== null).length;
        const progress = currentQuestion + 1;
        quizProgress.setAttribute("aria-valuenow", String(progress));
        quizProgressBar.style.width = `${(progress / questions.length) * 100}%`;
        answeredLabel.textContent = `${answeredCount} RESPONDIDAS`;
    }

    previousButton.addEventListener("click", () => {
        if (currentQuestion > 0) {
            currentQuestion -= 1;
            renderQuestion();
        }
    });

    nextButton.addEventListener("click", () => {
        if (answers[currentQuestion] === null) {
            quizFeedback.textContent = "Selecciona una respuesta antes de continuar.";
            answerList.querySelector("input")?.focus();
            return;
        }
        currentQuestion += 1;
        renderQuestion();
    });

    finishButton.addEventListener("click", () => {
        const firstUnanswered = answers.findIndex((answer) => answer === null);
        if (firstUnanswered !== -1) {
            currentQuestion = firstUnanswered;
            renderQuestion();
            quizFeedback.textContent = "Responde todas las preguntas para finalizar. Te llevamos a la primera pendiente.";
            answerList.querySelector("input")?.focus();
            return;
        }
        showResults();
    });

    function showResults() {
        const correctCount = answers.reduce((total, answer, index) => total + (answer === questions[index].correct ? 1 : 0), 0);
        const incorrectCount = questions.length - correctCount;
        const score = Math.round((correctCount / questions.length) * 100);
        let feedback;

        if (score >= 90) feedback = "Excelente dominio del tema.";
        else if (score >= 70) feedback = "Buen conocimiento, pero puedes reforzar algunos conceptos.";
        else if (score >= 50) feedback = "Conocimiento básico, conviene repasar.";
        else feedback = "Necesitas revisar el contenido y volver a intentarlo.";

        const reviewItems = questions.map((item, index) => {
            const isCorrect = answers[index] === item.correct;
            const review = document.createElement("article");
            review.className = `review-item${isCorrect ? " is-correct" : ""}`;
            const heading = document.createElement("h4");
            heading.textContent = `${String(index + 1).padStart(2, "0")}. ${item.question}`;
            const chosen = document.createElement("p");
            const chosenLabel = document.createElement("strong");
            chosenLabel.textContent = isCorrect ? "Tu respuesta: " : "Tu respuesta: ";
            chosen.append(chosenLabel, document.createTextNode(item.answers[answers[index]]));
            const correct = document.createElement("p");
            const correctLabel = document.createElement("strong");
            correctLabel.textContent = "Respuesta correcta: ";
            correct.append(correctLabel, document.createTextNode(item.answers[item.correct]));
            const explanation = document.createElement("p");
            explanation.textContent = item.explanation;
            review.append(heading, chosen, correct, explanation);
            return review;
        });

        const resultHeader = document.createElement("div");
        resultHeader.className = "result-score";
        const resultCopy = document.createElement("div");
        const resultTitle = document.createElement("h3");
        resultTitle.textContent = "Cuestionario completado";
        const resultMessage = document.createElement("p");
        resultMessage.textContent = feedback;
        resultCopy.append(resultTitle, resultMessage);
        const scoreBadge = document.createElement("div");
        scoreBadge.className = "score-number";
        scoreBadge.textContent = `${score}`;
        scoreBadge.setAttribute("aria-label", `${score} puntos de 100`);
        resultHeader.append(resultCopy, scoreBadge);

        const summary = document.createElement("div");
        summary.className = "result-summary";
        summary.innerHTML = `<span class="correct-count"><i class="bi bi-check-circle-fill" aria-hidden="true"></i> ${correctCount} correctas</span><span class="incorrect-count"><i class="bi bi-x-circle-fill" aria-hidden="true"></i> ${incorrectCount} incorrectas</span>`;

        const resultFeedback = document.createElement("p");
        resultFeedback.className = "result-feedback";
        resultFeedback.textContent = feedback;
        const reviewList = document.createElement("div");
        reviewList.className = "review-list";
        reviewList.setAttribute("aria-label", "Respuestas y explicaciones");
        reviewList.append(...reviewItems);

        const retryButton = document.createElement("button");
        retryButton.type = "button";
        retryButton.className = "retry-quiz";
        retryButton.innerHTML = '<i class="bi bi-arrow-counterclockwise" aria-hidden="true"></i> Volver a intentarlo';
        retryButton.addEventListener("click", resetQuiz);

        quizResult.replaceChildren(resultHeader, summary, resultFeedback, reviewList, retryButton);
        quizStage.hidden = true;
        quizResult.hidden = false;
        quizResult.setAttribute("tabindex", "-1");
        quizResult.focus();
    }

    function resetQuiz() {
        answers.fill(null);
        currentQuestion = 0;
        quizResult.hidden = true;
        quizStage.hidden = false;
        renderQuestion();
        questionText.focus?.();
    }

    renderQuestion();
});
