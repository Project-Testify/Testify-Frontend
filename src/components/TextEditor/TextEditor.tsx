// components/Editor/main.js

// Importing helper modules
import { useState } from 'react';

// Importing core components
import QuillEditor from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Styles from './styles.module.css';
export const TextEditor = () => {
  // Editor state
  const [value, setValue] = useState('');

  // Handler to handle button clicked

  return (
    <>
      <QuillEditor
        className={Styles.wrapper}
        theme="snow"
        value={value}
        onChange={(value) => setValue(value)}
      />
    </>
  );
};
