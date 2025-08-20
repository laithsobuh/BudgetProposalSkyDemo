// وظائف تسجيل الدخول
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.querySelector('.login-btn');
    const rememberCheckbox = document.getElementById('remember');

    // التحقق من البيانات المحفوظة مسبقاً
    if (localStorage.getItem('rememberedUsername')) {
        usernameInput.value = localStorage.getItem('rememberedUsername');
        rememberCheckbox.checked = true;
    }

    // معالج إرسال النموذج
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        // التحقق من صحة البيانات
        if (!validateForm(username, password)) {
            return;
        }
        
        // إظهار حالة التحميل
        showLoading(true);
        
        // محاكاة عملية تسجيل الدخول
        setTimeout(() => {
            handleLogin(username, password);
        }, 2000);
    });

    // التحقق من صحة النموذج
    function validateForm(username, password) {
        let isValid = true;
        
        // التحقق من اسم المستخدم
        if (username.length < 3) {
            showError(usernameInput, 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل');
            isValid = false;
        } else {
            clearError(usernameInput);
        }
        
        // التحقق من كلمة المرور
        if (password.length < 6) {
            showError(passwordInput, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');
            isValid = false;
        } else {
            clearError(passwordInput);
        }
        
        return isValid;
    }

    // معالجة تسجيل الدخول
    function handleLogin(username, password) {
        // محاكاة التحقق من البيانات
        const validCredentials = [
            { username: 'admin', password: 'admin123' },
            { username: 'user', password: 'user123' },
            { username: 'manager', password: 'manager123' }
        ];
        
        const isValid = validCredentials.some(cred => 
            cred.username === username && cred.password === password
        );
        
        showLoading(false);
        
        if (isValid) {
            // حفظ اسم المستخدم إذا كان المستخدم يريد التذكر
            if (rememberCheckbox.checked) {
                localStorage.setItem('rememberedUsername', username);
            } else {
                localStorage.removeItem('rememberedUsername');
            }
            
            // إظهار رسالة نجاح
            showSuccessMessage();
            
            // توجيه المستخدم إلى صفحة البنود الأساسية
            setTimeout(() => {
                window.location.href = 'basicItems.html';
            }, 1500);
            
        } else {
            showErrorMessage('اسم المستخدم أو كلمة المرور غير صحيحة');
        }
    }

    // إظهار حالة التحميل
    function showLoading(loading) {
        if (loading) {
            loginBtn.classList.add('loading');
            loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحقق...';
            loginBtn.disabled = true;
        } else {
            loginBtn.classList.remove('loading');
            loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> تسجيل الدخول';
            loginBtn.disabled = false;
        }
    }

    // إظهار رسالة خطأ للحقل
    function showError(input, message) {
        clearError(input);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #e74c3c;
            font-size: 12px;
            margin-top: 5px;
            animation: slideDown 0.3s ease;
            font-weight: 500;
        `;
        
        input.parentNode.parentNode.appendChild(errorDiv);
        input.style.borderColor = '#e74c3c';
    }

    // مسح رسالة الخطأ
    function clearError(input) {
        const errorMessage = input.parentNode.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
        input.style.borderColor = '#e1e1e1';
    }

    // إظهار رسالة نجاح
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-toast';
        successDiv.innerHTML = '<i class="fas fa-check-circle"></i> تم تسجيل الدخول بنجاح!';
        successDiv.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.95);
            color: #1a237e;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(26, 35, 126, 0.2);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 1000;
            animation: slideInFromRight 0.5s ease;
            border-right: 4px solid #3949ab;
            backdrop-filter: blur(10px);
        `;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.style.animation = 'slideOutToRight 0.5s ease';
            setTimeout(() => {
                successDiv.remove();
            }, 500);
        }, 3000);
    }

    // إظهار رسالة خطأ عامة
    function showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-toast';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        errorDiv.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.95);
            color: #e74c3c;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(231, 76, 60, 0.2);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 1000;
            animation: slideInFromRight 0.5s ease;
            border-right: 4px solid #e74c3c;
            backdrop-filter: blur(10px);
        `;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.style.animation = 'slideOutToRight 0.5s ease';
            setTimeout(() => {
                errorDiv.remove();
            }, 500);
        }, 5000);
    }

    // التحقق من الحقول في الوقت الفعلي
    usernameInput.addEventListener('blur', function() {
        if (this.value.trim().length > 0 && this.value.trim().length < 3) {
            showError(this, 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل');
        } else {
            clearError(this);
        }
    });

    passwordInput.addEventListener('blur', function() {
        if (this.value.trim().length > 0 && this.value.trim().length < 6) {
            showError(this, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');
        } else {
            clearError(this);
        }
    });
});

// وظيفة إظهار/إخفاء كلمة المرور
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleIcon.className = 'fas fa-eye';
    }
}

// إضافة تأثيرات CSS للرسائل
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInFromRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutToRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    .error-message, .success-message, .general-error-message {
        animation: slideDown 0.3s ease;
    }
    
    .success-toast, .error-toast {
        font-family: 'Cairo', sans-serif;
        font-weight: 500;
    }
`;
document.head.appendChild(style);

// معلومات تسجيل الدخول التجريبية
console.log('معلومات تسجيل الدخول التجريبية:');
console.log('admin / admin123');
console.log('user / user123');
console.log('manager / manager123');

// Side Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    const sidenav = document.getElementById('sidenav');
    const sidenavToggle = document.getElementById('sidenavToggle');
    
    if (sidenavToggle && sidenav) {
        sidenavToggle.addEventListener('click', function() {
            sidenav.classList.toggle('active');
        });
        
        // إغلاق sidenav عند النقر خارجه
        document.addEventListener('click', function(e) {
            if (!sidenav.contains(e.target) && !sidenavToggle.contains(e.target)) {
                sidenav.classList.remove('active');
            }
        });
        
        // إغلاق sidenav عند النقر على أي رابط
        const navItems = sidenav.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                sidenav.classList.remove('active');
            });
        });
        
        // وظيفة تسجيل الخروج
        const logoutBtn = sidenav.querySelector('.sidenav-footer .nav-item[href="#"]');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // مسح البيانات المحفوظة
                localStorage.removeItem('rememberedUsername');
                
                // إظهار رسالة نجاح
                showLogoutMessage();
                
                // توجيه المستخدم إلى صفحة تسجيل الدخول
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            });
        }
    }
});

// وظيفة إظهار رسالة تسجيل الخروج
function showLogoutMessage() {
    const logoutDiv = document.createElement('div');
    logoutDiv.className = 'logout-toast';
    logoutDiv.innerHTML = '<i class="fas fa-sign-out-alt"></i> تم تسجيل الخروج بنجاح!';
    logoutDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.95);
        color: #1a237e;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(26, 35, 126, 0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 1000;
        animation: slideInFromRight 0.5s ease;
        border-right: 4px solid #3949ab;
        backdrop-filter: blur(10px);
        font-family: 'Cairo', sans-serif;
        font-weight: 500;
    `;
    
    document.body.appendChild(logoutDiv);
    
    setTimeout(() => {
        logoutDiv.style.animation = 'slideOutToRight 0.5s ease';
        setTimeout(() => {
            logoutDiv.remove();
        }, 500);
    }, 1500);
}
