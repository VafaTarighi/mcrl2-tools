import { CmdArgs } from "../types/common";

export function flags2String(args: CmdArgs) {
    let flagString = "";
    Object.entries(args).forEach(entry => {
        const [key, value] = entry;

        // ignore extension arguments
        if (key.startsWith("_")) {return;}
        // ignore false values
        if (!value) {return;};

        flagString += `--${key}=${value} `;
    });

    return flagString;
}