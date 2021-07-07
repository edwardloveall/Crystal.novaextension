Provides syntax highlighting for **Crystal Lang**.

<img width="783" alt="screenshot" src="https://raw.githubusercontent.com/edwardloveall/Crystal.novaextension/main/Images/extension/screenshot.png">

## Language Support

The goal is to support every common situation and a handful of edgecases depending on how esoteric and difficult (or possible) to support with Nova's syntax highlighting rules.

No plans at the moment for .ecr as the author doesn't uses it.

## Formatting

This extension can optionally format the current file using `crystal tool format`. However, the path to crystal must be configured first. From the **Project** menu, select **Project Settings...**. Then in the **Crystal** sidebar fill out the path to the **Crystal Executable**. It's probably the output of `which crystal` on your command line but who knows! User paths are allowed, e.g. `~/.asdf/shims/crystal`.

To format a crystal file either use the key command `Option-Shift-C` or check the **Format on Save** option which will run the command every time a crystal file is saved.

All these options are set per-project so that different Crystal versions might be used for each project.

## Future Plans

* Macro highlighting
* File icon for .cr files (if possible)
  * seems not possible: https://devforum.nova.app/t/file-type-icon-themes/276

## Install Locally

Download this repo (via git or the download button up top), and open up the `Crystal.novaextension` folder with Nova. It will ask if you want to **Install** or **Open for Editing**.

Choose **Install**.

## TODO

* Block support with curly braces (as opposed to `do...end`)
  * `markups.flat_map { |markup| [markup.start, markup.end] }`
