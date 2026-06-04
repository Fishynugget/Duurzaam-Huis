const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const periodButtons = $$("[data-period]");
const toggleButtons = $$(".toggle-pill");
const moduleMeter = $(".module-meter");

const periodContent = {
    day: ["Day", "70%", "Hourly energy changes for today."],
    week: ["Week", "78%", "Daily generation, usage and battery behavior for the week."],
    month: ["Month", "84%", "The monthly view helps spot patterns in savings and peak usage."],
    year: ["Year", "91%", "The yearly view shows long-term solar and consumption trends."]
};

periodButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const content = periodContent[button.dataset.period];
        if (!content) return;

        periodButtons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        $(".selected-period").textContent = content[0];
        $(".period-description").textContent = content[2];
        moduleMeter?.style.setProperty("--meter", content[1]);
    });
});

function updateDeviceSummary() {
    const activeCount = toggleButtons.filter((button) => button.getAttribute("aria-pressed") === "true").length;

    $(".device-count").textContent = String(activeCount);
    $(".device-summary").textContent = `${activeCount} device${activeCount === 1 ? "" : "s"} active. Lighting adapts to daylight and occupancy.`;
    moduleMeter?.style.setProperty("--meter", `${Math.max(12, activeCount * 22)}%`);
}

toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const isActive = button.getAttribute("aria-pressed") === "true";
        button.setAttribute("aria-pressed", String(!isActive));
        button.classList.toggle("is-off", isActive);
        updateDeviceSummary();
    });
});

if (toggleButtons.length) updateDeviceSummary();
