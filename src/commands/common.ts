import { PathLike } from "fs";
import { Mcrl2Args, Mcrl2ToolType } from "../types/common";
import { flags2String } from "../utils/flags2String";
import { getArgsFromWorkspace } from "../configs/common";
import runShellTask from "../utils/runShellTask";
import rootDir from "../utils/rootDir";
import path from "path";
import fs from 'fs';
import getBaseName from "../utils/getBaseName";
import mergeFlags from "../utils/mergeFlags";
import chooseOption from "../utils/chooseOption";
import { isDirty } from "../utils/isDirty";

export abstract class Mcrl2Tool {
    protected name: Mcrl2ToolType;
    protected dependency?: Mcrl2Tool;
    protected static instance?: Mcrl2Tool;

    protected constructor(name: Mcrl2ToolType, dependency?: Mcrl2Tool) {
        this.name = name;
        this.dependency = dependency;
    }

    public async run(getArgs?: () => Mcrl2Args) {
        const basename = getBaseName();

        const command = this.getCommand(basename, getArgs);
        runShellTask(command);
    }

    public getCommand(basename: string, getArgs?: () => Mcrl2Args): string {
        const args = getArgs?.();
        console.log(this.name, "getInputFile");
        const input = this.getInputFile(basename, args);
        console.log(input);
        const output = this.getOutputFile(basename, args);

        let command = "";
            if (this.shouldRunDependency(basename, args)) {
                command += this.dependency!.getCommand(basename, getArgs) + " && ";
            }
        
        command += this.commandString(input, args, output);
        return command;
    }

    protected shouldRunDependency(basename: string, args: Mcrl2Args | undefined): boolean {
        console.log("shouldRunDependency: ", this.name, args);
        if (args && args[this.name]?._forceRebuild) {
            return true;
        }
        if (!this.dependency) {
            return false;
        }
        const dependencyInput = this.dependency!.getInputFile(basename, args);
        const dependencyOutput = this.dependency!.getOutputFile(basename, args);
        if (!fs.existsSync(dependencyInput) || !dependencyOutput || !fs.existsSync(dependencyOutput)) {
            return true;
        }

        return isDirty(dependencyInput, dependencyOutput) || this.dependency!.shouldRunDependency(basename, args);
    }

    protected abstract getInputFile(basename: string, args?: Mcrl2Args): string;
    
    protected getOutputFile(basename: string, args?: Mcrl2Args): string | undefined {
        return undefined;
    }

    protected commandString(input: PathLike | PathLike[], args?: Mcrl2Args, output?: PathLike) {
        const flags = mergeFlags(args?.[this.name], getArgsFromWorkspace(this.name));
        const flagString = flags2String(flags);
        return `${this.name} ${flagString} ${[input].flat().join(" ")} ${output || ""}`;
    }
}

function getOrCreateDir(folderName: string) {
    const root = rootDir();
    const dir = path.join(root, folderName);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    return dir;
}

function getFilePath(dir: string, ext: string) {
    const base = getBaseName();
    return path.join(dir, base) + ext;
}

export class MCRL2 {
    static getDir() {
        return rootDir();
    }
    static getFile(basename: string) { return path.join(this.getDir(), basename) + '.mcrl2'; }

    static getModels() {
        const dir = this.getDir();
        return fs.readdirSync(dir, { withFileTypes: true })
            .filter(item => item.isFile() && item.name.endsWith('.mcrl2'))
            .map(item => path.basename(item.name, '.mcrl2'));
    }

    static async chooseModel() {
        const choice = await chooseOption(this.getModels(), "Choose a model");
        return path.join(this.getDir(), choice + '.mcrl2');
    }
}

export class LPS {
    static getDir() { return getOrCreateDir('lps'); }
    static getFile(basename: string) { return path.join(this.getDir(), basename) + '.lps'; }
}

export class LTS {
    static getDir() { return getOrCreateDir('lts'); }
    static getFile(basename: string) { return path.join(this.getDir(), basename) + '.lts'; }
}

export class PBES {
    static getDir() { return getOrCreateDir('pbes'); }
    static getFile(basename: string,formula: string) {
        return path.join(this.getDir(), basename) + `_${path.basename(formula, ".mcf")}.pbes`;
    }
}

export class MCF {
    static getDir() { return getOrCreateDir('properties'); }

    static getFormulas() {
        const dir = this.getDir();
        return fs.readdirSync(dir, { withFileTypes: true })
            .filter(item => item.isFile() && item.name.endsWith('.mcf'))
            .map(item => path.basename(item.name, '.mcf'));
    }

    static async chooseFormula() {
        const choice = await chooseOption(this.getFormulas(), "Choose a mu-formula");
        return path.join(this.getDir(), choice + '.mcf');
    }
}
