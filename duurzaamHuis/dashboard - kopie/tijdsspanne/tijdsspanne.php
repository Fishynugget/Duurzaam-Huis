<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Time range</title>
    <link rel="stylesheet" href="../hoofdbord.css">
    <link rel="stylesheet" href="tijdsspanne.css">
</head>
<body class="module-page">
    <section class="module-shell glass-panel">
        <header class="module-header">
            <div>
                <p class="eyebrow">Analytics filters</p>
                <h1>Energy time span</h1>
            </div>
            <a class="back-link" href="../hoofdbord.php#history">Back to history</a>
        </header>
        <div class="module-grid">
            <article class="module-card">
                <p>Selected period</p>
                <strong class="selected-period">Day</strong>
                <p class="period-description">Today shows hourly energy changes, useful for solar timing.</p>
                <div class="module-meter" style="--meter: 70%"><span></span></div>
            </article>
            <article class="module-card">
                <p>Available views</p>
                <div class="filter-group">
                    <button class="filter active" type="button" data-period="day">Day</button>
                    <button class="filter" type="button" data-period="week">Week</button>
                    <button class="filter" type="button" data-period="month">Month</button>
                    <button class="filter" type="button" data-period="year">Year</button>
                </div>
            </article>
        </div>
    </section>
    <script src="../module-controls.js"></script>
</body>
</html>
