import React, { useState } from 'react';
import './MyCoursesPage.css'; // Menggunakan kembali style dari MyCoursesPage
import './AdminCoursesPage.css'; // Style khusus untuk halaman admin
import { FaCode, FaLaptopCode, FaAws, FaPlus, FaArrowLeft } from 'react-icons/fa';

// Data awal sebagai contoh
const initialCourses = [
    {
        id: 'dasar-pemrograman',
        title: 'Jalur Belajar Dasar Pemrograman',
        description: 'Mulai perjalanan Anda di dunia coding dengan mempelajari tiga pilar fundamental: C, Python, dan Web Development.',
        icon: FaCode,
        color: '#3b82f6',
        available: true,
    },
    {
        id: 'frontend-expert',
        title: 'Menjadi Front-End Web Developer Expert',
        description: 'Belajar membuat website yang responsif dan interaktif dengan teknologi terkini seperti React dan Vue.',
        icon: FaLaptopCode,
        color: '#10b981',
        available: false,
    },
    {
        id: 'aws-cloud',
        title: 'Cloud Practitioner Essentials (Belajar Dasar AWS Cloud)',
        description: 'Pahami konsep dasar cloud computing dan layanan-layanan utama dari Amazon Web Services.',
        icon: FaAws,
        color: '#f59e0b',
        available: false,
    }
];

// Komponen Modal untuk menambah kursus
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

export default function AdminCoursesPage({ marginleft, onBack }) {
    const [courses, setCourses] = useState(initialCourses);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddCourse = (newCourseData) => {
        const newCourse = {
            id: newCourseData.title.toLowerCase().replace(/\s+/g, '-').slice(0, 50), // Membuat id sederhana dari judul
            title: newCourseData.title,
            description: newCourseData.description,
            icon: FaCode, // Ikon default
            color: '#64748b', // Warna default
            available: true, // Kursus baru langsung tersedia
        };
        setCourses(prevCourses => [...prevCourses, newCourse]);
    };

    return (
        <>
            <AddCourseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddCourse={handleAddCourse}
            />
            <div className="my-courses-page" style={{ marginLeft: `${marginleft}px` }}>
                <header className="my-courses-header admin-header">
                    <div className="admin-header-main">
                        {onBack && (
                            <button onClick={onBack} className="back-to-student-view-btn" title="Kembali ke Tampilan Siswa">
                                <FaArrowLeft />
                            </button>
                        )}
                        <div>
                            <h1>Kelola Kursus - Mode Admin</h1>
                            <p>Tambah, edit, atau hapus kursus yang tersedia untuk siswa.</p>
                        </div>
                    </div>
                    <button className="add-course-btn" onClick={() => setIsModalOpen(true)}>
                        <FaPlus /> Tambah Kursus Baru
                    </button>
                </header>
                <main className="courses-container">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className={`course-card-item ${!course.available ? 'unavailable' : ''}`}
                        >
                            <div className="course-card-icon" style={{ backgroundColor: course.color }}><course.icon /></div>
                            <div className="course-card-content">
                                <h3>{course.title}</h3>
                                <p>{course.description}</p>
                            </div>
                            <div className="course-card-footer">
                                <span>{course.available ? 'Tersedia' : 'Segera Hadir'}</span>
                                {/* Di masa depan, tombol Edit/Hapus bisa ditambahkan di sini */}
                            </div>
                        </div>
                    ))}
                </main>
            </div>
        </>
    );
}