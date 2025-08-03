import React, { useState } from 'react';
import './Essay.css';

const MIN_CHARS = 50;

const Essay = ({ essayData, onSubmit }) => {
    const [answer, setAnswer] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // Reset error pada setiap submit

        if (answer.trim().length < MIN_CHARS) { // Validasi sederhana
            setError(`Jawaban Anda terlalu singkat. Mohon berikan penjelasan yang lebih detail (minimal ${MIN_CHARS} karakter).`);
            return;
        }
        onSubmit(answer);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="essay-submitted">
                <h3>Terima Kasih!</h3>
                <p>Jawaban Anda telah berhasil dikirimkan.</p>
                <button onClick={() => { setIsSubmitted(false); setAnswer(''); }} className="essay-submit-btn">
                    Tulis Ulang Esai
                </button>
            </div>
        );
    }

    return (
        <div className="essay-container">
            <div className="essay-header">
                <h2>{essayData.title}</h2>
                <p className="essay-prompt">{essayData.prompt}</p>
            </div>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="essay-textarea"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Tuliskan jawaban Anda di sini..."
                    rows="15"
                />
                {error && <p className="essay-error-message">{error}</p>}
                <div className="essay-footer">
                    <span className="char-count">{answer.length} karakter</span>
                    <button type="submit" className="essay-submit-btn" disabled={answer.trim().length === 0}>Kirim Jawaban</button>
                </div>
            </form>
        </div>
    );
};

export default Essay;
