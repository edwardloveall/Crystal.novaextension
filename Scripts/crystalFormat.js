const crystalFormat = (inputText) => {
  const setUpProcess = (reject) => {
    const configPath = nova.workspace.config.get(
      "com.edwardloveall.Crystal.crystalPath",
    );
    if (configPath.trim() === "") {
      const message =
        "Please provide a crystal executable in Project Settings to enable formatting.";
      reject(message);
    }
    const crystalPath = nova.path.expanduser(configPath);

    return new Process(crystalPath, {
      args: ["tool", "format", "--no-color", "-"],
      stdio: "pipe",
    });
  };

  const writeToStdin = (process, inputText) => {
    const writer = process.stdin.getWriter();
    writer.ready.then(() => {
      writer.write(inputText);
      writer.close();
    });
  };

  const collectOutputText = (stdout, buffer) => (buffer.stdout += stdout);
  const collectErrorText = (stderr, buffer) => (buffer.stderr += stderr);

  return new Promise((resolve, reject) => {
    try {
      const process = setUpProcess(reject);
      let buffer = { stdout: "", stderr: "" };

      process.onStdout((stdout) => collectOutputText(stdout, buffer));
      process.onStderr((stderr) => collectErrorText(stderr, buffer));
      process.onDidExit((status) => {
        if (status === 0) {
          resolve(buffer.stdout);
        } else {
          reject(buffer.stderr);
        }
      });
      writeToStdin(process, inputText);
      process.start();
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = crystalFormat;
