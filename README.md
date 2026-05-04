# mCRL2 Tools

**mCRL2 Tools** is a Visual Studio Code extension that adds commands to seamlessly use the mCRL2 toolchain directly from your editor.

Designed for developers working with the mCRL2 specification language, this extension provides intelligent tool execution, Editor Title menus, and Command Palette integration for a smoother verification workflow.

## Features

- **Smart Toolchain Execution:** The extension tracks changes to your `.mcrl2` files. If you trigger a downstream command (like viewing an LTS graph) and the source file has changed, the extension automatically runs the required prerequisite tools in the chain before executing your requested command. If the file is unmodified, it saves time by only calling the final tool.
    
- **Editor Integration:** Easily access frequently used commands like viewing LTS (`ltsview`) and visualizing LTS graphs (`ltsgraph`) directly from the editor title navigation.
    
- **Run Menu Accessibility:** A dedicated run menu in the editor title allows quick access to conversion and simulation tools when a `.mcrl2` file is active.
    
- **Command Palette Support:** All tools are fully integrated into the VSCode Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) and are contextualized to appear when the active editor language is `mcrl2`.
    

## Supported Commands

The extension contributes the following commands:

- `mCRL2: (mcrl22lps) Convert mCRL2 to LPS`
    
- `mCRL2: (lps2lts) Convert LPS to LTS`
    
- `mCRL2: (lps2pbes) Convert LPS to PBES`
    
- `mCRL2: (lpsinfo) Show LPS Information`
    
- `mCRL2: (lpsxsim) Extended Simulation of LPS`
    
- `mCRL2: (ltsgraph) Visualize LTS Graph`
    
- `mCRL2: (ltsinfo) Show LTS Information`
    
- `mCRL2: (ltsview) View LTS`
    
- `mCRL2: (pbessolve) Solve PBES`
    

## Requirements

- **VSCode:** Version `^1.116.0` or higher.
    
- **mCRL2 Toolset:** You must have the official mCRL2 toolchain installed on your system and available in your system's PATH.
    
- **Activation:** The extension automatically activates when your workspace contains `/*.mcrl2` files.
    

## Extension Settings

You can customize the behavior and flags of each individual mCRL2 tool via VSCode settings.

Configurations are structured under the `mCRL2` namespace using the following format:

`mCRL2.[tool].[flag]`

_(Check the extension settings page within VSCode for a complete list of configurable flags for tools like `mcrl22lps`, `lps2lts`, etc.)_

## About mCRL2
[mCRL2](https://mcrl2.org/ ) is a formal specification language with an extensive toolset for modelling, validation and verification of concurrent systems and protocols.
## License
MIT
## Contributing
Found an issue or have a suggestion? Please open an issue on [GitHub](https://github.com/VafaTarighi/mcrl2-icons "https://github.com/VafaTarighi/mcrl2-icons").