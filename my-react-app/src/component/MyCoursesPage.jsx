import React, { useState, useContext, useEffect } from 'react';
import './MyCoursesPage.css';
import './AdminCoursesPage.css'; // Style untuk modal dan tombol admin
import { FaArrowRight, FaCode, FaLaptopCode, FaAws, FaPlus, FaPencilAlt, FaTrash } from 'react-icons/fa';
import CourseListItem from './CourseListItem.jsx';
import CourseEditor from './CourseEditor.jsx';
import { hasPermission } from '../role.js';
import coursesData from './course.json'; // Atau path relatif yang benar
import dataFetch from '../handleFetching.js';
import Icons from './Icons.jsx'

// Peta untuk mengubah string ikon dari JSON menjadi komponen React
const iconMap = {
    FaCode,
    FaLaptopCode,
    FaAws,
};

// Memproses data awal untuk mengganti string ikon dengan komponen
const initialCourses = coursesData.map(course => ({
    ...course,
    icon: iconMap[course.icon] || FaCode // Gunakan FaCode sebagai fallback
}));

// Komponen Modal untuk menambah kursus, dipindahkan dari AdminCoursesPage
const AddCourseModal = ({ isOpen, onClose, onAddCourse }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    if (!isOpen) return null;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description) {
            alert('Judul dan deskripsi tidak boleh kosong.');
            return;
        }
        onAddCourse({ title, description });
        setTitle('');
        setDescription('');
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>Tambah Kursus Baru</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Judul Kursus</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Contoh: Belajar React dari Dasar"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Deskripsi Kursus</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Jelaskan secara singkat tentang kursus ini"
                            required
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-cancel">Batal</button>
                        <button type="submit" className="btn-submit">Tambah Kursus</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Komponen Modal untuk mengedit detail kursus (judul & deskripsi)
const EditCourseDetailsModal = ({ isOpen, onClose, onSave, course }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (course) {
            setTitle(course.title);
            setDescription(course.description);
        } else {
            // Reset form jika tidak ada kursus (misal, saat modal ditutup)
            setTitle('');
            setDescription('');
        }
    }, [course]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description) {
            alert('Judul dan deskripsi tidak boleh kosong.');
            return;
        }
        // Kirim kembali seluruh objek kursus yang diperbarui
        onSave({ ...course, title, description });
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>Edit Detail Kursus</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="edit-title">Judul Kursus</label>
                        <input type="text" id="edit-title" value={title} onChange={(e) => setTitle(e.target.value)} required autoFocus />
                    </div>
                    <div className="form-group">
                        <label htmlFor="edit-description">Deskripsi Kursus</label>
                        <textarea id="edit-description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-cancel">Batal</button>
                        <button type="submit" className="btn-submit">Simpan Perubahan</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

/**
 * Komponen ini sekarang menjadi usang karena fungsionalitasnya
 * telah digabungkan ke dalam MyCoursesPage dengan tampilan kondisional untuk admin.
 * Anda bisa mempertimbangkan untuk menghapus file AdminCoursesPage.jsx.
 */
// import AdminCoursesPage from './AdminCoursesPage.jsx';

export default function MyCoursesPage({ marginleft, user = {} }) { // Beri nilai default {} untuk user
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [courses, setCourses] = useState(initialCourses);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editDetailsModalState, setEditDetailsModalState] = useState({ isOpen: false, course: null });
    const [editingCourse, setEditingCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

   

    useEffect(() => {
        // Simulasi pengambilan data dari file JSON (atau API)
        // Di aplikasi nyata, Anda bisa menggunakan fetch di sini.
        // Karena kita mengimpornya langsung, kita bisa set datanya.
        Promise.resolve().then(async () => {
            const test = new dataFetch("/course", null, "GET");
            const data = await test.makeRequest()
            // console.log(coursesData);
            const newdata = data.data
            // .map((course)=>{
            //     return{
            //         ...course,
            //         modules:[]
            //     }
                
            // });
            console.log(newdata); 
            
            
            const processedCourses = newdata.map(course => ({
                ...course,
                icon: iconMap[course.icon] || FaCode
            }));
            setCourses(processedCourses);
            setIsLoading(false);
        })

    }, []);

    // Menggunakan hasPermission untuk memeriksa hak akses
    // Ini lebih aman dan fleksibel daripada membandingkan string 'admin'
    const canCreateCourse = hasPermission(user, 'create:course');
    const isAdminView = user?.usrRole === 'admin'; // Untuk teks UI spesifik admin jika perlu

    const handleCardClick = (course) => {
        if (isAdminView) {
            // Admin: Klik kartu untuk membuka editor penuh (kustomisasi modul/materi)
            setEditingCourse(course);
        } else if (course.available) {
            // Siswa: Klik kartu untuk memulai/melanjutkan kursus
            setSelectedCourseId(course.id);
        } else {
            // Siswa: Kursus belum tersedia
            alert('Kursus ini sedang dalam pengembangan. Silakan periksa kembali nanti.');
        }
    };

    const handleBackToCourseList = () => {
        setSelectedCourseId(null);
    };
    
    const handleAddCourse = async (newCourseData) => {
        const newCourse = {
            id: newCourseData.title.toLowerCase().replace(/\s+/g, '-').slice(0, 50),
            title: newCourseData.title,
            description: newCourseData.description,
            icon: 'FaCode', // Ikon default
            color: '#64748b', // Warna default
            available: true,
            modules: []
        };
        setCourses(prevCourses => [...prevCourses, newCourse]);

        const addCourse = new dataFetch("/Course", newCourse, "POST");
        await addCourse.makeRequest().then((response)=>{
            console.log(JSON.stringify(response.data));
        });


        
    };

    const handleSaveCourseDetails = async (updatedCourse) => {
        // API call untuk memperbarui judul dan deskripsi
        const test = {
    "title": "Nasigoreng",
    "description": "sss",
    "icon": "FaCode",
    "color": "#3b82f6",
    "available": true
}
        const updateCourse = new dataFetch(`/course/${30}`, test, "PATCH"); 
        
        try {
            const response = await updateCourse.makeRequest();
            console.log('Detail kursus berhasil diperbarui:', response.data);
            setCourses(prevCourses => prevCourses.map(c => (c.id === updatedCourse.id ? updatedCourse : c)));
            setEditDetailsModalState({ isOpen: false, course: null });
        } catch (error) {
            console.error('Gagal memperbarui detail kursus:', error);
            alert('Gagal menyimpan perubahan. Silakan coba lagi.');
        }
    };

    const handleUpdateCourse = (updatedCourse) => {
        setCourses(prevCourses => prevCourses.map(c => (c.id === updatedCourse.id ? updatedCourse : c)));
        setEditingCourse(updatedCourse); // Menjaga state editor tetap sinkron
    };

    const handleDeleteCourse = (courseId) => {
        // Mencegah penghapusan kursus bawaan untuk demo
        if (['dasar-pemrograman', 'frontend-expert', 'aws-cloud'].includes(courseId)) {
            alert('Kursus bawaan tidak dapat dihapus.');
            return;
        }
        if (window.confirm('Apakah Anda yakin ingin menghapus kursus ini?')) {
            setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
            const deleteCourse = new dataFetch(`/course/${courseId}`, null, "DELETE");
            deleteCourse.makeRequest().then((response)=>{
                console.log(JSON.stringify(response));
            })

        }
    };

    // Membuka modal untuk mengedit detail (nama & deskripsi)
    const handleOpenEditDetailsModal = (course) => {
        setEditDetailsModalState({ isOpen: true, course: course });
    };

    const handleBackFromEditor = () => {
        setEditingCourse(null);
    };

    if (editingCourse) {
        return <CourseEditor
            course={editingCourse}
            onBack={handleBackFromEditor}
            onUpdateCourse={handleUpdateCourse}
            marginleft={marginleft}
        />;
    }
    
    if (selectedCourseId) {
        const selectedCourse = courses.find(c => c.id === selectedCourseId);

        // Menangani kasus jika kursus tidak ditemukan (seharusnya tidak terjadi)
        if (!selectedCourse) {
            return (
                <div className="my-courses-page" style={{ marginLeft: `${marginleft}px`, padding: '2rem' }}>
                    <p>Kursus tidak ditemukan.</p>
                    <button onClick={handleBackToCourseList} className="back-button">Kembali</button>
                </div>
            );
        }

        // Mengirim seluruh objek 'selectedCourse' sebagai prop 'course'
        return <CourseListItem course={selectedCourse} marginleft={marginleft} onBackToCourseList={handleBackToCourseList} />;
    }

    if (isLoading) {
        return (
            <div className="my-courses-page" style={{ marginLeft: `${marginleft}px`, padding: '2rem' }}>Memuat kursus...</div>
        );
    }

    return (
        <>
            {/* Modal untuk menambah kursus */}
            {canCreateCourse && <AddCourseModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAddCourse={handleAddCourse} />}
            {/* Modal untuk mengedit detail kursus */}
            <EditCourseDetailsModal
                isOpen={editDetailsModalState.isOpen}
                onClose={() => setEditDetailsModalState({ isOpen: false, course: null })}
                onSave={handleSaveCourseDetails}
                course={editDetailsModalState.course}
            />
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .course-card-item {
                    opacity: 0; /* Mulai dari transparan */
                    animation: fadeInUp 0.6s ease-out forwards;
                }
            `}</style>
            <div className="my-courses-page" style={{ marginLeft: `${marginleft}px` }}>
                <header className={`my-courses-header ${isAdminView ? 'admin-header' : ''}`}>
                    {isAdminView ? ( // Tampilan untuk Admin
                        <>
                            <div>
                                <h1>Kelola Kursus - Mode Admin</h1>
                                <p>Tambah, edit, atau hapus kursus yang tersedia untuk siswa.</p>
                            </div>
                            <button className="add-course-btn" onClick={() => setIsAddModalOpen(true)}>
                                <FaPlus /> Tambah Kursus Baru
                            </button>
                        </>
                    ) : ( // Tampilan untuk non-admin (misal: student)
                        <>
                            <h1>My Courses</h1>
                            <p>Lanjutkan perjalanan belajarmu dan tingkatkan keahlianmu di sini.</p>
                        </>
                    )}
                </header>
                <main className="courses-container">
                    {courses.map((course, index) => (
                        <div
                            key={course.id}
                            className={`course-card-item ${!course.available ? 'unavailable' : ''}`}
                            onClick={() => handleCardClick(course)}
                            style={{ animationDelay: `${index * 0.1}s` }} // Menambahkan delay agar muncul satu per satu
                        >
                            <div className="course-card-icon" style={{ backgroundColor: course.color }}><Icons icon={'FaCode'} /></div>
                            <div className="course-card-content">
                                <h3>{course.title}</h3>
                                <p>{course.description}</p>
                            </div>
                            <div className="course-card-footer">
                                <span>{course.available ? (isAdminView ? 'Tersedia' : 'Lanjutkan Belajar') : 'Segera Hadir'}</span>
                                {course.available && !isAdminView ? <FaArrowRight /> : null}
                                {isAdminView && (
                                    <div className="admin-card-actions">
                                        <button className="admin-action-btn edit-btn" title="Edit Nama & Deskripsi" onClick={(e) => { e.stopPropagation(); handleOpenEditDetailsModal(course); }}>
                                            <FaPencilAlt />
                                        </button>
                                        <button className="admin-action-btn delete-btn" title="Hapus Kursus" onClick={(e) => { e.stopPropagation(); handleDeleteCourse(course.id); }}>
                                            <FaTrash />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </main>
            </div>
        </>
    );
}