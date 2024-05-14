document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('textInput');
    const textSelection = document.getElementById('textSelection');
    const timeSelection = document.getElementById('timeSelection');
    const textToType = document.getElementById('textToType');
    const timerDisplay = document.getElementById('timer');
    const results = document.getElementById('results');
    let timerInterval;
    let timerStarted = false;
    let timeRemaining;
    const texts = {
        '1': "Der schnelle braune Fuchs springt geschwind über den faulen Hund, der im Schatten eines großen Baumes ruht. Diese einfache Übung in Typografie ist seit langem bekannt und wird oft verwendet, um Schriften zu testen und Tastaturen zu kalibrieren.",
        '2': "In der kühlen Dämmerung des frühen Abends beginnt die Welt zu flüstern. Leise erzählt der Wind von fernen Zeiten und Orten, während die Blätter der alten Eiche sanft in den schlafenden Melodien schaukeln. Hier, im Zwielicht, fühlen sich die Gedanken leichter an, weit entfernt von den Sorgen des Tageslichts. Solche Momente der Ruhe sind selten, gefüllt mit Reflexionen über vergangene Entscheidungen und Plänen für kommende Tage.",
        '3': "Vor langer Zeit, in einem weit entfernten Land, lebte ein mutiger Ritter, der für seine Tapferkeit und Güte im ganzen Königreich bekannt war. Dieser Ritter, der zahlreiche Abenteuer bestand und vielen Menschen half, traf auf eine alte Prophezeiung, die in den verborgenen Schriften eines vergessenen Tempels gefunden wurde. Die Prophezeiung sprach von einer kommenden Dunkelheit, die das Land überziehen würde, und einem Licht, das in der Dunkelheit leuchten würde. Der Ritter machte sich auf die Suche nach diesem Licht, das in den tiefsten Wäldern, über die höchsten Berge und durch die dunkelsten Höhlen führen sollte. Auf seiner Reise begegnete er verschiedenen Kreaturen, guten wie bösen, und lernte viele Lektionen über Mut, Freundschaft und die Kraft der Hoffnung. Diese Geschichte, gewebt mit den Fäden der Zeit, erzählt von seiner epischen Suche, die nicht nur sein Leben, sondern auch das Schicksal des ganzen Königreichs für immer verändern sollte."
    };

    function updateText() {
        const selectedText = texts[textSelection.value].split(' ');
        textToType.innerHTML = '';
        selectedText.forEach(word => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.className = 'word';
            textToType.appendChild(span);
        });
    }

    function updateTime() {
        const selectedTime = parseInt(timeSelection.value);
        timerDisplay.textContent = selectedTime < 60 ? "00:" + ("0" + selectedTime).slice(-2) : "01:00";
        timeRemaining = selectedTime;
    }

    function startTimer() {
        timeRemaining = parseInt(timeSelection.value);
        if (!timerStarted) {
            timerStarted = true;
            timerInterval = setInterval(function() {
                timeRemaining--;
                let minutes = parseInt(timeRemaining / 60, 10);
                let seconds = parseInt(timeRemaining % 60, 10);
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                timerDisplay.textContent = minutes + ":" + seconds;

                if (timeRemaining <= 0) {
                    clearInterval(timerInterval);
                    endTest();
                }
            }, 1000);
        }
    }

    function endTest() {
        textInput.disabled = true;
        const typedText = textInput.value.trim();
        const wordsTyped = typedText.split(/\s+/);
        const correctWords = textToType.textContent.trim().split(/\s+/);
        let errors = 0;

        wordsTyped.forEach((word, index) => {
            if (word !== correctWords[index]) {
                errors++;
                document.querySelectorAll('.word')[index].classList.add('error');
            }
        });

        const timeUsed = parseInt(timeSelection.value);
        const wpm = Math.round((wordsTyped.length / timeUsed) * 60);
        results.textContent = `Test abgeschlossen! Deine Wörter pro Minute: ${wpm}, Fehler: ${errors}`;
        timerStarted = false;
    }

    textInput.addEventListener('input', function() {
        const typedText = textInput.value.trim();
        const typedWords = typedText.split(/\s+/);
        const wordElements = document.querySelectorAll('.word');
        wordElements.forEach((word, index) => {
            word.classList.remove('highlight', 'error');
            if(index === typedWords.length - 1) {
                word.classList.add('highlight');
            }
        });

        if (typedText.length === 1 && !timerStarted) {
            startTimer();
        }
    });

    textSelection.addEventListener('change', updateText);
    timeSelection.addEventListener('change', updateTime);

    updateText(); // Initialer Aufruf, um den Text beim Laden zu setzen
    updateTime(); // Initialer Aufruf, um die Zeit beim Laden zu setzen
});