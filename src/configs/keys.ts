import { Mcrl2ToolType } from "../types/common";

export const mcrl22lpsKeys = [
  "statenames",
  "binary",
  "balance-summands",
  "cluster",
  "delta",
  "check-only",
  "no-globvars",
  "no-deltaelm",
  "lin-method",
  "no-sumelm",
  "no-cluster",
  "no-constelm",
  "no-rewrite",
  "qlimit",
  "rewriter",
  "timed",
  "timings",
  "newstate",
  "no-alpha",
  "quiet",
  "verbose",
  "debug",
  "log-level"
];

export const lpsinfoKeys = [
  "timings",
  "quiet",
  "verbose",
  "debug",
  "log-level"
];

export const lpsxsimKeys = [
  "qlimit",
  "rewriter",
  "timings",
  "nodummy",
  "quiet",
  "verbose",
  "debug",
  "log-level"
];

export const lps2ltsKeys = [
  "action",
  "confluence",
  "cached",
  "deadlock",
  "divergence",
  "max",
  "multiaction",
  "nondeterminism",
  "no-info",
  "no-probability-checking",
  "out",
  "qlimit",
  "rewriter",
  "strategy",
  "save-at-end",
  "suppress",
  "trace",
  "tau",
  "threads",
  "timings",
  "todo-max",
  "quiet",
  "verbose",
  "debug",
  "log-level"
];

export const lps2pbes = [
  "counter-example",
  "check-only",
  "formula",
  "preprocess-modal-operators",
  "out",
  "structured",
  "timed",
  "timings",
  "unoptimized",
  "quiet",
  "verbose",
  "debug",
  "log-level"
];

export const ltsviewKeys = [
  "timings",
  "quiet",
  "verbose",
  "debug",
  "log-level"
];

export const ltsgraphKeys = [
  "timings",
  "quiet",
  "verbose",
  "debug",
  "log-level"
];

export const ltsinfoKeys = [
  "action-label",
  "branching-factor",
  "in",
  "state-label",
  "timings",
  "quiet",
  "verbose",
  "debug",
  "log-level"
];

export function getToolConfigKeys(tool: Mcrl2ToolType) {
    switch (tool) {
        case "mcrl22lps":
            return mcrl22lpsKeys;
        case "lps2lts":
            return lps2ltsKeys;
        case "lps2pbes":
            return lps2pbes;
        case "lpsinfo":
            return lpsinfoKeys;
        case "lpsxsim":
            return lpsxsimKeys;
        case "ltsview":
            return ltsviewKeys;
        case "ltsgraph":
            return ltsgraphKeys;
        case "ltsinfo":
            return ltsinfoKeys;
        default:
            return [];
    }
}