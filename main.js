function main(){
    var virtualMachine = new VirtualMachine();
    virtualMachine.input = textFile;
    virtualMachine.program = binFile;
    //console.log(virtualMachine);
    virtualMachine.executeProgram();
    console.log("Output is:\n"+virtualMachine.output);
}