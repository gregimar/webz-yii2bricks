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
     * Return unique id for elements
     * @returns {Number} Unique ID
     */
    var generateUniqueId = function(){
        var timestamp = new Date().getTime();
        return Math.floor((Math.random() * 10000) + 1)+timestamp;
    };
    
    /**
     * Insert element into content
     * @param {object} element
     */
    var insertElement = function(element){
        insertElementModalHandle.modal('hide');
        
        //Add unique id to inserted element
        element.attr('data-bb-id', generateUniqueId());
        
        //Remove example contents from inserted elements
        element.find('.bb-element-example').remove();
        
        //Get inserted element content
        var content = element[0].outerHTML.replace('bb-insert','');
        
        if(insertPos==='append'){
            activeElement.append(content); 
        }else if(insertPos==='prepend'){
            activeElement.prepend(content); 
        }
        
        //Cal hooks for elements
        insertElementHook(element);
        
        //Set sortable elements
        setSortableElements();
    };
    
    var insertElementHook = function(element){
       
        //Init inline tinymce editor for block-text
        if(element.data('bb-type')==='block-text'){        
            tinymce.init({
                selector:'.bb-element[data-bb-id="'+element.data('bb-id')+'"]',
                inline: true               
            });
        }
        
        //Generate menu for inserted element
        elementMenu(element);
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
     */
    var elementMenu = function(element){
        var menu = '<div class="bb-elementMenu"></div>',
            addElementBtn = '<i class="fa fa-plus bb-addElement" id="'+opt.insertToolCaller+'"></i>',
            customizeElementBtn = '<i class="fa fa-gear"></i>',
            removeElementBtn = '<i class="fa fa-trash bb-removeElement"></i>';       
        
        //Append menu to insert elements and his childs with class .bb-element
        activeElement.find('.bb-element[data-bb-id="'+element.data('bb-id')+'"]').append(menu);        
        activeElement.find('.bb-element[data-bb-id="'+element.data('bb-id')+'"] .bb-element').append(menu);
        
        //Insert menu elements depend on element classes
        activeElement.find('.bb-element[data-bb-id="'+element.data('bb-id')+'"] .bb-elementMenu').each(function(i){
            
            if($(this).parent().hasClass('bb-insertable')){
                $(this).append(addElementBtn);
            }
            
            if($(this).parent().hasClass('bb-customizable')){
                $(this).append(customizeElementBtn);
            }
            
            if($(this).parent().hasClass('bb-removable')){
                $(this).append(removeElementBtn);
            }
            
        });
       
    };
    
    /**
     * Append default insert button to editable content
     */
    var appendDefaultInsertButton = function(){
        $('<div class="row">'
            +   '<div class="col-sm-12 text-center mt10">'
            +       '<div class="bb-addElement btn btn-default btn-lg" id="'+opt.insertToolCaller+'"><i class="fa fa-plus"></i></div>'
            +   '</div>'
            + '</div>')
        .insertAfter(_this);
    };
    
/* INITS - BEGIN */
    //Init insertTool
    insertTool();
    
    //Append default insert button
    appendDefaultInsertButton();
    
/* INITS - END */

    return this;
};