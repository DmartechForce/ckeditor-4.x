/**
 @info: 根据lineheight插件修改,
 @about: 插入用户自定义字段，
 **/

(function () {
    function addCombo(editor, comboName, styleType, lang, defaultLabel, styleDefinition, order) {
        
        var AJAX_N = 0;
        
        var config = editor.config,
            style = new CKEDITOR.style(styleDefinition);
        
        //@info:插件事件和配置
        editor.ui.addRichCombo(comboName, {
            label: editor.lang.diystr.title,
            title: editor.lang.diystr.title,
            toolbar: 'styles,' + order,
            allowedContent: style,
            requiredContent: style,
            panel: {
                css: [CKEDITOR.skin.getPath('editor')].concat(config.contentsCss),
                multiSelect: false,
                attributes: {'aria-label': editor.lang.diylink.title}
            },
            
            /*
             *   如果需要后端提供的时候
             *   需要此生命周期函数
             **/
            onRender: function () {
                var self = this;
                
                if (AJAX_N == 0) {
                    // @配置文件到时候由后端提供
                    //var diy_item = ['{$email}','{$mobile}', '{$name}'];
                    
                    var diy_item = [];
                    
                    // @获取全部字段列表
                    // $.get(editor.config.apiURL + 'fields',
                    //     {pageSize: 9999999, page: 1},
                    //     function (res) {
                    
                    var data = top._fields;
                    for (var i = 0, len = data.length; i < len; i++) {
                        diy_item.push({field: '{$' + data[i].field + '}', fieldCn: data[i].fieldCn})
                    }
                    
                    setDiyStr(diy_item)
                    // });
                    
                    
                }
                AJAX_N++
                
                
                function setDiyStr(data) {
                    /*
                     *   字段是由后端配置的
                     *   所以一下所有的都是异步执行的
                     */
                    
                    
                    var names = data, values = [];
                    var styles = {};
                    
                    for (var i = 0; i < names.length; i++) {
                        var parts = names[i].field;
                        if (parts) {
                            parts = parts.split('/');
                            var vars = {}, name = names[i].field = parts[0];
                            vars[styleType] = values[i] = parts[1] || name;
                            styles[name] = new CKEDITOR.style(styleDefinition, vars);
                            styles[name]._.definition.name = names[i].fieldCn;
                        } else
                            names.splice(i--, 1);
                    }
                    
                    
                    /*
                     *   初始化下拉数据
                     */
                    
                    self.init = function () {
                        
                        this.startGroup(editor.lang.diystr.title);
                        
                        for (var i = 0; i < names.length; i++) {
                            var name = names[i].field;
                            this.add(name, styles[name].buildPreview(), name);
                        }
                        ;
                    };
                    
                    
                    /*
                     *   初始化行为
                     */
                    
                    self.onClick = function (value) {
                        editor.focus();
                        editor.fire('saveSnapshot');
                        var style = styles[value];
                        
                        // @要用编辑器本生的dom方法
                        var element = new CKEDITOR.dom.element('span', editor.document);
                        element.setText(value);
                        editor.insertElement(element);
                    }
                    
                    
                    /*
                     *   编辑器自带绑定事件
                     */
                    
                    editor.on('selectionChange', function (ev) {
                        var currentValue = this.getValue();
                        var elementPath = ev.data.path,
                            elements = elementPath.elements;
                        for (var i = 0, element; i < elements.length; i++) {
                            element = elements[i];
                            for (var value in styles) {
                                if (styles[value].checkElementMatch(element, true, editor)) {
                                    if (value != currentValue)
                                        this.setValue(value);
                                    return;
                                }
                            }
                        }
                        this.setValue('', defaultLabel);
                    }, self);
                    
                    
                };
                
            },
            
            refresh: function () {
                if (!editor.activeFilter.check(style))
                    this.setState(CKEDITOR.TRISTATE_DISABLED);
            }
        });
    };
    
    //@info:添加插件
    CKEDITOR.plugins.add('diystr', {
        requires: 'richcombo',
        init: function (editor) {
            var config = editor.config;
            addCombo(editor, 'diystr', 'size', editor.lang.diystr.title, editor.lang.diystr.title, config.diy_style, 40);
        }
    });
    
})();


CKEDITOR.config.diy_style = {
    element: 'span',
};

CKEDITOR.plugins.setLang('diystr', 'zh-cn', {
    title: '插入字段'
});
CKEDITOR.plugins.setLang('diystr', 'en', {
    title: 'Personalization'
});
