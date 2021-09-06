
/**
 * https://stackoverflow.com/a/46514247/6611205
 * @return {String}
 */
function getFirstBrowserLanguage() {
    const nav = window.navigator;
    let language;
    
    language = Array.isArray(window.navigator.languages)
        ? nav.languages[0]
        : (nav.language || nav.browserLanguage || nav.systemLanguage || nav.userLanguage);
    
    switch (true) {
        case /en(-\w{2})?/.test(language): // all en-* end up as 'en'
            return 'en';
        case /zh(-\w{2})?/.test(language): // all zh-* end up as 'zh-CN'
            return 'zh-CN';
    }
}

/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */
CKEDITOR.editorConfig = function( config ) {
    // 浏览器加载默认显示内容设置为源文件
    // startupMode: 'source',
    //获取cookie
    function getCookie(name) {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        
        if(arr=document.cookie.match(reg))
            
            return unescape(arr[2]);
        else
            return null;
    }
    
    // 多语言
    let lang = localStorage.getItem('LANGUAGE_PREFERENCE');
    lang = lang || getFirstBrowserLanguage();
    config.language = lang;
    
    config.uiColor = '#ffffff';
    config.height = '500px';
    // 默认取消边框显示
    config.startupShowBorders = true;
    // 允许内容
    config.allowedContent = {
        $1: {
            // Use the ability to specify elements as an object.
            elements: CKEDITOR.dtd,
            attributes: true,
            styles: true,
            classes: true
        }
    };
    // 禁止内容 config.disallowedContent = '';
    //禁止编辑器自动将属性转换为内联样式
    config.disallowedContent = 'dl{width,height};dt{width,height};dd{width,height};img{width,height}';
    
    // 加载完整内容信息
    config.fullPage = true;
    
    // 取消可拖拽大小
    config.resize_enabled = false;
    
    // 加载自定义插件
    //config.extraPlugins = 'diystr,diylink,lineheight';
    config.extraPlugins = 'lineheight,diystr,diylink,sharedspace,sourcedialog';
    
    // 定义工具栏显示内容
    config.toolbar = [
        //['Source'],
        ['Cut','Copy','Paste','PasteText','PasteFromWord'],
        // ['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
        ['Undo','Redo'],
        ['Bold','Italic','Underline','Strike','-','Subscript','Superscript'],
        ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
        ['Link','Unlink'/*,'Anchor'*/],
        [/*,'Smiley','SpecialChar'*/],
        ['Image'],
        ['diystr', 'diylink'],
        ['Font','FontSize','lineheight'],
        ['TextColor','BGColor','Table'],
        // ['TextColor','BGColor','Timestamp', 'Mail']
    ];
    
    //根据不同的情况 插入不同的查看代码的配置
    // if($('#J_Tool').length > 0){
    //     config.toolbar.unshift(['Sourcedialog'])
    // } else {
        config.toolbar.unshift(['Source']);
    // }
    
    
    // 默认显示字体
    config.font_names = '微软雅黑/Microsoft YaHei, arial, sans-serif;' +
        '宋体/SimSun, arial, sans-serif;' +
        '黑体/SimHei, arial, sans-serif;' +
        'Arial/arial, sans-serif;' +
        'Times New Roman/Times New Roman, sans-serif;' +
        'Verdana/Verdana, sans-serif;';
    config.fontSize_sizes = '12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;30/30px;32/32px;34/34px;36/36px;38/38px;40/40px;42/22px;44/44px;46/46px;48/48px;50/50px;52/52px;54/54px;56/56px;58/58px;60/60px;';
    config.line_height = '0.9/0.9;1/1;1.1/1.1;1.2/1.2;1.3/1.3;1.4/1.4;1.5/1.5;1.6/1.6;1.7/1.7;1.8/1.8;1.9/1.9;2/2;2.1/2.1;2.2/2.2;2.3/2.3;2.4/2.4;2.5/2.5;2.6/2.6;2.7/2.7;2.8/2.8;2.9/2.9;3/3;';
    // 配置字体类型使用的标签
    config.font_style = {
        element: 'font',
        attributes: {
            'face': '#(family)'
        }
    };
    config.fontSize_style = {
        element: 'span',
        styles: {
            'font-size': '#(size)'
        }
    };
    config.specialChars = ['[', '♀', '♂', '♬', '♫', '♩', '✿', '★', '☆', '☻', '☼', '☽', '☾', '♤', '♡', '♢', '♧', '☜', '☞', '☏', '▧', '▨', '◐', '◑', '▷', '◁', '▽', '▼', '△', '▲', '◇', '◆', '□', '■', '✄', '✂', '✪', '✣', '✤', '✓', '✔', '✗', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', ']', '[', '☂', '☃', '☺', '✏', '✒', '✈', '☀', '♠', '♥', '❤', '♦', '♣', '♨', '✌', '☝', '☎', '✉', '✖', '▶', '◀', '↗', '↖', '↘', '↙', '↔', '↕', '↩', '↪', '⤵', '⤴', '☑', ']'];
    // 默认回车代码为br换行
    config.enterMode = CKEDITOR.ENTER_BR;
    config.shiftEnterMode = CKEDITOR.ENTER_BR;
    // 配置图片编辑器位置
    config.filebrowserBrowseUrl= '';
    config.filebrowserImageBrowseUrl = '';
    
    //	配置上传路径
    // config.filebrowserUploadUrl =  '';
    config.filebrowserWindowWidth= '1000';
    config.filebrowserWindowHeight= '700';
    
    // 环境变量控制
    config.apiURL=''
    
    // 配置工具栏位置
    // if($('#J_Tool').length > 0){
        config.sharedSpaces = {
            top: 'J_EditorTool',
        }
    // }
    
};
