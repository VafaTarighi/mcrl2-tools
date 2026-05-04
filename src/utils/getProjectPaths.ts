import path from 'path';
import * as vscode from 'vscode';

export default function getProjectPaths() {
    const _editor = vscode.window.activeTextEditor;
    if (!_editor) {
        throw new Error("No active file");
    }

    const mcrl2File = _editor.document.uri.fsPath;

    const baseName = path.basename(mcrl2File, "mcrl2");

    const _workspace = vscode.workspace.getWorkspaceFolder(_editor.document.uri);
    if (!_workspace) {
        throw new Error("No active workspace folder");
    }

    const projectRoot = _workspace.uri.fsPath;


    return {
        mcrl2File,
        baseName,
        projectRoot
    };
}