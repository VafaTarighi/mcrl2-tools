import { Mcrl2Args, Mcrl2ToolType } from "../types/common";

export default function overrideArg(tool: Mcrl2ToolType, key: string, value?: boolean | string | number, getArgs?: () => Mcrl2Args) {
    return () => {
        const args = getArgs?.() || {};
        if (!args[tool]) {
            args[tool] = {};
        }
        if (value === undefined) {
            delete args[tool][key];
        } else {
            args[tool][key] = value;
        }

        return args;
    };
}