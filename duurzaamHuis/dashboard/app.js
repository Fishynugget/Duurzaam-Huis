var timeText = document.querySelector("#currentTime");
var dateText = document.querySelector("#currentDate");
var boardTime = document.querySelector("#boardTime");
var chart = document.querySelector(".comparison-chart");
var timeline = document.querySelector(".timeline");
var titleText = document.querySelector(".history-period-title");
var copyText = document.querySelector(".history-period-copy");
var buttons = document.querySelectorAll("[data-period]");
var shell = document.querySelector(".app-shell");
var menuButton = document.querySelector(".sidebar-toggle");

var days = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];
var months = ["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];

function klokje() {
    var nu = new Date();
    var uren = String(nu.getHours()).padStart(2, "0");
    var minuten = String(nu.getMinutes()).padStart(2, "0");
    var tijd = uren + ":" + minuten;

    if (timeText) {
        timeText.innerHTML = tijd;
    }
    if (boardTime) {
        boardTime.innerHTML = tijd;
    }
    if (dateText) {
        dateText.innerHTML = nu.toLocaleDateString("nl-NL", {
            weekday: "long",
            day: "numeric",
            month: "long"
        });
    }
}

function maakData(soort) {
    var lijst = [];
    var aantal = 24;
    var nu = new Date();
    var actief = 0;

    if (soort == "hour") {
        aantal = nu.getHours() + 1;
        actief = nu.getHours();
    }
    if (soort == "day") {
        aantal = 7;
        actief = 6;
    }
    if (soort == "week") {
        aantal = 4;
        actief = 3;
    }
    if (soort == "month") {
        aantal = 12;
        actief = 11;
    }
    if (soort == "year") {
        aantal = 10;
        actief = 9;
    }

    for (var i = 0; i < aantal; i++) {
        var label = "";
        var generated = 0;
        var used = 0;

        if (soort == "hour") {
            label = String(i).padStart(2, "0") + ":00";
            generated = Math.max(12, Math.round(18 + Math.sin((i - 6) / 24 * Math.PI) * 76));
            used = Math.round(42 + Math.cos((i - 19) / 24 * Math.PI * 2) * 18);
        }
        if (soort == "day") {
            var dag = new Date();
            dag.setDate(dag.getDate() - (6 - i));
            label = days[dag.getDay()];
            generated = Math.round(58 + Math.sin(i / 7 * Math.PI) * 28);
            used = Math.round(42 + Math.cos(i / 7 * Math.PI) * 18);
        }
        if (soort == "week") {
            label = "Week " + (i + 1);
            generated = Math.round(58 + Math.sin(i / 4 * Math.PI) * 28);
            used = Math.round(42 + Math.cos(i / 4 * Math.PI) * 18);
        }
        if (soort == "month") {
            var maand = new Date();
            maand.setMonth(maand.getMonth() - (11 - i));
            label = months[maand.getMonth()];
            generated = Math.round(64 + Math.sin(i / 12 * Math.PI) * 26);
            used = Math.round(48 + Math.cos(i / 12 * Math.PI) * 18);
        }
        if (soort == "year") {
            label = String(new Date().getFullYear() - (9 - i));
            generated = Math.round(72 + Math.sin(i / 10 * Math.PI) * 24);
            used = Math.round(54 + Math.cos(i / 10 * Math.PI) * 18);
        }

        lijst.push({
            label: label,
            generated: generated,
            used: used,
            now: i == actief,
            solar: (generated / 18).toFixed(1),
            usage: (used / 22).toFixed(1),
            net: ((generated - used) / 24).toFixed(1)
        });
    }

    return lijst;
}

function maakChart(soort) {
    if (!chart) {
        return;
    }

    var data = maakData(soort);
    var html = "";

    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var extraClass = "";
        var naam = item.label;

        if (item.now) {
            extraClass = " is-now";
            naam = item.label + " - Nu";
        }

        html += '<div class="bar' + extraClass + '" tabindex="0" aria-label="' + item.label + ' energy details" style="--generated: ' + item.generated + '%; --used: ' + item.used + '%">';
        html += "<span></span>";
        html += "<i></i>";
        html += '<em class="energy-tooltip">';
        html += "<b>" + naam + "</b>";
        html += "<span><strong>Generated</strong><strong>" + item.solar + " kWh</strong></span>";
        html += "<span><strong>Used</strong><strong>" + item.usage + " kWh</strong></span>";
        html += "<span><strong>Stored</strong><strong>" + item.net + " kWh</strong></span>";
        html += "</em>";
        html += "<small>" + item.label + "</small>";
        html += "</div>";
    }

    chart.setAttribute("data-period", soort);
    chart.innerHTML = html;
    updateInfo(soort, data);

    var nowBar = chart.querySelector(".is-now");
    if (soort == "hour" && nowBar) {
        nowBar.scrollIntoView({ block: "nearest", inline: "center" });
    }
}

function updateInfo(soort, data) {
    var totalGenerated = 0;
    var totalUsed = 0;
    var currentLabel = "nu";

    for (var i = 0; i < data.length; i++) {
        totalGenerated = totalGenerated + Number(data[i].solar);
        totalUsed = totalUsed + Number(data[i].usage);
        if (data[i].now) {
            currentLabel = data[i].label;
        }
    }

    var totalNet = totalGenerated - totalUsed;
    var genText = document.querySelector('[data-history-total="generated"]');
    var useText = document.querySelector('[data-history-total="used"]');
    var netText = document.querySelector('[data-history-total="net"]');

    if (genText) genText.innerHTML = totalGenerated.toFixed(1) + " kWh";
    if (useText) useText.innerHTML = totalUsed.toFixed(1) + " kWh";
    if (netText) netText.innerHTML = (totalNet >= 0 ? "+" : "") + totalNet.toFixed(1) + " kWh";

    if (soort == "hour") {
        if (titleText) titleText.innerHTML = "Hourly flow - now visible";
        if (copyText) copyText.innerHTML = "Het is nu " + (timeText ? timeText.innerHTML : "") + ". De chart toont de laatste 24 uur en eindigt bij " + currentLabel + ".";
    } else {
        if (titleText) titleText.innerHTML = soort + " overview";
        if (copyText) copyText.innerHTML = "Generated and used energy in this period.";
    }

    if (timeline) {
        timeline.innerHTML = "";
        timeline.innerHTML += "<article><span></span><div><strong>Net result</strong><p>" + totalNet.toFixed(1) + " kWh in this view.</p></div></article>";
        timeline.innerHTML += "<article><span></span><div><strong>Solar peak</strong><p>Midday is usually the best moment.</p></div></article>";
        timeline.innerHTML += "<article><span></span><div><strong>Usage</strong><p>The house is still using energy.</p></div></article>";
    }
}

for (var b = 0; b < buttons.length; b++) {
    buttons[b].onclick = function () {
        for (var x = 0; x < buttons.length; x++) {
            buttons[x].classList.remove("active");
        }
        this.classList.add("active");
        maakChart(this.getAttribute("data-period"));
    };
}

if (shell && menuButton) {
    menuButton.onclick = function () {
        if (shell.classList.contains("sidebar-hidden")) {
            shell.classList.remove("sidebar-hidden");
            menuButton.setAttribute("aria-expanded", "true");
        } else {
            shell.classList.add("sidebar-hidden");
            menuButton.setAttribute("aria-expanded", "false");
        }
    };
}

klokje();
maakChart("hour");

setInterval(klokje, 1000);
setInterval(function () {
    var active = document.querySelector("[data-period].active");
    if (active && active.getAttribute("data-period") == "hour") {
        maakChart("hour");
    }
}, 60000);
