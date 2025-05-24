document.addEventListener('DOMContentLoaded', function() {
    // const BASE_URL = 'http://localhost:8082';
    
    // Form navigation
    const formSections = document.querySelectorAll('.form-section');
    const progressSteps = document.querySelectorAll('.progress-step');
    let currentSection = 0;
    
    // Show first section initially
    showSection(currentSection);
    
    // Next button click handler
    document.querySelectorAll('.next-btn').forEach(button => {
        button.addEventListener('click', function() {
            if (validateCurrentSection(currentSection)) {
                currentSection++;
                showSection(currentSection);
                updateProgressBar(currentSection);
                
                // Update review section when reaching it
                if (currentSection === formSections.length - 1) {
                    updateReviewSection();
                }
            }
        });
    });
    
    // Previous button click handler
    document.querySelectorAll('.prev-btn').forEach(button => {
        button.addEventListener('click', function() {
            currentSection--;
            showSection(currentSection);
            updateProgressBar(currentSection);
        });
    });
    
    // Add education button
    document.getElementById('addEducation').addEventListener('click', function() {
        const educationGroup = document.querySelector('.education-group');
        const clone = educationGroup.cloneNode(true);
        
        // Clear all inputs in the clone
        clone.querySelectorAll('input').forEach(input => {
            input.value = '';
        });
        
        educationGroup.parentNode.insertBefore(clone, this);
    });
    
    // Add experience button
    document.getElementById('addExperience').addEventListener('click', function() {
        const experienceGroup = document.querySelector('.experience-group');
        const clone = experienceGroup.cloneNode(true);
        
        // Clear all inputs in the clone
        clone.querySelectorAll('input').forEach(input => {
            input.value = '';
        });
        
        experienceGroup.parentNode.insertBefore(clone, this);
    });
    
    // Submit button click handler
    document.getElementById('submitBtn').addEventListener('click', function() {
        if (validateCurrentSection(currentSection)) {
            submitForm();
        }
    });
    
    // Verify OTP button click handler
    document.getElementById('verifyOtpBtn').addEventListener('click', verifyOtp);
    
    // Resend OTP link click handler
    document.getElementById('resendOtp').addEventListener('click', function(e) {
        e.preventDefault();
        resendOtp();
    });
    
    // Helper function to show current section
    function showSection(index) {
        formSections.forEach((section, i) => {
            section.classList.toggle('active', i === index);
        });
    }
    
    // Helper function to update progress bar
    function updateProgressBar(index) {
        progressSteps.forEach((step, i) => {
            if (i <= index) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }
    
    // Helper function to validate current section
    function validateCurrentSection(index) {
        const currentSection = formSections[index];
        const inputs = currentSection.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                input.style.borderColor = '#ddd';
            }
        });
        
        // Additional validation for email and password
        if (index === 0) {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                isValid = false;
            }
            
            if (password.length < 4) {
                alert('Password must be at least 4 characters long.');
                isValid = false;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                isValid = false;
            }
        }
        
        // Validate available days in professional section
        if (index === 2) {
            const checkedDays = document.querySelectorAll('input[name="availableDays"]:checked');
            if (checkedDays.length === 0) {
                alert('Please select at least one available day.');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    // Helper function to validate email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Helper function to update review section
    function updateReviewSection() {
        // Personal Information
        document.getElementById('reviewPersonal').innerHTML = `
            <p><strong>Name:</strong> ${document.getElementById('firstName').value} ${document.getElementById('lastName').value}</p>
            <p><strong>Email:</strong> ${document.getElementById('email').value}</p>
            <p><strong>Mobile:</strong> ${document.getElementById('mobile').value}</p>
            <p><strong>Gender:</strong> ${document.getElementById('gender').value}</p>
            <p><strong>Date of Birth:</strong> ${document.getElementById('dob').value}</p>
        `;
        
        // Address Information
        document.getElementById('reviewAddress').innerHTML = `
            <p><strong>Address:</strong> ${document.getElementById('address').value}</p>
            <p><strong>Street:</strong> ${document.getElementById('street').value}</p>
            <p><strong>City:</strong> ${document.getElementById('city').value}, ${document.getElementById('state').value}</p>
            <p><strong>Postal Code:</strong> ${document.getElementById('postalCode').value}</p>
            <p><strong>Phone:</strong> ${document.getElementById('phoneNumber').value || 'N/A'}</p>
        `;
        
        // Professional Information
        const checkedDays = Array.from(document.querySelectorAll('input[name="availableDays"]:checked'))
            .map(checkbox => checkbox.value)
            .join(', ');
            
        document.getElementById('reviewProfessional').innerHTML = `
            <p><strong>Specialization:</strong> ${document.getElementById('specialization').value}</p>
            <p><strong>Consultation Fee:</strong> ${document.getElementById('consultationFee').value}</p>
            <p><strong>Availability:</strong> ${document.getElementById('startDate').value} to ${document.getElementById('endDate').value}</p>
            <p><strong>Working Hours:</strong> ${document.getElementById('startTime').value} - ${document.getElementById('endTime').value}</p>
            <p><strong>Available Days:</strong> ${checkedDays}</p>
            <p><strong>Holidays:</strong> ${document.getElementById('holidays').value || 'N/A'}</p>
        `;
        
        // Education & Experience
        let educationHTML = '';
        document.querySelectorAll('.education-group').forEach((group, index) => {
            const schoolName = group.querySelector('input[name="schoolName"]').value;
            if (schoolName) {
                educationHTML += `
                    <p><strong>Education #${index + 1}:</strong></p>
                    <p><strong>School:</strong> ${schoolName}</p>
                    <p><strong>Degree:</strong> ${group.querySelector('input[name="degree"]').value}</p>
                    <p><strong>Year:</strong> ${group.querySelector('input[name="passingYear"]').value}</p>
                    <p><strong>Location:</strong> ${group.querySelector('input[name="qualificationLocation"]').value}</p>
                    ${index < document.querySelectorAll('.education-group').length - 1 ? '<hr>' : ''}
                `;
            }
        });
        
        let experienceHTML = '';
        document.querySelectorAll('.experience-group').forEach((group, index) => {
            const orgName = group.querySelector('input[name="organisationName"]').value;
            if (orgName) {
                experienceHTML += `
                    <p><strong>Experience #${index + 1}:</strong></p>
                    <p><strong>Organization:</strong> ${orgName}</p>
                    <p><strong>Hospital:</strong> ${group.querySelector('input[name="hospitalName"]').value || 'N/A'}</p>
                    <p><strong>Position:</strong> ${group.querySelector('input[name="position"]').value}</p>
                    <p><strong>Experience:</strong> ${group.querySelector('input[name="yearOfExperience"]').value} years</p>
                    <p><strong>Responsibilities:</strong> ${group.querySelector('input[name="responsibilities"]').value || 'N/A'}</p>
                    ${index < document.querySelectorAll('.experience-group').length - 1 ? '<hr>' : ''}
                `;
            }
        });
        
        document.getElementById('reviewEducationExperience').innerHTML = `
            <h4>Education</h4>
            ${educationHTML || '<p>No education information provided</p>'}
            <h4>Experience</h4>
            ${experienceHTML || '<p>No experience information provided</p>'}
        `;
    }
    
    // Function to submit form data
    function submitForm() {
        const form = document.getElementById('doctorRegistrationForm');
        const formData = new FormData(form);
        const data = {};
        
        // Convert FormData to object
        formData.forEach((value, key) => {
            // Skip availableDays checkboxes (we'll handle them separately)
            if (key !== 'availableDays') {
                data[key] = value;
            }
        });
        
        // Prepare availability slots
        data.availabilitySlots = [{
            startDate: document.getElementById('startDate').value || null,
            endDate: document.getElementById('endDate').value || null,
            availableDays: Array.from(document.querySelectorAll('input[name="availableDays"]:checked'))
                                .map(checkbox => checkbox.value.toUpperCase()),
            startTime: document.getElementById('startTime').value || null,
            endTime: document.getElementById('endTime').value || null,
            holidays: (document.getElementById('holidays').value || "")
                        .split(',')
                        .map(h => h.trim())
                        .filter(Boolean)
        }];
        
        // Prepare qualifications
        data.qualifications = [];
        document.querySelectorAll('.education-group').forEach(group => {
            const schoolName = group.querySelector('input[name="schoolName"]').value;
            if (schoolName) {
                data.qualifications.push({
                    schoolName,
                    degree: group.querySelector('input[name="degree"]').value,
                    passingYear: parseInt(group.querySelector('input[name="passingYear"]').value) || null,
                    location: group.querySelector('input[name="qualificationLocation"]').value
                });
            }
        });
        
        // Prepare work experience
        data.workExperience = [];
        document.querySelectorAll('.experience-group').forEach(group => {
            const organisationName = group.querySelector('input[name="organisationName"]').value;
            if (organisationName) {
                data.workExperience.push({
                    organisationName,
                    hospitalName: group.querySelector('input[name="hospitalName"]').value,
                    position: group.querySelector('input[name="position"]').value,
                    responsibilities: (group.querySelector('input[name="responsibilities"]').value || "")
                                        .split(',')
                                        .map(r => r.trim())
                                        .filter(Boolean),
                    yearOfExperience: parseFloat(group.querySelector('input[name="yearOfExperience"]').value) || 0
                });
            }
        });
        
        // Add static fields
        data.fileResourceIds = ["file123", "file456"]; // Dummy file IDs
        data.isApproved = false;
        data.adminId = 'admin123';
        
        // Convert numeric fields
        if (data.postalCode) data.postalCode = parseInt(data.postalCode) || null;
        if (data.mobile) data.mobile = parseInt(data.mobile) || null;
        if (data.consultationFee) data.consultationFee = data.consultationFee.toString();
        
        console.log("Submitting Doctor Data:", data);
        
        // Make API call to register doctor
        fetch(`${BASE_URL}/api/doctor/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(response => {
            if (response === 'created') {
                // Hide form and show OTP section
                document.getElementById('doctorRegistrationForm').style.display = 'none';
                document.getElementById('otpSection').style.display = 'block';
                
                // Store email in session for OTP verification
                sessionStorage.setItem('doctorEmail', data.email);
            } else if (response === 'already exists') {
                alert('This email is already registered.');
            } else {
                alert('Unexpected response: ' + response);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Registration failed: ' + error.message);
        });
    }
    
    // Function to verify OTP
    function verifyOtp() {
        const otp = document.getElementById('otpInput').value;
        const email = sessionStorage.getItem('doctorEmail');
        
        if (!otp || otp.length !== 6) {
            alert('Please enter a valid 6-digit OTP.');
            return;
        }
        
        // Make API call to verify OTP
        fetch(`${BASE_URL}/api/doctor/verify?email=${encodeURIComponent(email)}&otp=${otp}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(response => {
            if (response === 'verified') {
                alert('OTP Verified! Your registration is complete.');
                window.location.href = "/index.html";
            } else if (response === 'invalid otp') {
                alert('Invalid OTP. Please try again.');
            } else if (response === 'already verified') {
                alert('This account is already verified.');
                window.location.href = "/index.html";
            } else {
                alert('Unexpected response: ' + response);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('OTP verification failed: ' + error.message);
        });
    }
    
    // Function to resend OTP
    function resendOtp() {
        const email = sessionStorage.getItem('doctorEmail');
        
        if (!email) {
            alert('Email not found. Please try registering again.');
            return;
        }
        
        // In a real implementation, you would make an API call here to resend OTP
        console.log("Resending OTP to:", email);
        
        // Simulate OTP resend
        alert('OTP has been resent to your email.');
    }
});