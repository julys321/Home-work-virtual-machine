class VirtualMachine {
    constructor(){
        this.program = "";
        this.input = "";//nono
        this.output = "";//nono
        this.readHead = 0;//nono
        //limt to 8
        this.registers = [];
        this.programCounter = 0;
        this.memory = "";
        this.isEndOfFile = 0;
    }

    getComand(){
        return parseInt(this.program[this.programCounter*4]+this.program[this.programCounter*4+1],16);
    }

    getParam(){
        return parseInt(this.program[this.programCounter*4+2]+this.program[this.programCounter*4+3],16);
    }

    getParams(){
        var params = (this.program[this.programCounter*4+2]+this.program[this.programCounter*4+3]).split('');
        params[0]=parseInt(params[0],16);
        params[1]=parseInt(params[1],16);
        return params;
    }

    executeProgram(){
        var command;
        while(command != 0x0B){
            //console.log(this.programCounter,this.getComand(),this.getParam(),this.registers,this.isEndOfFile,this.output,this.programCounter);
            command = this.getComand();
            switch(command) {
                case 0x01:
                    this.incrementRegistry(this.getParam());
                    this.programCounter++;
                    break;
                case 0x02:
                    this.decrementRegistry(this.getParam());
                    this.programCounter++;
                    break;
                case 0x03:
                    var params = this.getParams();
                    this.moveRegistry(params[1],params[0]);
                    this.programCounter++;
                    break;
                case 0x04:
                    this.moveToFirstRegister(this.getParam());
                    this.programCounter++;
                    break;
                case 0x05:
                    this.shiftLeft(this.getParam());
                    this.programCounter++;
                    break;
                case 0x06:
                    this.shiftRight(this.getParam());
                    this.programCounter++;
                    break;
                case 0x07:
                    this.jump(this.getParam());
                    break;
                case 0x08:
                    console.log("Not Implemented JZ")
                    break;
                case 0x09:
                    console.log("Not Implemented JNZ")
                    break;
                case 0x0A:
                    this.jumpWhenEOF(this.getParam());
                    if(!this.isEndOfFile)
                        this.programCounter++;
                    break;
                case 0x0B:
                    console.log("End of program")
                    this.programCounter++;
                    break;
                case 0x0C:
                    var params = this.getParams();
                    this.addition(params[1],params[0]);
                    this.programCounter++;
                    break;
                case 0x0D:
                    var params = this.getParams();
                    this.subtract(params[1],params[0]);
                    this.programCounter++;
                    break;
                case 0x0E:
                    var params = this.getParams();
                    this.xor(params[1],params[0]);
                    this.programCounter++;
                    break;
                case 0x0F:
                    var params = this.getParams();
                    this.or(params[1],params[0]);
                    this.programCounter++;
                    break;
                case 0x10:
                    this.readByte(this.getParam());
                    this.programCounter++;
                    break;
                case 0x11:
                    this.outputRegister(this.getParam());
                    this.programCounter++;
                    break;
            }
            
            
        }
    }

    incrementRegistry(adress){
        this.registers[adress]++;
    }

    decrementRegistry(adress){
        this.registers[adress]--;
    }

    moveRegistry(fromRegistryAdress,toRegistryAdress){
        this.registers[toRegistryAdress]=this.registers[fromRegistryAdress];
    }

    moveToFirstRegister(byteConstant){
        this.registers[0]=byteConstant;
    }

    shiftLeft(adress){
        this.registers[adress] = this.registers[adress] << 1;
    }

    shiftRight(adress){
        this.registers[adress] = this.registers[adress] >> 1;
    }

    jump(adress){
        if(adress <= 127)
            this.programCounter = this.programCounter + (adress/2);
        else
            this.programCounter = (this.programCounter*2-1) + adress -256;
    }

    jumpWhenZeroFlagIsSet(adress){
        //TODO
    }

    jumpWhenZeroFlagIsNotSet(adress){
        //TODO
    }

    jumpWhenEOF(adress){
        if(this.isEndOfFile)
            this.jump(adress);
    }

    addition(registry1Adress,registry2Adress){
        this.registers[registry1Adress]= this.registers[registry1Adress] + this.registers[registry2Adress]
    }

    subtract(registry1Adress,registry2Adress){
        this.registers[registry1Adress] = this.registers[registry1Adress] - this.registers[registry2Adress];
    }

    xor(registry1Adress,registry2Adress){
        this.registers[registry1Adress]=this.registers[registry1Adress]^this.registers[registry2Adress];
    }

    or(registry1Adress,registry2Adress){
        this.registers[registry1Adress]=this.registers[registry1Adress]|this.registers[registry2Adress];
    }

    readByte(adress){
        if(this.input.length >= this.readHead*2){
            this.registers[adress] = parseInt(this.input[this.readHead*2]+this.input[this.readHead*2+1],16);
            this.readHead++;
        }
        if(this.input.length < this.readHead*2+1){
            this.isEndOfFile = 1;
        }
    }

    outputRegister(adress){
        this.output +=  String.fromCharCode(this.registers[adress]);
    }

}