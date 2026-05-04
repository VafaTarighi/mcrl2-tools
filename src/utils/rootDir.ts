import path from 'path';
import * as vscode from 'vscode';

export default function rootDir() {
    const ws = vscode.workspace.workspaceFolders?.[0];
    if (!ws) {
        throw new Error("No active workspace folder");
    }

    return ws.uri.fsPath;
}