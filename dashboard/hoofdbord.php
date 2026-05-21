<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="hoofdbord.css">
    <title>Document</title>
</head>

<body>
    <?php include_once 'header/header.php';?>
    <main>
        <section <?php include_once 'datum-en-tijd/datum-en-tijd.php';?>></section>
        <section <?php include_once 'gas-verbruik/gas-verbruik.php';?>></section>
        <section <?php include_once 'gebruik-electriciteit/gebruik-electriciteit.php';?>></section>
        <section <?php include_once 'knopjes-voor-licht/knopjes-voor-licht.php';?>></section>
        <section <?php include_once 'opbrengst-zonnepanelen/opbrengst-zonnepanelen.php';?>></section>
        <section <?php include_once 'temperatuur-binnen-buiten/temperatuur-binnen-buiten.php';?>></section>
        <section <?php include_once 'tijdsspanne/tijdsspanne.php';?>></section>
        <section <?php include_once 'water-verbruik/water-verbruik.php';?>></section>
        <section <?php include_once 'weersverwachting/weersverwachting.php';?>></section>
    </main>
    <?php include_once 'footer/footer.php';?>
</body>

</html>