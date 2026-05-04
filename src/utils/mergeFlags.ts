import { CmdArgs, Mcrl2Args, Mcrl2ToolType } from "../types/common";

export default function mergeFlags(a: CmdArgs | undefined, b: CmdArgs) {
    
    let result: CmdArgs = structuredClone(b);
    if (!a) {
        return result;
    }
    for (let flag in a) {
        result[flag] = a[flag];
    }

    return result;
}