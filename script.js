// بيانات المستخدمين (يتم تخزينها في localStorage)
let users = JSON.parse(localStorage.getItem('users')) || [
  { id: 1, username: 'admin', password: 'admin', role: 'admin' }
];

// بيانات الدرجات (يتم تخزينها في localStorage)
let grades = JSON.parse(localStorage.getItem('grades')) || [];

// بيانات المقررات (يتم تخزينها في localStorage)
let courses = JSON.parse(localStorage.getItem('courses')) || [];

// بيانات الاختبارات (يتم تخزينها في localStorage)
let exams = JSON.parse(localStorage.getItem('exams')) || [];

// بيانات الإجازات (يتم تخزينها في localStorage)
let holidays = JSON.parse(localStorage.getItem('holidays')) || [];

// بيانات الإشعارات (يتم تخزينها في localStorage)
let notifications = JSON.parse(localStorage.getItem('notifications')) || [];

// تسجيل الدخول
document.getElementById('login-form')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user)); // حفظ المستخدم الحالي
    alert('تم تسجيل الدخول بنجاح');
    window.location.href = `${user.role}.html`; // توجيه المستخدم للصفحة المناسبة
  } else {
    alert('اسم المستخدم أو كلمة المرور غير صحيحة');
  }
});

// تسجيل الخروج
function logout() {
  localStorage.removeItem('currentUser'); // حذف المستخدم الحالي من localStorage
  window.location.href = 'index.html'; // توجيه المستخدم إلى صفحة تسجيل الدخول
}

// إضافة مستخدم (في صفحة المدير)
document.getElementById('user-form')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const userType = document.getElementById('user-type').value;
  const userName = document.getElementById('user-name').value;
  const userId = document.getElementById('user-id').value;
  const password = generatePassword(); // توليد كلمة مرور تلقائيًا

  const newUser = {
    id: userId,
    username: userName,
    password: password,
    role: userType
  };

  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  alert(`تمت إضافة المستخدم بنجاح. كلمة المرور: ${password}`);
});

// عرض المستخدمين
function viewUsers() {
  const usersList = document.getElementById('users');
  usersList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = `اسم المستخدم: ${user.username} - الدور: ${user.role}`;
    usersList.appendChild(li);
  });
  document.getElementById('users-list').classList.remove('hidden');
}

// عرض كلمات السر
function viewPasswords() {
  const passwordsList = document.getElementById('passwords');
  passwordsList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = `اسم المستخدم: ${user.username} - كلمة السر: ${user.password}`;
    passwordsList.appendChild(li);
  });
  document.getElementById('passwords-list').classList.remove('hidden');
}

// تعديل مستخدم
function editUser() {
  const userId = prompt("أدخل رقم هوية المستخدم الذي تريد تعديله:");
  const user = users.find(u => u.id == userId);
  if (user) {
    const newUsername = prompt("أدخل اسم المستخدم الجديد:", user.username);
    const newPassword = prompt("أدخل كلمة السر الجديدة:", user.password);
    user.username = newUsername;
    user.password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    alert('تم تعديل المستخدم بنجاح');
  } else {
    alert('المستخدم غير موجود');
  }
}

// حذف مستخدم
function deleteUser() {
  const userId = prompt("أدخل رقم هوية المستخدم الذي تريد حذفه:");
  users = users.filter(u => u.id != userId);
  localStorage.setItem('users', JSON.stringify(users));
  alert('تم حذف المستخدم بنجاح');
}

// توليد كلمة مرور تلقائيًا
function generatePassword() {
  return Math.random().toString(36).slice(-8);
}

// إضافة مقرر
function addCourse() {
  const courseName = prompt("أدخل اسم المقرر:");
  if (courseName) {
    courses.push({ name: courseName });
    localStorage.setItem('courses', JSON.stringify(courses));
    alert('تم إضافة المقرر بنجاح');
  }
}

// حذف مقرر
function deleteCourse() {
  const courseName = prompt("أدخل اسم المقرر الذي تريد حذفه:");
  courses = courses.filter(c => c.name != courseName);
  localStorage.setItem('courses', JSON.stringify(courses));
  alert('تم حذف المقرر بنجاح');
}

// تعيين مقرر للمعلم
function assignCourseToTeacher() {
  const teacherId = prompt("أدخل رقم هوية المعلم:");
  const courseName = prompt("أدخل اسم المقرر:");
  const teacher = users.find(u => u.id == teacherId && u.role == 'teacher');
  if (teacher) {
    teacher.courses = teacher.courses || [];
    teacher.courses.push(courseName);
    localStorage.setItem('users', JSON.stringify(users));
    alert('تم تعيين المقرر للمعلم بنجاح');
  } else {
    alert('المعلم غير موجود');
  }
}

// إضافة اختبار
function addExam() {
  const examName = prompt("أدخل اسم الاختبار:");
  const examDate = prompt("أدخل تاريخ الاختبار (YYYY-MM-DD):");
  exams.push({ name: examName, date: examDate });
  localStorage.setItem('exams', JSON.stringify(exams));
  alert('تم إضافة الاختبار بنجاح');
}

// إضافة إجازة
function addHoliday() {
  const holidayName = prompt("أدخل اسم الإجازة:");
  const holidayDate = prompt("أدخل تاريخ الإجازة (YYYY-MM-DD):");
  holidays.push({ name: holidayName, date: holidayDate });
  localStorage.setItem('holidays', JSON.stringify(holidays));
  alert('تم إضافة الإجازة بنجاح');
}

// عرض تقارير الدرجات
function viewGradesReport() {
  const studentId = prompt("أدخل رقم هوية الطالب:");
  const studentGrades = grades.filter(g => g.studentId == studentId);
  if (studentGrades.length > 0) {
    alert(JSON.stringify(studentGrades, null, 2));
  } else {
    alert('لا توجد درجات لهذا الطالب');
  }
}

// إرسال إشعار
function sendNotification(userId, message) {
  notifications.push({ userId, message, timestamp: new Date() });
  localStorage.setItem('notifications', JSON.stringify(notifications));
  alert('تم إرسال الإشعار بنجاح');
}
