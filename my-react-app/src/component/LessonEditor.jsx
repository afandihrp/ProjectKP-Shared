import React, { useState, useContext, useEffect } from 'react';
import './LessonEditor.css';
import './AdminCoursesPage.css'; // Untuk style modal
import { FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';
import dataFetch from '../handleFetching.js';
import { tokenAPI } from '../App.jsx';

const AddTaskModal = ({ isOpen, onClose, onAddTask }) => {
    const [selectedType, setSelectedType] = useState('multiple-choice');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddTask(selectedType);
        onClose();
    };

    const taskTypes = [
        { id: 'multiple-choice', title: 'Pilihan Ganda', description: 'Siswa memilih satu jawaban benar dari beberapa opsi.' },
        { id: 'essay', title: 'Esai', description: 'Siswa menulis jawaban dalam bentuk teks panjang.' },
        { id: 'compiler', title: 'Latihan Kode', description: 'Siswa dapat menulis dan menjalankan kode secara langsung.' }
    ];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>Pilih Tipe Tugas Baru</h2>
                <form onSubmit={handleSubmit}>
                    <div className="task-type-selector">
                        {taskTypes.map(type => (
                            <div
                                key={type.id}
                                className={`task-type-option ${selectedType === type.id ? 'selected' : ''}`}
                                onClick={() => setSelectedType(type.id)}
                            >
                                <h4>{type.title}</h4>
                                <p>{type.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="btn-cancel">Batal</button>
                        <button type="submit" className="btn-submit">Tambah Tugas</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default function LessonEditor({ lesson, onSave, onBack, marginleft }) {
    const [editedLesson, setEditedLesson] = useState(() => JSON.parse(JSON.stringify(lesson)));
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedLesson(prev => ({ ...prev, [name]: value }));
    };

    const handleTaskChange = (taskIndex, e) => {
        const { name, value } = e.target;
        setEditedLesson(prev => {
            const newTasks = [...prev.tasks];
            newTasks[taskIndex] = { ...newTasks[taskIndex], [name]: value };
            return { ...prev, tasks: newTasks };
        });
    };

    const handleTaskOptionChange = (taskIndex, optionIndex, e) => {
        const { value } = e.target;
        setEditedLesson(prev => {
            const newTasks = [...prev.tasks];
            const newOptions = [...newTasks[taskIndex].options];
            newOptions[optionIndex] = value;
            newTasks[taskIndex] = { ...newTasks[taskIndex], options: newOptions };
            return { ...prev, tasks: newTasks };
        });
    };

    const handleAddOption = (taskIndex) => {
        setEditedLesson(prev => {
            const newTasks = [...prev.tasks];
            const task = newTasks[taskIndex];
            // Batasi jumlah pilihan hingga 5
            if (task.options.length < 5) {
                const newOptions = [...task.options, '']; // Tambah pilihan kosong baru
                newTasks[taskIndex] = { ...task, options: newOptions };
            }
            return { ...prev, tasks: newTasks };
        });
    };

    const handleRemoveOption = (taskIndex, optionIndex) => {
        setEditedLesson(prev => {
            const newTasks = [...prev.tasks];
            const task = newTasks[taskIndex];

            // Pertahankan minimal 2 pilihan
            if (task.options.length <= 2) return prev;

            const removedOption = task.options[optionIndex];
            const newOptions = task.options.filter((_, i) => i !== optionIndex);

            // Jika pilihan yang dihapus adalah jawaban yang benar, reset jawaban benar
            const newCorrectAnswer = (removedOption === task.correctAnswer) ? '' : task.correctAnswer;

            newTasks[taskIndex] = { ...task, options: newOptions, correctAnswer: newCorrectAnswer };
            return { ...prev, tasks: newTasks };
        });
    };

    const handleDeleteTask = (taskIndex) => {
        if (!window.confirm('Apakah Anda yakin ingin menghapus tugas ini?')) return;
        setEditedLesson(prev => ({
            ...prev,
            tasks: prev.tasks.filter((_, i) => i !== taskIndex)
        }));
    };

    const handleConfirmAddTask = (type) => {
        if (!type) return;

        let newTask;
        switch (type) {
            case 'multiple-choice':
                newTask = { id: `task-mcq-${Date.now()}`, type, prompt: '', options: ['', ''], correctAnswer: '' };
                break;
            case 'essay':
                newTask = { id: `task-essay-${Date.now()}`, type, prompt: '' };
                break;
            case 'compiler':
                newTask = { id: `task-compiler-${Date.now()}`, type, prompt: '' };
                break;
            default:
                return;
        }

        setEditedLesson(prev => ({
            ...prev,
            tasks: [...(prev.tasks || []), newTask]
        }));
        setIsAddTaskModalOpen(false);
    };

    return (
        <>
            <AddTaskModal
                isOpen={isAddTaskModalOpen}
                onClose={() => setIsAddTaskModalOpen(false)}
                onAddTask={handleConfirmAddTask}
            />
            <div className="lesson-editor-view" style={{ marginLeft: `${marginleft}px` }}>
                <header>
                    <button onClick={onBack} className="back-button">
                        <FaArrowLeft /> Kembali ke Kustomisasi Kursus
                    </button>
                    <button onClick={() => onSave(editedLesson)} className="btn-save-lesson">
                        Simpan Perubahan Materi
                    </button>
                </header>
                <div className="form-group">
                    <label htmlFor="title">Judul Materi</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={editedLesson.title || ''}
                        onChange={handleInputChange}
                        placeholder="Contoh: Apa itu Pemrograman?"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="subtitle">Subtitle</label>
                    <input
                        type="text"
                        id="subtitle"
                        name="subtitle"
                        value={editedLesson.subtitle || ''}
                        onChange={handleInputChange}
                        placeholder="Contoh: Pengenalan Konsep Dasar"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Konten</label>
                    <textarea
                        id="content"
                        name="content"
                        value={editedLesson.content || ''}
                        onChange={handleInputChange}
                        placeholder="Jelaskan secara detail materi pembelajaran di sini..."
                    />
                </div>

                <h3>Tugas & Uji Pemahaman</h3>
                {(editedLesson.tasks || []).map((task, taskIndex) => (
                    <div key={task.id || taskIndex} className="task-editor-item">
                        <div className="task-editor-item-header">
                            <h4>Tugas #{taskIndex + 1}</h4>
                            <span className="task-type">{task.type}</span>
                            <button className="action-btn delete" title="Hapus Tugas" onClick={() => handleDeleteTask(taskIndex)}><FaTrash /></button>
                        </div>
                        <div className="form-group">
                            <label>Prompt (Pertanyaan/Instruksi)</label>
                            <textarea
                                name="prompt"
                                value={task.prompt}
                                onChange={(e) => handleTaskChange(taskIndex, e)}
                                placeholder="Tuliskan pertanyaan atau instruksi tugas di sini..." />
                        </div>
                        {task.type === 'multiple-choice' && (
                            <div className="mcq-options-editor">
                                <label>Pilihan Jawaban</label>
                                {(task.options || []).map((option, optionIndex) => (
                                    <div key={optionIndex} className="option-item">
                                        <input
                                            type="radio"
                                            name={`correctAnswer-${taskIndex}`}
                                            checked={task.correctAnswer === option}
                                            onChange={() => handleTaskChange(taskIndex, { target: { name: 'correctAnswer', value: option } })}
                                        />
                                        <input
                                            type="text"
                                            value={option}
                                            placeholder="Tuliskan pilihan jawaban..."
                                            onChange={(e) => handleTaskOptionChange(taskIndex, optionIndex, e)}
                                        />
                                        <button
                                            type="button"
                                            className="action-btn delete small"
                                            onClick={() => handleRemoveOption(taskIndex, optionIndex)}
                                            disabled={(task.options || []).length <= 2}
                                            title="Hapus Pilihan"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                ))}
                                <div className="mcq-actions">
                                    <button
                                        type="button"
                                        className="add-option-btn"
                                        onClick={() => handleAddOption(taskIndex)}
                                        disabled={(task.options || []).length >= 5}
                                    >
                                        <FaPlus /> Tambah Pilihan
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                <div className="lesson-editor-actions">
                    <button className="add-lesson-btn" onClick={() => setIsAddTaskModalOpen(true)}><FaPlus /> Tambah Tugas</button>
                </div>
            </div>
        </>
    );
}