import React, { useState } from 'react';
import './MyCoursesPage.css';
import { FaArrowRight, FaCode, FaLaptopCode, FaAws, FaUserShield } from 'react-icons/fa';
import CourseListItem from './CourseListItem.jsx';
import AdminCoursesPage from './AdminCoursesPage.jsx';

const courses = [
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

export default function MyCoursesPage({ marginleft }) {
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [isAdminView, setIsAdminView] = useState(false);

    // Jika isAdminView true, tampilkan halaman admin dan berikan fungsi untuk kembali
    if (isAdminView) {
        return (
            <AdminCoursesPage marginleft={marginleft} onBack={() => setIsAdminView(false)} />
        );
    }

    const handleCardClick = (course) => {
        if (course.available) {
            setSelectedCourseId(course.id);
        } else {
            alert('Kursus ini sedang dalam pengembangan. Silakan periksa kembali nanti.');
        }
    };

    const handleBackToCourseList = () => {
        setSelectedCourseId(null);
    };

    if (selectedCourseId) {
        // Saat ini, komponen akan selalu merender detail kursus yang sama.
        // Langkah selanjutnya adalah melewatkan courseId ke CourseListItem agar bisa menampilkan data yang dinamis.
        return <CourseListItem marginleft={marginleft} onBackToCourseList={handleBackToCourseList} />;
    }

    return (
        <>
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
                <header className="my-courses-header">
                    <h1>My Courses</h1>
                    <p>Lanjutkan perjalanan belajarmu dan tingkatkan keahlianmu di sini.</p>
                </header>
                <main className="courses-container">
                    {courses.map((course, index) => (
                        <div
                            key={course.id}
                            className={`course-card-item ${!course.available ? 'unavailable' : ''}`}
                            onClick={() => handleCardClick(course)}
                            style={{ animationDelay: `${index * 0.1}s` }} // Menambahkan delay agar muncul satu per satu
                        >
                            <div className="course-card-icon" style={{ backgroundColor: course.color }}><course.icon /></div>
                            <div className="course-card-content">
                                <h3>{course.title}</h3>
                                <p>{course.description}</p>
                            </div>
                            <div className="course-card-footer">
                                <span>{course.available ? 'Lanjutkan Belajar' : 'Segera Hadir'}</span>
                                {course.available && <FaArrowRight />}
                            </div>
                        </div>
                    ))}
                </main>
                {/* Tombol navigasi ke halaman admin */}
                <button onClick={() => setIsAdminView(true)} className="admin-nav-button" title="Ke Halaman Admin">
                    <FaUserShield />
                </button>
            </div>
        </>
    );
}