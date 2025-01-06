# Red Bar

A Visual Studio Code extension that provides a visual reminder when working on specific projects, based on user-defined configurations.

## Requirements

- Visual Studio Code version 1.78.0 or higher (I haven't tested it below this version)

## Installation

1. Go to the [Releases Page](https://github.com/codemadan/red-bar-for-vscode/releases).
2. Download the extension (VSIX file) from the latest release.
3. Open Visual Studio Code.
4. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or by pressing `Ctrl+Shift+X`.
5. Click on the three-dot menu in the top-right corner of the Extensions view.
6. Select "Install from VSIX..." from the dropdown menu.
7. Navigate to the downloaded VSIX file and select it to install the extension.
8. Once installed, reload or restart Visual Studio Code to activate the extension.

## Usage

1. **Automatically Create Configuration:**
   - Open the Command Palette in Visual Studio Code by pressing `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac).
   - Type `Red Bar: Generate Config` and select the command to automatically create a `redbar.json` file in the `.vscode` directory of your workspace.
   - The warning bar will appear in the status bar based on your configuration.

2. **Manually Create Configuration:**
   - Create a `redbar.json` file in the `.vscode` directory of your workspace.
   - Define the `showWarning` and `warningMessage` properties as needed.
   - The warning bar will appear in the status bar based on your configuration.

## Configuration

The extension uses a configuration file named `redbar.json` located in the `.vscode` directory of your workspace. The configuration file supports the following properties:

- **`showWarning`**: A boolean value that determines whether the warning bar should be displayed.
- **`warningMessage`**: A string that specifies the message to be displayed in the warning bar.

### Example Configuration
```json
{
    "showWarning": true,
    "warningMessage": "⚠️ LIVE Environment Detected || Can be a live project"
}
```


## Features

- Displays a customizable warning bar in the status bar when working in a project with a specific configuration.
- Helps prevent accidental changes by providing a visual reminder for developers.

## Known Issues

None at the moment. Too Lazy to test it properly

## Contributing

Feel free to open issues or pull requests on the [GitHub repository](https://github.com/codemadan/red-bar-for-vscode).

## License

MIT