const format = (editor) => {
  try {
    const configPath = nova.workspace.config.get("com.edwardloveall.Crystal.crystalPath");
    if (configPath === "") return;
    const crystalPath = nova.path.expanduser(configPath);
    const textRange = new Range(0, editor.document.length);
    const content = editor.document.getTextInRange(textRange);

    const process = new Process(
      crystalPath,
      {
        args: ["tool", "format", "--no-color", "-"],
        stdio: "pipe",
      }
    );

    let output = "";
    process.onStdout((stdout) => output += stdout);
    process.onDidExit((status) => {
      if (status === 0) {
        editor.edit((edit) => {
           edit.replace(textRange, output);
        });
      }
    })
    process.onStderr((stderr) => {
      let notification = new NotificationRequest("crystal-format-error");
      notification.title = nova.localize("Crystal Format Error");
      notification.body = nova.localize(stderr);
      notification.actions = [nova.localize("OK")];
      nova.notifications.add(notification);
    });

    const writer = process.stdin.getWriter();
    writer.ready.then(() => {
        writer.write(content);
        writer.close();
    });
    process.start();
  } catch (err) {
    console.error("Could not call crystal tool format: " + err);
  }
}

exports.activate = function() {
  nova.workspace.onDidAddTextEditor((editor) => {
    if (editor.document.syntax != "crystal") return;

    editor.onWillSave((editor) => {
      const formatOnSave = nova.workspace.config.get("com.edwardloveall.Crystal.formatOnSave");
      if (formatOnSave) format(editor);
    });
  });

  nova.commands.register("crystal.format", (editor) => {
    format(editor);
  });
};
