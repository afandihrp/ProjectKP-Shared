import React, { useState, useMemo } from 'react';
import './CourseListItem.css';
import { CgChevronDown, CgChevronUp } from "react-icons/cg";
import { FaArrowLeft, FaCheckCircle, FaLock, FaPlayCircle } from 'react-icons/fa';
import PythonCompiler from './PythonCompiler.jsx';

const courseData = {
  courseTitle: 'Jalur Belajar Dasar Pemrograman',
  courseDescription: 'Mulai perjalanan Anda di dunia coding dengan mempelajari tiga pilar fundamental: Bahasa C untuk logika, Python untuk aplikasi serbaguna, dan Web Development untuk membangun situs interaktif.',
  modules: [
    {
      moduleTitle: 'Python untuk Pemula',
      lessons: [
        {
          title: 'Selamat Datang di Dunia Python!',
          subtitle: 'Bahasa yang Mudah Dibaca.',
          content: 'Mengenal keunggulan Python, melakukan instalasi, dan menulis program pertama Anda dengan sintaks yang bersih.',
          hasCompiler: true
        },
        {
          title: 'Sintaks Dasar Python',
          subtitle: 'Variabel Dinamis dan Operasi.',
          content: 'Mempelajari variabel tanpa deklarasi tipe, operasi string, dan cara menerima input dari pengguna.'
        },
        {
          title: 'Struktur Data Intuitif',
          subtitle: 'List, Tuple, dan Dictionary.',
          content: 'Menguasai struktur data bawaan Python yang powerful seperti List, Tuple, dan Dictionary untuk mengorganisir data.'
        },
        {
          title: 'Logika dan Perulangan',
          subtitle: 'Mengontrol Alur dengan Mudah.',
          content: 'Menerapkan logika kondisional (if-elif-else) dan perulangan (for, while) dengan sintaks Python yang ekspresif.'
        }
      ]
    },
    {
      moduleTitle: 'Bahasa C untuk logika pemograman',
      lessons: [
        {
          title: 'Pengenalan dan Persiapan',
          subtitle: 'Memulai dengan Bahasa C.',
          content: "Mempelajari sejarah, keunggulan, dan cara menyiapkan lingkungan pengembangan untuk Bahasa C, diakhiri dengan program 'Hello, World!'."
        },
        {
          title: 'Variabel, Tipe Data, dan Operator',
          subtitle: 'Blok Bangunan Dasar Program.',
          content: 'Memahami cara menyimpan data dengan variabel, berbagai tipe data dasar, serta melakukan operasi matematika dan logika.'
        },
        {
          title: 'Kontrol Alur Program (Logic)',
          subtitle: "Membuat Program 'Pintar'.",
          content: 'Mengontrol bagaimana program berjalan menggunakan percabangan (if-else, switch) dan perulangan (for, while).'
        },
        {
          title: 'Array dan String',
          subtitle: 'Mengelola Kumpulan Data.',
          content: 'Belajar menggunakan Array untuk menyimpan banyak data sejenis dan memahami String sebagai array karakter.'
        },
        {
          title: 'Function dan Pointer',
          subtitle: 'Kode Modular dan Akses Memori.',
          content: 'Menulis fungsi untuk kode yang bisa dipakai ulang dan pengenalan konsep pointer yang menjadi ciri khas Bahasa C.'
        }
      ]
    },
    {
      moduleTitle: 'Dasar-Dasar Web Development',
      lessons: [
        {
          title: 'HTML: Kerangka Website',
          subtitle: 'Membangun Struktur Halaman Web.',
          content: 'Mempelajari tag-tag fundamental HTML untuk membuat struktur konten, dari teks dan gambar hingga form dan tabel.'
        },
        {
          title: 'CSS: Menghias Website',
          subtitle: 'Memberi Gaya dan Tampilan Visual.',
          content: 'Menggunakan CSS untuk mengatur warna, font, layout, dan memahami konsep penting seperti Box Model dan Flexbox.'
        },
        {
          title: 'JavaScript: Membuat Website Interaktif',
          subtitle: 'Menambahkan Logika ke Halaman Web.',
          content: 'Pengenalan JavaScript untuk memanipulasi elemen HTML (DOM), merespons aksi pengguna (events), dan membuat website lebih hidup.'
        },
        {
            title: 'Proyek Akhir: Halaman Portofolio',
            subtitle: 'Menggabungkan Semua Pilar Web.',
            content: 'Menggabungkan HTML, CSS, dan JavaScript untuk membangun sebuah halaman portofolio pribadi yang sederhana namun fungsional.'
        }
      ]
    }
  ]
};

export default function CourseListItem(props) {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'lesson'
  const [activeLesson, setActiveLesson] = useState(null);
  const [openModuleIndex, setOpenModuleIndex] = useState(0); // Modul pertama terbuka secara default
  const [completedLessons, setCompletedLessons] = useState(new Set());

  // Create a flat array of all lessons for easier navigation and progress tracking
  const allLessons = useMemo(() => courseData.modules.flatMap(m => m.lessons), []);

  const isLessonUnlocked = (lesson) => {
    const lessonIndex = allLessons.findIndex(l => l.title === lesson.title);
    // The very first lesson is always unlocked
    if (lessonIndex === 0) return true;
    // Any other lesson is unlocked if the previous one has been completed
    const previousLesson = allLessons[lessonIndex - 1];
    return completedLessons.has(previousLesson.title);
  };

  const getNextLesson = () => {
    if (!activeLesson) return null;
    const currentIndex = allLessons.findIndex(l => l.title === activeLesson.title);
    if (currentIndex < allLessons.length - 1) {
      return allLessons[currentIndex + 1];
    }
    return null; // This is the last lesson
  };

  const handleLessonClick = (lesson) => {
    if (isLessonUnlocked(lesson)) {
      setActiveLesson(lesson);
      setCurrentView('lesson');
    }
  };

  const handleCompleteAndReturn = () => {
    if (!activeLesson) return;

    // Mark current lesson as complete if it's not already
    if (!completedLessons.has(activeLesson.title)) {
      const newCompleted = new Set(completedLessons);
      newCompleted.add(activeLesson.title);
      setCompletedLessons(newCompleted);
    }

    // Check if it was the last lesson to show a completion message
    const nextLesson = getNextLesson();
    if (!nextLesson) {
      alert('Selamat! Anda telah menyelesaikan kursus ini.');
    }
    handleBackToList(); // Go back to the list view
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setActiveLesson(null);
  };

  return (
    <>
      <style>{`
        .module > h3 {
          /* Menggunakan Flexbox untuk layout yang stabil */
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          /* Menetapkan tinggi minimum untuk mengakomodasi 2 baris teks,
             agar ukuran kartu tidak berubah tinggi saat judulnya panjang dan harus wrap. */
          min-height: 3.5rem;
        }
        /* Menghapus panah duplikat yang dibuat oleh file CSS eksternal */
        .module > h3::after {
          content: none;
        }
        .module > h3:hover {
          background-color: #f4f4f5;
        }
        .module > h3 > span {
          /* Memberi ruang antara judul dan ikon panah */
          margin-right: 1rem;
          /* flex-grow agar judul mengambil sisa ruang yang tersedia */
          flex-grow: 1;
        }
        .lesson-list li {
          display: flex;
          align-items: center;
        }
        .lesson-item-left {
          display: flex;
          align-items: center;
          gap: 0.75rem; /* Jarak antara ikon dan teks */
        }
        .lesson-list li.locked {
          cursor: not-allowed;
          color: #9ca3af;
        }
        .lesson-icon {
          flex-shrink: 0;
          width: 1rem;
          height: 1rem;
        }
        .lesson-icon.completed {
          color: #10b981; /* green-500 */
        }
        .lesson-icon.locked {
          color: #9ca3af; /* gray-400 */
        }
        .lesson-icon.todo {
          color: #6b7280; /* gray-500 */
        }
        .module-header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .module-progress {
          font-size: 0.8rem;
          font-weight: 600;
          color: #3b82f6;
          background-color: #eff6ff;
          padding: 0.2rem 0.6rem;
          border-radius: 20px;
        }
        .module-progress-text {
          font-size: 0.8rem;
          color: #6b7280; /* gray-500 */
          font-weight: 400;
        }
        .course-header .back-button-wrapper {
            margin-bottom: 1rem;
        }
        .course-header .back-button {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: none;
            border: none;
            color: #3b82f6;
            font-weight: 600;
            cursor: pointer;
            padding: 0.25rem 0;
            font-size: 0.9rem;
        }
        .compiler-task-wrapper {
            margin-top: 2rem;
            padding-top: 1.5rem;
            border-top: 1px solid #e5e7eb; /* gray-200 */
        }
        .compiler-task-wrapper h3 {
            margin-bottom: 0.5rem;
        }
        .compiler-task-wrapper p {
            margin-bottom: 1.5rem;
            font-size: 0.95rem;
            color: #4b5563; /* gray-600 */
        }
      `}</style>
      <div className="course-page" style={{ marginLeft: props.marginleft+'px'}}>
      <header className="course-header">
        {props.onBackToCourseList && (
            <div className="back-button-wrapper">
                <button onClick={props.onBackToCourseList} className="back-button">
                    <FaArrowLeft /> Kembali ke Semua Kursus
                </button>
            </div>
        )}
        <h1>{courseData.courseTitle}</h1>
        <p>{courseData.courseDescription}</p>
      </header>

      <main className="course-main">
        <section className="course-content">
          {currentView === 'list' && (
            <div className="modules-container">
              <h2>Materi Pembelajaran</h2>
              {courseData.modules.map((module, moduleIndex) => {
                const isOpen = openModuleIndex === moduleIndex;
                const completedInModule = module.lessons.filter(l => completedLessons.has(l.title)).length;
              const progressText = `${completedInModule} / ${module.lessons.length} lessons`;
                const progress = module.lessons.length > 0 ? Math.round((completedInModule / module.lessons.length) * 100) : 0;

                return (
                  <div key={moduleIndex} className={`module ${isOpen ? 'open' : ''}`}>
                    <h3 onClick={() => setOpenModuleIndex(isOpen ? null : moduleIndex)}>
                      <span>{module.moduleTitle}</span>
                      <div className="module-header-right">
                      <span className="module-progress-text">{progressText}</span>
                        {progress > 0 && <span className="module-progress">{progress}%</span>}
                        {isOpen ? <CgChevronUp /> : <CgChevronDown />}
                      </div>
                    </h3>
                    <ul className="lesson-list">
                      {module.lessons.map((lesson, lessonIndex) => {
                        const unlocked = isLessonUnlocked(lesson);
                        return (
                          <li key={lessonIndex} onClick={() => handleLessonClick(lesson)} className={!unlocked ? 'locked' : ''}>
                            <div className="lesson-item-left">
                              {completedLessons.has(lesson.title) ? (
                                <FaCheckCircle className="lesson-icon completed" />
                              ) : !unlocked ? (
                                <FaLock className="lesson-icon locked" />
                              ) : (
                                <FaPlayCircle className="lesson-icon todo" />
                              )}
                              <span>{lesson.title}</span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}

          {currentView === 'lesson' && activeLesson && (
            <div className="lesson-page-view">
              <div className="lesson-header">
                <button onClick={handleBackToList} className="back-button">← Kembali ke Daftar Modul</button>
                <h2>{activeLesson.title}</h2>
                <h4>{activeLesson.subtitle}</h4>
              </div>
              <div className="lesson-content-body">
                <p>{activeLesson.content}</p>
                {activeLesson.hasCompiler && (
                  <div className="compiler-task-wrapper">
                    <h3>Latihan Praktik: Jalankan Kode Pertamamu</h3>
                    <p>
                      Gunakan compiler di bawah ini untuk menjalankan kode Python. Coba ubah pesan di dalam <code>print()</code> dan lihat hasilnya!
                    </p>
                    {/* Compiler sudah berada di dalam container yang memiliki margin, jadi kita beri nilai 0 */}
                    <PythonCompiler marginleft={0} />
                  </div>
                )}
              </div>
              <div className="lesson-footer">
                <button className="lesson-nav-button" onClick={handleCompleteAndReturn}>
                  Tandai Selesai & Kembali
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
    </>
  );
}