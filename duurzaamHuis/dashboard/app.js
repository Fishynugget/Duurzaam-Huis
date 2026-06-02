const timeNode = document.querySelector("#currentTime");
const dateNode = document.querySelector("#currentDate");
const boardTime = document.querySelector("#boardTime");
const filters = document.querySelectorAll("[data-period]");
const chartNode = document.querySelector(".comparison-chart");
const appShell = document.querySelector(".app-shell");
const sidebarToggle = document.querySelector(".sidebar-toggle");
const historyTotals = {
    generated: document.querySelector('[data-history-total="generated"]'),
    used: document.querySelector('[data-history-total="used"]'),
    net: document.querySelector('[data-history-total="net"]')
};
const historyPeriodTitle = document.querySelector(".history-period-title");
const historyPeriodCopy = document.querySelector(".history-period-copy");
const historyTimeline = document.querySelector(".timeline");

const periodData = {
    hour: createHourlyData(),
    day: createDayData(),
    week: createWeekData(),
    month: createMonthData(),
    year: createYearData()
};

const periodMeta = {
    hour: {
        title: "Hourly flow",
        copy: "Compare every hour from 0:00 to 23:00."
    },
    day: {
        title: "Today overview",
        copy: "Generated and used energy across the main moments of today."
    },
    week: {
        title: "Week overview",
        copy: "Daily comparison for this week."
    },
    month: {
        title: "Month overview",
        copy: "Weekly trend for this month."
    },
    year: {
        title: "Year overview",
        copy: "Seasonal generation and usage trend."
    }
};

function createHourlyData() {

    const now = new Date();

    const currentHour = now.getHours();

    return Array.from(
        { length: Math.min(currentHour + 1, 24) },
        (_, hour) => {

            const generated = Math.max(
                12,
                Math.round(
                    18 + Math.sin((hour - 6) / 24 * Math.PI) * 76
                )
            );

            const used = Math.round(
                42 + Math.cos((hour - 19) / 24 * Math.PI * 2) * 18
            );

            return {
                generated,
                used,

                label:
                    `${String(hour).padStart(2, "0")}:00`,

                isNow: hour === currentHour,

                solar: (generated / 18).toFixed(1),

                usage: (used / 22).toFixed(1),

                net: ((generated - used) / 24).toFixed(1),

                battery: Math.max(
                    18,
                    Math.min(
                        96,
                        generated - used + 58
                    )
                )
            };
        }
    );
}

function createDayData() {

    const dayNames = [
        "Zo",
        "Ma",
        "Di",
        "Wo",
        "Do",
        "Vr",
        "Za"
    ];

    const now = new Date();

    return Array.from(
        { length: 7 },
        (_, index) => {

            const offset = 6 - index;

            const date = new Date(now);

            date.setDate(now.getDate() - offset);

            const generated =
                Math.round(
                    58 + Math.sin(index / 7 * Math.PI) * 28
                );

            const used =
                Math.round(
                    42 + Math.cos(index / 7 * Math.PI) * 18
                );

            return {
                generated,
                used,

                label: dayNames[date.getDay()],

                isNow: offset === 0,

                solar: (generated / 12).toFixed(1),

                usage: (used / 14).toFixed(1),

                net: ((generated - used) / 18).toFixed(1),

                battery: Math.max(
                    18,
                    Math.min(
                        96,
                        generated - used + 58
                    )
                )
            };
        }
    );
}

function createWeekData() {
    return Array.from(
        { length: 4 },
        (_, index) => {

            const generated =
                Math.round(
                    58 + Math.sin(index / 4 * Math.PI) * 28
                );

            const used =
                Math.round(
                    42 + Math.cos(index / 4 * Math.PI) * 18
                );

            return {
                generated,
                used,

                label: `Week ${index + 1}`,

                isNow: index === 3,

                solar: (generated / 12).toFixed(1),

                usage: (used / 14).toFixed(1),

                net: ((generated - used) / 18).toFixed(1),

                battery: Math.max(
                    18,
                    Math.min(
                        96,
                        generated - used + 58
                    )
                )
            };
        }
    );
}

function createMonthData() {

    const monthNames = [
        "Jan",
        "Feb",
        "Mrt",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Okt",
        "Nov",
        "Dec"
    ];

    const now = new Date();

    return Array.from(
        { length: 12 },
        (_, index) => {

            const offset = 11 - index;

            const date = new Date(now);

            date.setMonth(now.getMonth() - offset);

            const generated =
                Math.round(
                    64 + Math.sin(index / 12 * Math.PI) * 26
                );

            const used =
                Math.round(
                    48 + Math.cos(index / 12 * Math.PI) * 18
                );

            return {
                generated,
                used,

                label: monthNames[date.getMonth()],

                isNow: offset === 0,

                solar: (generated / 12).toFixed(1),

                usage: (used / 14).toFixed(1),

                net: ((generated - used) / 18).toFixed(1),

                battery: Math.max(
                    18,
                    Math.min(
                        96,
                        generated - used + 58
                    )
                )
            };
        }
    );
}

function createYearData() {

    const now = new Date();

    return Array.from(
        { length: 10 },
        (_, index) => {

            const offset = 9 - index;

            const year = now.getFullYear() - offset;

            const generated =
                Math.round(
                    72 + Math.sin(index / 10 * Math.PI) * 24
                );

            const used =
                Math.round(
                    54 + Math.cos(index / 10 * Math.PI) * 18
                );

            return {
                generated,
                used,

                label: String(year),

                isNow: offset === 0,

                solar: (generated / 12).toFixed(1),

                usage: (used / 14).toFixed(1),

                net: ((generated - used) / 18).toFixed(1),

                battery: Math.max(
                    18,
                    Math.min(
                        96,
                        generated - used + 58
                    )
                )
            };
        }
    );
}
function updateClock() {
    const now = new Date();

    if (timeNode) {
        timeNode.textContent = new Intl.DateTimeFormat("nl-NL", {
            hour: "2-digit",
            minute: "2-digit"
        }).format(now);
    }

    if (dateNode) {
        dateNode.textContent = new Intl.DateTimeFormat("nl-NL", {
            weekday: "long",
            day: "numeric",
            month: "long"
        }).format(now);
    }

    if (boardTime) {
        boardTime.textContent = new Intl.DateTimeFormat("nl-NL", {
            hour: "2-digit",
            minute: "2-digit"
        }).format(now);
    }
}

function updateBars(period) {
    if (period === "hour") {
        periodData.hour = createHourlyData();
    }

    if (period === "day") {
        periodData.day = createDayData();
    }

    if (period === "week") {
        periodData.week = createWeekData();
    }

    const data = periodData[period] || periodData.hour;

    if (!chartNode) {
        return;
    }

    chartNode.dataset.period = period;
    chartNode.innerHTML = data.map((item) => `
        <div class="bar ${item.isNow ? "is-now" : ""}" tabindex="0" aria-label="${item.label} energy details" style="--generated: ${item.generated}%; --used: ${item.used}%">
            <span></span>
            <i></i>
            <em class="energy-tooltip">
    <b>${item.isNow ? `${item.label} - Nu` : item.label}</b>

    <span>
        <strong>Generated</strong>
        <strong>${item.solar || (item.generated / 18).toFixed(1)} kWh</strong>
    </span>

    <span>
        <strong>Used</strong>
        <strong>${item.usage || (item.used / 22).toFixed(1)} kWh</strong>
    </span>

    <span>
        <strong>Stored</strong>
        <strong>${((item.generated - item.used) / 24).toFixed(1)} kWh</strong>
    </span>
</em>
            <small>${item.label}</small>
        </div>
    `).join("");

    updateHistoryDetails(period, data);

    if (period === "hour") {
        chartNode.querySelector(".is-now")?.scrollIntoView({
            block: "nearest",
            inline: "center"
        });
    }
}

function updateHistoryDetails(period, data) {
    const generated = data.reduce((total, item) => total + Number(item.solar || item.generated / 18), 0);
    const used = data.reduce((total, item) => total + Number(item.usage || item.used / 22), 0);
    const net = generated - used;
    const now = new Date();
    const timeText = new Intl.DateTimeFormat("nl-NL", {
        hour: "2-digit",
        minute: "2-digit"
    }).format(now);
    const currentItem = data.find((item) => item.isNow);
    const meta = periodMeta[period] || periodMeta.hour;

    if (historyTotals.generated) {
        historyTotals.generated.textContent = `${generated.toFixed(1)} kWh`;
    }

    if (historyTotals.used) {
        historyTotals.used.textContent = `${used.toFixed(1)} kWh`;
    }

    if (historyTotals.net) {
        historyTotals.net.textContent = `${net >= 0 ? "+" : ""}${net.toFixed(1)} kWh`;
    }

    if (historyPeriodTitle) {
        historyPeriodTitle.textContent = period === "hour" ? "Hourly flow - now visible" : meta.title;
    }

    if (historyPeriodCopy) {
        historyPeriodCopy.textContent = period === "hour"
            ? `Het is nu ${timeText}. De chart toont de laatste 24 uur en eindigt bij ${currentItem?.label || "nu"}.`
            : meta.copy;
    }

    if (historyTimeline) {
        historyTimeline.innerHTML = createTimeline(period, data, net, currentItem);
    }
}

function createTimeline(period, data, net, currentItem) {
    if (period === "hour" && currentItem) {
        return `
            <article>
                <span></span>
                <div>
                    <strong>Nu: ${currentItem.label}</strong>
                    <p>Current hour is highlighted in the chart.</p>
                </div>
            </article>
            <article>
                <span></span>
                <div>
                    <strong>Net result</strong>
                    <p>${net >= 0 ? "Surplus" : "Deficit"} of ${Math.abs(net).toFixed(1)} kWh in this view.</p>
                </div>
            </article>
            <article>
                <span></span>
                <div>
                    <strong>Best solar moment</strong>
                    <p>Midday hours show the strongest generation.</p>
                </div>
            </article>
        `;
    }

    return `
        <article>
            <span></span>
            <div>
                <strong>Highest generation</strong>
                <p>${data.reduce((best, item) => item.generated > best.generated ? item : best, data[0]).label} has the strongest solar output.</p>
            </div>
        </article>
        <article>
            <span></span>
            <div>
                <strong>Net result</strong>
                <p>${net >= 0 ? "Saved" : "Used extra"} ${Math.abs(net).toFixed(1)} kWh in this period.</p>
            </div>
        </article>
        <article>
            <span></span>
            <div>
                <strong>Usage peak</strong>
                <p>${data.reduce((peak, item) => item.used > peak.used ? item : peak, data[0]).label} has the highest usage.</p>
            </div>
        </article>
    `;
}

filters.forEach((button) => {
    button.addEventListener("click", () => {
        filters.forEach((filter) => filter.classList.remove("active"));
        button.classList.add("active");
        updateBars(button.dataset.period || "hour");
    });
});

if (appShell && sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
        const isHidden = appShell.classList.toggle("sidebar-hidden");
        sidebarToggle.setAttribute("aria-expanded", String(!isHidden));
    });
}

updateClock();
updateBars("hour");
setInterval(updateClock, 1000);
setInterval(() => {
    const activePeriod = document.querySelector("[data-period].active")?.dataset.period;

    if (activePeriod === "hour") {
        updateBars("hour");
    }
}, 60000);
