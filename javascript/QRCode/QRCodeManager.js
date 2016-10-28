function QRCodeManager(containerID, width, height){
    this.containerID = containerID;
    this.width = width;
    this.height = height;

    $('#'+this.containerID).css("width",this.width);
    $('#'+this.containerID).css("height",this.height);
}

QRCodeManager.prototype.updateQRCode = function(url){
    $('#'+this.containerID).empty();
    $('#'+this.containerID).qrcode({
	"width" : this.width,
	"height": this.height,
	"text"  : url
    });
}
