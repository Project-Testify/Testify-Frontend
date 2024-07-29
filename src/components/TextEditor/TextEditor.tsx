// components/Editor/main.tsx

import React, { useState, useEffect } from 'react';
import QuillEditor from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Styles from './styles.module.css';

interface TextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ value: initialValue = '', onChange }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <QuillEditor
      className={Styles.wrapper}
      theme="snow"
      value={value}
      onChange={handleChange}
    />
  );
};

export  {TextEditor};
