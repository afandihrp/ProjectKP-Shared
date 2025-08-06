import React, { useState, useContext, useEffect } from 'react';
import './CourseEditor.css';
import {
    FaArrowLeft, FaPlus, FaTrash, FaPencilAlt, FaPalette,
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

const EditCourseAppearanceModal = ({ isOpen, onClose, onSave, currentIconName, currentColor }) => {
    const [selectedIcon, setSelectedIcon] = useState(currentIconName);
    const [selectedColor, setSelectedColor] = useState(currentColor);

    React.useEffect(() => {
        if (isOpen) {
            setSelectedIcon(currentIconName);
            setSelectedColor(currentColor);
        }
    }, [currentIconName, currentColor, isOpen]);

    if (!isOpen) return null;

    const handleSave = () => {
        onSave({ icon: selectedIcon, color: selectedColor });
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>Ganti Ikon & Warna Kursus</h2>
                
                <div className="form-group">
                    <label>Pilih Ikon</label>
                    <div className="icon-selector">
                        {Object.keys(availableIcons).map(iconName => {
                            const IconComponent = availableIcons[iconName];
                            return (
                                <button 
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
                            />
                        ))}
                    </div>
                </div>

                <div className="modal-actions">
                    <button type="button" onClick={onClose} className="btn-cancel">Batal</button>
                    <button type="button" onClick={handleSave} className="btn-submit">Simpan</button>
                </div>
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
    const [isAppearanceModalOpen, setIsAppearanceModalOpen] = useState(false);
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
        alert('Perubahan telah disimpan (secara lokal). Untuk penyimpanan permanen, hubungkan ke API.');
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
        const newModule = {
            moduleTitle: moduleTitle,
            lessons: []
        };
        const updatedCourse = {
            ...editedCourse,
            modules: [...editedCourse.modules, newModule]
        };
        setEditedCourse(updatedCourse);
        // onUpdateCourse(updatedCourse); // Dihapus: Perubahan akan disimpan sekaligus
        //setIsAddModuleModalOpen(false); // Tutup modal setelah berhasil
        const addModule = new dataFetch(`/modules/${id}`, newModule, "PATCH");
                await addModule.makeRequest().then((response)=>{
                    console.log(JSON.stringify(response.data));
                });
    };

    const handleDeleteModule = (e, moduleIndex) => {
        e.stopPropagation();
        const moduleTitle = editedCourse.modules[moduleIndex].moduleTitle;
        if (window.confirm(`Apakah Anda yakin ingin menghapus modul "${moduleTitle}"?`)) {
            const updatedModules = editedCourse.modules.filter((_, idx) => idx !== moduleIndex);
            const updatedCourse = { ...editedCourse, modules: updatedModules };
            setEditedCourse(updatedCourse);
            // onUpdateCourse(updatedCourse); // Dihapus: Perubahan akan disimpan sekaligus
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

    const handleUpdateAppearance = ({ icon, color }) => {
        const updatedCourse = { ...editedCourse, icon, color };
        setEditedCourse(updatedCourse);
        // onUpdateCourse(updatedCourse); // Dihapus: Perubahan akan disimpan sekaligus
    };

    const handleAvailabilityToggle = () => {
        const updatedCourse = { ...editedCourse, available: !editedCourse.available };
        setEditedCourse(updatedCourse);
        // onUpdateCourse(updatedCourse); // Dihapus: Perubahan akan disimpan sekaligus
    };

    const handleDeleteLesson = (e, moduleIndex, lessonIndex) => {
        e.stopPropagation();
        const lessonTitle = editedCourse.modules[moduleIndex].lessons[lessonIndex].title;
        if (window.confirm(`Apakah Anda yakin ingin menghapus materi "${lessonTitle}"?`)) {
            const updatedModules = editedCourse.modules.map((mod, idx) => {
                if (idx === moduleIndex) {
                    const updatedLessons = mod.lessons.filter((_, lIdx) => lIdx !== lessonIndex);
                    return { ...mod, lessons: updatedLessons };
                }
                return mod;
            });
            const updatedCourse = { ...editedCourse, modules: updatedModules };
            setEditedCourse(updatedCourse);
            // onUpdateCourse(updatedCourse); // Dihapus: Perubahan akan disimpan sekaligus
        }
    };

    const handleStartEditLesson = (e, moduleIndex, lessonIndex) => {
        e.stopPropagation();
        setEditingLessonIndices({ moduleIndex, lessonIndex });
    };

    const handleSaveLesson = (updatedLessonData) => {
        const { moduleIndex, lessonIndex } = editingLessonIndices;
        
        const updatedCourse = JSON.parse(JSON.stringify(editedCourse));
        updatedCourse.modules[moduleIndex].lessons[lessonIndex] = updatedLessonData;

        setEditedCourse(updatedCourse);
        // onUpdateCourse(updatedCourse); // Dihapus: Perubahan akan disimpan sekaligus
        setEditingLessonIndices(null); // Kembali ke tampilan editor kursus
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
            <EditCourseAppearanceModal
                isOpen={isAppearanceModalOpen}
                onClose={() => setIsAppearanceModalOpen(false)}
                onSave={handleUpdateAppearance}
                currentIconName={editedCourse.icon}
                currentColor={editedCourse.color}
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
                            <button className="action-btn edit-appearance-btn" title="Ganti Ikon & Warna" onClick={() => setIsAppearanceModalOpen(true)}>
                                <FaPalette />
                            </button>
                        </div>
                    </div>
                    <div className="editor-header-actions">
                        <div className="availability-toggle">
                            <label htmlFor="course-availability">
                                {editedCourse.available ? 'Tersedia' : 'Draf'}
                            </label>
                            <label className="switch">
                                <input id="course-availability" type="checkbox" checked={editedCourse.available} onChange={handleAvailabilityToggle} />
                                <span className="slider round"></span>
                            </label>
                        </div>
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
