import React, { useState } from 'react';
import { Play, RotateCcw, Copy, Check } from 'lucide-react';

import './PythonCompiler.css';

export default function PythonCompiler(props) {
    const [code, setCode] = useState(`# Write your Python code here
print("Hello, World!")


`);
    
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [copied, setCopied] = useState(false);

    const runCode = () => {
        setIsRunning(true);
        setOutput('');
        
        // Simulate Python execution
        setTimeout(() => {
            try {
                let mockOutput = '';
                
                // Simple pattern matching for demo purposes
                if (code.includes('print("Hello, World!")')) {
                    mockOutput += 'Hello, World!\n';
                }
                
                if (code.includes('print(f"Welcome to Python, {name}!")')) {
                    mockOutput += 'Welcome to Python, Student!\n';
                }
                
                if (code.includes('print(f"Sum of numbers: {total}")')) {
                    mockOutput += 'Sum of numbers: 15\n';
                }
                
                // Look for other print statements
                const printMatches = code.match(/print\([^)]+\)/g);
                if (printMatches) {
                    printMatches.forEach(match => {
                        if (!match.includes('Hello, World!') && !match.includes('Welcome to Python') && !match.includes('Sum of numbers')) {
                            const content = match.match(/print\(["']([^"']+)["']\)/);
                            if (content) {
                                mockOutput += content[1] + '\n';
                            }
                        }
                    });
                }
                
                if (!mockOutput.trim()) {
                    mockOutput = 'Program executed successfully';
                }
                
                setOutput(mockOutput);
            } catch (error) {
                setOutput(`Error: ${error.message}`);
            }
            setIsRunning(false);
        }, 800);
    };

    const resetCode = () => {
        setCode(`# Write your Python code here
print("Hello, World!")

`);
        setOutput('');
    };

    const copyOutput = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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