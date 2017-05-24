$.fn.bbEditor = function(custom_opt) {
    var _this = this,
        activeElement = null,
        insertPos,
        insertElementModalHandle;

    /**
     * Default options
     */
    var opt = $.extend({
        insertToolCaller: 'bb-insertTool-open'
    }, custom_opt );    

    /**
     * Init insert Tool
     */
    var insertTool = function(){
        var modal_html = '<div id="bb-insertTool" class="modal fade" role="dialog">'
            + '<div class="modal-dialog modal-lg">'
            +   '<div class="modal-content">'
            +       '<div class="modal-body"><div class="loader"></div></div>'
            +       '<div class="modal-footer">'
            +         '<button type="button" class="btn btn-warning" data-dismiss="modal">Cancel</button>'
            +       '</div>'
            +   '</div>'
            + '</div>'
        + '</div>';       

        $(modal_html).insertAfter(_this);       
        
        insertElementModalHandle = $(document).find('#bb-insertTool');
        var modal_body_handle = insertElementModalHandle.find('.modal-body');
        var loader_handle =insertElementModalHandle.find('.loader');
        
        $(document).on('click', '#'+opt.insertToolCaller, function(){
            var _caller = $(this);
            
            insertElementModalHandle.modal('show');
            loader_handle.show();      

            $.ajax({
                'method': 'GET',
                'url': home_path+'/bricks/builder/inserttool',
                'success': function(data){
                    modal_body_handle.empty().append(data);                    
                    
                    setActiveElement(_caller);
                }
            }).done(function(){
                
            });
            
        });
    };
    
    /**
     * Set active content element
     * @param {object} caller
     */
    var setActiveElement = function(caller){
        var _activeElement = caller.closest('.bb-insertable');
        
        if(_activeElement.length===0){
            activeElement = _this;
            insertPos = 'append';
        }else{
            activeElement = _activeElement;
            insertPos = 'prepend';
        }
    };
    
    //Insert element listener
    $(document).on('click', '.bb-insert', function(){
        insertElement($(this));
    });
    
    /**
     * Insert element into content
     * @param {object} element
     */
    var insertElement = function(element){
        insertElementModalHandle.modal('hide');        
        var content = element[0].outerHTML.replace('bb-insert','');
        
        if(insertPos==='append'){
            activeElement.append(content); 
        }else if(insertPos==='prepend'){
            activeElement.prepend(content); 
        }
        activeElement.find('.bb-insertable').append(elementMenu(element)); 
        setSortableElements();
    };
    
    /**
     * Set sortable elements 
     */
    var setSortableElements = function(){
        $('.bb-insertable').sortable();
    };
    
    
    /**
     * Set element menu
     * @param {object} element
     * @returns {String}
     */
    var elementMenu = function(element){
        var addElementButtonMini = '<i class="fa fa-plus bb-addElement" id="'+opt.insertToolCaller+'"></i>';
        return '<div class="bb-elementMenu">'+addElementButtonMini+'<i class="fa fa-gear"></i><i class="fa fa-trash bb-removeElement"></i></div>';
    };
    
    /**
     * Append default insert button to editable content
     */
    var appendDefaultInsertButton = function(){
        _this.append('<div class="row">'
            +   '<div class="col-sm-12 text-center mt10">'
            +       '<div class="bb-addElement btn btn-default btn-lg" id="'+opt.insertToolCaller+'"><i class="fa fa-plus"></i></div>'
            +   '</div>'
            + '</div>');
    };
    
    /* INITS - BEGIN */
    //Init insertTool
    insertTool();
    
    //Append default insert button
    appendDefaultInsertButton();
    
    /* INITS - END */

    return this;
};