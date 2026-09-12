// 1. Supabase Initialization
const SUPABASE_URL = 'https://eesgimin-lang.supabase.co';
const SUPABASE_KEY = 'sb_publishable_qPvZHrQMJNBjY5ByyPw29g_Mnt6GdKm';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ----------------------------------------------------
// 2. የተማሪዎች ስራዎች (Create & Read)
// ----------------------------------------------------

// ተማሪ መመዝገብ (ከ Admin Page)
async function addStudent(name, grade) {
  const { data, error } = await supabase
    .from('students')
    .insert([{ name: name, grade: grade }]);

  if (error) {
    alert("ተማሪ ሲመዘገብ ስህተት አጋጥሟል: " + error.message);
  } else {
    alert("ተማሪው በተሳካ ሁኔታ ተመዝግቧል!");
  }
}

// የተማሪዎችን ዝርዝር ማሳየት (በ Student Page ላይ)
async function loadStudents() {
  const listContainer = document.getElementById('studentList');
  if (!listContainer) return; // በዚሁ ገጽ ላይ studentList ከሌለ አይሰራም

  const { data: students, error } = await supabase
    .from('students')
    .select('*');

  if (error) {
    console.error("የተማሪዎችን ዝርዝር ማምጣት አልተቻለም:", error.message);
    return;
  }

  listContainer.innerHTML = '';
  students.forEach(student => {
    const item = document.createElement('div');
    item.className = 'card';
    item.innerHTML = `<h3>${student.name}</h3><p>ክፍል: ${student.grade || 'N/A'}</p>`;
    listContainer.appendChild(item);
  });
}

// ----------------------------------------------------
// 3. የመምህራን ስራዎች (Create & Read)
// ----------------------------------------------------

// መምህር መመዝገብ (ከ Admin Page)
async function addTeacher(name, subject) {
  const { data, error } = await supabase
    .from('teachers')
    .insert([{ name: name, subject: subject }]);

  if (error) {
    alert("መምህር ሲመዘገብ ስህተት አጋጥሟል: " + error.message);
  } else {
    alert("መምህሩ በተሳካ ሁኔታ ተመዝግቧል!");
  }
}

// የመምህራንን ዝርዝር ማሳየት (በ Teacher Page ላይ)
async function loadTeachers() {
  const listContainer = document.getElementById('teacherList');
  if (!listContainer) return;

  const { data: teachers, error } = await supabase
    .from('teachers')
    .select('*');

  if (error) {
    console.error("የመምህራንን ዝርዝር ማምጣት አልተቻለም:", error.message);
    return;
  }

  listContainer.innerHTML = '';
  teachers.forEach(teacher => {
    const item = document.createElement('div');
    item.className = 'card';
    item.innerHTML = `<h3>${teacher.name}</h3><p>ትምህርት: ${teacher.subject || 'N/A'}</p>`;
    listContainer.appendChild(item);
  });
}

// ----------------------------------------------------
// 4. Page Load Events (የገጽ መክፈት ክስተቶች)
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {

  // የአድሚን ተማሪ መመዝገቢያ Form Event
  const studentForm = document.getElementById('studentForm');
  if (studentForm) {
    studentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('studentName').value;
      const grade = document.getElementById('studentGrade').value;
      await addStudent(name, grade);
      studentForm.reset();
    });
  }

  // የአድሚን መምህር መመዝገቢያ Form Event
  const teacherForm = document.getElementById('teacherForm');
  if (teacherForm) {
    teacherForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('teacherName').value;
      const subject = document.getElementById('teacherSubject').value;
      await addTeacher(name, subject);
      teacherForm.reset();
    });
  }

  // በገጾቹ ሲከፈቱ ዳታ ማምጣት
  loadStudents();
  loadTeachers();
});
