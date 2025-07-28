import React, { useState, useContext } from 'react';
import { Play, RotateCcw, Copy, Check } from 'lucide-react';
import { tokenAPI } from '../App.jsx';
import './PythonCompiler.css';

export default function PythonCompiler(props) {
    const [code, setCode] = useState(`# Write your Python code here\nprint("Hello, World!")`);
    
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [copied, setCopied] = useState(false);
    const {getToken,newRefreshToken} = useContext(tokenAPI);

    const runCode = () => {
        setIsRunning(true);
        setOutput('');
        
        
        try {
            newRefreshToken().then(async ()=>{
                console.log(`new token: ${getToken().token}`);
                const res = await fetch('http://147.185.221.30:24588/execPython', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getToken().token}`  // Use the token from context
                    },
                    body: JSON.stringify({
                        code: code
                    })
                });

                if (!res.ok) {
                    const errorText = await res.text();
                    setOutput(`Error from server: ${res.status}\n${errorText}`);
                    return;
                }

                const result = await res.json();
                let finalOutput = "";

                if (result.Output) {
                    finalOutput += result.Output;
                }
                if (result.Error) {
                    // Append error to the output, clearly marking it as an error.
                    finalOutput += (finalOutput ? '\n' : '') + `--- ERROR ---\n${result.Error}`;
                }

                setOutput(finalOutput || 'Execution finished with no output.');
            })
            
        } catch (err) {
            console.error('Failed to execute code:', err);
            setOutput(`An error occurred while trying to run the code: ${err.message}`);
        } finally {
            setIsRunning(false);
        }
    };

    const resetCode = () => {
        setCode(`# Write your Python code here
print("Hello, World!")


`);
        setOutput(''+JSON.stringify(getToken().token));
    };

    const copyOutput = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            
            const textarea = e.target;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            
            if (e.shiftKey) {
                // Handle Shift+Tab for unindentation
                const lineStart = code.lastIndexOf('\n', start - 1) + 1;
                
                // Check if the line starts with a tab
                if (code.charAt(lineStart) === '\t') {
                    const newValue = code.substring(0, lineStart) + code.substring(lineStart + 1);
                    setCode(newValue);
                    
                    // Adjust cursor position
                    setTimeout(() => {
                        textarea.selectionStart = textarea.selectionEnd = start - 1;
                    }, 0);
                }
            } else {
                // Handle Tab for indentation
                const newValue = code.substring(0, start) + '\t' + code.substring(end);
                setCode(newValue);
                
                // Set cursor position after the tab
                setTimeout(() => {
                    textarea.selectionStart = textarea.selectionEnd = start + 1;
                }, 0);
            }
        }
    };

    return (
        <div style={{ marginLeft: props.marginleft + 'px' }}>
            <div className="container">
                <div className="python-compiler">
                    {/* Header */}
                    <div className="header">
                        <h2>Python Exercise</h2>
                        <div className="actions">
                            <button 
                                className="btn btn-secondary"
                                onClick={resetCode}
                                title="Reset to example"
                            >
                                <RotateCcw size={16} />
                                Reset
                            </button>
                            <button 
                                className={`btn btn-primary ${isRunning ? 'running' : ''}`}
                                onClick={runCode}
                                disabled={isRunning}
                                title="Run your code"
                            >
                                <Play size={16} />
                                {isRunning ? 'Running...' : 'Run Code'}
                            </button>
                        </div>
                    </div>

                    {/* Code Editor */}
                    <div className="editor-container">
                        <div className="editor-header">
                            <span className="editor-label">Your Code</span>
                            <span className="line-count">{code.split('\n').length} lines</span>
                        </div>
                        <div className="editor-wrapper">
                            <div className="line-numbers">
                                {code.split('\n').map((_, index) => (
                                    <span key={index} className="line-number">
                                        {index + 1}
                                    </span>
                                ))}
                            </div>
                            <textarea
                                className="code-editor"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                onKeyDown={handleKeyDown}  // Add this line
                                placeholder="Start coding..."
                                spellCheck={false}
                            />
                        </div>
                    </div>

                    {/* Output */}
                    <div className="output-container">
                        <div className="output-header">
                            <span className="output-label">
                                Output
                                {isRunning && <span className="running-indicator">●</span>}
                            </span>
                            {output && (
                                <button 
                                    className="copy-btn"
                                    onClick={copyOutput}
                                    title="Copy output"
                                >
                                    {copied ? <Check size={14} /> : <Copy size={14} />}
                                </button>
                            )}
                        </div>
                        <div className="output-wrapper">
                            <pre className="output-content">
                                {output || 'Click "Run Code" to see the output here'}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}