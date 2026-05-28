<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Devices</title>
    <link rel="stylesheet" href="../hoofdbord.css">
    <link rel="stylesheet" href="licht.css">
</head>
<body class="module-page">
    <section class="module-shell glass-panel">
        <header class="module-header">
            <div>
                <p class="eyebrow">Lighting</p>
                <h1>Lighting and devices</h1>
            </div>
            <a class="back-link" href="../hoofdbord.php">Back to dashboard</a>
        </header>
        <div class="module-grid">
            <article class="module-card">
                <p>Active rooms</p>
                <strong class="device-count">3</strong>
                <p class="device-summary">Adaptive lighting is tuned to daylight and occupancy.</p>
                <div class="module-meter" style="--meter: 64%"><span></span></div>
            </article>
            <article class="module-card">
                <p>Device controls</p>
                <div class="device-list">
                    <div class="device-row"><span>Living room glow</span><button class="toggle-pill" type="button" aria-pressed="true" aria-label="Toggle living room glow"></button></div>
                    <div class="device-row"><span>Kitchen task lights</span><button class="toggle-pill" type="button" aria-pressed="true" aria-label="Toggle kitchen task lights"></button></div>
                    <div class="device-row"><span>Garden sensors</span><button class="toggle-pill" type="button" aria-pressed="true" aria-label="Toggle garden sensors"></button></div>
                </div>
            </article>
        </div>
    </section>
    <script src="../module-controls.js"></script>
</body>
</html>
