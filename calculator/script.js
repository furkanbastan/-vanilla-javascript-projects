class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.currentOperandTextElement=currentOperandTextElement
        this.previousOperandTextElement=previousOperandTextElement
        this.clear()
    }
    clear(){
        this.currentOperand="";
        this.previousOperand="";
        this.operation=undefined;
    }
    delete(){
        if(this.currentOperand != "") this.currentOperand = this.currentOperand.slice(0,-1);
    }
    appendNumber(number){
        if(number=="." && this.currentOperand.includes(".")) return;
        this.currentOperand=this.currentOperand.toString()+number.toString();
    }
    compute(){
        let computation;
        const prev=parseFloat(this.previousOperand)
        const current=parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case "+":
                computation=prev+current;
            break;
            case "-":
                computation=prev-current;
            break;
            case "*":
                computation=prev*current;
            break;
            case "/":
                computation=prev/current;
            break;
            default:
            return;
        }
        this.currentOperand=computation;
        this.previousOperand="";
        this.operation=undefined;
    }
    chooseOperation(operation){
        if(this.currentOperand=='') return
        this.operation=operation;
        this.previousOperand=this.currentOperand;
        this.currentOperand='';
    }
    updateDisplay(){
        this.currentOperandTextElement.innerText=this.currentOperand;
        if(this.operation==null){
            this.previousOperandTextElement.innerHTML='';
        }
        else{
            this.previousOperandTextElement.innerText=`${this.previousOperand} ${this.operation}`;
        }
    }
}

const allClearButton=document.querySelector("[data-all-clear]");
const deleteButton=document.querySelector("[data-delete]");
const operationButtons=document.querySelectorAll("[data-operation]");
const numberButtons=document.querySelectorAll("[data-number]");
const equalButton=document.querySelector("[data-equal]");
const previousOperandTextElement=document.querySelector('[data-previous-operand]');
const currentOperandTextElement=document.querySelector('[data-current-operand]');

const calculator=new Calculator(previousOperandTextElement,currentOperandTextElement);

allClearButton.addEventListener("click",()=>{
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener("click",()=>{
    calculator.delete();
    calculator.updateDisplay();
});

operationButtons.forEach(button=>{
    button.addEventListener("click",()=>{
        calculator.chooseOperation(button.innerHTML);
        calculator.updateDisplay();
    })
});

numberButtons.forEach(button=>{
    button.addEventListener("click",()=>{
        calculator.appendNumber(button.innerHTML);
        calculator.updateDisplay();
    });
});

equalButton.addEventListener("click",()=>{
    calculator.compute();
    calculator.updateDisplay();
})