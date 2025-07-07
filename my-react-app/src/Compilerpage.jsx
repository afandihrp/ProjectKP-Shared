import React from 'react';

// Semua style didefinisikan dalam objek JavaScript
const styles = {
  compilerContainer: {
    display: 'flex',
    height: '80vh',
    backgroundColor: '#F8F9FA',
    border: '1px solid #D9D9D9',
    borderRadius: '8px',
    overflow: 'hidden',
    fontFamily: "'Poppins', sans-serif",
  },
  editorPane: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    borderRight: '2px solid #D9D9D9',
  },
  editorHeader: {
    backgroundColor: '#e9ecef',
    padding: '8px 12px',
    fontWeight: '500',
    color: '#2B2D42',
  },
  codeEditor: {
    flexGrow: 1,
    border: 'none',
    padding: '10px',
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: '14px',
    backgroundColor: '#2B2D42',
    color: '#FFFFFF',
    resize: 'none',
    outline: 'none',
  },
  outputPane: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  runButton: {
    backgroundColor: '#00AEEF',
    color: 'white',
    border: 'none',
    padding: '12px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  outputIframe: {
    backgroundColor: 'white',
    border: 'none',
    height: '100%',
    width: '100%',
  }
};

function CompilerPage() {
  const [htmlCode, setHtmlCode] = useState('<h1>Hello, ProCodeCG!</h1>\n<p>Tulis kode HTML di sini.</p>');
  const [cssCode, setCssCode] = useState('h1 {\n  color: #00AEEF;\n}');
  const [jsCode, setJsCode] = useState('// Tulis kode JavaScript di sini\nconsole.log("JavaScript dijalankan!");');
  const [srcDoc, setSrcDoc] = useState('');

  const handleRunCode = () => {
    const combinedCode = `
      <html>
        <body>${htmlCode}</body>
        <style>${cssCode}</style>
        <script>${jsCode}</script>
      </html>
    `;
    setSrcDoc(combinedCode);
  };

  return (
    <div style={styles.compilerContainer}>
      <div style={styles.editorPane}>
        <div style={styles.editorHeader}>
          <span>HTML</span>
        </div>
        <textarea
          style={styles.codeEditor}
          value={htmlCode}
          onChange={(e) => setHtmlCode(e.target.value)}
        />
        <div style={styles.editorHeader}>
          <span>CSS</span>
        </div>
        <textarea
          style={styles.codeEditor}
          value={cssCode}
          onChange={(e) => setCssCode(e.target.value)}
        />
        <div style={styles.editorHeader}>
          <span>JavaScript</span>
        </div>
        <textarea
          style={styles.codeEditor}
          value={jsCode}
          onChange={(e) => setJsCode(e.target.value)}
        />
      </div>
      <div style={styles.outputPane}>
        <button style={styles.runButton} onClick={handleRunCode}>
          Run Code
        </button>
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          style={styles.outputIframe}
        />
      </div>
    </div>
  );
}

export default CompilerPage;