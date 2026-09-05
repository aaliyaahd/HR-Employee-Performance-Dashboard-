s// ==========================================
// DUMMY DATA
// ==========================================

const dashboardData = {

    January: {
        attendance: [91, 93, 92, 95, 94, 96],
        overtime: 1120,
        turnover: 5.2,
        employees: 242
    },

    February: {
        attendance: [92, 94, 93, 95, 95, 96],
        overtime: 1185,
        turnover: 4.9,
        employees: 244
    },

    March: {
        attendance: [93, 94, 95, 94, 96, 97],
        overtime: 1210,
        turnover: 4.8,
        employees: 246
    },

    April: {
        attendance: [94, 95, 94, 96, 95, 97],
        overtime: 1250,
        turnover: 4.7,
        employees: 247
    },

    May: {
        attendance: [93, 95, 96, 95, 97, 98],
        overtime: 1268,
        turnover: 4.6,
        employees: 248
    },

    June: {
        attendance: [94, 95, 96, 97, 96, 98],
        overtime: 1284,
        turnover: 4.6,
        employees: 248
    }

};


// ==========================================
// ATTENDANCE CHART
// ==========================================

const attendanceCtx =
    document.getElementById("attendanceChart");

const attendanceChart = new Chart(attendanceCtx, {

    type: "line",

    data: {

        labels: [
            "Week 1",
            "Week 2",
            "Week 3",
            "Week 4",
            "Week 5",
            "Week 6"
        ],

        datasets: [{

            label: "Attendance Rate",

            data: dashboardData.January.attendance,

            borderWidth: 3,

            tension: 0.4,

            fill: false,

            pointRadius: 4

        }]

    },

    options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {
                display: false
            }

        },

        scales: {

            y: {

                min: 85,
                max: 100,

                ticks: {
                    callback: function(value) {
                        return value + "%";
                    }
                }

            },

            x: {

                grid: {
                    display: false
                }

            }

        }

    }

});


// ==========================================
// PERFORMANCE CHART
// ==========================================

const performanceCtx =
    document.getElementById("performanceChart");

const performanceChart = new Chart(performanceCtx, {

    type: "bar",

    data: {

        labels: [
            "Marketing",
            "Finance",
            "IT",
            "Operations"
        ],

        datasets: [{

            label: "Achievement",

            data: [108, 96, 114, 91],

            borderRadius: 6,

            borderWidth: 0

        }]

    },

    options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {
                display: false
            }

        },

        scales: {

            y: {

                beginAtZero: true,

                max: 120,

                ticks: {

                    callback: function(value) {
                        return value + "%";
                    }

                }

            },

            x: {

                grid: {
                    display: false
                }

            }

        }

    }

});


// ==========================================
// MONTH FILTER
// ==========================================

const monthFilter =
    document.getElementById("monthFilter");

monthFilter.addEventListener("change", function() {

    const selectedMonth = this.value;

    const data = dashboardData[selectedMonth];


    // Update KPI

    document.getElementById("attendanceRate").textContent =
        data.attendance[data.attendance.length - 1] + "%";

    document.getElementById("overtimeHours").textContent =
        data.overtime.toLocaleString() + " hrs";

    document.getElementById("turnoverRate").textContent =
        data.turnover + "%";

    document.getElementById("employeeCount").textContent =
        data.employees;


    // Update attendance chart

    attendanceChart.data.datasets[0].data =
        data.attendance;

    attendanceChart.update();


    console.log(
        "Dashboard updated:",
        selectedMonth
    );

});


// ==========================================
// EXPORT REPORT
// ==========================================

function exportData() {

    const rows = [
        ["Department", "Employees", "Target", "Achievement", "Status"],
        ["Marketing", "42", "100%", "108%", "Exceeded"],
        ["Finance", "35", "100%", "96%", "On Track"],
        ["IT", "51", "100%", "114%", "Exceeded"],
        ["Operations", "76", "100%", "91%", "On Track"]
    ];

    let csvContent = "";

    rows.forEach(row => {

        csvContent += row.join(",") + "\n";

    });


    const blob = new Blob(
        [csvContent],
        { type: "text/csv;charset=utf-8;" }
    );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.setAttribute("href", url);

    link.setAttribute(
        "download",
        "HR_Performance_Report.csv"
    );

    link.style.visibility = "hidden";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

}


// ==========================================
// SIDEBAR NAVIGATION
// ==========================================

const navItems =
    document.querySelectorAll(".nav-item");

navItems.forEach(item => {

    item.addEventListener("click", function(event) {

        event.preventDefault();

        navItems.forEach(nav => {
            nav.classList.remove("active");
        });

        this.classList.add("active");

    });

});

