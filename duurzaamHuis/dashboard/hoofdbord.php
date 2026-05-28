<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Duurzaam Huis Dashboard</title>
    <link rel="stylesheet" href="hoofdbord.css">
</head>

<body>
    <div class="aurora aurora-one"></div>
    <div class="aurora aurora-two"></div>
    <div class="app-shell pdf-layout sidebar-hidden">
        <header class="main-nav glass-panel">
            <button class="sidebar-toggle" type="button" aria-label="Toggle sidebar" aria-expanded="false">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <a class="nav-brand" href="#dashboard">EcoPulse</a>
            <nav class="top-nav-links" aria-label="Snelle navigatie">
                <a href="#dashboard">Dashboard</a>
                <a href="#history">History</a>
                <a href="opbrengst-zonnepanelen/zonnepaneel.php">Solar</a>
                <a href="knopjes-voor-licht/licht.php">Devices</a>
            </nav>
            <div class="nav-status">
                <span class="live-dot"></span>
                Live
            </div>
        </header>

        <aside class="sidebar glass-panel">
            <a class="brand" href="#dashboard" aria-label="EcoPulse dashboard">
                <span class="brand-mark" aria-hidden="true">
                    <svg viewBox="0 0 64 64" role="img">
                        <circle cx="32" cy="32" r="16"></circle>
                        <path d="M23 25c6 4 10 3 18 1M21 35c7-2 14 2 22-1M31 17c-4 10-4 20 1 30M39 19c-5 8-6 17-2 26"></path>
                        <ellipse cx="32" cy="32" rx="28" ry="10" transform="rotate(-20 32 32)"></ellipse>
                    </svg>
                </span>
                <span>EcoPulse</span>
            </a>

            <nav class="nav-list" aria-label="Hoofdnavigatie">
                <a class="nav-item active" href="#dashboard">
                    <span class="nav-icon">D</span>
                    Dashboard
                </a>
                <a class="nav-item" href="#history">
                    <span class="nav-icon">H</span>
                    Energy History
                </a>
                <a class="nav-item" href="opbrengst-zonnepanelen/zonnepaneel.php">
                    <span class="nav-icon">S</span>
                    Solar
                </a>
                <a class="nav-item" href="knopjes-voor-licht/licht.php">
                    <span class="nav-icon">L</span>
                    Devices
                </a>
                <a class="nav-item" href="#settings">
                    <span class="nav-icon">G</span>
                    Settings
                </a>
            </nav>

            <div class="sidebar-status">
                <span class="live-dot"></span>
                <div>
                    <strong>Balanced mode on</strong>
                    <p>Home flow balanced</p>
                </div>
            </div>
        </aside>

        <main class="content">
            <header class="topbar pdf-title">
                <div>
                    <span class="pdf-logo" aria-hidden="true">
                        <img src="assets\logo.svg" alt="EcoPulse logo"></img>
                    </span>
                    <p class="eyebrow">EcoPulse dashboard</p>
                    <h1>EcoPulse</h1>
                </div>
                <div class="topbar-cluster glass-panel">
                    <span id="currentDate">Maandag 18 mei</span>
                    <strong id="currentTime">12:00</strong>
                </div>
            </header>

            <section class="pdf-module-board" aria-label="EcoPulse module layout">
                <?php
                    include_once __DIR__ . '/tijdsspanne/tijdsspanne-kaart.php';
                    include_once __DIR__ . '/datum-en-tijd/datumtijd-kaart.php';
                    include_once __DIR__ . '/knopjes-voor-licht/licht-kaart.php';
                    include_once __DIR__ . '/gas-verbruik/gas-kaart.php';
                    include_once __DIR__ . '/water-verbruik/water-kaart.php';
                    include_once __DIR__ . '/weersverwachting/weer-kaart.php';
                    include_once __DIR__ . '/gebruik-electriciteit/electriciteit-kaart.php';
                    include_once __DIR__ . '/opbrengst-zonnepanelen/zonnepaneel-kaart.php';
                    include_once __DIR__ . '/temperatuur-binnen-buiten/temp-kaart.php';
                ?>
            </section>

            <section id="dashboard" class="hero-grid">
                <article class="hero-card glass-panel">
                    <div class="hero-copy">
                        <p class="eyebrow">Home energy overview</p>
                        <h2>A calm view of your home's energy.</h2>
                        <p>Track solar, usage, storage and climate in one place.</p>
                        <div class="hero-actions">
                            <a class="primary-action" href="#history">View analytics</a>
                            <a class="ghost-action" href="gebruik-electriciteit/electriciteit.php">Energy usage</a>
                        </div>
                    </div>
                    <div class="home-visual" aria-label="Abstract smart home energy illustration">
                        <div class="sun-core"></div>
                        <div class="energy-orbit orbit-a"></div>
                        <div class="energy-orbit orbit-b"></div>
                        <div class="house">
                            <div class="roof"></div>
                            <div class="solar-array">
                                <span></span><span></span><span></span>
                            </div>
                            <div class="house-body">
                                <span class="window"></span>
                                <span class="door"></span>
                                <span class="window small"></span>
                            </div>
                        </div>
                        <div class="energy-tower">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                </article>

                <aside class="suggestion-card glass-panel">
                    <p class="eyebrow">Solar tip</p>
                    <h3>Midday solar peak</h3>
                    <p>Schedule larger tasks when solar output is strongest.</p>
                    <div class="confidence">
                        <span>Forecast</span>
                        <strong>94%</strong>
                    </div>
                </aside>
            </section>

            <section class="metric-grid" aria-label="Energy overview">
                <article class="metric-card glass-panel">
                    <span class="metric-icon solar"></span>
                    <p>Solar production</p>
                    <strong>7.8 kW</strong>
                    <small>+18% vs yesterday</small>
                </article>
                <article class="metric-card glass-panel">
                    <span class="metric-icon usage"></span>
                    <p>Home consumption</p>
                    <strong>3.2 kW</strong>
                        <small>Low usage now</small>
                </article>
                <article class="metric-card glass-panel">
                    <span class="metric-icon battery"></span>
                    <p>Battery storage</p>
                    <strong>82%</strong>
                    <small>5h 25m reserve</small>
                </article>
                <article class="metric-card glass-panel">
                    <span class="metric-icon climate"></span>
                    <p>Temperature</p>
                    <strong>21 / 16 C</strong>
                    <small>Indoor / outdoor</small>
                </article>
            </section>

            <section class="dashboard-grid">
                <article class="glass-panel progress-panel">
                    <div class="section-heading">
                        <div>
                            <p class="eyebrow">Overview</p>
                            <h2>Energy balance</h2>
                        </div>
                        <span class="chip">Live</span>
                    </div>
                    <div class="balance-dashboard">
                        <div class="balance-score" style="--value: 84">
                            <span>84</span>
                            <small>Eco score</small>
                        </div>
                        <div class="balance-list">
                            <div class="balance-row">
                                <span>Solar to home</span>
                                <strong>5.4 kW</strong>
                                <i style="--meter: 78%"></i>
                            </div>
                            <div class="balance-row">
                                <span>Battery reserve</span>
                                <strong>82%</strong>
                                <i style="--meter: 82%"></i>
                            </div>
                            <div class="balance-row">
                                <span>Grid import</span>
                                <strong>0.4 kW</strong>
                                <i style="--meter: 18%"></i>
                            </div>
                        </div>
                    </div>
                </article>

                <article class="glass-panel graph-panel">
                    <div class="section-heading">
                        <div>
                            <p class="eyebrow">Energy flow</p>
                            <h2>Today</h2>
                        </div>
                        <span class="chip green">+4.6 kWh net</span>
                    </div>
                    <svg class="line-chart" viewBox="0 0 620 250" aria-label="Energy line graph">
                        <defs>
                            <linearGradient id="lineGlow" x1="0" x2="1">
                                <stop offset="0%" stop-color="#45e9ff"/>
                                <stop offset="100%" stop-color="#8effbb"/>
                            </linearGradient>
                        </defs>
                        <path class="grid-line" d="M40 52H590M40 112H590M40 172H590M40 232H590"></path>
                        <path class="area" d="M40 190 C105 148 142 125 198 137 C258 149 292 62 348 78 C410 96 448 41 506 60 C548 72 570 98 590 88 L590 232 L40 232 Z"></path>
                        <path class="solar-line" d="M40 190 C105 148 142 125 198 137 C258 149 292 62 348 78 C410 96 448 41 506 60 C548 72 570 98 590 88"></path>
                        <path class="usage-line" d="M40 154 C112 169 150 176 205 164 C266 151 305 154 360 142 C425 128 470 159 522 144 C558 135 575 129 590 132"></path>
                    </svg>
                </article>

                <article class="glass-panel weather-panel">
                    <div>
                        <p class="eyebrow">Weather</p>
                        <h2>Solar window</h2>
                    </div>
                    <div class="weather-visual">
                        <span class="cloud"></span>
                        <span class="cloud small-cloud"></span>
                        <span class="weather-sun"></span>
                    </div>
                    <p>Clear skies make midday the best moment for solar-powered tasks.</p>
                </article>
            </section>

            <section id="history" class="history-panel glass-panel">
                <div class="section-heading">
                    <div>
                        <p class="eyebrow">Energy history</p>
                        <h2>Generated vs used</h2>
                    </div>
                    <div class="filter-group" aria-label="Energy history filters">
                        <button class="filter active" type="button" data-period="hour">Uur</button>
                        <button class="filter" type="button" data-period="day">Dag</button>
                        <button class="filter" type="button" data-period="week">Week</button>
                        <button class="filter" type="button" data-period="month">Maand</button>
                        <button class="filter" type="button" data-period="year">Jaar</button>
                    </div>
                </div>

                <div class="history-summary" aria-label="Energy history summary">
                    <article>
                        <span>Generated</span>
                        <strong data-history-total="generated">0 kWh</strong>
                    </article>
                    <article>
                        <span>Used</span>
                        <strong data-history-total="used">0 kWh</strong>
                    </article>
                    <article>
                        <span>Net result</span>
                        <strong data-history-total="net">0 kWh</strong>
                    </article>
                </div>

                <div class="history-layout">
                    <div class="history-chart-card">
                        <div class="chart-meta">
                            <div>
                                <strong class="history-period-title">Hourly flow</strong>
                                <p class="history-period-copy">Compare every hour from 0:00 to 23:00.</p>
                            </div>
                            <div class="chart-legend" aria-label="Chart legend">
                                <span><i class="legend-generated"></i>Generated</span>
                                <span><i class="legend-used"></i>Used</span>
                            </div>
                        </div>
                        <div class="comparison-chart" aria-label="Energy generated versus used chart"></div>
                    </div>

                    <div class="timeline">
                        <article>
                            <span></span>
                            <div>
                                <strong>Solar peak</strong>
                                <p>3.4 kWh stored before noon.</p>
                            </div>
                        </article>
                        <article>
                            <span></span>
                            <div>
                                <strong>Net savings</strong>
                                <p>EUR 4.82 saved today.</p>
                            </div>
                        </article>
                        <article>
                            <span></span>
                            <div>
                                <strong>Evening use</strong>
                                <p>Battery covers most expected demand.</p>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
            <footer class="pdf-footer glass-panel">
                <span>Duurzaam Huis  <br/>Tygo. Helena. Daimien.</span>
            </footer>
        </main>
    </div>
    <script src="app.js"></script>
</body>

</html>
