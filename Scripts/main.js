const crystalFormat = require("./crystalFormat");

exports.activate = function () {
  const replaceDocument = (editor, text) => {
    const documentSpan = new Range(0, editor.document.length);
    editor.edit((edit) => {
      edit.replace(documentSpan, text);
    });
  };

  const notifyError = (message) => {
    let notification = new NotificationRequest("crystal-format-error");
    notification.title = nova.localize("Crystal Format Error");
    notification.body = nova.localize(message);
    notification.actions = [nova.localize("OK")];
    nova.notifications.add(notification);
    console.error(message);
  };

  const formatDocument = (editor) => {
    const documentSpan = new Range(0, editor.document.length);
    const documentText = editor.document.getTextInRange(documentSpan);
    return crystalFormat(documentText)
      .then((formattedText) => replaceDocument(editor, formattedText))
      .catch(notifyError);
  };

  nova.workspace.onDidAddTextEditor((editor) => {
    if (editor.document.syntax != "crystal") return;

    editor.onWillSave((editor) => {
      const formatOnSave = nova.workspace.config.get(
        "com.edwardloveall.Crystal.formatOnSave",
      );
      if (formatOnSave) {
        return formatDocument(editor);
      }
    });
  });

  nova.commands.register("crystal.format", formatDocument);
};
