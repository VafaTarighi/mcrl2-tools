import * as vscode from 'vscode';
import { CmdArgs, Mcrl2Args, Mcrl2ToolType } from '../types/common';
import { getToolConfigKeys } from './keys';

export function getArgsFromWorkspace(tool: Mcrl2ToolType) {
    const config = vscode.workspace.getConfiguration(`mCRL2.${tool}`);
    const keys = getToolConfigKeys(tool);
    const args: CmdArgs = {};
    for (let key of keys) {
        args[key] = config.get(key)?? false;
    }

    return args;
}