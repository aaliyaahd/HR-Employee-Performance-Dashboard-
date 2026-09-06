document.addEventListener("DOMContentLoaded", function () {
    
    // --- 1. PAGE NAVIGATION ROUTING (SPA) ---
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page-content');
    const headerTitle = document.getElementById('headerTitle');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hapus class active dari semua menu dan halaman
            navLinks.forEach(l => l.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));
            
            // Tambahkan class active ke menu yang diklik
            this.classList.add('active');
            
            // Tampilkan halaman yang sesuai target
            const targetId = this.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
            
            // Ubah Teks Header sesuai menu
            headerTitle.innerText = this.innerText.trim();
        });
    });

    // --- 2. UPDATE PROFILE FUNCTIONALITY ---
    const profileForm = document.getElementById('updateProfileForm');
    
    if(profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ambil data dari input form
            const newName = document.getElementById('inputName').value;
            const newRole = document.getElementById('inputRole').value;
            
            // Update teks di Header dan Dashboard Greet
            document.getElementById('displayName').innerText = newName;
            document.getElementById('displayRole').innerText = newRole;
            document.getElementById('greetName').innerText = newName.split(" ")[0]; // Ambil nama depan
            
            alert("Profile successfully updated!");
        });
    }

    // --- 3. SETTINGS MODAL FUNCTIONALITY ---
    const modal = document.getElementById('settingsModal');
    const btnSettings = document.getElementById('openSettings');
    const spanClose = document.querySelector('.close-modal');

    if(btnSettings) {
        btnSettings.onclick = function(e) {
            e.preventDefault();
            modal.style.display = "block";
        }
    }
    
    if(spanClose) {
        spanClose.onclick = function() {
            modal.style.display = "none";
        }
    }
    
    // Tutup pop-up kalau user klik area luar pop-up
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // --- 4. CHART.JS INITIALIZATION ---
    const chartElement = document.getElementById('attendanceChart');
    if(chartElement) {
        const ctx = chartElement.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(79, 70, 229, 0.2)');
        gradient.addColorStop(1, 'rgba(79, 70, 229, 0)');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                datasets: [{
                    label: 'Attendance Rate',
                    data: [92, 95, 89, 97, 94],
                    borderColor: '#4f46e5',
                    borderWidth: 3,
                    backgroundColor: gradient,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: '#4f46e5',
                    pointBorderWidth: 2,
                    pointRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { display: false } },
                    y: { min: 80, max: 100, grid: { borderDash: [5, 5] } }
                }
            }
        });
    }
});