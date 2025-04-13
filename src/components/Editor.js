import React, { useEffect, useRef } from 'react';

// Essential core setup
import {EditorState} from "@codemirror/state"
import {
  EditorView, keymap, highlightSpecialChars, drawSelection,
  highlightActiveLine, dropCursor, rectangularSelection,
  crosshairCursor, lineNumbers, highlightActiveLineGutter
} from "@codemirror/view"
import {
  defaultHighlightStyle, syntaxHighlighting, indentOnInput,
  bracketMatching, foldGutter, foldKeymap
} from "@codemirror/language"
import {
  defaultKeymap, history, historyKeymap
} from "@codemirror/commands"
import {
  searchKeymap, highlightSelectionMatches
} from "@codemirror/search"
import {
  autocompletion, completionKeymap, closeBrackets,
  closeBracketsKeymap
} from "@codemirror/autocomplete"
import {lintKeymap} from "@codemirror/lint"
import { oneDark } from '@codemirror/theme-one-dark';
import {javascript} from "@codemirror/lang-javascript";
import {tags} from "@lezer/highlight"
import {HighlightStyle} from "@codemirror/language"
import {indentWithTab} from "@codemirror/commands"


const Editor = () => {
  const editorRef = useRef(null);
  useEffect(() => {
    if(!editorRef.current) return;
    const fixedHeightEditor = EditorView.theme({
      "&": { height: "500px" },
      ".cm-scroller": { overflow: "auto" },
      ".cm-content": {
        fontSize: "16px",       // ✅ Increases code size
        lineHeight: "1.6",      // ✅ Makes code more spacious
        padding: "16px",        // ✅ Adds inner spacing
      }
    });
    const myHighlightStyle = HighlightStyle.define([
      { tag: tags.keyword, color: "#fc6" },
      { tag: tags.comment, color: "#f5d" , fontStyle: "italic"}
    ]);
    let myTheme = EditorView.theme({
      "&": {
        color: "white",
        backgroundColor: "#034"
      },
      ".cm-content": {
        caretColor: "#0e9"
      },
      "&.cm-focused .cm-cursor": {
        borderLeftColor: "#0e9"
      },
      "&.cm-focused .cm-selectionBackground, ::selection": {
        backgroundColor: "#074"
      },
      ".cm-gutters": {
        backgroundColor: "#045",
        color: "#ddd",
        border: "none"
      }
    }, {dark: true})
    const baseTheme = EditorView.baseTheme({
      ".cm-o-replacement": {
        display: "inline-block",
        width: ".5em",
        height: ".5em",
        borderRadius: ".25em"
      },
      "&light .cm-o-replacement": {
        backgroundColor: "#04c"
      },
      "&dark .cm-o-replacement": {
        backgroundColor: "#5bf"
      }
    })
    const minHeightEditor = EditorView.theme({
      ".cm-content, .cm-gutter": {minHeight: "200px"}
    })
   

    const startState = EditorState.create({
      doc: "function hello() {\n  console.log('Hello, Vishal!');\n}",
      extensions: [
        baseTheme,
        myTheme,
        minHeightEditor,
        fixedHeightEditor,
        oneDark,

        lineNumbers(),
        foldGutter(),
        highlightSpecialChars(),
        drawSelection(),
        dropCursor(),
        indentOnInput(),
        syntaxHighlighting(defaultHighlightStyle),
        bracketMatching(),
        closeBrackets(),
        autocompletion(),
        rectangularSelection(),
        crosshairCursor(),
        highlightActiveLine(),
        // highlightActiveLineGutter(),
        keymap.of([indentWithTab]),
        javascript({typescript: true}),
        keymap.of([
          // A large set of basic bindings
          ...defaultKeymap,
          // Closed-brackets aware backspace
          ...closeBracketsKeymap,
          // Search-related keys
          ...searchKeymap,
          // Redo/undo keys
          ...historyKeymap,
          // Code folding bindings
          ...foldKeymap,
          // Autocompletion keys
          ...completionKeymap,
          // Keys related to the linter system
          ...lintKeymap
        ])],
    });

    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
    });

    console.log("Code editor initialized");
    return () => {
      view.destroy(); // Clean up the editor view on component unmount
    };

  }, []);

  return (
    <div 
      ref={editorRef}
      className="code-editor-container"
    ></div>
  );
};

export default Editor;
