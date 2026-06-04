const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const timeNode = $("#currentTime");
const dateNode = $("#currentDate");
const boardTime = $("#boardTime");
const filters = $$("[data-period]");
const chartNode = $(".comparison-chart");
const appShell = $(".app-shell");
const sidebarToggle = $(".sidebar-toggle");
const historyTimeline = $(".timeline");
const historyPeriodTitle = $(".history-period-title");
const historyPeriodCopy = $(".history-period-copy");
const historyTotals = {
    generated: $('[data-history-total="generated"]'),
    used: $('[data-history-total="used"]'),
    net: $('[data-history-total="net"]')
};

const dayNames = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];
const monthNames = ["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];

const periodMeta = {
    hour: ["Hourly flow", "Compare every hour from 0:00 to 23:00."],
    day: ["Today overview", "Generated and used energy across the main moments of today."],
    week: ["Week overview", "Daily comparison for this week."],
    month: ["Month overview", "Weekly trend for this month."],
    year: ["Year overview", "Seasonal generation and usage trend."]
};

const periodConfig = {
    hour: {
        length: () => Math.min(new Date().getHours() + 1, 24),
        current: () => new Date().getHours(),
        label: (index) => `${String(index).padStart(2, "0")}:00`,
        generated: (index) => Math.max(12, Math.round(18 + Math.sin((index - 6) / 24 * Math.PI) * 76)),
        used: (index) => Math.round(42 + Math.cos((index - 19) / 24 * Math.PI * 2) * 18),
        solarBase: 18,
        usageBase: 22,
        netBase: 24
    },
    day: {
        length: 7,
        current: 6,
        label: (index) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - index));
            return dayNames[date.getDay()];
        },
        generated: (index) => Math.round(58 + Math.sin(index / 7 * Math.PI) * 28),
        used: (index) => Math.round(42 + Math.cos(index / 7 * Math.PI) * 18)
    },
    week: {
        length: 4,
        current: 3,
        label: (index) => `Week ${index + 1}`,
        generated: (index) => Math.round(58 + Math.sin(index / 4 * Math.PI) * 28),
        used: (index) => Math.round(42 + Math.cos(index / 4 * Math.PI) * 18)
    },
    month: {
        length: 12,
        current: 11,
        label: (index) => {
            const date = new Date();
            date.setMonth(date.getMonth() - (11 - index));
            return monthNames[date.getMonth()];
        },
        generated: (index) => Math.round(64 + Math.sin(index / 12 * Math.PI) * 26),
        used: (index) => Math.round(48 + Math.cos(index / 12 * Math.PI) * 18)
    },
    year: {
        length: 10,
        current: 9,
        label: (index) => String(new Date().getFullYear() - (9 - index)),
        generated: (index) => Math.round(72 + Math.sin(index / 10 * Math.PI) * 24),
        used: (index) => Math.round(54 + Math.cos(index / 10 * Math.PI) * 18)
    }
};

function value(setting, index) {
    return typeof setting === "function" ? setting(index) : setting;
}

function createData(period) {
    const config = periodConfig[period] || periodConfig.hour;

    return Array.from({ length: value(config.length) }, (_, index) => {
        const generated = config.generated(index);
        const used = config.used(index);
        const solarBase = config.solarBase || 12;
        const usageBase = config.usageBase || 14;
        const netBase = config.netBase || 18;

        return {
            generated,
            used,
            label: config.label(index),
            isNow: index === value(config.current),
            solar: (generated / solarBase).toFixed(1),
            usage: (used / usageBase).toFixed(1),
            net: ((generated - used) / netBase).toFixed(1),
            battery: Math.max(18, Math.min(96, generated - used + 58))
        };
    });
}

function formatTime(date = new Date()) {
    return new Intl.DateTimeFormat("nl-NL", {
        hour: "2-digit",
        minute: "2-digit"
    }).format(date);
}

function updateClock() {
    const now = new Date();
    const timeText = formatTime(now);

    if (timeNode) timeNode.textContent = timeText;
    if (boardTime) boardTime.textContent = timeText;
    if (dateNode) {
        dateNode.textContent = new Intl.DateTimeFormat("nl-NL", {
            weekday: "long",
            day: "numeric",
            month: "long"
        }).format(now);
    }
}

function updateBars(period = "hour") {
    const data = createData(period);

    if (!chartNode) return;

    chartNode.dataset.period = period;
    chartNode.innerHTML = data.map(createBar).join("");
    updateHistoryDetails(period, data);

    if (period === "hour") {
        chartNode.querySelector(".is-now")?.scrollIntoView({
            block: "nearest",
            inline: "center"
        });
    }
}

function createBar(item) {
    const title = item.isNow ? `${item.label} - Nu` : item.label;

    return `
        <div class="bar ${item.isNow ? "is-now" : ""}" tabindex="0" aria-label="${item.label} energy details" style="--generated: ${item.generated}%; --used: ${item.used}%">
            <span></span>
            <i></i>
            <em class="energy-tooltip">
                <b>${title}</b>
                <span><strong>Generated</strong><strong>${item.solar} kWh</strong></span>
                <span><strong>Used</strong><strong>${item.usage} kWh</strong></span>
                <span><strong>Stored</strong><strong>${item.net} kWh</strong></span>
            </em>
            <small>${item.label}</small>
        </div>
    `;
}

function updateHistoryDetails(period, data) {
    const generated = sum(data, "solar");
    const used = sum(data, "usage");
    const net = generated - used;
    const currentItem = data.find((item) => item.isNow);
    const meta = periodMeta[period] || periodMeta.hour;

    if (historyTotals.generated) historyTotals.generated.textContent = `${generated.toFixed(1)} kWh`;
    if (historyTotals.used) historyTotals.used.textContent = `${used.toFixed(1)} kWh`;
    if (historyTotals.net) historyTotals.net.textContent = `${net >= 0 ? "+" : ""}${net.toFixed(1)} kWh`;
    if (historyPeriodTitle) historyPeriodTitle.textContent = period === "hour" ? "Hourly flow - now visible" : meta[0];
    if (historyPeriodCopy) {
        historyPeriodCopy.textContent = period === "hour"
            ? `Het is nu ${formatTime()}. De chart toont de laatste 24 uur en eindigt bij ${currentItem?.label || "nu"}.`
            : meta[1];
    }
    if (historyTimeline) historyTimeline.innerHTML = createTimeline(period, data, net, currentItem);
}

function sum(data, key) {
    return data.reduce((total, item) => total + Number(item[key]), 0);
}

function createTimeline(period, data, net, currentItem) {
    if (period === "hour" && currentItem) {
        return timelineHtml([
            [`Nu: ${currentItem.label}`, "Current hour is highlighted in the chart."],
            ["Net result", `${net >= 0 ? "Surplus" : "Deficit"} of ${Math.abs(net).toFixed(1)} kWh in this view.`],
            ["Best solar moment", "Midday hours show the strongest generation."]
        ]);
    }

    return timelineHtml([
        ["Highest generation", `${bestItem(data, "generated").label} has the strongest solar output.`],
        ["Net result", `${net >= 0 ? "Saved" : "Used extra"} ${Math.abs(net).toFixed(1)} kWh in this period.`],
        ["Usage peak", `${bestItem(data, "used").label} has the highest usage.`]
    ]);
}

function timelineHtml(items) {
    return items.map(([title, text]) => `
        <article>
            <span></span>
            <div>
                <strong>${title}</strong>
                <p>${text}</p>
            </div>
        </article>
    `).join("");
}

function bestItem(data, key) {
    return data.reduce((best, item) => item[key] > best[key] ? item : best, data[0]);
}

filters.forEach((button) => {
    button.addEventListener("click", () => {
        filters.forEach((filter) => filter.classList.remove("active"));
        button.classList.add("active");
        updateBars(button.dataset.period);
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
    if ($("[data-period].active")?.dataset.period === "hour") updateBars("hour");
}, 60000);
