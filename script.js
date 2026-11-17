document.addEventListener("DOMContentLoaded", function () {

  const weeklySchedule = {
    Monday: [
      ["08:00–11:50", "Applied Mathematics I", "Math1101"]
    ],

    Tuesday: [
      ["08:00–08:50", "Introduction to Computing", "CSEg1101"],
      ["09:00–11:50", "General Physics", "Phys1101"],
      ["14:00–16:50", "Mathematics Tutorial", "Math1101"]
    ],

    Wednesday: [
      ["08:00–10:50", "Communicative English", "EnLa1001"],
      ["14:00–16:50", "Physics Tutorial", "Phys1101"]
    ],

    Thursday: [
      ["08:00–11:50", "Computing Lab", "CSEg1101"],
      ["14:00–16:50", "Logic & Critical Thinking", "LART1002"]
    ],

    Friday: [
      ["08:00–11:50", "Physical Fitness", "SpSc1011"],
      ["14:00–16:50", "General Chemistry", "Chem1101"]
    ]
  };

  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    timeZone: "Africa/Addis_Ababa"
  }).format(new Date());

  const todayTitle = document.getElementById("today-title");
  const todayClasses = document.getElementById("today-classes");

  if (!todayTitle || !todayClasses) return;

  todayTitle.textContent = `Today's Schedule — ${today}`;

  if (weeklySchedule[today]) {
    todayClasses.innerHTML = weeklySchedule[today]
      .map(([time, name, code]) => `
        <div class="class-item">
          <strong>${name}</strong>
          <small>${time} · ${code}</small>
        </div>
      `)
      .join("");
  } else {
    todayClasses.innerHTML = `
      <div class="class-item">
        <strong>No scheduled classes today.</strong>
        <small>Enjoy your day!</small>
      </div>
    `;
  }

});
