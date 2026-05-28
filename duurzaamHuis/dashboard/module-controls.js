const rangeButtons = document.querySelectorAll("[data-range]");
const selectedPeriod = document.querySelector(".selected-period");
const periodDescription = document.querySelector(".period-description");
const moduleMeter = document.querySelector(".module-meter");
const toggleButtons = document.querySelectorAll(".toggle-pill");
const activeRooms = document.querySelector(".device-count");
const deviceSummary = document.querySelector(".device-summary");

const rangeContent = {
    day: {
        title: "Day",
        meter: "70%",
        text: "Hourly energy changes for today."
    },
    week: {
        title: "Week",
        meter: "78%",
        text: "Daily generation, usage and battery behavior for the week."
    },
    month: {
        title: "Month",
        meter: "84%",
        text: "The monthly view helps spot patterns in savings and peak usage."
    },
    year: {
        title: "Year",
        meter: "91%",
        text: "The yearly view shows long-term solar and consumption trends."
    }
};

rangeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const content = rangeContent[button.dataset.period];

        if (!content) {
            return;
        }

        rangeButtons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");

        if (selectedPeriod) {
            selectedPeriod.textContent = content.title;
        }

        if (periodDescription) {
            periodDescription.textContent = content.text;
        }

        if (moduleMeter) {
            moduleMeter.style.setProperty("--meter", content.meter);
        }
    });
});

function updateDeviceSummary() {
    if (!toggleButtons.length) {
        return;
    }

    const activeCount = [...toggleButtons].filter((button) => button.getAttribute("aria-pressed") === "true").length;

    if (activeRooms) {
        activeRooms.textContent = String(activeCount);
    }

    if (deviceSummary) {
        deviceSummary.textContent = `${activeCount} device${activeCount === 1 ? "" : "s"} active. Lighting adapts to daylight and occupancy.`;
    }

    if (moduleMeter) {
        moduleMeter.style.setProperty("--meter", `${Math.max(12, activeCount * 22)}%`);
    }
}

toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const isActive = button.getAttribute("aria-pressed") === "true";

        button.setAttribute("aria-pressed", String(!isActive));
        button.classList.toggle("is-off", isActive);
        updateDeviceSummary();
    });
});

updateDeviceSummary();
