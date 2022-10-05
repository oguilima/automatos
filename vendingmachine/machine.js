function Machine() {
  this.money = 0;
}

Machine.prototype = {
  loadDoces: function(...args) {
    for (let i = 0; i < args.length; i++) {
      this[args[i].name] = [args[i]];
    }
  },

  update() {

    this.updateIndividualDoces();
    this.mapDoces();

  },

  turnOn() {
    document.getElementById('pagar').innerHTML = this.money;

    this.update();
  },

  addChange(amount = 0) {
    this.money+= amount;
    
    document.getElementById('d-cont').classList.add('fade');
    document.querySelector('.jpg').style.opacity = 0;

    let slice = this.money.toString().slice(0, 4);
    document.getElementById('pagar').innerHTML = slice;
  },

  purchase(node) {
    let self = Object.keys(this);

    for (let i = 1; i < self.length; i++) {
      if (node.firstElementChild.innerHTML === this[self[i]][0].code && this.money >= Number(this[self[i]][0].price)) {
        let name = this[self[i]][0].name;

        if (this[self[i]][0].amount > 0) {
          let newAmount = this.money - Number(this[self[i]][0].price);

          document.getElementById('d-cont').innerHTML = `<p>${name} Comprado</p>`
          document.getElementById('d-cont').classList.remove('fade');

          let doceNum = name.charAt(5);
          console.log(doceNum);

          if(doceNum == "1"){
            document.querySelector('.g-box').innerHTML = `<img class="jpg" src="./img/candy1.png" alt="">`
          }else if(doceNum == "2"){
            document.querySelector('.g-box').innerHTML = `<img class="jpg" src="./img/candy2.png" alt="">`
          }else{
            document.querySelector('.g-box').innerHTML = `<img class="jpg" src="./img/candy3.png" alt="">`
          }
          
          //document.querySelector('.g-box').classList.remove('fade');

          this[self[i]][0].amount--;
          this.resetChange(newAmount);

        } else {
          alert(`${name} está esgotado!`);
          this.resetChange(this.money);
        }

        this.update();
      }
    }
  },

  resetChange(amount = 0) {
    this.money = amount;

    document.getElementById('pagar').innerHTML = amount;

    this.update();
    this.addChange();
  },

  updateIndividualDoces() {
    let displayBox = document.getElementById('displayBox');
    let self = Object.keys(this);
    let displayArr = [];

    displayBox.innerHTML = '';

    for (let i = 1; i < self.length; i++) {
      displayArr.push(self[i]);
    }

    for (let i = 1; i < displayArr.length + 1; i++) {

        let div = document.createElement('div');
        let amount = this[self[i]][0].amount;
        let name = this[self[i]][0].name;

        div.className = 'display';
        div.innerHTML = `${name} (${amount})`;
        displayBox.append(div);
      }

      

  },

  mapDoces() {
    let self = Object.keys(this);
    let objArr = [];

    for (let i = 1; i < self.length; i++) {
        let name = this[self[i]][0].name.toLowerCase();
        document.getElementById(`${name}Box`).innerHTML = '';

        for (let j = 0; j < this[self[i]][0].amount; j++) {
          let div = document.createElement('div');
          let para = document.createElement('p');
          para.className = 'doce-text';
          para.innerHTML = name;
          div.className = `doce ${name}`;
          div.append(para);
          document.getElementById(`${name}Box`).prepend(div);
        }
    }
  },

  addListeners(nodeList) {
    for (let i = 0; i < nodeList.length; i++) {
      switch(nodeList[i].classList.value) {
        case 'button':
          nodeList[i].addEventListener('click', function() {
            machine.purchase(this);
          });
          break;
        case 'nota-outter':
          nodeList[i].addEventListener('click', function() {
            let amount = Number(this.firstElementChild.innerHTML);
            machine.addChange(amount);
          });
          break;
        default:
          break;
      }

    }
  }
}

function Item(name, amount, price, code) {
  this.name = name;
  this.amount = amount;
  this.price = price;
  this.code = code;
}

let machine = new Machine();
let currentDate = new Date();
currentDate.setDate(currentDate.getDate() + 7);

let doce1 = new Item('Doce 1', '5', '6', 'A1');
let doce2 = new Item('Doce 2', '5', '7', 'B3');
let doce3 = new Item('Doce 3', '5', '8', 'C4');



document.getElementById('reset').addEventListener('click', function() {
  machine.resetChange();
});

machine.addListeners(document.querySelectorAll('.button'));
machine.addListeners(document.querySelectorAll('.nota-outter'));
machine.loadDoces(doce1, doce2, doce3);
machine.turnOn();
