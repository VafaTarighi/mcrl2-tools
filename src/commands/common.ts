import { PathLike } from "fs";
import { Mcrl2Args, Mcrl2ToolType } from "../types/common";
import { flags2String } from "../utils/flags2String";
import { getArgsFromWorkspace } from "../configs/common";
import runShellTask from "../utils/runShellTask";
import rootDir from "../utils/rootDir";
import path from "path";
import fs from 'fs';
import getActiveFile from "../utils/getActiveFile";
import getBaseName from "../utils/getBaseName";
import mergeFlags from "../utils/mergeFlags";
import chooseOption from "../utils/chooseOption";

export abstract class Mcrl2Tool {
    protected name: Mcrl2ToolType;
    protected dependency?: Mcrl2Tool;
    protected static instance?: Mcrl2Tool;

    protected constructor(name: Mcrl2ToolType, dependency?: Mcrl2Tool) {
        this.name = name;
        this.dependency = dependency;
    }

    public async run(getArgs?: () => Mcrl2Args) {
        const command = this.getCommand(getArgs);
        runShellTask(command);
    }

    public abstract getCommand(getArgs?: () => Mcrl2Args): string;

    protected commandString(input: PathLike | PathLike[], args?: Mcrl2Args, output?: PathLike) {
        const flags = mergeFlags(args?.[this.name], getArgsFromWorkspace(this.name));
        const flagString = flags2String(flags);
        return `${this.name} ${flagString} ${[input].flat().join(" ")} ${output || ""} &&`;
    }
}

export class MCRL2 {
    static getDir() {
        const root = rootDir();
        return root;
    }
    static getFile() {
        return getActiveFile();
    }
}

export class LPS {
    static getDir() {
        const root = rootDir();

        const dir = path.join(root, 'lps');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        return dir;
    }
    static getFile() {
        const dir = this.getDir();
        const base = getBaseName();
        return path.join(dir, base) + '.lps';
    }
}

export class LTS {
    static getDir() {
        const root = rootDir();

        const dir = path.join(root, 'lts');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        return dir;
    }
    static getFile() {
        const dir = this.getDir();
        const base = getBaseName();
        return path.join(dir, base) +  '.lts';
    }
}

export class PBES {
    static getDir() {
        const root = rootDir();

        const dir = path.join(root, 'pbes');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        return dir;
    }
    static getFile(formula: string) {
        const dir = this.getDir();
        const base = getBaseName();
        return path.join(dir, base) +  `_${path.basename(formula, ".mcf")}.pbes`;
    }
}

export class MCF {
    static getDir() {
        const root = rootDir();

        const dir = path.join(root, 'properties');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        return dir;
    }

    static getFormulas() {
        const dir = this.getDir();
        const files = fs.readdirSync(dir, { withFileTypes: true })
            .filter(item => item.isFile())
            .map(item => path.basename(item.name, '.mcf'));
        return files;
    }

    static async chooseFormula() {
        const choice = await chooseOption(this.getFormulas());
        return path.join(this.getDir(), choice + '.mcf');
    }

}