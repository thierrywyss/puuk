<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Puuk - Schreibgeschwindigkeitstest</title>
    <link rel="stylesheet" href="typing.css">
</head>
<body>
<header>
    <h1>Puuk - Teste deine Schreibgeschwindigkeit</h1>
</header>
<main>
<?php
$texts = [
    '1' => "Der schnelle braune Fuchs springt geschwind über den faulen Hund, der im Schatten eines großen Baumes ruht. Diese einfache Übung in Typografie ist seit langem bekannt und wird oft verwendet, um Schriften zu testen und Tastaturen zu kalibrieren.",
    '2' => "In der kühlen Dämmerung des frühen Abends beginnt die Welt zu flüstern. Leise erzählt der Wind von fernen Zeiten und Orten, während die Blätter der alten Eiche sanft in den schlafenden Melodien schaukeln. Hier, im Zwielicht, fühlen sich die Gedanken leichter an, weit entfernt von den Sorgen des Tageslichts. Solche Momente der Ruhe sind selten, gefüllt mit Reflexionen über vergangene Entscheidungen und Plänen für kommende Tage.",
    '3' => "Vor langer Zeit, in einem weit entfernten Land, lebte ein mutiger Ritter, der für seine Tapferkeit und Güte im ganzen Königreich bekannt war. Dieser Ritter, der zahlreiche Abenteuer bestand und vielen Menschen half, traf auf eine alte Prophezeiung, die in den verborgenen Schriften eines vergessenen Tempels gefunden wurde. Die Prophezeiung sprach von einer kommenden Dunkelheit, die das Land überziehen würde, und einem Licht, das in der Dunkelheit leuchten würde. Der Ritter machte sich auf die Suche nach diesem Licht, das in den tiefsten Wäldern, über die höchsten Berge und durch die dunkelsten Höhlen führen sollte. Auf seiner Reise begegnete er verschiedenen Kreaturen, guten wie bösen, und lernte viele Lektionen über Mut, Freundschaft und die Kraft der Hoffnung. Diese Geschichte, gewebt mit den Fäden der Zeit, erzählt von seiner epischen Suche, die nicht nur sein Leben, sondern auch das Schicksal des ganzen Königreichs für immer verändern sollte."
];
$times = [
    '30' => '30 Sekunden',
    '60' => '1 Minute'
];
$selectedTextId = $_POST['textSelection'] ?? '1';
$selectedText = $texts[$selectedTextId];
$selectedTime = $_POST['timeSelection'] ?? '60';
?>
    <form action="typing.php" method="post">
        <label for="textSelection">Wähle einen Text:</label>
        <select id="textSelection" name="textSelection">
            <option value="1" <?= $selectedTextId == '1' ? 'selected' : '' ?>>Kurzer Text</option>
            <option value="2" <?= $selectedTextId == '2' ? 'selected' : '' ?>>Mittlerer Text</option>
            <option value="3" <?= $selectedTextId == '3' ? 'selected' : '' ?>>Langer Text</option>
        </select>
        <label for="timeSelection">Testdauer:</label>
        <select id="timeSelection" name="timeSelection">
            <?php foreach ($times as $key => $value): ?>
                <option value="<?= $key ?>" <?= $selectedTime == $key ? 'selected' : '' ?>><?= $value ?></option>
            <?php endforeach; ?>
        </select>
        <button type="submit">Start</button>
    </form>
    <p id="textToType">
        <?php foreach (explode(" ", $selectedText) as $word): ?>
            <span class="word"><?= htmlspecialchars($word) ?></span>
        <?php endforeach; ?>
    </p>
    <input type="text" id="textInput" placeholder="Beginne zu tippen..." autofocus>
    <div id="timer">00:<?= str_pad($selectedTime, 2, "0", STR_PAD_LEFT) ?></div>
    <div id="results"></div>
</main>
<footer>
    <p>&copy; 2024 Puuk. Alle Rechte vorbehalten.</p>
</footer>
<script src="script.js"></script>
</body>
</html>
