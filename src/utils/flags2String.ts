import { CmdArgs } from "../types/common";

export function flags2String(args: CmdArgs) {
    let flagString = "";
    Object.entries(args).forEach(entry => {
        const [key, value] = entry;

        if (!value) {return;};

        flagString += `--${key}=${value} `;
    });

    return flagString;
}