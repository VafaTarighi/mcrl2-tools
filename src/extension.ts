import * as vscode from 'vscode';
import Mcrl22Lps from './commands/mcrl22lps';
import Lps2Lts from './commands/lps2lts';
import LpsInfo from './commands/lpsinfo';
import LtsView from './commands/ltsview';
import LtsInfo from './commands/ltsinfo';
import LtsGraph from './commands/ltsgraph';
import Lps2Pbes from './commands/lps2pbes';
import PbesSolve from './commands/pbessolve';
import LpsXsim from './commands/lpsxsim';

export function activate(context: vscode.ExtensionContext) {

	const commands = [
		vscode.commands.registerCommand('mcrl2.mcrl22lps', () => Mcrl22Lps.getInstance().run()),
		vscode.commands.registerCommand('mcrl2.lps2lts', () => Lps2Lts.getInstance().run()),
		vscode.commands.registerCommand('mcrl2.lpsinfo', () => LpsInfo.getInstance().run()),
		vscode.commands.registerCommand('mcrl2.ltsview', () => LtsView.getInstance().run()),
		vscode.commands.registerCommand('mcrl2.ltsinfo', () => LtsInfo.getInstance().run()),
		vscode.commands.registerCommand('mcrl2.ltsgraph', () => LtsGraph.getInstance().run()),
		vscode.commands.registerCommand('mcrl2.lps2pbes', () => Lps2Pbes.getInstance().run()),
		vscode.commands.registerCommand('mcrl2.pbessolve', () => PbesSolve.getInstance().run()),
		vscode.commands.registerCommand('mcrl2.lpsxsim', () => LpsXsim.getInstance().run()),
	];
	context.subscriptions.push(...commands);

}

// This method is called when your extension is deactivated
export function deactivate() { }
