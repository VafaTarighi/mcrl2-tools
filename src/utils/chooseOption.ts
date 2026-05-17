import * as vscode from 'vscode';

export default async function chooseOption(opts: string[], placeHolder: string = "Choose an option") {
    const items: vscode.QuickPickItem[] = opts.map(opt => ({ label: opt }));
    const selection = await vscode.window.showQuickPick(items, { placeHolder });
    return selection?.label;
}