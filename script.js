import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://jeekkqcedrppbnsgejfw.supabase.co';
const SUPABASE_KEY = 'sb_publishable_qPvZHrQMJNBjY5ByyPw29g_Mnt6GdKm';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ================= ተማሪዎች (STUDENTS) =================

// 1. የተማሪዎች ዝርዝር ማወጫ
export async function getStudents() {
    const { data, error } = await supabase.from('students').select('*');
    if (error) console.error("Error:", error);
    else return data;
}

// 2. አዲስ ተማሪ መመዝገቢያ
export async function addStudent(name, email, grade) {
    const { error } = await supabase.from('students').insert([{ name, email, grade }]);
    if (error) alert("ስህተት: " + error.message);
    else alert("ተማሪው በጥሩ ሁኔታ ተመዝግቧል!");
}

// ================= መምህራን (TEACHERS) =================

// 1. የመምህራን ዝርዝር ማወጫ
export async function getTeachers() {
    const { data, error } = await supabase.from('teachers').select('*');
    if (error) console.error("Error:", error);
    else return data;
}

// 2. አዲስ መምህር መመዝገቢያ
export async function addTeacher(name, subject, phone) {
    const { error } = await supabase.from('teachers').insert([{ name, subject, phone }]);
    if (error) alert("ስህተት: " + error.message);
    else alert("መምህሩ በጥሩ ሁኔታ ተመዝግበዋል!");
}
