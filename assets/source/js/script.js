var loader = '<div class="loader"></div>';
var addElementButton = '<div class="bb-addElement btn btn-default btn-sm" data-toggle="modal" data-target="#bb-addElement"><i class="fa fa-plus"></i></div>';
var addElementButtonMini = '<i class="fa fa-plus bb-addElement" data-toggle="modal" data-target="#bb-addElement"></i>';
var activeElement = null;
var addPos;
var isRoot = true;

var elementMenu = '<div class="bb-elementMenu">'+addElementButtonMini+'<i class="fa fa-gear"></i><i class="fa fa-trash bb-removeElement"></i></div>';

window.onload = function(){  
    $('body').append(loader);
};

$(document).ready(function(){
    setTimeout(function(){
        $('.loader').remove();
    }, 500);    
    
    $('[data-toggle="tooltip"]').tooltip(); 
});

$(document).on('click','.bb-addElement', function(){
    activeElement = $(this).closest('.bb-insertable');

    if(activeElement.length===0){
        activeElement = $('#bb-content');
        addPos = 'append';
        isRoot = true;
    }else{
        addPos = 'prepend';
        isRoot = false;
    }
});

$(document).on('click','.bb-removeElement', function(){
    $(this).closest('.bb-insertable').remove();
});

$('.bb-insert').click(function(){
    $('#bb-addElement').modal('hide');
    
    var content = $(this)[0].outerHTML;
    
    if(addPos==='append'){
        activeElement.append(content); 
    }else if(addPos==='prepend'){
        activeElement.prepend(content); 
    }
    
    activeElement.find('.bb-insertable').append(elementMenu);    
    $('.bb-insertable').sortable();
    
});

$('.bb-insertable').hover(function(){
    $(this).find('.bb-elementMenu').show();
});

$('body').dblclick(function() {
    disableEditorView();
});

var editor_view = true;
function disableEditorView()
{    
    if(editor_view){
        alert("Disable editor view");
        editor_view = false;
    }else{
        alert("Enable editor view");
        editor_view = true;
    }
}



$.fn.bbEditor = function() {
    var _this = this;

    var insertTool = function(){
        var modal_html = '<div id="bb-insertTool" class="modal fade" role="dialog">'
            + '<div class="modal-dialog modal-lg">'
            +   '<div class="modal-content">'
            +       '<div class="modal-body"><div>'
            +       '<div class="modal-footer">'
            +         '<button type="button" class="btn btn-warning" data-dismiss="modal">Cancel</button>'
            +       '</div>'
            +   '</div>'
            + '</div>'
        + '</div>';       

        return $(modal_html).insertAfter(_this);            
    };

    insertTool();

    return this;

};


