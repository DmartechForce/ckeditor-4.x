/**
 @info: 根据lineheight插件修改,
 @about: 插入用户自定义字段，
 **/

( function() {
    function addCombo( editor, comboName, styleType, lang, entries, defaultLabel, styleDefinition, order ) {
        
        var config = editor.config,
            style = new CKEDITOR.style( styleDefinition );
        
        var names = entries.split( ';' ),values = [];
        var styles = {};
        
        for ( var i = 0; i < names.length; i++ ) {
            var parts = names[ i ];
            if ( parts ) {
                parts = parts.split( '/' );
                var vars = {},name = names[ i ] = parts[ 0 ];
                vars[ styleType ] = values[ i ] = parts[ 1 ] || name;
                styles[ name ] = new CKEDITOR.style( styleDefinition, vars );
                styles[ name ]._.definition.name = name;
            } else
                names.splice( i--, 1 );
        }
        
        //@info:插件事件和配置
        editor.ui.addRichCombo( comboName, {
            label: editor.lang.diylink.title,
            title: editor.lang.diylink.title,
            toolbar: 'styles,' + order,
            allowedContent: style,
            requiredContent: style,
            panel: {
                css: [ CKEDITOR.skin.getPath( 'editor' ) ].concat( config.contentsCss ),
                multiSelect: false,
                attributes: { 'aria-label': editor.lang.diylink.title }
            },
            
            init: function() {
                this.startGroup(editor.lang.diylink.title);
                for ( var i = 0; i < names.length; i++ ) {
                    var name = names[ i ];
                    this.add( name, styles[ name ].buildPreview(), name );
                }
            },
            
            onClick: function( value ) {
                editor.focus();
                editor.fire( 'saveSnapshot' );
                var style = styles[ value ];
                
                //@info：修改其元素
                style.element = 'a';
                
                editor[ this.getValue() == value ? 'removeStyle' : 'applyStyle' ]( style );
                editor.fire( 'saveSnapshot' );
            },
            
            onRender: function() {
                editor.on( 'selectionChange', function( ev ) {
                    var currentValue = this.getValue();
                    var elementPath = ev.data.path,
                        elements = elementPath.elements;
                    for ( var i = 0, element; i < elements.length; i++ ) {
                        element = elements[ i ];
                        for ( var value in styles ) {
                            if ( styles[ value ].checkElementMatch( element, true, editor ) ) {
                                if ( value != currentValue )
                                    this.setValue( value );
                                return;
                            }
                        }
                    }
                    this.setValue( '', defaultLabel );
                }, this );
            },
            
            refresh: function() {
                if ( !editor.activeFilter.check( style ) )
                    this.setState( CKEDITOR.TRISTATE_DISABLED );
            }
        } );
    };
    
    //@info:添加插件
    CKEDITOR.plugins.add( 'diylink', {
        requires: 'richcombo',
        init: function( editor ) {
            var config = editor.config;
            addCombo( editor, 'diylink', 'size', editor.lang.diylink.title, config.diy_link_item, editor.lang.diylink.title, config.diy_link_style, 40 );
        }
    });
    
} )();


CKEDITOR.config.diy_link_item = '{$WEBLINK};{$PLUGINLINK=unsubscribe};{$PLUGINLINK=subscribe}';

CKEDITOR.config.diy_link_style = {
    element: 'span',
    attributes: { 'href': '#(size)' },
};

CKEDITOR.plugins.setLang('diylink','zh-cn', {
    title: '添加链接'
});
CKEDITOR.plugins.setLang('diylink','en', {
    title: 'Add link'
});
