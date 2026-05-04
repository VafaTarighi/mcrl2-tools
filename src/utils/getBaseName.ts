import path from 'path';
import * as vscode from 'vscode';

export default function getBaseName() {
    const _editor = vscode.window.activeTextEditor;
    if (!_editor) {
        throw new Error("No active file");
    }
    const file = _editor.document.uri.fsPath;
    if (!file.endsWith(".mcrl2")) {
        throw new Error("Not an .mcrl2 file");
    }

    const baseName = path.basename(file, ".mcrl2");
    
    return baseName;
}