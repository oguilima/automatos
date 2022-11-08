function abreItem(projeto){
    console.log(projeto)

    //projeto == 'vending' ? window.location.href = './vendingmachine/index.html' :'

    if(projeto == 'vending'){
        window.location.href = './vendingmachine/index.html'
    }else if(projeto == 'elevador'){
        window.location.href = './elevador/index.html'
    }else if(projeto == 'analisador'){
        window.location.href = './analiseLex/index.html'
    }
}