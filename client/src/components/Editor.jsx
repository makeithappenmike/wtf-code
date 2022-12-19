import React, { useState, useContext, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { useMutation } from '@apollo/client';
import { createTheme } from '@uiw/codemirror-themes';
import { javascript } from '@codemirror/lang-javascript';
import { tags as t } from '@lezer/highlight';
import { CREATE_SNIPPET, DELETE_SNIPPET, EXPLAIN_CODE, SHARE } from '../../src/utils/mutations';
import { Button, Input, Modal, notification, Space, Spin } from 'antd';
import { ShareAltOutlined, LoadingOutlined } from '@ant-design/icons';
import { GlobalContext } from '../utils/context';

// TODO: Wire up theme editor switching
// ?: Should we disable the ability to save if the explanation is empty? 

const { TextArea } = Input;
const extensions = [javascript({ jsx: true })];
const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

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
  const {currentSnippet, setRefetchSnippets} = useContext(GlobalContext);
  const [createSnippet] = useMutation(CREATE_SNIPPET);
  const [explainCode, { loading, error, data }] = useMutation(EXPLAIN_CODE);
  const [shareSnippet] = useMutation(SHARE);
  const [deleteSnippet] = useMutation(DELETE_SNIPPET);
  const [codeState, setCodeState] = useState({ code: '// input your code here!'});
  const [nameState, setNameState] = useState({ name: ''});
  const [explanationState, setexplanationState] = useState({explanation: ''});
  const [modal2Open, setModal2Open] = useState(false);  

  useEffect(() => {
    setexplanationState({ explanation: currentSnippet.explanation});
  }, [currentSnippet]);

  // Update state based on form input changes
  const handleChange = (event) => {
    const codeForm = { code: document.getElementsByClassName('cm-content')[0].innerText, name: 'untitiled'};
    setCodeState(codeForm);
  };

  // Update state when explanation added to text field
  const handleExplanation = (event) => {
    setexplanationState({explanation: event.target.value});
  };

  // Update state when name added to text field
  const handleName = (event) => {
    const nameArea = { name: document.getElementById('explanation_name').value};
    setNameState(nameArea);
  };

  // Save code based on state
  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const { data } = await createSnippet({
        variables: { code: codeState.code, name: nameState.name, explanation: explanationState},
      });
      setRefetchSnippets(1);
      openNotification("Your snippet has been saved.");
    } catch (err) {
      openNotification("There was a problem saving your snippet. \n\n Try making changes to the text area and saving again!");
    }
  };

  // Save code based on state
  const handleShare = async (event) => {
    event.preventDefault();
    try {
      const { data } = await shareSnippet({
        variables: { code:codeState.code, explanation: explanationState.explanation, name: nameState.name },
      });
      setModal2Open(false);
      openNotification("Message Sent!", "Your Snippet has been shared. Great job!");

    } catch (err) {
      console.error(err);
      openNotification("There was a problem sending your message.");
    }
  };

  // Delete a snippet
  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const { data } = await deleteSnippet({
        variables: { id: currentSnippet.key },
      });
      setRefetchSnippets(2);
      openNotification("Snippet Deleted", "Your Snippet has been deleted.");

    } catch (err) {
      console.error(err);
      openNotification("There was a problem deleting your snippet.");
    }
  };


  // Submit code in editor to openAI for explanation
  const handleSubmit = async (event) => {
    event.preventDefault();
    const functionExplainer = "\"\"\"\nHere's what the above code is doing:\n";
    try {
      const { data } = await explainCode({
        variables: { code: codeState.code, explainer: functionExplainer },
      });
      const textArea = document.querySelector("#explanation");
      textArea.value = data.explainCode;
      setexplanationState(data.explainCode);
    } catch (err) {
      openNotification("There was a problem getting an explanation for your snippet.")
    }
  }

  const openNotification = (title, message) => {
    notification.open({
      message: title,
      description: message,
    });
  };

  return (
    <div>
      <CodeMirror
        value={currentSnippet.code}
        height="500px"
        align='left'
        theme={dark}
        extensions={extensions}
        onChange={handleChange}     
        smartindent='true'
        linewrapping='true'
      />

      <Modal
        title="Share Snippet"
        centered
        open={modal2Open}
        onOk={handleShare}
        onCancel={() => setModal2Open(false)}
      >
        <p>Your snippet will be sent to the email address you signed up with!</p>
        
      </Modal>

      {/* Button is active if the editor is not empty */}
      <Button id='submit_code' onClick={handleSubmit} size="medium" disabled={!codeState.code ? true : false}>Submit</Button>
      <Spin spinning={loading} indicator={loadingIcon} style={{ paddingLeft: '5px' }}></Spin>
      <textarea id="explanation" name="explanation"
                value={explanationState.explanation}
                onChange={handleExplanation}
                cols="45" rows={4} size="medium" style={{ heigh: 'fit-content'}}>
                Click 'Submit' to generate a code explanation here!
                </textarea>

      <Space>
      <div id='explanation_div'>
      <Space.Compact block size="medium" style={{ marginBottom: '5px' }}>
      <Input onChange={handleName} value={nameState.name} type="text" id="explanation_name" name="name"/>
      {/* Button is active if the explanation name is not empty */}
      <Button id='save_button' onClick={handleSave} disabled={nameState.name ? false : true}>Save</Button>
      </Space.Compact>
      </div>
      {/* Button is active if the explanation name is not empty */}
      </Space>
      <Button id='share_button' style={{ marginBottom: '5px', justifyContent: 'center' }} onClick={() => setModal2Open(true)} disabled={nameState.name ? false : true}><ShareAltOutlined />Share</Button>
      <Button id='delete_button' style={{ textAlign: 'center' }} onClick={handleDelete} size="medium" >Delete</Button>

      
    </div>
  );
  };