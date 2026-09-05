/* =========================================================
   HR INSIGHT
   Employee Performance & Analytics Dashboard
   Dummy Front-End Project
========================================================= */


/* =========================================================
   1. DUMMY DATA
========================================================= */

const dashboardData = {

    january: {
        attendance: 94.8,
        overtime: 1120,
        turnover: 5.2,
        employees: 242,
        weeklyAttendance: [92, 93, 94, 95, 94, 96]
    },

    february: {
        attendance: 95.1,
        overtime: 1185,
        turnover: 4.9,
        employees: 244,
        weeklyAttendance: [93, 94, 95, 95, 96, 97]
    },

    march: {
        attendance: 95.4,
        overtime: 1210,
        turnover: 4.8,
        employees: 246,
        weeklyAttendance: [94, 94, 95, 96, 95, 97]
    },

    april: {
        attendance: 95.8,
        overtime: 1250,
        turnover: 4.7,
        employees: 247,
        weeklyAttendance: [94, 95, 96, 96, 97, 98]
    },

    may: {
        attendance: 96.2,
        overtime: 1268,
        turnover: 4.6,
        employees: 248,
        weeklyAttendance: [95, 96, 96, 97, 97, 98]
    },

    june: {
        attendance: 96.4,
        overtime: 1284,
        turnover: 4.6,
        employees: 248,
        weeklyAttendance: [95, 96, 97, 96, 98, 98]
    }

};


/* =========================================================
   2. EMPLOYEE DATA
========================================================= */

const employees = [

    {
        id: "EMP-001",
        name: "Alex Morgan",
        initials: "AM",
        department: "Marketing",
        position: "Marketing Manager",
        status: "Active",
        performance: 108
    },

    {
        id: "EMP-002",
        name: "Sarah Williams",
        initials: "SW",
        department: "Finance",
        position: "Financial Analyst",
        status: "Active",
        performance: 96
    },

    {
        id: "EMP-003",
        name: "Daniel Miller",
        initials: "DM",
        department: "IT",
        position: "Software Engineer",
        status: "Active",
        performance: 114
    },

    {
        id: "EMP-004",
        name: "Emma Miller",
        initials: "EM",
        department: "Operations",
        position: "Operations Specialist",
        status: "On Leave",
        performance: 91
    },

    {
        id: "EMP-005",
        name: "James Anderson",
        initials: "JA",
        department: "IT",
        position: "System Administrator",
        status: "Active",
        performance: 105
    },

    {
        id: "EMP-006",
        name: "Olivia Brown",
        initials: "OB",
        department: "Marketing",
        position: "Content Strategist",
        status: "Active",
        performance: 101
    },

    {
        id: "EMP-007",
        name: "William Davis",
        initials: "WD",
        department: "Finance",
        position: "Accountant",
        status: "Active",
        performance: 98
    },

    {
        id: "EMP-008",
        name: "Sophia Wilson",
        initials: "SW",
        department: "Operations",
        position: "Operations Manager",
        status: "Active",
        performance: 103
    }

];


/* =========================================================
   3. DEFAULT ADMIN ACCOUNT
========================================================= */

const defaultAdmin = {
    name: "Admin HR",
    email: "admin@hrinsight.com",
    password: "admin123",
    role: "HR Manager"
};


/* =========================================================
   4. ELEMENT SELECTORS
========================================================= */

const loginPage = document.getElementById("loginPage");
const registerPage = document.getElementById("registerPage");
const app = document.getElementById("app");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

const loginError = document.getElementById("loginError");
const registerError = document.getElementById("registerError");

const logoutButton = document.getElementById("logoutButton");

const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");

const pageTitle = document.getElementById("pageTitle");
const pageEyebrow = document.getElementById("pageEyebrow");

const welcomeName = document.getElementById("welcomeName");

const sidebarUserName = document.getElementById("sidebarUserName");
const headerUserName = document.getElementById("headerUserName");

const sidebarAvatar = document.getElementById("sidebarAvatar");
const headerAvatar = document.getElementById("headerAvatar");
const profileAvatar = document.getElementById("profileAvatar");


/* =========================================================
   5. INITIALIZE ACCOUNT
========================================================= */

function initializeAccount() {

    const savedAccount = localStorage.getItem("hrAdminAccount");

    if (!savedAccount) {

        localStorage.setItem(
            "hrAdminAccount",
            JSON.stringify(defaultAdmin)
        );

    }

}


/* =========================================================
   6. GET CURRENT ACCOUNT
========================================================= */

function getAccount() {

    const account =
        localStorage.getItem("hrAdminAccount");

    if (account) {

        return JSON.parse(account);

    }

    return defaultAdmin;

}


/* =========================================================
   7. SHOW LOGIN
========================================================= */

function showLoginPage() {

    loginPage.classList.remove("hidden");
    registerPage.classList.add("hidden");
    app.classList.add("hidden");

    loginError.textContent = "";

}


/* =========================================================
   8. SHOW REGISTER
========================================================= */

function showRegisterPage() {

    loginPage.classList.add("hidden");
    registerPage.classList.remove("hidden");
    app.classList.add("hidden");

    registerError.textContent = "";

}


/* =========================================================
   9. SHOW APPLICATION
========================================================= */

function showApplication() {

    loginPage.classList.add("hidden");
    registerPage.classList.add("hidden");
    app.classList.remove("hidden");

    loadAccountData();

    initializeCharts();

    showPage("dashboard");

}


/* =========================================================
   10. LOGIN
========================================================= */

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value
        .trim()
        .toLowerCase();

    const password =
        document.getElementById("loginPassword").value;

    const account = getAccount();


    if (
        email === account.email.toLowerCase() &&
        password === account.password
    ) {

        localStorage.setItem(
            "hrLoggedIn",
            "true"
        );

        loginError.textContent = "";

        showApplication();

    } else {

        loginError.textContent =
            "Invalid email or password. Please try again.";

    }

});


/* =========================================================
   11. REGISTER
========================================================= */

registerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name =
        document.getElementById("registerName").value.trim();

    const email =
        document.getElementById("registerEmail").value
        .trim()
        .toLowerCase();

    const password =
        document.getElementById("registerPassword").value;

    const confirmPassword =
        document.getElementById("registerConfirmPassword").value;


    if (password.length < 6) {

        registerError.textContent =
            "Password must contain at least 6 characters.";

        return;

    }


    if (password !== confirmPassword) {

        registerError.textContent =
            "Passwords do not match.";

        return;

    }


    const newAccount = {

        name: name,
        email: email,
        password: password,
        role: "HR Manager"

    };


    localStorage.setItem(
        "hrAdminAccount",
        JSON.stringify(newAccount)
    );


    localStorage.setItem(
        "hrLoggedIn",
        "true"
    );


    registerError.textContent = "";

    showApplication();

});


/* =========================================================
   12. LOGIN ↔ REGISTER NAVIGATION
========================================================= */

showRegister.addEventListener("click", function (event) {

    event.preventDefault();

    showRegisterPage();

});


showLogin.addEventListener("click", function (event) {

    event.preventDefault();

    showLoginPage();

});


/* =========================================================
   13. LOGOUT
========================================================= */

logoutButton.addEventListener("click", function () {

    localStorage.removeItem("hrLoggedIn");

    showLoginPage();

});


/* =========================================================
   14. LOAD ADMIN PROFILE
========================================================= */

function loadAccountData() {

    const account = getAccount();

    const name =
        account.name || "Admin HR";

    const email =
        account.email || "admin@hrinsight.com";


    /* Sidebar */

    sidebarUserName.textContent = name;


    /* Header */

    headerUserName.textContent = name;


    /* Welcome */

    welcomeName.textContent =
        name.split(" ")[0];


    /* Profile */

    document.getElementById("profileName").textContent =
        name;

    document.getElementById("profileEmail").textContent =
        email;


    document.getElementById("profileNameInput").value =
        name;

    document.getElementById("profileEmailInput").value =
        email;


    /* Initials */

    const initials =
        getInitials(name);

    sidebarAvatar.textContent =
        initials;

    headerAvatar.textContent =
        initials;

    profileAvatar.textContent =
        initials;

}


/* =========================================================
   15. GET INITIALS
========================================================= */

function getInitials(name) {

    return name
        .split(" ")
        .map(word => word.charAt(0))
        .join("")
        .substring(0, 2)
        .toUpperCase();

}


/* =========================================================
   16. SIDEBAR NAVIGATION
========================================================= */

navItems.forEach(function (item) {

    item.addEventListener("click", function () {

        const page =
            this.dataset.page;

        showPage(page);

    });

});


/* =========================================================
   17. PAGE NAVIGATION FUNCTION
========================================================= */

function showPage(pageName) {

    /* Hide all pages */

    pages.forEach(function (page) {

        page.classList.remove("active-page");

    });


    /* Show selected page */

    const selectedPage =
        document.getElementById(
            pageName + "Page"
        );

    if (selectedPage) {

        selectedPage.classList.add(
            "active-page"
        );

    }


    /* Update sidebar */

    navItems.forEach(function (item) {

        item.classList.remove("active");

        if (
            item.dataset.page === pageName
        ) {

            item.classList.add("active");

        }

    });


    /* Update header */

    updatePageHeader(pageName);

}


/* =========================================================
   18. PAGE HEADER
========================================================= */

function updatePageHeader(pageName) {

    const pageInfo = {

        dashboard: {
            title: "Dashboard",
            eyebrow: "OVERVIEW"
        },

        employees: {
            title: "Employees",
            eyebrow: "WORKFORCE"
        },

        attendance: {
            title: "Attendance",
            eyebrow: "TIME & ATTENDANCE"
        },

        performance: {
            title: "Performance",
            eyebrow: "ANALYTICS"
        },

        profile: {
            title: "My Profile",
            eyebrow: "ACCOUNT"
        },

        settings: {
            title: "Settings",
            eyebrow: "MANAGEMENT"
        }

    };


    const info =
        pageInfo[pageName];


    if (info) {

        pageTitle.textContent =
            info.title;

        pageEyebrow.textContent =
            info.eyebrow;

    }

}


/* =========================================================
   19. BUTTONS THAT OPEN PAGES
========================================================= */

document.addEventListener("click", function (event) {

    const pageButton =
        event.target.closest("[data-page]");


    if (
        pageButton &&
        !pageButton.classList.contains("nav-item")
    ) {

        const page =
            pageButton.dataset.page;

        showPage(page);

    }

});


/* =========================================================
   20. DASHBOARD MONTH FILTER
========================================================= */

const dashboardMonth =
    document.getElementById("dashboardMonth");


dashboardMonth.addEventListener(
    "change",
    function () {

        updateDashboard(
            this.value
        );

    }
);


/* =========================================================
   21. UPDATE DASHBOARD
========================================================= */

function updateDashboard(month) {

    const data =
        dashboardData[month];


    if (!data) return;


    /* KPI */

    document.getElementById(
        "dashboardAttendance"
    ).textContent =
        data.attendance + "%";


    document.getElementById(
        "dashboardOvertime"
    ).textContent =
        data.overtime.toLocaleString();


    document.getElementById(
        "dashboardTurnover"
    ).textContent =
        data.turnover + "%";


    document.getElementById(
        "dashboardEmployees"
    ).textContent =
        data.employees;


    /* Chart */

    if (attendanceOverviewChart) {

        attendanceOverviewChart
            .data
            .datasets[0]
            .data =
            data.weeklyAttendance;

        attendanceOverviewChart.update();

    }

}


/* =========================================================
   22. CHART VARIABLES
========================================================= */

let attendanceOverviewChart = null;
let employeeDistributionChart = null;
let departmentPerformanceChart = null;
let attendanceTrendChart = null;
let performanceOverviewChart = null;


/* =========================================================
   23. INITIALIZE CHARTS
========================================================= */

function initializeCharts() {

    /* Prevent duplicate charts */

    if (attendanceOverviewChart) {

        attendanceOverviewChart.destroy();

    }

    if (employeeDistributionChart) {

        employeeDistributionChart.destroy();

    }

    if (departmentPerformanceChart) {

        departmentPerformanceChart.destroy();

    }

    if (attendanceTrendChart) {

        attendanceTrendChart.destroy();

    }

    if (performanceOverviewChart) {

        performanceOverviewChart.destroy();

    }


    /* -----------------------------------------
       Attendance Overview
    ----------------------------------------- */

    const attendanceCanvas =
        document.getElementById(
            "attendanceOverviewChart"
        );


    if (attendanceCanvas) {

        attendanceOverviewChart =
            new Chart(
                attendanceCanvas,
                {

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

                        datasets: [

                            {

                                label:
                                    "Attendance Rate",

                                data:
                                    dashboardData
                                    .january
                                    .weeklyAttendance,

                                borderWidth: 3,

                                tension: 0.4,

                                fill: true,

                                pointRadius: 4

                            }

                        ]

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

                                    callback:
                                        value =>
                                            value + "%"

                                }

                            },

                            x: {

                                grid: {
                                    display: false
                                }

                            }

                        }

                    }

                }
            );

    }


    /* -----------------------------------------
       Employee Distribution
    ----------------------------------------- */

    const distributionCanvas =
        document.getElementById(
            "employeeDistributionChart"
        );


    if (distributionCanvas) {

        employeeDistributionChart =
            new Chart(
                distributionCanvas,
                {

                    type: "doughnut",

                    data: {

                        labels: [
                            "Marketing",
                            "Finance",
                            "IT",
                            "Operations"
                        ],

                        datasets: [

                            {

                                data: [
                                    42,
                                    35,
                                    51,
                                    76
                                ],

                                borderWidth: 0

                            }

                        ]

                    },

                    options: {

                        responsive: true,

                        maintainAspectRatio: false,

                        cutout: "70%",

                        plugins: {

                            legend: {

                                position: "bottom",

                                labels: {

                                    usePointStyle: true,

                                    padding: 18

                                }

                            }

                        }

                    }

                }
            );

    }


    /* -----------------------------------------
       Department Performance
    ----------------------------------------- */

    const departmentCanvas =
        document.getElementById(
            "departmentPerformanceChart"
        );


    if (departmentCanvas) {

        departmentPerformanceChart =
            new Chart(
                departmentCanvas,
                {

                    type: "bar",

                    data: {

                        labels: [
                            "Marketing",
                            "Finance",
                            "IT",
                            "Operations"
                        ],

                        datasets: [

                            {

                                label:
                                    "Achievement",

                                data: [
                                    108,
                                    96,
                                    114,
                                    91
                                ],

                                borderRadius: 6,

                                borderWidth: 0

                            }

                        ]

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

                                    callback:
                                        value =>
                                            value + "%"

                                }

                            },

                            x: {

                                grid: {
                                    display: false
                                }

                            }

                        }

                    }

                }
            );

    }


    /* -----------------------------------------
       Attendance Trend
    ----------------------------------------- */

    const attendanceTrendCanvas =
        document.getElementById(
            "attendanceTrendChart"
        );


    if (attendanceTrendCanvas) {

        attendanceTrendChart =
            new Chart(
                attendanceTrendCanvas,
                {

                    type: "line",

                    data: {

                        labels: [
                            "Sep 1",
                            "Sep 2",
                            "Sep 3",
                            "Sep 4",
                            "Sep 5",
                            "Sep 6",
                            "Sep 7",
                            "Sep 8",
                            "Sep 9",
                            "Sep 10"
                        ],

                        datasets: [

                            {

                                label:
                                    "Attendance",

                                data: [
                                    94,
                                    95,
                                    93,
                                    96,
                                    94,
                                    97,
                                    95,
                                    96,
                                    97,
                                    95
                                ],

                                borderWidth: 3,

                                tension: 0.4,

                                fill: true,

                                pointRadius: 3

                            }

                        ]

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

                                    callback:
                                        value =>
                                            value + "%"

                                }

                            },

                            x: {

                                grid: {
                                    display: false
                                }

                            }

                        }

                    }

                }
            );

    }


    /* -----------------------------------------
       Performance Overview
    ----------------------------------------- */

    const performanceCanvas =
        document.getElementById(
            "performanceOverviewChart"
        );


    if (performanceCanvas) {

        performanceOverviewChart =
            new Chart(
                performanceCanvas,
                {

                    type: "bar",

                    data: {

                        labels: [
                            "Marketing",
                            "Finance",
                            "IT",
                            "Operations"
                        ],

                        datasets: [

                            {

                                label:
                                    "Target",

                                data: [
                                    100,
                                    100,
                                    100,
                                    100
                                ],

                                borderWidth: 0,

                                borderRadius: 5

                            },

                            {

                                label:
                                    "Achievement",

                                data: [
                                    108,
                                    96,
                                    114,
                                    91
                                ],

                                borderWidth: 0,

                                borderRadius: 5

                            }

                        ]

                    },

                    options: {

                        responsive: true,

                        maintainAspectRatio: false,

                        scales: {

                            y: {

                                beginAtZero: true,

                                max: 120,

                                ticks: {

                                    callback:
                                        value =>
                                            value + "%"

                                }

                            },

                            x: {

                                grid: {
                                    display: false
                                }

                            }

                        }

                    }

                }
            );

    }

}


/* =========================================================
   24. EMPLOYEE TABLE
========================================================= */

function renderEmployees(
    searchTerm = "",
    department = "all"
) {

    const tbody =
        document.querySelector(
            "#employeeTable tbody"
        );


    if (!tbody) return;


    const filteredEmployees =
        employees.filter(function (employee) {

            const matchesSearch =
                employee.name
                    .toLowerCase()
                    .includes(
                        searchTerm.toLowerCase()
                    ) ||
                employee.id
                    .toLowerCase()
                    .includes(
                        searchTerm.toLowerCase()
                    );


            const matchesDepartment =
                department === "all" ||
                employee.department
                    .toLowerCase() ===
                    department.toLowerCase();


            return (
                matchesSearch &&
                matchesDepartment
            );

        });


    tbody.innerHTML = "";


    filteredEmployees.forEach(function (employee) {

        const row =
            document.createElement("tr");


        let statusClass =
            employee.status === "Active"
                ? "active"
                : "leave";


        row.innerHTML = `

            <td>

                <div class="employee-cell">

                    <div class="table-avatar">
                        ${employee.initials}
                    </div>

                    <div>

                        <strong>
                            ${employee.name}
                        </strong>

                        <span>
                            ${employee.id}
                        </span>

                    </div>

                </div>

            </td>


            <td>
                ${employee.department}
            </td>


            <td>
                ${employee.position}
            </td>


            <td>

                <span class="status ${statusClass}">
                    ${employee.status}
                </span>

            </td>


            <td>

                <strong>
                    ${employee.performance}%
                </strong>

            </td>


            <td>

                <button
                    class="action-button"
                    onclick="viewEmployee('${employee.id}')"
                >
                    ⋮
                </button>

            </td>

        `;


        tbody.appendChild(row);

    });


    if (filteredEmployees.length === 0) {

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    style="text-align:center; padding:40px;"
                >
                    No employees found.
                </td>

            </tr>

        `;

    }

}


/* =========================================================
   25. EMPLOYEE SEARCH
========================================================= */

const employeeSearch =
    document.getElementById(
        "employeeSearch"
    );


if (employeeSearch) {

    employeeSearch.addEventListener(
        "input",
        function () {

            const department =
                document.getElementById(
                    "departmentFilter"
                ).value;


            renderEmployees(
                this.value,
                department
            );

        }
    );

}


/* =========================================================
   26. DEPARTMENT FILTER
========================================================= */

const departmentFilter =
    document.getElementById(
        "departmentFilter"
    );


if (departmentFilter) {

    departmentFilter.addEventListener(
        "change",
        function () {

            renderEmployees(
                employeeSearch.value,
                this.value
            );

        }
    );

}


/* =========================================================
   27. VIEW EMPLOYEE
========================================================= */

function viewEmployee(employeeId) {

    const employee =
        employees.find(
            item => item.id === employeeId
        );


    if (!employee) return;


    alert(

        "Employee Details\n\n" +

        "Name: " +
        employee.name +

        "\nID: " +
        employee.id +

        "\nDepartment: " +
        employee.department +

        "\nPosition: " +
        employee.position +

        "\nStatus: " +
        employee.status +

        "\nPerformance: " +
        employee.performance +
        "%"

    );

}


/* =========================================================
   28. PROFILE UPDATE
========================================================= */

const profileForm =
    document.getElementById(
        "profileForm"
    );


if (profileForm) {

    profileForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const account =
                getAccount();


            const newName =
                document.getElementById(
                    "profileNameInput"
                ).value.trim();


            const newEmail =
                document.getElementById(
                    "profileEmailInput"
                ).value.trim()
                .toLowerCase();


            if (!newName || !newEmail) {

                alert(
                    "Please fill in all required fields."
                );

                return;

            }


            account.name =
                newName;

            account.email =
                newEmail;


            localStorage.setItem(
                "hrAdminAccount",
                JSON.stringify(account)
            );


            loadAccountData();


            alert(
                "Profile updated successfully!"
            );

        }
    );

}


/* =========================================================
   29. PASSWORD VISIBILITY
========================================================= */

function setupPasswordToggle(
    buttonId,
    inputId
) {

    const button =
        document.getElementById(buttonId);

    const input =
        document.getElementById(inputId);


    if (!button || !input) return;


    button.addEventListener(
        "click",
        function () {

            if (
                input.type ===
                "password"
            ) {

                input.type =
                    "text";

                button.textContent =
                    "🙈";

            } else {

                input.type =
                    "password";

                button.textContent =
                    "👁";

            }

        }
    );

}


setupPasswordToggle(
    "toggleLoginPassword",
    "loginPassword"
);


setupPasswordToggle(
    "toggleRegisterPassword",
    "registerPassword"
);


/* =========================================================
   30. NOTIFICATION PANEL
========================================================= */

const notificationButton =
    document.getElementById(
        "notificationButton"
    );

const notificationPanel =
    document.getElementById(
        "notificationPanel"
    );

const closeNotifications =
    document.getElementById(
        "closeNotifications"
    );


if (notificationButton) {

    notificationButton.addEventListener(
        "click",
        function () {

            notificationPanel.classList.toggle(
                "hidden"
            );

        }
    );

}


if (closeNotifications) {

    closeNotifications.addEventListener(
        "click",
        function () {

            notificationPanel.classList.add(
                "hidden"
            );

        }
    );

}


/* =========================================================
   31. PROFILE BUTTONS
========================================================= */

const headerProfileButton =
    document.getElementById(
        "headerProfileButton"
    );

const sidebarProfileButton =
    document.getElementById(
        "sidebarProfileButton"
    );


if (headerProfileButton) {

    headerProfileButton.addEventListener(
        "click",
        function () {

            showPage("profile");

        }
    );

}


if (sidebarProfileButton) {

    sidebarProfileButton.addEventListener(
        "click",
        function () {

            showPage("profile");

        }
    );

}


/* =========================================================
   32. FORGOT PASSWORD
========================================================= */

const forgotPassword =
    document.getElementById(
        "forgotPassword"
    );


if (forgotPassword) {

    forgotPassword.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            alert(
                "Password reset is a demo feature.\n\n" +
                "For this portfolio project, " +
                "account data is stored locally in your browser."
            );

        }
    );

}


/* =========================================================
   33. GLOBAL SEARCH
========================================================= */

const globalSearch =
    document.getElementById(
        "globalSearch"
    );


if (globalSearch) {

    globalSearch.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key !== "Enter"
            ) return;


            const query =
                this.value
                .trim()
                .toLowerCase();


            if (!query) return;


            const employee =
                employees.find(
                    item =>
                        item.name
                        .toLowerCase()
                        .includes(query) ||
                        item.id
                        .toLowerCase()
                        .includes(query)
                );


            if (employee) {

                showPage("employees");


                if (employeeSearch) {

                    employeeSearch.value =
                        this.value;

                    renderEmployees(
                        this.value,
                        "all"
                    );

                }

            } else {

                alert(
                    "No employee found for: " +
                    this.value
                );

            }

        }
    );

}


/* =========================================================
   34. MOBILE MENU
========================================================= */

const mobileMenu =
    document.querySelector(
        ".mobile-menu"
    );


if (mobileMenu) {

    mobileMenu.addEventListener(
        "click",
        function () {

            const sidebar =
                document.querySelector(
                    ".sidebar"
                );


            sidebar.classList.toggle(
                "mobile-open"
            );

        }
    );

}


/* =========================================================
   35. CLOSE SIDEBAR AFTER NAVIGATION
========================================================= */

navItems.forEach(function (item) {

    item.addEventListener(
        "click",
        function () {

            const sidebar =
                document.querySelector(
                    ".sidebar"
                );


            sidebar.classList.remove(
                "mobile-open"
            );

        }
    );

});


/* =========================================================
   36. INITIAL PAGE LOAD
========================================================= */

initializeAccount();


const isLoggedIn =
    localStorage.getItem(
        "hrLoggedIn"
    );


if (isLoggedIn === "true") {

    showApplication();

} else {

    showLoginPage();

}


/* =========================================================
   37. INITIAL EMPLOYEE TABLE
========================================================= */

renderEmployees();


/* =========================================================
   END OF SCRIPT
========================================================= */


