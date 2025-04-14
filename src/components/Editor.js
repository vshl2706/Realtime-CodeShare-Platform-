import React, { useEffect, useRef } from 'react';
import { EditorState } from "@codemirror/state";
import {
  EditorView, keymap, highlightSpecialChars, drawSelection,
  highlightActiveLine, dropCursor, rectangularSelection,
  crosshairCursor, lineNumbers, highlightActiveLineGutter
} from "@codemirror/view";
import {
  defaultHighlightStyle, syntaxHighlighting, indentOnInput,
  bracketMatching, foldGutter, foldKeymap
} from "@codemirror/language";
import {
  defaultKeymap, historyKeymap, indentWithTab
} from "@codemirror/commands";
import {
  searchKeymap, highlightSelectionMatches
} from "@codemirror/search";
import {
  autocompletion, completionKeymap, closeBrackets,
  closeBracketsKeymap
} from "@codemirror/autocomplete";
import { lintKeymap } from "@codemirror/lint";
import { oneDark } from '@codemirror/theme-one-dark';
import { javascript } from "@codemirror/lang-javascript";
import { tags } from "@lezer/highlight";
import { HighlightStyle } from "@codemirror/language";
import ACTIONS from '../Actions';

const Editor = ({ socketRef, roomId }) => {
  const editorRef = useRef(null);
  const viewRef = useRef(null); // holds CodeMirror view instance
  const isRemoteUpdate = useRef(false); // prevents feedback loop

  useEffect(() => {
    if (!editorRef.current) return;

    const fixedHeightEditor = EditorView.theme({
      "&": { height: "500px" },
      ".cm-scroller": { overflow: "auto" },
      ".cm-content": {
        fontSize: "16px",
        lineHeight: "1.6",
        padding: "16px",
      }
    });

    const myHighlightStyle = HighlightStyle.define([
      { tag: tags.keyword, color: "#fc6" },
      { tag: tags.comment, color: "#f5d", fontStyle: "italic" }
    ]);

    const myTheme = EditorView.theme({
      "&": { color: "white", backgroundColor: "#034" },
      ".cm-content": { caretColor: "#0e9" },
      "&.cm-focused .cm-cursor": { borderLeftColor: "#0e9" },
      "&.cm-focused .cm-selectionBackground, ::selection": {
        backgroundColor: "#074"
      },
      ".cm-gutters": {
        backgroundColor: "#045",
        color: "#ddd",
        border: "none"
      }
    }, { dark: true });

    const state = EditorState.create({
      doc: "function hello() {\n  console.log('Hello, Vishal!');\n}",
      extensions: [
        oneDark,
        myTheme,
        fixedHeightEditor,
        lineNumbers(),
        highlightActiveLineGutter(),
        foldGutter(),
        highlightSpecialChars(),
        drawSelection(),
        dropCursor(),
        indentOnInput(),
        bracketMatching(),
        closeBrackets(),
        autocompletion(),
        rectangularSelection(),
        crosshairCursor(),
        highlightActiveLine(),
        syntaxHighlighting(defaultHighlightStyle),
        syntaxHighlighting(myHighlightStyle),
        javascript({ typescript: true }),
        keymap.of([
          indentWithTab,
          ...defaultKeymap,
          ...closeBracketsKeymap,
          ...searchKeymap,
          ...historyKeymap,
          ...foldKeymap,
          ...completionKeymap,
          ...lintKeymap
        ]),
        EditorView.updateListener.of((update) => {
          if (update.docChanged && !isRemoteUpdate.current) {
            const code = update.state.doc.toString();
            socketRef.current?.emit(ACTIONS.CODE_CHANGE, {
              roomId,
              code,
            });
          }
        })
      ],
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    viewRef.current = view;

    console.log("✅ CodeMirror 6 editor initialized");

    return () => {
      view.destroy();
    };
  }, []);

  useEffect(() => {
    if (!socketRef.current) return;

    const handleCodeChange = ({ code }) => {
      const view = viewRef.current;
      if (!view) return;

      const currentCode = view.state.doc.toString();
      if (code !== currentCode) {
        isRemoteUpdate.current = true;
        view.dispatch({
          changes: {
            from: 0,
            to: currentCode.length,
            insert: code
          }
        });
        isRemoteUpdate.current = false;
      }
    };

    socketRef.current.on(ACTIONS.CODE_CHANGE, handleCodeChange);

    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE, handleCodeChange);
    };
  }, [socketRef.current]);

  return (
    <div ref={editorRef} className="code-editor-container" />
  );
};

export default Editor;
