export type CmdArgs = {
  [key: string]: string | number | boolean
};

export type Mcrl2Args = {
  [key in Mcrl2ToolType]?: CmdArgs
};

export type Mcrl2ToolType = "mcrl22lps" | "lps2lts" | "lps2pbes" | "lpsactionrename" | "lpsbinary" | "lpsconfcheck" | "lpsconstelm" | "lpsinvelm" | "lpsparelm" | "lpsparunfold" | "lpspp" | "lpsrewr" | "lpssumelm" | "lpssuminst" | "lpsuntime" | "lpsinfo" | "lpsxsim" | "lts2lps" | "lts2pbes" | "ltsconvert" | "ltspbisim" | "diagraphica" | "ltscompare" | "ltsgraph" | "ltsinfo" | "ltsview" | "pbessolve";