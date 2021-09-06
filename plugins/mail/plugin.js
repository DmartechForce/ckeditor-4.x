CKEDITOR.plugins.add('mail', {
    icons: 'mail',
    init: function (editor) {
        editor.addCommand('mail', new CKEDITOR.dialogCommand('mailDialog'));
        editor.ui.addButton('Mail', {
            label: 'Insert Abbreviation',
            command: 'mail',
            toolbar: 'insert'
        })
        CKEDITOR.dialog.add( 'mailDialog', this.path + 'dialogs/mail.js' );
    }
});
