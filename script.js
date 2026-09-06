document.addEventListener("DOMContentLoaded", function () {
    
    // --- 1. SPA ROUTING (Ganti Halaman Tanpa Loading) ---
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page-content');
    const headerTitle = document.getElementById('headerTitle');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hapus class 'active' dari SEMUA menu dan SEMUA halaman
            navLinks.forEach(l => l.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));
            
            // Tambahkan class 'active' HANYA ke menu dan halaman yang diklik
            this.classList.add('active');
            const targetId = this.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
            
            // Ubah Judul Header secara dinamis
            const newTitle = this.getAttribute('data-title');
            headerTitle.innerText = newTitle;
        });
    });

    // --- 2. FITUR UPLOAD FOTO PROFIL ---
    const photoUpload = document.getElementById('photoUpload');
    if (photoUpload) {
        photoUpload.addEventListener('change', function(e) {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    // Tampilkan gambar di preview profil besar
                    const preview = document.getElementById('profilePreview');
                    preview.style.backgroundImage = `url(${event.target.result})`;
                    preview.innerText = ''; // Hapus teks inisial (AD)
                    
                    // Tampilkan juga di header pojok kanan atas
                    const headerAvatar = document.getElementById('headerAvatar');
                    headerAvatar.style.backgroundImage = `url(${event.target.result})`;
                    headerAvatar.innerText = ''; // Hapus teks inisial
                }
                reader.readAsDataURL(file);
            }
        });
    }

    // --- 3. SIMPAN FORM PROFIL (Nama, Jabatan, dll) ---
    const profileForm = document.getElementById('updateProfileForm');
    if(profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newName = document.getElementById('inputName').value;
            const newRole = document.getElementById('inputRole').value;
            
            // Update UI
            document.getElementById('displayName').innerText = newName;
            document.getElementById('displayRole').innerText = newRole;
            document.getElementById('greetName').innerText = newName.split(" ")[0]; 
            
            alert("Profile successfully updated!");
        });
    }

    // --- 4. MODAL PENGATURAN (SETTINGS) ---
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
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // --- 5. RENDER GRAFIK CHART.JS ---
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