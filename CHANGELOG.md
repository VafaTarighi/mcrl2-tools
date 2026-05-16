# Change Log

All notable changes to the "mcrl2-tools" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

## [0.0.5] - 2026-05-16
### Changed
- **Make-style Dependency Management:** Replaced the unreliable in-memory version tracking with a robust file-system-based check. The extension now compares modification timestamps (mtime) of input and output files to determine if a rebuild is necessary, similar to the `make` build system.
- **Recursive Dependency Rebuild:** Tool dependencies (e.g., `.mcrl2` -> `.lps` -> `.lts`) are now checked and rebuilt recursively. If a source file changes, all downstream intermediate files are automatically regenerated in a single command chain.
- **Project Overhaul & Refactoring:** 
    - Simplified the `Mcrl2Tool` architecture by moving core logic into the base class.
    - Centralized file path management across all mCRL2 tools.
    - Improved command generation to be more consistent and cleaner.
### Removed
- Removed manual "dirty" state tracking and the `resetDirty` utility.
- Deleted obsolete `getProjectPaths` utility.

## [0.0.2] - 2026-05-13
### Added
- Added `mcrl2` language contribution to natively recognize `.mcrl2` and `.mcf` files. This ensures the extension activates reliably without requiring users to install a separate third-party syntax highlighter.

## [0.0.1]
- Initial release