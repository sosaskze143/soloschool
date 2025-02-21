// بيانات المستخدمين (يتم تخزينها في localStorage)
let users = JSON.parse(localStorage.getItem('users')) || [
  { id: 1, username: 'admin', password: 'admin', role: 'admin' }
];

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
  e.preventDefault(); // منع إعادة تحميل الصفحة

  const userType = document.getElementById('user-type').value;
  const fullName = document.getElementById('full-name').value;
  const userId = document.getElementById('user-id').value;
  const gender = document.getElementById('gender').value;
  const birthdate = document.getElementById('birthdate').value;
  const parentName = document.getElementById('parent-name').value;
  const phoneNumber = document.getElementById('phone-number').value;
  const password = generatePassword(); // توليد كلمة مرور تلقائيًا

  const newUser = {
    id: userId,
    username: userId, // اسم المستخدم هو رقم الهوية
    password: password,
    role: userType,
    fullName: fullName,
    gender: gender,
    birthdate: birthdate,
    parentName: parentName,
    phoneNumber: phoneNumber
  };

  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  alert(`تمت إضافة المستخدم بنجاح. كلمة المرور: ${password}`);

  viewUsers();
  document.getElementById('user-form').reset();
});

// عرض المستخدمين
function viewUsers() {
  const usersList = document.getElementById('users');
  usersList.innerHTML = '';
  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.fullName}</td>
      <td>${user.id}</td>
      <td>${user.gender === 'male' ? 'ذكر' : 'أنثى'}</td>
      <td>${user.birthdate}</td>
      <td>${user.parentName || 'غير متوفر'}</td>
      <td>${user.phoneNumber}</td>
      <td>${user.role === 'teacher' ? 'معلم' : user.role === 'student' ? 'طالب' : 'ولي أمر'}</td>
      <td>
        <button onclick="editUser('${user.id}')">تعديل</button>
        <button onclick="deleteUser('${user.id}')">حذف</button>
      </td>
    `;
    usersList.appendChild(row);
  });
  document.getElementById('users-list').classList.remove('hidden');
}

// تعديل المستخدم
function editUser(userId) {
  const user = users.find(u => u.id === userId);
  if (user) {
    localStorage.setItem('editUserId', userId); // حفظ رقم الهوية للتعديل
    window.location.href = 'edit-user.html'; // توجيه إلى صفحة التعديل
  }
}

// حذف المستخدم
function deleteUser(userId) {
  users = users.filter(u => u.id !== userId);
  localStorage.setItem('users', JSON.stringify(users));
  alert('تم حذف المستخدم بنجاح');
  viewUsers();
}

// توليد كلمة مرور تلقائيًا
function generatePassword() {
  return Math.random().toString(36).slice(-8);
}

// تحميل التقرير كملف PDF
function downloadReport() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text("تقرير المستخدمين", 10, 10);
  users.forEach((user, index) => {
    doc.text(
      `الاسم: ${user.fullName}, رقم الهوية: ${user.id}, النوع: ${user.role}`,
      10,
      20 + (index * 10)
    );
  });

  doc.save('تقرير_المستخدمين.pdf');
}
