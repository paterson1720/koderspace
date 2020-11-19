/* eslint-disable react/prop-types */
import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
function MarkDownTextArea({ onChange, value, onKeyDown }) {
  return (
    <SimpleMDE
      id="commentTextArea"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      options={{
        showIcons: ['code', 'bold', 'italic'],
        minHeight: '60px',
        autofocus: true,
        spellChecker: false,
        hideIcons: [
          'strikethrough',
          'heading',
          'quote',
          'unordered-list',
          'ordered-list',
          'side-by-side',
          'fullscreen'
        ]
      }}
    />
  );
}

export default MarkDownTextArea;
