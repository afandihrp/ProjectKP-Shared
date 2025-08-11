import React, { useState, useContext, useEffect } from 'react';
import './MyCoursesPage.css';
import './AdminCoursesPage.css'; // Style untuk modal dan tombol admin
import {
    FaArrowRight, FaCode, FaLaptopCode, FaAws, FaPlus, FaPencilAlt, FaTrash,
    FaBook, FaBrain, FaRocket, FaCloud, FaDatabase
} from 'react-icons/fa';
import CourseListItem from './CourseListItem.jsx';
import CourseEditor from './CourseEditor.jsx';
import { hasPermission } from '../role.js';
import coursesData from './course.json'; // Atau path relatif yang benar
import dataFetch from '../handleFetching.js';
import Icons, { iconMap } from './Icons.jsx'

// Daftar ikon dan warna yang tersedia untuk kursus
// const availableIcons = {
//     FaCode, FaLaptopCode, FaAws, FaBook, FaBrain, FaRocket, FaCloud, FaDatabase
// };

const availableIcons = iconMap;

const availableColors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#6366f1'
];

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
    const [selectedIcon, setSelectedIcon] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [isAvailable, setIsAvailable] = useState(false);

    useEffect(() => {
        if (course) {
            setTitle(course.title);
            setDescription(course.description);
            setSelectedIcon(course.icon);
            setSelectedColor(course.color);
            setIsAvailable(course.available);
        } else {
            // Reset form jika tidak ada kursus (misal, saat modal ditutup)
            setTitle('');
            setDescription('');
            setSelectedIcon('');
            setSelectedColor('');
            setIsAvailable(false);
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
        onSave({ ...course, title, description, icon: selectedIcon, color: selectedColor, available: isAvailable });
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
                    <div className="form-group">
                        <label>Pilih Ikon</label>
                        <div className="icon-selector">
                            {Object.keys(availableIcons).map(iconName => {
                                const IconComponent = availableIcons[iconName];
                                return (
                                    <button
                                        type="button"
                                        key={iconName}
                                        className={`icon-option ${selectedIcon === iconName ? 'selected' : ''}`}
                                        onClick={() => setSelectedIcon(iconName)}
                                        title={iconName}
                                    >
                                        <IconComponent />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Pilih Warna</label>
                        <div className="color-selector">
                            {availableColors.map(color => (
                                <div
                                    key={color}
                                    className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setSelectedColor(color)}
                                    role="button"
                                    aria-label={`Pilih warna ${color}`}
                                    tabIndex={0}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="form-group availability-toggle-group">
                        <label>Ketersediaan Kursus</label>
                        <div className="availability-toggle">
                            <label className="switch">
                                <input 
                                    type="checkbox" 
                                    checked={isAvailable} 
                                    onChange={() => setIsAvailable(prev => !prev)} 
                                />
                                <span className="slider round"></span>
                            </label>
                            <span>{isAvailable ? 'Tersedia untuk Siswa' : 'Disimpan sebagai Draf'}</span>
                        </div>
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
    const [courses, setCourses] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editDetailsModalState, setEditDetailsModalState] = useState({ isOpen: false, course: null });
    const [editingCourse, setEditingCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

   

    useEffect(() => {
        // Simulasi pengambilan data dari file JSON (atau API)
        // Di aplikasi nyata, Anda bisa menggunakan fetch di sini.
        // Karena kita mengimpornya langsung, kita bisa set datanya.
        Promise.resolve().then(async () => {
            const getCoursesRequest = new dataFetch("/course", null, "GET");
            const response = await getCoursesRequest.makeRequest();

            // Periksa apakah ada error atau data bukan array
            if (response.err || !Array.isArray(response.data)) {
                console.error("Gagal mengambil data kursus atau format data salah:", response.data);
                setCourses([]); // Atur ke array kosong untuk menghindari error render
                setIsLoading(false);
                return; // Hentikan eksekusi lebih lanjut
            }

            const coursesFromApi = response.data;
            console.log("Kursus yang diterima dari API:", coursesFromApi);

            setCourses(coursesFromApi);
            setIsLoading(false);
        });

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

        const addCourse = new dataFetch("/course", newCourse, "POST");
        await addCourse.makeRequest().then((response)=>{
            console.log(JSON.stringify(response.data));
        });


        
    };

    const handleSaveCourseDetails = async (updatedCourseData) => {
        // Backend saat ini mengharapkan objek kursus lengkap, bukan hanya
        // field yang diubah. Kita sesuaikan payload di frontend.
        const payload = {
            title: updatedCourseData.title,
            description: updatedCourseData.description,
            icon: updatedCourseData.icon,
            color: updatedCourseData.color,
            available: updatedCourseData.available,
        };

        // Endpoint di backend bersifat case-sensitive (/Course, bukan /course)
        const updateRequest = new dataFetch(`/course/${updatedCourseData.id}`, payload, "PATCH");
        try {
            await updateRequest.makeRequest();
            setCourses(prevCourses => prevCourses.map(c => (c.id === updatedCourseData.id ? updatedCourseData : c)));
            setEditDetailsModalState({ isOpen: false, course: null });
        } catch (error) {
            console.error('Gagal memperbarui detail kursus:', error);
            alert('Gagal menyimpan perubahan. Silakan coba lagi.');
        }
    };

    const handleUpdateCourse = async (updatedCourse) => {
        setCourses(prevCourses => prevCourses.map(c => (c.id === updatedCourse.id ? updatedCourse : c)));
        setEditingCourse(updatedCourse); // Menjaga state editor tetap sinkron
        const updateRequest = new dataFetch(`/course/${updatedCourse.id}`, updatedCourse, "PATCH");
        await updateRequest.makeRequest();
        console.log(`updatedCourse====\n ${JSON.stringify(updatedCourse)}`);
        

    };

    const handleDeleteCourse = (courseId) => {
        // Mencegah penghapusan kursus bawaan untuk demo
        if (['dasar-pemrograman', 'frontend-expert', 'aws-cloud'].includes(courseId)) {
            alert('Kursus bawaan tidak dapat dihapus.');
            return;
        }
        if (window.confirm('Apakah Anda yakin ingin menghapus kursus ini?')) {
            setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
            // Perbaiki endpoint agar case-sensitive sesuai backend (/Course)
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
        return (
            <div className="page-transition-enter">
                <CourseEditor
                    course={editingCourse}
                    onBack={handleBackFromEditor}
                    onUpdateCourse={handleUpdateCourse}
                    marginleft={marginleft}
                />
            </div>
        );
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
        return (
            <div className="page-transition-enter">
                <CourseListItem course={selectedCourse} marginleft={marginleft} onBackToCourseList={handleBackToCourseList} />
            </div>
        );
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
                            <div className="course-card-icon" style={{ backgroundColor: course.color }}><Icons icon={course.icon} /></div>
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