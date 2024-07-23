const calculator = {
    current: "",
    opWith: "",
    opWithInput: false,
    operation: "",
    maxOutLength: 9,
    "+"(){
        this.current = (+this.current + +this.opWith).toString();
    },
    "-"(){
        this.current = (+this.current - +this.opWith).toString();
    },
    "*"(){
        this.current = (+this.current * +this.opWith).toString();
    },
    "/"(){
        this.current = (+this.current / +this.opWith).toString();
    },
    render(){
        let outputText;
        if(!this.opWithInput){
            outputText = this.current || '0';
        } else {
            outputText = this.opWith || '0';
        }

        outputText = outputText.split('.');
        outputText[0] = outputText[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        outputText = outputText.join(',');
        this.Output.innerText = outputText

    },
    clear(){
        this.current = "";
        this.opWith = "";

        this.ACBtn.classList.remove('none');
        this.CBtn.classList.add('none');

        this.render();
    },
    ACBtn: document.querySelector('#ACBtn'),
    CBtn: document.querySelector('#CBtn'),
    EqualBtn: document.querySelector('#EqualBtn'),
    Output: document.querySelector('h2')

}


const numButtons = document.querySelector('.input');

numButtons.addEventListener('click',(event) => {
    const button = event.target;

    if(button.classList.contains('input__btn_num')){
        if(calculator.opWithInput){
            if(calculator.opWith.length == calculator.maxOutLength) return
            calculator.opWith += button.innerText;
        } else {
            if(calculator.current.length ==  calculator.maxOutLength) return
            calculator.current += button.innerText;
        }

        if(calculator.CBtn.classList.contains('none')){
            calculator.ACBtn.classList.add('none');
            calculator.CBtn.classList.remove('none');
        }
        calculator.render()
        
    }
    else if(button == calculator.CBtn){
        calculator.clear();
    }
    else if(button == calculator.EqualBtn){
        console.log('huy')
        calculator[calculator.operation]();
        calculator.opWith = "";
        calculator.opWithInput = false;
        calculator.render();
    }
    else if(button.classList.contains('input__btn_mainOper')){
        calculator.operation = button.innerText;
        calculator.opWithInput = true;
    }

    
})

