import * as vscode from 'vscode';

export default async function runShellTask(command: string) {
    const kind = { type: 'shell' };

    // if command ends with `&&` drop them
    if (command.endsWith("&&")) {
        command = command.substring(0, command.length-2);
    }
    const execution = new vscode.ShellExecution(command);

    const task = new vscode.Task(
        kind,
        vscode.TaskScope.Workspace,
        "mCRL2",
        'mcrl2',
        execution
    );

    task.presentationOptions = {
        reveal: vscode.TaskRevealKind.Always,
        focus: false,
        panel: vscode.TaskPanelKind.Shared
    };

    const disposable = vscode.tasks.onDidEndTaskProcess(e => {
        if (e.execution.task.name !== 'mCRL2') {return;}
        const exitCode = e.exitCode;
        if (exitCode !== 0) {
            vscode.window.showErrorMessage(`Task failed with code: ${exitCode}`);
        }
        disposable.dispose();
    });

    await vscode.tasks.executeTask(task);
}