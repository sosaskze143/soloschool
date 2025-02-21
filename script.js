// بيانات المستخدمين (يتم تخزينها في localStorage)
let users = JSON.parse(localStorage.getItem('users')) || [
  { id: 1, username: 'admin', password: 'admin', role: 'admin' }
];

// بيانات الدرجات (يتم تخزينها في localStorage)
let grades = JSON.parse(localStorage.getItem('grades')) || [];

// تسجيل الدخول
document.getElementById('login-form')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    alert('تم تسجيل الدخول بنجاح');
    window.location.href = `${user.role}.html`; // توجيه المستخدم للصفحة المناسبة
  } else {
    alert('اسم المستخدم أو كلمة المرور غير صحيحة');
  }
});

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

// توليد كلمة مرور تلقائيًا
function generatePassword() {
  return Math.random().toString(36).slice(-8);
}

// إغلاق تسجيل الدرجات
let gradesLocked = JSON.parse(localStorage.getItem('gradesLocked')) || false;

function lockGrades() {
  gradesLocked = true;
  localStorage.setItem('gradesLocked', JSON.stringify(gradesLocked));
  alert('تم إغلاق تسجيل الدرجات');
}

// فتح تسجيل الدرجات
function unlockGrades() {
  gradesLocked = false;
  localStorage.setItem('gradesLocked', JSON.stringify(gradesLocked));
  alert('تم فتح تسجيل الدرجات');
}

// إضافة درجات (في صفحة المعلم)
document.getElementById('grade-form')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const studentId = document.getElementById('student-id').value;
  const courseName = document.getElementById('course-name').value;
  const grade = document.getElementById('grade').value;

  const newGrade = {
    studentId,
    courseName,
    grade
  };

  grades.push(newGrade);
  localStorage.setItem('grades', JSON.stringify(grades));
  alert('تم إضافة الدرجة بنجاح');
});

// عرض درجات الطالب (في صفحة الطالب)
function viewMyGrades() {
  const studentId = 1; // يمكن تغيير هذا ليتناسب مع الطالب المسجل
  const studentGrades = grades.filter(g => g.studentId == studentId);
  const gradesList = document.getElementById('grades-list');
  gradesList.innerHTML = '';

  let total = 0;
  studentGrades.forEach(grade => {
    const li = document.createElement('li');
    li.textContent = `${grade.courseName}: ${grade.grade}`;
    gradesList.appendChild(li);
    total += parseInt(grade.grade);
  });

  const average = total / studentGrades.length;
  document.getElementById('average').textContent = `المعدل: ${average.toFixed(2)}`;

  let status = '';
  if (average >= 90) {
    status = 'ممتاز';
  } else if (average >= 80) {
    status = 'جيد جدًا';
  } else if (average >= 70) {
    status = 'جيد';
  } else if (average >= 60) {
    status = 'مقبول';
  } else {
    status = 'راسب';
  }
  document.getElementById('status').textContent = `الحالة: ${status}`;

  document.getElementById('my-grades').classList.remove('hidden');
}
