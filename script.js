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
  
    const newUser = {
      id: userId,
      username: userName,
      password: '123456', // كلمة مرور افتراضية
      role: userType
    };
  
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('تمت إضافة المستخدم بنجاح');
  });
  
  // وظائف إضافية
  function showAddUserForm() {
    document.getElementById('add-user-form').classList.remove('hidden');
  }
  
  function addAssignment() {
    alert('تمت إضافة واجب جديد');
  }
  
  function viewGrades() {
    if (gradesLocked) {
      alert('الدرجات مغلقة ولا يمكن عرضها');
    } else {
      alert('عرض الدرجات');
    }
  }
  
  function viewActivities() {
    alert(JSON.stringify(activities, null, 2));
  }
  
  function viewStudentGrades() {
    alert('عرض درجات الطلاب');
  }
  
  function viewAssignments() {
    alert('عرض الواجبات');
  }
  
  function viewChildGrades() {
    alert('عرض درجات الابن');
  }
  
  function sendMessage(sender, receiver, message) {
    const newMessage = { sender, receiver, message, timestamp: new Date() };
    messages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(messages));
    alert('تم إرسال الرسالة');
  }
  
  function viewMessages(user) {
    const userMessages = messages.filter(msg => msg.receiver === user);
    alert(JSON.stringify(userMessages, null, 2));
  }
  
  function logActivity(user, activity) {
    const newActivity = { user, activity, timestamp: new Date() };
    activities.push(newActivity);
    localStorage.setItem('activities', JSON.stringify(activities));
  }
  
  // إغلاق تسجيل الدرجات
  let gradesLocked = JSON.parse(localStorage.getItem('gradesLocked')) || false;
  
  function lockGrades() {
    gradesLocked = true;
    localStorage.setItem('gradesLocked', JSON.stringify(gradesLocked));
    alert('تم إغلاق تسجيل الدرجات');
  }