function main(){
    var virtualMachine = new VirtualMachine();
    virtualMachine.input = textFile;
    virtualMachine.program = binFile;
    //console.log(virtualMachine);
    virtualMachine.executeProgram();
    document.getElementById("virtualMachine").innerHTML = "Output is:\n"+"<br>"+virtualMachine.output+"<br>";
    console.log("Output is:\n"+virtualMachine.output);
}