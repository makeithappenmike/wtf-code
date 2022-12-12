import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { useMutation } from '@apollo/client';
import { createTheme } from '@uiw/codemirror-themes';
import { javascript } from '@codemirror/lang-javascript';
import { tags as t } from '@lezer/highlight';
import { CREATE_SNIPPET, EXPLAIN_CODE, SHARE } from '../../src/utils/mutations';
import { Button, Input, Form, Space } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';

// TODO: Wire up theme editor switching
// TODO: Debug explanation (Cannot return null for non-nullable field Mutation.explainCode)
// TODO: Handle sharing
// ?: When ready, remove console.logs
// ?: Should we disable the ability to save if the explanation is empty? 

const { TextArea } = Input;
const extensions = [javascript({ jsx: true })];

// If we want to include custom themes we can do so like below
// We can bring in already created themes from https://uiwjs.github.io/react-codemirror/#/theme/

// Dark theme
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

  // Light theme
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

export default function Editor() {

  const [createSnippet] = useMutation(CREATE_SNIPPET);
  const [explainCode] = useMutation(EXPLAIN_CODE);
  const [shareSnippet] = useMutation(SHARE);
  const [codeState, setCodeState] = useState({ code: ''});
  const [nameState, setNameState] = useState({ name: ''});
  const [explanationState, setexplanationState] = useState({explanation: '' });

  // Update state based on form input changes
  const handleChange = (event) => {
    const codeForm = { code: document.getElementsByClassName('cm-content')[0].innerText, name: 'untitiled'};
    setCodeState(codeForm);
    console.log("Code State: ", codeState.code);
  };

  // Update state when explanation added to text field
  const handleExplanation = (event) => {
    const textArea = { explanation: document.getElementById('explanation').value};
    setexplanationState(textArea);
    console.log("explanation State: ", explanationState.explanation);
  };

  // Update state when name added to text field
  const handleName = (event) => {
    const nameArea = { name: document.getElementById('explanation_name').value};
    setNameState(nameArea);
    console.log("Name State: ", nameState.name);
  };

  // Save code based on state
  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const { data } = await createSnippet({
        variables: { code: codeState.code, name: nameState.name, explanation: explanationState.explanation },
      });
      console.log("snippet saved");
      console.log(codeState.code, explanationState.explanation, nameState.name);
    } catch (err) {
      console.error(err);
    }
  };

  // Save code based on state
  const handleShare = async (event) => {
    event.preventDefault();
    try {
      const { data } = await shareSnippet({
        // TODO: will pull from a modal instead of hard coding
        variables: { recipient: "jon@fart.cool" },
      });

    } catch (err) {
      console.error(err);
    }
  };

  // Submit code in editor to openAI for explanation
  const handleSubmit = async (event) => {
    event.preventDefault();
    const functionExplainer = "\"\"\"\nHere's what the above function is doing:\n1.";
    try {
      const { data } = await explainCode({
        variables: { code: codeState.code, explainer: functionExplainer },
      });
      console.log("explanation incoming...");
      console.log(data.explainCode);
      const textArea = document.querySelector("#explanation");
      textArea.value = data.explainCode;
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
      {/* Button is active if the editor is not empty */}
      <Button id='submit_code' onClick={handleSubmit} size="medium" disabled={!codeState.code ? true : false}>Submit</Button>
      <textarea id="explanation" name="explanation"
                onChange={handleExplanation}
                cols="45" rows={4} size="medium">
                test!
                </textarea>

      <Space>
      <Space.Compact block size="medium">
      <Input style={{ width: '100%' }} onChange={handleName} type="text" id="explanation_name" name="name" placeholder="Name & Save Snippet.." />
      {/* Button is active if the explanation name is not empty */}
      <Button onClick={handleSave} disabled={nameState.name ? false : true}>Save</Button>
      </Space.Compact>
      {/* Button is active if the explanation name is not empty */}
      <Button onClick={handleShare} disabled={nameState.name ? false : true}><ShareAltOutlined />Share</Button>
      </Space>

      
    </div>
  );
  };