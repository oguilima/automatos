function abreItem(projeto){
    console.log(projeto)

    projeto == 'vending' ? window.location.href = './vendingmachine/index.html' : window.location.href = './elevador/index.html'

    /*if(projeto == 'vending'){
        window.location.href = './vendingmachine/'
    }else if(projeto == 'elevador'){

    }*/
}