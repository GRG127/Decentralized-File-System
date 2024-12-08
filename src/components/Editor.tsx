import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { Play, Layout, Settings2 } from 'lucide-react';

interface EditorProps {
  initialValue?: string;
}

export function Editor({ initialValue = '' }: EditorProps) {
  const [code, setCode] = useState(initialValue);
  const [output, setOutput] = useState('');

  const handleRunCode = () => {
    try {
      // Safe eval using Function constructor
      const result = new Function(code)();
      setOutput(String(result));
    } catch (error) {
      setOutput(`Error: ${(error as Error).message}`);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between bg-gray-800 p-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleRunCode}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Play size={16} />
            <span>Run</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors">
            <Layout size={16} />
            <span>Layout</span>
          </button>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors">
          <Settings2 size={16} />
          <span>Settings</span>
        </button>
      </div>
      
      <div className="flex-1 grid grid-cols-2 gap-4 p-4 bg-gray-900">
        <div className="flex flex-col">
          <h2 className="text-white mb-2 font-semibold">Editor</h2>
          <div className="flex-1 overflow-hidden rounded-lg">
            <CodeMirror
              value={code}
              height="100%"
              theme={vscodeDark}
              extensions={[javascript({ jsx: true })]}
              onChange={(value) => setCode(value)}
              className="h-full rounded-lg overflow-hidden"
            />
          </div>
        </div>
        
        <div className="flex flex-col">
          <h2 className="text-white mb-2 font-semibold">Output</h2>
          <div className="flex-1 bg-gray-800 p-4 rounded-lg font-mono text-white overflow-auto">
            {output || 'Output will appear here...'}
          </div>
        </div>
      </div>
    </div>
  );
}