import { MCF, MCRL2, Mcrl2Tool, PBES } from './common';
import Lps2Pbes from './lps2pbes';
import { Mcrl2Args } from '../types/common';
import overrideArg from '../utils/overrideArg';
import getActiveFile from '../utils/getActiveFile';
import runShellTask from '../utils/runShellTask';
import path from 'path';

export default class PbesSolve extends Mcrl2Tool {
    public static getInstance() {
        if (!this.instance) {
            this.instance = new PbesSolve("pbessolve", Lps2Pbes.getInstance());
        }
        return this.instance;
    }

    public async run(getArgs?: () => Mcrl2Args) {
        let newGetArgs = overrideArg("pbessolve", "_forceRebuild", true, getArgs);
        
        const file = getActiveFile();
        if (file.endsWith(".mcf")) {
            const formula = file;
            const modelFile = await MCRL2.chooseModel();
            const modelBasename = path.basename(modelFile, ".mcrl2");
            if (!modelBasename) {
                throw new Error("You must choose a model for this operation to succeed.");
            }
            newGetArgs = overrideArg("lps2pbes", "formula", formula, newGetArgs);
            const command = this.getCommand(modelBasename, newGetArgs);
            runShellTask(command);
        } else {
            const formula = await MCF.chooseFormula();
            if (!formula) {
                throw new Error("You must choose a mu-formula for this operation to succeed.");
            }
            newGetArgs = overrideArg("lps2pbes", "formula", formula, newGetArgs);
            super.run(newGetArgs);
        }
    }

    protected getInputFile(basename: string, args?: Mcrl2Args) {
        const formula = args!.lps2pbes!["formula"] as string;
        return PBES.getFile(basename, formula);
    }
}
