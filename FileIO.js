var textFile;
var binFile;

var openTextFile = function(event) {
    var input = event.target;

    var reader = new FileReader()
    reader.onload = function(){
        textFile =arrayBufferToHex( reader.result);//bad
        console.log("Text file has been read:\n"+textFile);
    };

    reader.readAsArrayBuffer(input.files[0])//bad juls
};
var openBinFile = function(event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){
        binFile = arrayBufferToHex(reader.result);
        console.log("Bin file has been read:\n"+binFile);
    };

    //array buffer tai consolei buna kiekvienas byte kaip integeris
    reader.readAsArrayBuffer(input.files[0]);
};
function arrayBufferToHex(buffer) {
    //creates a new array while calling the call function on every element
    //                              skaityk array bufferi kaip tokio tipo
    //                                                     sutruminta funkcija, parameras "x" ir return kas po rodykles
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}