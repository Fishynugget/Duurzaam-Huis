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
