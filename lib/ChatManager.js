function ChatManager(containerID, width, height){
    this.containerID = containerID;
    this.listID = this.containerID+"_list";
    this.inputID = this.containerID+"_input";
    this.buttonID = this.containerID+"_button";
    this.width = width;
    this.height = height;

    this.container = $("#"+this.containerID);

    this.container.empty();
    this.container.css("width",this.width+"px");
    this.container.css("height",this.height+"px");

    var title = $('<h1></h1>').append('Comments');

    var list = $('<ul></ul>',{
	'id': this.listID
    });
    list.css('height',(this.height-110)+"px");
    list.css('min-width',50+"px");

    var input = $('<input/>',{
	'id': this.inputID,
	'type': 'Text'
    });
    input.css('width',parseInt(this.width-120)+"px");
    input.css('min-width',50+"px");
    
    var button = $('<input/>',{
	'id': this.buttonID,
	'type': 'Button',
	'value': 'Send'
    });

    var self= this;

    button.on('click',function(){
	var entry  = $('<li></li>').text($('#'+self.inputID).val());
	$('#'+self.inputID).val("");
	$('#'+self.listID).append(entry);
    });

    this.container.append(title);
    this.container.append(list);
    this.container.append(input);
    this.container.append(button);
}

ChatManager.prototype.showHistory = function(history){
    $(this.listID).empty();

    for(var i=0;i<history.length;i++){
	var entry  = $('<li></li>').text(history[i].text);
	$('#'+this.listID).append(entry);
    }
}
