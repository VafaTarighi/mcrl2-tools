import { Mcrl2Args } from '../types/common';
import fs from 'fs';
import { isDirty, resetDirty } from '../utils/isDirty';
import { LTS, MCF, Mcrl2Tool, PBES } from './common';
import getProjectPaths from '../utils/getProjectPaths';
import Lps2Lts from './lps2lts';
import Lps2Pbes from './lps2pbes';
import overrideArg from '../utils/overrideArg';

export default class PbesSolve extends Mcrl2Tool {

    public static getInstance() {
        if (!this.instance) {
            this.instance = new PbesSolve("pbessolve", Lps2Pbes.getInstance());
        }
        return this.instance;
    }

    public async run(getArgs?: () => Mcrl2Args) {
        const formula = await MCF.chooseFormula();
        if (!formula) {
            throw new Error("You must choose a mu-formula for this operation to succeed.");
        }

        super.run(overrideArg("lps2pbes", "formula", formula, getArgs));
    }

    public getCommand(getArgs: () => Mcrl2Args) {
        const args = getArgs?.();

        const {
            baseName,
        } = getProjectPaths();

        const formula = args!.lps2pbes!["formula"] as string;

        const input = PBES.getFile(formula);

        let command = "";
        command += this.dependency!.getCommand(getArgs);
        command += this.commandString(input, args);
        return command;

    }

}