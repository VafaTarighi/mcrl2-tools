import * as vscode from 'vscode';

const cleanVersionByFile = new Map<string, number>();

export function isDirty(): boolean {
  const _editor = vscode.window.activeTextEditor;
  if (!_editor) {
    throw new Error("No active file");
  }
  const document = _editor.document;

  const key = document.uri.toString();
  const cleanVersion = cleanVersionByFile.get(key);
  if (cleanVersion === undefined) {return true;}
  return document.version !== cleanVersion;
}

export function resetDirty() {
  const _editor = vscode.window.activeTextEditor;
  if (!_editor) {
    throw new Error("No active file");
  }
  const document = _editor.document;

  cleanVersionByFile.set(document.uri.toString(), document.version);
}
