var periodButtons = document.querySelectorAll("[data-period]");
var toggleButtons = document.querySelectorAll(".toggle-pill");
var moduleMeter = document.querySelector(".module-meter");

for (var i = 0; i < periodButtons.length; i++) {
    periodButtons[i].onclick = function () {
        var period = this.getAttribute("data-period");
        var selected = document.querySelector(".selected-period");
        var description = document.querySelector(".period-description");

        for (var j = 0; j < periodButtons.length; j++) {
            periodButtons[j].classList.remove("active");
        }
        this.classList.add("active");

        if (selected) selected.innerHTML = period;
        if (description) description.innerHTML = "This is the " + period + " view for the house.";

        if (moduleMeter) {
            if (period == "day") moduleMeter.style.setProperty("--meter", "70%");
            if (period == "week") moduleMeter.style.setProperty("--meter", "78%");
            if (period == "month") moduleMeter.style.setProperty("--meter", "84%");
            if (period == "year") moduleMeter.style.setProperty("--meter", "91%");
        }
    };
}

function countLights() {
    var count = 0;

    for (var i = 0; i < toggleButtons.length; i++) {
        if (toggleButtons[i].getAttribute("aria-pressed") == "true") {
            count++;
        }
    }

    var deviceCount = document.querySelector(".device-count");
    var summary = document.querySelector(".device-summary");

    if (deviceCount) deviceCount.innerHTML = count;
    if (summary) summary.innerHTML = count + " devices active.";
    if (moduleMeter) moduleMeter.style.setProperty("--meter", Math.max(12, count * 22) + "%");
}

for (var k = 0; k < toggleButtons.length; k++) {
    toggleButtons[k].onclick = function () {
        if (this.getAttribute("aria-pressed") == "true") {
            this.setAttribute("aria-pressed", "false");
            this.classList.add("is-off");
        } else {
            this.setAttribute("aria-pressed", "true");
            this.classList.remove("is-off");
        }

        countLights();
    };
}

if (toggleButtons.length > 0) {
    countLights();
}
