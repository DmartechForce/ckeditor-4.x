CKEDITOR.dialog.add(
    'mailDialog',
    function( editor ) {
        var c = editor.lang.common,
        b = editor.lang.link

        return {
            title: 'Abbreviation Properties',
            minWidth: 400,
            minHeight: 200,
            contents: [
                {
                    id: 'tab-basic',
                    label: 'Basic Settings',
                    elements: [
                        {
                            type: 'select',
                            id: 'abbr',
                            label: 'Abbreviation',
                            width: '100%',
                            "default": "#",
                            style: "width : 100%;",
                            items: [
                                [c.notSet, "#"],
                                [b.targetFrame, "frame"],
                                [b.targetPopup, "popup"],
                                [c.targetNew, "_blank"],
                                [c.targetTop, "_top"],
                                [c.targetSelf, "_self"],
                                [c.targetParent, "_parent"]
                            ],
                        }
                    ]
                }
            ],
            onOk: function() {
                var dialog = this;

                var abbr = editor.document.createElement( 'a' );
                abbr.setAttribute( 'href', dialog.getValueOf( 'tab-basic', 'abbr') );
                abbr.setText('asdas');

                editor.insertElement( abbr );
            }
        };
    }
);
