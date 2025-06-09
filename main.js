document.addEventListener('DOMContentLoaded', function () {
    // Data for sector details
    const sectorData = {
        housing: {
            name: "Housing Development",
            icon: "fas fa-building",
            entails: "Focuses on planning, designing, constructing, and managing residential properties, including affordable housing initiatives. This sector plays a crucial role in urban planning and providing basic necessities.",
            howItWorks: "Projects typically involve land acquisition, architectural design, securing financing, construction, and property management. It often collaborates with government agencies, private developers, and community organizations.",
            trainings: ["Construction Management (Diploma/Certificate)", "Civil Engineering (Degree/Diploma)", "Architecture (Degree/Diploma)", "Quantity Surveying (Degree/Diploma)", "Plumbing & Electrical Installation (Vocational Training)", "Sustainable Building Practices (Short Course)"],
            facts: ["Contributes significantly to national GDP.", "High demand for skilled labor and tradespeople.", "Innovations include green building technologies and prefabrication.", "Government aims to deliver affordable housing units as a key agenda."],
            benefits: ["Stable job opportunities due to continuous demand.", "Opportunity to contribute to national development.", "Diverse career paths from skilled labor to management.", "Potential for entrepreneurship in construction services."]
        },
        road: {
            name: "Road Infrastructure",
            icon: "fas fa-road",
            entails: "Involves the construction, maintenance, and upgrade of roads, bridges, and related transport networks. This is vital for economic development and connectivity.",
            howItWorks: "Projects involve planning, design, land surveying, material procurement, construction (grading, paving, drainage), and ongoing maintenance. Public-private partnerships are common.",
            trainings: ["Civil Engineering (Degree/Diploma)", "Road Construction & Maintenance (Certificate)", "Heavy Equipment Operation (Vocational Training)", "Land Surveying (Diploma/Certificate)", "Project Management (Certificate)"],
            facts: ["Key driver of economic growth and trade.", "Large-scale government investments in infrastructure projects.", "Focus on improving rural access and urban mobility.", "Adoption of modern road construction techniques."],
            benefits: ["Impactful work improving connectivity and trade.", "Opportunities for large-scale project involvement.", "Skill development in heavy machinery and civil works.", "Good prospects for career progression in engineering roles."]
        },
        environment: {
            name: "Environment Conservation",
            icon: "fas fa-tree",
            entails: "Focuses on protecting natural resources, biodiversity, and ecosystems through sustainable practices, policy development, and community engagement.",
            howItWorks: "Activities include reforestation, wildlife management, waste management, pollution control, environmental impact assessments, and climate change adaptation/mitigation projects. Often involves fieldwork and community outreach.",
            trainings: ["Environmental Science (Degree/Diploma)", "Wildlife Management (Degree/Diploma)", "Forestry (Degree/Diploma)", "Waste Management & Recycling (Certificate)", "Climate Change Adaptation (Short Course)"],
            facts: ["Growing global and national emphasis on sustainability.", "Crucial for addressing climate change and resource depletion.", "Involves a mix of scientific research and practical conservation efforts.", "Opportunities in NGOs, government agencies, and research institutions."],
            benefits: ["Direct positive impact on environmental health.", "Work in diverse natural settings.", "Develop expertise in critical global issues.", "Potential for advocacy and policy influence."]
        },
        urban: {
            name: "Urban Renewal",
            icon: "fas fa-city",
            entails: "Revitalizing and redeveloping existing urban areas to improve infrastructure, public spaces, housing, and economic opportunities.",
            howItWorks: "Involves master planning, demolition/reconstruction, infrastructure upgrades (water, sewage, electricity), public transport integration, and community development. Requires collaboration between government, private sector, and local communities.",
            trainings: ["Urban Planning (Degree/Diploma)", "Architecture (Degree/Diploma)", "Sociology/Community Development (Degree/Diploma)", "Real Estate Management (Diploma/Certificate)", "GIS and Remote Sensing (Short Course)"],
            facts: ["Addresses challenges of rapid urbanization.", "Aims to create sustainable, livable cities.", "Often involves significant public and private investment.", "Focus on smart city initiatives and integrated planning."],
            benefits: ["Shape the future of cities and communities.", "Work on interdisciplinary projects.", "Contribute to improved quality of life for urban residents.", "High demand for skilled professionals in planning and development."]
        },
        public: {
            name: "Public Works",
            icon: "fas fa-hard-hat",
            entails: "Encompasses the design, construction, and maintenance of public infrastructure and facilities, including water systems, sanitation, public buildings, and civic amenities.",
            howItWorks: "Managed by government departments and agencies, involving procurement, project oversight, quality control, and public service delivery. Focuses on ensuring essential services and facilities for the populace.",
            trainings: ["Civil Engineering (Degree/Diploma)", "Water and Sanitation Engineering (Degree/Diploma)", "Construction Technology (Diploma/Certificate)", "Procurement and Logistics (Certificate)", "Public Administration (Degree)"],
            facts: ["Foundation of national development and quality of life.", "Stable sector with continuous demand for projects.", "Directly impacts daily lives of citizens.", "Opportunities in various government ministries and parastatals."],
            benefits: ["Serve the public and contribute directly to community well-being.", "Job stability within government structures.", "Diverse roles from engineering to administrative support.", "Opportunities for long-term career in public service."]
        }
    };

    const countyConstituencyMap = {
        nairobi: { 'Westlands': ['Kitisuru', 'Parklands', 'Kangemi'], 'Dagoretti': ['Kawangware', 'Mutuini', 'Waithaka'], 'Langata': ['Karen', 'Nyayo Highrise', 'South C'], 'Embakasi East': ['Upper Savanna', 'Lower Savanna'], 'Mathare': ['Mathare', 'Huruma'] },
        mombasa: { 'Mvita': ['Majengo', 'Old Town', 'Shimanzi'], 'Kisauni': ['Bamburi', 'Mtongwe', 'Kongowea'], 'Likoni': ['Likoni', 'Timbwani'] },
        kisumu: { 'Kisumu Central': ['Market Milimani', 'Shauri Moyo Kaloleni'], 'Kisumu East': ['Manyatta B', 'Kolwa East'], 'Nyakach': ['Central Nyakach', 'West Nyakach'] },
        nakuru: { 'Nakuru Town East': ['Biashara', 'Kivumbini'], 'Nakuru Town West': ['Barut', 'London'], 'Rongai': ['Menengai West', 'Soin'] },
        kiambu: { 'Kiambu Town': ['Township', 'Riabai'], 'Limuru': ['Limuru Central', 'Ngecha Tigoni'], 'Juja': ['Murera', 'Witeithie'] }
    };

    // DOM elements
    const personalInfoStep = document.getElementById('personalInfoStep');
    const locationStep = document.getElementById('locationStep');
    const paymentStep = document.getElementById('paymentStep');
    const sectorDetailsStep = document.getElementById('sectorDetailsStep');

    const steps = [
        { id: 'step1', element: personalInfoStep, bodyClass: 'step-1-bg' },
        { id: 'step2', element: locationStep, bodyClass: 'step-2-bg' },
        { id: 'step3', element: paymentStep, bodyClass: 'step-3-bg' },
        { id: 'step4', element: sectorDetailsStep, bodyClass: 'step-4-bg' }
    ];
    let currentActiveFormStepIndex = 0;
    let currentlyDisplayedStepElement = steps[0].element;

    const progressStepsElements = steps.map(step => document.getElementById(step.id));

    // Functions
    function updateProgressBar(activeStepIdx, markCompletedUpTo = -1) {
        progressStepsElements.forEach((stepEl, index) => {
            stepEl.classList.remove('active', 'completed');
            if (index === activeStepIdx) {
                stepEl.classList.add('active');
            }
            if (index < activeStepIdx || index <= markCompletedUpTo) {
                stepEl.classList.add('completed');
            }
        });
        if (activeStepIdx >= 0 && activeStepIdx < steps.length) {
            document.body.className = steps[activeStepIdx].bodyClass;
        }
    }

    function goToStep(stepIndex, isFromFormFlow = true) {
        if (!steps[stepIndex] || !steps[stepIndex].element) return;
        currentlyDisplayedStepElement.classList.add('hidden');
        if (isFromFormFlow) {
            currentActiveFormStepIndex = stepIndex;
            currentlyDisplayedStepElement = steps[stepIndex].element;
            updateProgressBar(stepIndex, stepIndex - 1);
        } else {
            currentlyDisplayedStepElement = steps[stepIndex].element;
            updateProgressBar(stepIndex);
        }
        currentlyDisplayedStepElement.classList.remove('hidden');
    }

    function togglePasswordVisibility(passwordInputId, toggleIconId) {
        const passwordInput = document.getElementById(passwordInputId);
        const toggleIcon = document.getElementById(toggleIconId);

        if (passwordInput && toggleIcon) {
            toggleIcon.addEventListener('click', function () {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                this.classList.toggle('fa-eye');
                this.classList.toggle('fa-eye-slash');
            });
        }
    }

    function addOption(selectElement, value, text) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        selectElement.appendChild(option);
    }

    function populateSelect(selectElement, options) {
        selectElement.innerHTML = `<option value="">Select...</option>`;
        options.forEach(option => addOption(selectElement, option.toLowerCase().replace(/ /g, '-'), option));
    }

    function displaySectorDetails(sectorKey) {
        const displayArea = document.getElementById('selectedSectorDisplay');
        const sector = sectorData[sectorKey];
        if (!sector) {
            displayArea.innerHTML = '<p>No details available for this sector.</p>';
            return;
        }
        displayArea.innerHTML = `
            <h3 style="color:#0a5c36;">${sector.name}</h3>
            <div class="sector-detail-section"><h3>What it Entails</h3><p>${sector.entails}</p></div>
            <div class="sector-detail-section"><h3>How it Works</h3><p>${sector.howItWorks}</p></div>
            <div class="sector-detail-section"><h3>Trainings Available</h3><ul>${sector.trainings.map(t => `<li>${t}</li>`).join('')}</ul></div>
            <div class="sector-detail-section"><h3>Facts & Benefits</h3><ul>
                ${sector.facts.map(f => `<li><strong>Fact:</strong> ${f}</li>`).join('')}
                ${sector.benefits.map(b => `<li><strong>Benefit:</strong> ${b}</li>`).join('')}
            </ul></div>`;
    }
    
    function showMessageBox(message, isSuccess = false) {
        const existingMessageBox = document.getElementById('customMessageBox');
        if (existingMessageBox) existingMessageBox.remove();
        const messageBox = document.createElement('div');
        messageBox.id = 'customMessageBox';
        messageBox.style.cssText = `position: fixed; top: 20px; left: 50%; transform: translateX(-50%); padding: 15px 30px; background-color: ${isSuccess ? '#27ae60' : '#e74c3c'}; color: white; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); z-index: 2000; font-size: 1rem; display: flex; align-items: center; gap: 10px; animation: fadeInOut 4s forwards;`;
        messageBox.innerHTML = `<i class="${isSuccess ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}"></i><span>${message}</span>`;
        document.body.appendChild(messageBox);
        if (!document.querySelector('style#messageBoxAnimation')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'messageBoxAnimation';
            styleSheet.innerHTML = `@keyframes fadeInOut { 0% { opacity: 0; transform: translateX(-50%) translateY(-20px); } 10% { opacity: 1; transform: translateX(-50%) translateY(0); } 90% { opacity: 1; transform: translateX(-50%) translateY(0); } 100% { opacity: 0; transform: translateX(-50%) translateY(-20px); } }`;
            document.head.appendChild(styleSheet);
        }
        setTimeout(() => { if (document.body.contains(messageBox)) messageBox.remove(); }, 4000);
    }
    
    function togglePaymentMethod(method) {
        document.getElementById(method).checked = true;
        document.getElementById('mpesaMethod').classList.toggle('active', method === 'mpesa');
        document.getElementById('kcbMethod').classList.toggle('active', method === 'kcb');
        document.getElementById('mpesaMethod').querySelectorAll('[required]').forEach(f => f.required = (method === 'mpesa'));
        document.getElementById('kcbMethod').querySelectorAll('[required]').forEach(f => f.required = (method === 'kcb'));
    }

    // Event Listeners
    togglePasswordVisibility('password', 'togglePassword');
    togglePasswordVisibility('confirmPassword', 'toggleConfirmPassword');
    togglePasswordVisibility('loginPassword', 'toggleLoginPassword');

    document.getElementById('password').addEventListener('input', function() {
        const password = this.value;
        const strengthMeter = document.getElementById('passwordStrength');
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        if (/[^A-Za-z0-9]/.test(password)) strength += 25;
        strengthMeter.style.width = strength + '%';
        if (strength < 50) strengthMeter.style.background = '#e74c3c';
        else if (strength < 75) strengthMeter.style.background = '#f39c12';
        else strengthMeter.style.background = '#2ecc71';
    });
    
    document.getElementById('nextBtn1').addEventListener('click', function() {
        let isValid = true;
        personalInfoStep.querySelectorAll('[required]').forEach(field => {
            if (!field.value) {
                isValid = false;
                field.style.borderColor = '#e74c3c';
            } else {
                field.style.borderColor = '#ddd';
            }
        });
        const phone = document.getElementById('phone');
        if (!phone.value.match(/^254[0-9]{9}$/)) {
            isValid = false;
            phone.style.borderColor = '#e74c3c';
            showMessageBox('Please enter a valid Safaricom phone number (format: 2547XXXXXXXX)');
        } else {
            phone.style.borderColor = '#ddd';
        }
        if (!document.querySelector('input[name="gender"]:checked')) {
            isValid = false;
            showMessageBox('Please select your gender.');
        }
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (password !== confirmPassword) {
            isValid = false;
            document.getElementById('password').style.borderColor = '#e74c3c';
            document.getElementById('confirmPassword').style.borderColor = '#e74c3c';
            showMessageBox('Passwords do not match!');
        }
        if (isValid) goToStep(1, true);
    });
    
    document.getElementById('backBtn1').addEventListener('click', () => goToStep(0, true));
    
    document.getElementById('nextBtn2').addEventListener('click', function() {
        let isValid = true;
        ['county', 'constituency', 'ward'].forEach(id => {
            const el = document.getElementById(id);
            if (!el.value) {
                isValid = false;
                el.style.borderColor = '#e74c3c';
            } else {
                el.style.borderColor = '#ddd';
            }
        });
        if (isValid) goToStep(2, true);
    });
    
    document.getElementById('backBtn2').addEventListener('click', () => goToStep(1, true));

    document.getElementById('mpesaOption').addEventListener('click', () => togglePaymentMethod('mpesa'));
    document.getElementById('kcbOption').addEventListener('click', () => togglePaymentMethod('kcb'));

    document.getElementById('nextBtn3').addEventListener('click', function() {
        let isValid = true;
        const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
        if (selectedPaymentMethod === 'mpesa') {
            const mpesaNumber = document.getElementById('mpesaNumber');
            if (!mpesaNumber.value.match(/^254[0-9]{9}$/)) {
                isValid = false;
                mpesaNumber.style.borderColor = '#e74c3c';
                showMessageBox('Please enter a valid M-Pesa number (format: 2547XXXXXXXX)');
            } else {
                mpesaNumber.style.borderColor = '#ddd';
            }
        } else if (selectedPaymentMethod === 'kcb') {
            let allKcbValid = true;
            ['accountNumber', 'accountName', 'branch'].forEach(id => {
                const el = document.getElementById(id);
                if (!el.value) {
                    allKcbValid = false;
                    el.style.borderColor = '#e74c3c';
                } else {
                    el.style.borderColor = '#ddd';
                }
            });
            if (!allKcbValid) {
                isValid = false;
                showMessageBox('Please fill all KCB bank details.');
            }
        }
        if (isValid) {
            displaySectorDetails(document.getElementById('sector').value);
            goToStep(3, true);
        }
    });

    document.getElementById('backBtn4').addEventListener('click', () => goToStep(2, true));
    
    document.getElementById('county').addEventListener('change', function() {
        const constituencies = countyConstituencyMap[this.value] ? Object.keys(countyConstituencyMap[this.value]) : [];
        populateSelect(document.getElementById('constituency'), constituencies);
        populateSelect(document.getElementById('ward'), []);
    });
    
    document.getElementById('constituency').addEventListener('change', function() {
        const county = document.getElementById('county').value;
        const selectedConstituency = this.options[this.selectedIndex].text;
        const wards = countyConstituencyMap[county] && countyConstituencyMap[county][selectedConstituency] ? countyConstituencyMap[county][selectedConstituency] : [];
        populateSelect(document.getElementById('ward'), wards);
    });
    
    document.getElementById('submitBtn').addEventListener('click', function(event) {
        event.preventDefault();
        showMessageBox('Application submitted successfully! You will receive a verification message shortly.', true);
        document.getElementById('signupForm').reset();
        ['county', 'constituency', 'ward'].forEach(id => document.getElementById(id).innerHTML = `<option value="">Select...</option>`);
        document.getElementById('mpesaNumber').value = '';
        document.getElementById('accountNumber').value = '';
        document.getElementById('accountName').value = '';
        document.getElementById('branch').value = '';
        document.getElementById('passwordStrength').style.width = '0%';
        goToStep(0, true);
    });

    const loginLink = document.getElementById('loginLink');
    const loginModal = document.getElementById('loginModal');
    const closeModalBtn = document.getElementById('closeModal');
    const loginForm = document.getElementById('loginForm');

    loginLink.addEventListener('click', (e) => { e.preventDefault(); loginModal.classList.add('active'); });
    closeModalBtn.addEventListener('click', () => { loginModal.classList.remove('active'); loginForm.reset(); });
    loginModal.addEventListener('click', (e) => { if (e.target === loginModal) { loginModal.classList.remove('active'); loginForm.reset(); } });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        if (email && password) {
            showMessageBox(`Attempting to log in with Email: ${email}`, true);
            loginModal.classList.remove('active');
            loginForm.reset();
        } else {
            showMessageBox('Please enter both email and password.');
        }
    });
    
    document.querySelectorAll('.sector-button').forEach(button => {
        button.addEventListener('click', function() {
            displaySectorDetails(this.dataset.sectorKey);
            goToStep(3, false);
        });
    });

    // Initial setup
    goToStep(0, true);
    togglePaymentMethod('mpesa');
});
