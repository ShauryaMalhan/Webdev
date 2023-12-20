document.addEventListener("DOMContentLoaded", function () {
    const daysContainer = document.querySelector(".calendar-body");
    const monthYear = document.getElementById("monthYear");
    const prevMonthButton = document.getElementById("prevMonth");
    const nextMonthButton = document.getElementById("nextMonth");
    const yearInput = document.getElementById("yearInput");
    const updateYearButton = document.getElementById("updateYear");

    const monthNames = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    const today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth();

    function displayCalendar(year, month) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        monthYear.textContent = `${monthNames[month]} ${year}`;

        daysContainer.innerHTML = "";

        for (let i = 1; i <= lastDay.getDate(); i++) {
            const dayElement = document.createElement("div");
            dayElement.textContent = i;
            dayElement.classList.add("calendar-day");
            daysContainer.appendChild(dayElement);
        }
    }

    displayCalendar(currentYear, currentMonth);

    prevMonthButton.addEventListener("click", () => {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        displayCalendar(currentYear, currentMonth);
    });

    nextMonthButton.addEventListener("click", () => {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        displayCalendar(currentYear, currentMonth);
    });

    updateYearButton.addEventListener("click", () => {
        const newYear = parseInt(yearInput.value);
        if (!isNaN(newYear) && newYear >= 1900 && newYear <= 2100) {
            currentYear = newYear;
            displayCalendar(currentYear, currentMonth);
        }
    });
});
