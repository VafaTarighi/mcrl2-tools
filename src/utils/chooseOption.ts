import * as vscode from 'vscode';

export default async function chooseOption(opts: string[]) {
    const items: vscode.QuickPickItem[] = opts.map(opt => ({ label: opt }));
    const selection = await vscode.window.showQuickPick(items, {
        placeHolder: "Choose a mu-formula"
    });

    return selection?.label;
}