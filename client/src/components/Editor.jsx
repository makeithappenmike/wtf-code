import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { useMutation } from '@apollo/client';
import { createTheme } from '@uiw/codemirror-themes';
import { javascript } from '@codemirror/lang-javascript';
import { tags as t } from '@lezer/highlight';
import { CREATE_SNIPPET, EXPLAIN_CODE } from '../../src/utils/mutations';

// If we want to include custom themes we can do so like below
// We can bring in already created themes from https://uiwjs.github.io/react-codemirror/#/theme/

const dark = createTheme({
    theme: 'dark',
    settings: {
      background: '#2E3440', // Background
      foreground: '#88C0D0', // Method text
      caret: '#ECEFF4', // Cursor
      selection: '#4C566A', // Selection BG
      selectionMatch: '#4C566A7d', // Matching selection BG
      lineHighlight: '#8a91991a', // Highlighted line(s)
      gutterBackground: '#2E3440', // Sidebar
      gutterForeground: '#D8DEE9', // Sidebar text
    },
    styles: [
      { tag: t.comment, color: '#D8DEE97d' }, // Comments
      { tag: t.variableName, color: '#ECEFF4' }, // Variables
      { tag: [t.string, t.special(t.brace)], color: '#A3BE8C' }, // Variable data
      { tag: t.number, color: '#B48EAD' }, // Numbers
      { tag: t.bool, color: '#B48EAD' }, // Booleans
      { tag: t.null, color: '#B48EAD' }, // Null values
      { tag: t.keyword, color: '#B48EAD' }, // Keywords
      { tag: t.operator, color: '#B48EAD' }, // Operators
      { tag: t.className, color: '#B48EAD' }, // Classes
      { tag: t.definition(t.typeName), color: '#B48EAD' }, // Definitions
      { tag: t.typeName, color: '#B48EAD' }, // typeNames
      { tag: t.angleBracket, color: '#B48EAD' }, // Brackets
      { tag: t.tagName, color: '#B48EAD' }, // Tags
      { tag: t.attributeName, color: '#B48EAD' }, // Attributes
    ],
  });

  const light = createTheme({
    theme: 'light',
    settings: {
      background: '#D8DEE9', // Background
      foreground: '#BF616A', // Method text
      caret: '#2E3440', // Cursor
      selection: '#4C566A', // Selection BG
      selectionMatch: '#4C566A7d', // Matching selection BG
      lineHighlight: '#8a91991a', // Highlighted line(s)
      gutterBackground: '#D8DEE9', // Sidebar
      gutterForeground: '#4C566A', // Sidebar text
    },
    styles: [
      { tag: t.comment, color: '#D8DEE97d' }, // Comments
      { tag: t.variableName, color: '#2E3440' }, // Variables
      { tag: [t.string, t.special(t.brace)], color: '#A3BE8C' }, // Variable data
      { tag: t.number, color: '#4C566A' }, // Numbers
      { tag: t.bool, color: '#4C566A' }, // Booleans
      { tag: t.null, color: '#4C566A' }, // Null values
      { tag: t.keyword, color: '#4C566A' }, // Keywords
      { tag: t.operator, color: '#4C566A' }, // Operators
      { tag: t.className, color: '#4C566A' }, // Classes
      { tag: t.definition(t.typeName), color: '#4C566A' }, // Definitions
      { tag: t.typeName, color: '#4C566A' }, // typeNames
      { tag: t.angleBracket, color: '#4C566A' }, // Brackets
      { tag: t.tagName, color: '#4C566A' }, // Tags
      { tag: t.attributeName, color: '#4C566A' }, // Attributes
    ],
  });

const extensions = [javascript({ jsx: true })];

export default function Editor() {

  const [createSnippet, { error }] = useMutation(CREATE_SNIPPET);
  const [explainCode, { e, data }] = useMutation(EXPLAIN_CODE);

  const [formState, setFormState] = useState({ code: '', name: 'untitiled', explaination: 'coming soon...' });

  // update state based on form input changes
  const handleChange = (event) => {
    const codeForm = { code: document.getElementsByClassName('cm-content')[0].innerText, name: 'untitiled', explaination: 'coming soon...' };
    setFormState(codeForm);
    console.log(formState);
  };

  // save code based on state
  const handleSave = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createSnippet({
        // ! using dummy data right now for name and explination
        // TODO: add fields for name and explaination
        // TODO: update state with those values, update this save to include them
        variables: { code: formState.code, name: formState.name, explaination: formState.explaination },
      });
      console.log("snippet saved");
      console.log(formState);
    } catch (err) {
      console.error(err);
    }
  };

  // submit code in editor to openAI for explaination
  const handleSubmit = async (event) => {
    event.preventDefault();

    const functionExplainer = "\"\"\"\nHere's what the above function is doing:\n1.";

    try {
      const { data } = await explainCode({
        variables: { code: formState.code, explainer: functionExplainer },
      });
      console.log("explaination incoming...");
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <CodeMirror
        value="console.log('hello world!');"
        height="500px"
        align='left'
        theme={dark}
        extensions={extensions}
        onChange={handleChange}     
        smartindent='true'
        linewrapping='true'
      />

      <form onSubmit={handleSubmit}>
      <input type="submit" value="Submit" />
      </form>

      <form onSubmit={handleSave}>
      <input type="submit" value="Save" />
      </form>

    </div>
  );
  };