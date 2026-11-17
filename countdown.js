document.addEventListener("DOMContentLoaded", function () {

    // SECTION 47 WEEKLY SCHEDULE
    // JavaScript day numbers: Sunday = 0, Monday = 1, etc.

    const schedule = {
        1: [
            {
                start: "08:00",
                end: "11:50",
                name: "Applied Mathematics I",
                code: "Math1101"
            }
        ],

        2: [
            {
                start: "08:00",
                end: "08:50",
                name: "Introduction to Computing",
                code: "CSEg1101"
            },
            {
                start: "09:00",
                end: "11:50",
                name: "General Physics",
                code: "Phys1101"
            },
            {
                start: "14:00",
                end: "16:50",
                name: "Mathematics Tutorial",
                code: "Math1101"
            }
        ],

        3: [
            {
                start: "08:00",
                end: "10:50",
                name: "Communicative English",
                code: "EnLa1001"
            },
            {
                start: "14:00",
                end: "16:50",
                name: "Physics Tutorial",
                code: "Phys1101"
            }
        ],

        4: [
            {
                start: "08:00",
                end: "11:50",
                name: "Computing Lab",
                code: "CSEg1101"
            },
            {
                start: "14:00",
                end: "16:50",
                name: "Logic & Critical Thinking",
                code: "LART1002"
            }
        ],

        5: [
            {
                start: "08:00",
                end: "11:50",
                name: "Physical Fitness",
                code: "SpSc1011"
            },
            {
                start: "14:00",
                end: "16:50",
                name: "General Chemistry",
                code: "Chem1101"
            }
        ]
    };


    // GET HTML ELEMENTS

    const nameElement = document.getElementById("next-class-name");
    const detailsElement = document.getElementById("next-class-details");
    const statusElement = document.getElementById("countdown-status");

    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");


    // CHECK THAT ALL HTML ELEMENTS EXIST

    if (
        !nameElement ||
        !detailsElement ||
        !statusElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {
        console.error("Countdown: Required HTML elements are missing.");
        return;
    }


    // GET CURRENT TIME IN ETHIOPIA

    function getEthiopianNow() {

        const parts = new Intl.DateTimeFormat("en-GB", {
            timeZone: "Africa/Addis_Ababa",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hourCycle: "h23"
        }).formatToParts(new Date());

        const values = {};

        parts.forEach(function (part) {
            values[part.type] = part.value;
        });

        return Date.UTC(
            Number(values.year),
            Number(values.month) - 1,
            Number(values.day),
            Number(values.hour) - 3,
            Number(values.minute),
            Number(values.second)
        );
    }


    // FIND THE NEXT CLASS

    function getNextClass(now) {

        const localDate = new Date(
            now + 3 * 60 * 60 * 1000
        );

        const today = Date.UTC(
            localDate.getUTCFullYear(),
            localDate.getUTCMonth(),
            localDate.getUTCDate()
        );

        let upcoming = null;

        // Search today and the next seven days

        for (let offset = 0; offset <= 7; offset++) {

            const date = new Date(
                today + offset * 86400000
            );

            const dayNumber = date.getUTCDay();
            const assignments = schedule[dayNumber] || [];

            for (const item of assignments) {
                const [startHour, startMinute] = item.start.split(":").map(Number);
                const [endHour, endMinute] = item.end.split(":").map(Number);

                const classStart = Date.UTC(
                    date.getUTCFullYear(),
                    date.getUTCMonth(),
                    date.getUTCDate(),
                    startHour,
                    startMinute,
                    0,
                    0
                );

                const classEnd = Date.UTC(
                    date.getUTCFullYear(),
                    date.getUTCMonth(),
                    date.getUTCDate(),
                    endHour,
                    endMinute,
                    0,
                    0
                );

                if (classStart > now && (!upcoming || classStart < upcoming.start)) {
                    upcoming = {
                        start: classStart,
                        end: classEnd,
                        name: item.name,
                        code: item.code
                    };
                }
            }
        }

        return upcoming;
    }


    // UPDATE COUNTDOWN

    function updateCountdown() {
        const now = getEthiopianNow();
        const nextClass = getNextClass(now);

        if (!nextClass) {
            nameElement.textContent = "No upcoming class";
            detailsElement.textContent = "Enjoy your free time";
            statusElement.textContent = "Status: Idle";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";
            return;
        }

        const remaining = Math.max(0, nextClass.start - now);
        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

        nameElement.textContent = nextClass.name;
        detailsElement.textContent = `${nextClass.code} • ${nextClass.startLabel || "Class begins soon"}`;
        statusElement.textContent = `Status: ${remaining <= 0 ? "In class" : "Next class"}`;
        hoursElement.textContent = String(hours).padStart(2, "0");
        minutesElement.textContent = String(minutes).padStart(2, "0");
        secondsElement.textContent = String(seconds).padStart(2, "0");
    }


    updateCountdown();
    setInterval(updateCountdown, 1000);
});
