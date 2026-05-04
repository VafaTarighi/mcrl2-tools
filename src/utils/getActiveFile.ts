import * as vscode from 'vscode';

export default function getActiveFile() {
    const _editor = vscode.window.activeTextEditor;
    if (!_editor) {
        throw new Error("No active file");
    }
    return _editor.document.uri.fsPath;
}