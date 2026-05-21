<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Electricity</title>
    <link rel="stylesheet" href="../hoofdbord.css">
    <link rel="stylesheet" href="electriciteit.css">
</head>
<body class="module-page">
    <section class="module-shell glass-panel">
        <header class="module-header">
            <div>
                <p class="eyebrow">Consumption</p>
                <h1>Home energy usage</h1>
            </div>
            <a class="back-link" href="../hoofdbord.php">Back to dashboard</a>
        </header>
        <div class="module-grid">
            <article class="module-card">
                <p>Current demand</p>
                <strong>3.2 kW</strong>
                <p>Non-urgent devices are shifted away from peak tariff hours.</p>
                <div class="module-meter" style="--meter: 48%"><span></span></div>
            </article>
            <article class="module-card">
                <p>Largest consumers</p>
                <div class="device-list">
                    <div class="device-row"><span>Heat pump</span><strong>1.1 kW</strong></div>
                    <div class="device-row"><span>Kitchen</span><strong>0.8 kW</strong></div>
                    <div class="device-row"><span>EV charger</span><strong>0.6 kW</strong></div>
                </div>
            </article>
        </div>
    </section>
</body>
</html>
