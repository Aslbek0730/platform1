import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';

interface RealTimeCodeEditorProps {
    initialCode?: string;
    language?: 'javascript' | 'python';
    onCodeRun?: (code: string) => void;
}

const RealTimeCodeEditor: React.FC<RealTimeCodeEditorProps> = ({
    initialCode = '',
    language = 'javascript',
    onCodeRun,
}) => {
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState('');
    const editorRef = useRef<any>(null);

    const handleEditorDidMount = (editor: any, monaco: any) => {
        editorRef.current = editor;
    };

    const handleCodeRun = async () => {
      setOutput('');
      if (language === 'javascript') {
        try {
          const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
          const evalFunction = new AsyncFunction('setOutput', code);
          await evalFunction(setOutput);
        } catch (error: any) {
          setOutput(error.message);
        }
      } else if (language === 'python') {
        try {
          // For Python, we are using the built-in python3 interpreter,
          // which only supports standard library modules.
          const pyodide = await (window as any).loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.21.3/full/"
          });

          const result = await pyodide.runPythonAsync(code);
          setOutput(result === undefined ? '' : result);

        } catch (error: any) {
          setOutput(error.message);
        }
      }
    };

    useEffect(() => {
        setCode(initialCode);
    }, [initialCode]);

    return (
        <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex justify-end mb-2">
                <button
                    onClick={handleCodeRun}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Run Code
                </button>
            </div>
            <Editor
                height="300px"
                language={language}
                theme="vs-dark"
                value={code}
                onChange={(value) => {
                    if (value !== undefined) {
                        setCode(value);
                    }
                }}
                onMount={handleEditorDidMount}
            />
            <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2">Output:</h2>
                <pre className="bg-gray-800 text-white p-2 rounded overflow-auto">{output}</pre>
            </div>
        </div>
    );
};

export default RealTimeCodeEditor;
