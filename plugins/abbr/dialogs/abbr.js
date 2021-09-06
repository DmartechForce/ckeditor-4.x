CKEDITOR.dialog.add( 'abbrDialog', function( editor ) {
    return {
        title: '弹出框',
        minWidth: 400,
        minHeight: 200,

        contents: [
            {
                id: 'tab-basic',
                label: '基础设置',
                elements: [
                    {
                        type: 'text',
                        id: 'abbr',
                        label: '缩写',
                        validate: CKEDITOR.dialog.validate.notEmpty( "Abbreviation field cannot be empty." )
                    },
                    {
                        type: 'text',
                        id: 'title',
                        label: '说明',
                        validate: CKEDITOR.dialog.validate.notEmpty( "Explanation field cannot be empty." )
                    }
                ],
            },
            {
                id: 'tab-adv',
                label: '高级设置',
                elements: [
                    {
                        type: 'text',
                        id: 'id',
                        label: 'Id'
                    }
                ]
            }
        ],
        onOK: function () {
            var dialog = this;
            var abbr = editor.document.createElement('abbr');

            abbr.setAttribute('title', dialog.getValueOf('tab-basic', 'title'));
            abbr.setText(dialog.getValueOf('tab-basic', 'abbr'));

            var id = dialog.getValueOf('tab-adv', 'id');
            if (id) {
                abbr.setAttribute('id', id);
            }
            editor.insertElement(abbr);
        }
    };
});
