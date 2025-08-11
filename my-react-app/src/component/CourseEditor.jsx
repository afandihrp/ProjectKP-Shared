import React, { useState, useContext, useEffect } from 'react';
import './CourseEditor.css';
import {
    FaArrowLeft, FaPlus, FaTrash, FaPencilAlt,
    FaCode, FaLaptopCode, FaAws, FaBook, FaBrain, FaRocket, FaCloud, FaDatabase
} from 'react-icons/fa';
import { CgChevronDown, CgChevronUp, CgCheckO } from 'react-icons/cg';
import LessonEditor from './LessonEditor.jsx';
import dataFetch from '../handleFetching.js';
import { userInfo } from '../App.jsx';
const availableIcons = {
    FaCode, FaLaptopCode, FaAws, FaBook, FaBrain, FaRocket, FaCloud, FaDatabase
};

const availableColors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#6366f1'
];


const AddModuleModal = ({ isOpen, onClose, onAddModule }) => {
    const [title, setTitle] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            return;
        }
        onAddModule(title.trim());
        setTitle('');
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>Tambah Modul Baru</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="module-title">Judul Modul</label>
                        <input
                            type="text"
                            id="module-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Contoh: Pengenalan React"
                            required
                            autoFocus
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-cancel">Batal</button>
                        <button type="submit" className="btn-submit">Tambah Modul</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const EditModuleModal = ({ isOpen, onClose, onEditModule, currentTitle }) => {
    const [title, setTitle] = useState(currentTitle);

    // Update state jika prop berubah (saat modal dibuka untuk item lain)
    React.useEffect(() => {
        setTitle(currentTitle);
    }, [currentTitle]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            return;
        }
        onEditModule(title.trim());
        onClose(); // Tutup modal setelah submit
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>Edit Judul Modul</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="module-title-edit">Judul Modul</label>
                        <input type="text" id="module-title-edit" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Contoh: Dasar-dasar Python" required autoFocus />
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

export default function CourseEditor({ course, onBack, onUpdateCourse, marginleft }) {
    // Gunakan deep copy untuk state awal agar tidak ada mutasi tak terduga
    const [editedCourse, setEditedCourse] = useState(() => JSON.parse(JSON.stringify(course)));
    const [openModuleIndex, setOpenModuleIndex] = useState(0); // Buka modul pertama by default
    // State ini sekarang hanya menyimpan index dari materi yang diedit
    const [editingLessonIndices, setEditingLessonIndices] = useState(null); // { moduleIndex, lessonIndex }
    const [isAddModuleModalOpen, setIsAddModuleModalOpen] = useState(false);
    const [editModuleModalState, setEditModuleModalState] = useState({ isOpen: false, moduleIndex: null, currentTitle: '' });    
    const {id,name,phoneNumber,profileImage,role} = useContext(userInfo);
    // Fungsi untuk menangani tombol kembali, dengan peringatan jika ada perubahan yang belum disimpan
    const handleBack = () => {
        const originalCourseString = JSON.stringify(course);
        const editedCourseString = JSON.stringify(editedCourse);
        if (originalCourseString !== editedCourseString) {
            if (window.confirm("Anda memiliki perubahan yang belum disimpan. Apakah Anda yakin ingin kembali? Perubahan akan hilang.")) {
                onBack();
            }
        } else {
            onBack();
        }
    };

    // Fungsi untuk "menyimpan" semua perubahan sekaligus
    const handleSaveChanges = () => {
        onUpdateCourse(editedCourse);
        console.log(`updatedCourse====\n ${JSON.stringify(editedCourse)}`);
        onBack(); // Kembali ke daftar kursus setelah menyimpan
    };

    const handleAddLesson = (moduleIndex) => {
        const newLesson = {
            title: "",
            subtitle: "",
            content: "",
            tasks: []
        };

        // Buat salinan baru dari state untuk dimodifikasi
        const updatedCourse = JSON.parse(JSON.stringify(editedCourse));
        const targetModule = updatedCourse.modules[moduleIndex];
        if (!targetModule.lessons) {
            targetModule.lessons = [];
        }
        targetModule.lessons.push(newLesson);

        // Update state komponen dan parent
        setEditedCourse(updatedCourse);
        // onUpdateCourse(updatedCourse); // Dihapus: Perubahan akan disimpan sekaligus

        // Langsung buka editor untuk materi yang baru dibuat
        const newLessonIndex = targetModule.lessons.length - 1;
        setEditingLessonIndices({
            moduleIndex,
            lessonIndex: newLessonIndex,
        });
    };

    const handleAddModule = async (moduleTitle) => {
        const payload = { moduleTitle };
        // Gunakan ID dari course yang sedang diedit
        const endpoint = `/Course/modules/${editedCourse.id}/add_module_title`;
        const addModuleRequest = new dataFetch(endpoint, payload, "PATCH");

        try {
            const response = await addModuleRequest.makeRequest();
            // Backend sekarang mengembalikan { modules: [...] } jika berhasil
            if (response.err || !response.data.modules) {
                throw new Error(response.data || 'Gagal menambahkan modul atau respons dari server tidak valid.');
            }

            // Ambil daftar modul terbaru dari respons backend
            const updatedModules = response.data.modules;

            // Perbarui state lokal dengan data yang sinkron dari database
            setEditedCourse(prevCourse => ({
                ...prevCourse,
                modules: updatedModules
            }));

            alert('Modul berhasil ditambahkan!');
        } catch (error) {
            console.error("Error adding module:", error);
            alert(`Gagal menambahkan modul: ${error.message}`);
        }
    };

    const handleDeleteModule = async (e, moduleIndex) => {
        e.stopPropagation();
        const moduleToDelete = editedCourse.modules[moduleIndex];
        if (!moduleToDelete) return;

        if (window.confirm(`Apakah Anda yakin ingin menghapus modul "${moduleToDelete.moduleTitle}"?`)) {
            const courseId = editedCourse.id;
            const moduleIdToDelete = moduleToDelete.id;
            
            const endpoint = `/Course/modules/${courseId}/delete_module_title`;
            const payload = { id: moduleIdToDelete };
            const deleteRequest = new dataFetch(endpoint, payload, "PATCH");

            try {
                const response = await deleteRequest.makeRequest();
                if (response.err || !response.data.modules) {
                    throw new Error(response.data || 'Gagal menghapus modul.');
                }

                // Perbarui state dengan data baru yang sinkron dari server
                setEditedCourse(prevCourse => ({
                    ...prevCourse,
                    modules: response.data.modules
                }));

                alert('Modul berhasil dihapus.');
            } catch (error) {
                console.error("Error deleting module:", error);
                alert(`Gagal menghapus modul: ${error.message}`);
            }
        }
    };

    const handleOpenEditModuleModal = (e, moduleIndex) => {
        e.stopPropagation();
        setEditModuleModalState({
            isOpen: true,
            moduleIndex,
            currentTitle: editedCourse.modules[moduleIndex].moduleTitle
        });
    };

    const handleConfirmEditModule = (newTitle) => {
        const { moduleIndex } = editModuleModalState;
        const updatedModules = editedCourse.modules.map((mod, idx) => {
            if (idx === moduleIndex) {
                return { ...mod, moduleTitle: newTitle };
            }
            return mod;
        });
        const updatedCourse = { ...editedCourse, modules: updatedModules };
        setEditedCourse(updatedCourse);
        // onUpdateCourse(updatedCourse); // Dihapus: Perubahan akan disimpan sekaligus
    };

    const handleDeleteLesson = async (e, moduleIndex, lessonIndex) => {
        e.stopPropagation();
        const lessonTitle = editedCourse.modules[moduleIndex].lessons[lessonIndex].title || "Materi Baru";
        if (window.confirm(`Apakah Anda yakin ingin menghapus materi "${lessonTitle}"?`)) {
            // Buat objek kursus yang diperbarui secara immutable
            const updatedModules = editedCourse.modules.map((mod, idx) => {
                if (idx === moduleIndex) {
                    // Hapus materi dari array 'lessons' di modul yang sesuai
                    const updatedLessons = mod.lessons.filter((_, lIdx) => lIdx !== lessonIndex);
                    return { ...mod, lessons: updatedLessons };
                }
                return mod;
            });
            const updatedCourse = { ...editedCourse, modules: updatedModules };

            // 1. Update state lokal agar UI langsung merespons dan menghapus materi dari tampilan
            setEditedCourse(updatedCourse);

            try {
                // 2. Panggil onUpdateCourse yang akan mengirim seluruh objek 'updatedCourse' ke backend via PATCH
                await onUpdateCourse(updatedCourse);
            } catch (error) {
                console.error("Gagal menghapus materi:", error);
                alert("Terjadi kesalahan saat menyimpan perubahan ke server. Silakan coba lagi.");
            }
        }
    };

    const handleStartEditLesson = (e, moduleIndex, lessonIndex) => {
        e.stopPropagation();
        setEditingLessonIndices({ moduleIndex, lessonIndex });
    };

    const handleSaveLesson = async (updatedLessonData) => {
        const { moduleIndex, lessonIndex } = editingLessonIndices;
        
        const updatedCourse = JSON.parse(JSON.stringify(editedCourse)); // Deep copy
        updatedCourse.modules[moduleIndex].lessons[lessonIndex] = updatedLessonData;

        // Update state lokal agar UI responsif
        setEditedCourse(updatedCourse);

        try {
            // Panggil fungsi update dari parent (MyCoursesPage) yang akan mengirim
            // seluruh objek kursus ke backend.
            await onUpdateCourse(updatedCourse);
            alert('Materi berhasil disimpan.');
            setEditingLessonIndices(null); // Kembali ke editor kursus
        } catch (error) {
            console.error("Gagal menyimpan materi:", error);
            alert("Terjadi kesalahan saat menyimpan materi. Silakan coba lagi.");
        }
    };

    const CourseIcon = availableIcons[editedCourse.icon] || FaCode;

    if (editingLessonIndices) {
        const { moduleIndex, lessonIndex } = editingLessonIndices;
        const lesson = editedCourse.modules[moduleIndex].lessons[lessonIndex];
        return (
            <LessonEditor
                lesson={lesson}
                onSave={handleSaveLesson}
                onBack={() => setEditingLessonIndices(null)}
                marginleft={marginleft}
            />
        );
    }

    return (
        <>
            <AddModuleModal
                isOpen={isAddModuleModalOpen}
                onClose={() => setIsAddModuleModalOpen(false)}
                onAddModule={handleAddModule}
            />
            <EditModuleModal
                isOpen={editModuleModalState.isOpen}
                onClose={() => setEditModuleModalState({ isOpen: false, moduleIndex: null, currentTitle: '' })}
                onEditModule={handleConfirmEditModule}
                currentTitle={editModuleModalState.currentTitle}
            />
            <div className="course-editor-page" style={{ marginLeft: `${marginleft}px` }}>
                <header className="course-editor-header">
                    <div>
                        <button onClick={handleBack} className="back-button">
                            <FaArrowLeft /> Kembali ke Daftar Kursus
                        </button>
                        <div className="editor-title-container">
                            <div className="course-icon-display" style={{ backgroundColor: editedCourse.color }}>
                                <CourseIcon />
                            </div>
                            <div>
                                <h1>{editedCourse.title}</h1>
                                <p>Mode Kustomisasi</p>
                            </div>
                        </div>
                    </div>
                    <div className="editor-header-actions">
                        <button className="add-module-btn" onClick={() => setIsAddModuleModalOpen(true)}>
                            <FaPlus /> Tambah Modul
                        </button>
                        <button className="save-changes-btn" onClick={handleSaveChanges}>
                            <CgCheckO /> Simpan Perubahan
                        </button>
                    </div>
                </header>
                <main className="editor-container">
                    {editedCourse.modules && editedCourse.modules.length > 0 ? (
                        editedCourse.modules.map((module, moduleIndex) => (
                            <div key={moduleIndex} className={`module-editor-card ${openModuleIndex === moduleIndex ? 'open' : ''}`}>
                                <div className="module-editor-header" onClick={() => setOpenModuleIndex(openModuleIndex === moduleIndex ? null : moduleIndex)}>
                                    <div className="module-title-section">
                                        {openModuleIndex === moduleIndex ? <CgChevronUp /> : <CgChevronDown />}
                                        <h3>{module.moduleTitle}</h3>
                                    </div>
                                    <div className="module-actions">
                                        <button className="action-btn edit" title="Edit Modul" onClick={(e) => handleOpenEditModuleModal(e, moduleIndex)}><FaPencilAlt /></button>
                                        <button className="action-btn delete" title="Hapus Modul" onClick={(e) => handleDeleteModule(e, moduleIndex)}><FaTrash /></button>
                                    </div>
                                </div>
                                
                                {openModuleIndex === moduleIndex && (
                                    <div className="lessons-editor-section">
                                        {module.lessons.map((lesson, lessonIndex) => (
                                            <div key={lessonIndex} className="lesson-editor-item">
                                                <span>{lesson.title}</span>
                                                <div className="lesson-actions">
                                                    <button className="action-btn edit" title="Edit Materi" onClick={(e) => handleStartEditLesson(e, moduleIndex, lessonIndex)}><FaPencilAlt /></button>
                                                    <button className="action-btn delete" title="Hapus Materi" onClick={(e) => handleDeleteLesson(e, moduleIndex, lessonIndex)}><FaTrash /></button>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="add-lesson-wrapper">
                                            <button className="add-lesson-btn" onClick={() => handleAddLesson(moduleIndex)}>
                                                <FaPlus /> Tambah Materi (Sub-Modul)
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="no-modules-placeholder">
                            <p>Kursus ini belum memiliki modul. Mulai dengan menambahkan modul pertama.</p>
                        </div>
                    )}
                </main>
            </div>
            <style>{`
                .save-changes-btn {
                    background-color: #16a34a; /* green-600 */
                    color: white;
                    padding: 0.6rem 1.2rem;
                    border: none;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: background-color 0.2s ease;
                }
                .save-changes-btn:hover {
                    background-color: #15803d; /* green-700 */
                }
                .save-changes-btn svg {
                    font-size: 1.2rem;
                }
            `}</style>
        </>
    );
}
