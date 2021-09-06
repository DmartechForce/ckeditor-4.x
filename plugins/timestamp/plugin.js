CKEDITOR.plugins.add( 'timestamp', {
    icons: 'timestamp',
    init: function( editor ) {
        editor.ui.addButton( 'Timestamp', {
            label: 'Insert Timestamp',
            command: 'insertTimestamp',
            toolbar: 'insert'
        });
        editor.addCommand( 'insertTimestamp', {
            exec: function( editor ) {
                editor.insertHtml( '2015年12月21日' );
            }
        });
    }
});
