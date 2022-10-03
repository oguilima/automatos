function Machine() {
  this.money = 0;
}

Machine.prototype = {
  loadSodas: function(...args) {
    for (let i = 0; i < args.length; i++) {
      this[args[i].name] = [args[i]];
    }
  },

  countAllSodas() {
    let total = 0;
    let self = Object.keys(this);
    for (let i = 1; i < self.length; i++) {
      let name = Object.keys(this)[i];

      total += Number(this[name][0].amount);
    }

    return total;
  },

  update() {
    let total = this.countAllSodas();
    let text = `${total} sodas`;

    this.updateIndividualSodas();
    this.mapSodas();
    (total > 0) ? document.getElementById('sodaCount').innerHTML = text : document.getElementById('sodaCount').innerHTML = 'Empty';
  },

  turnOn() {
    document.getElementById('pay').innerHTML = this.money;

    this.update();
  },

  addChange(amount = 0) {
    this.money+= amount;

    // I had to slice the 'money' state because .2 + .2 + .2 in JS is .6000000001 for some reason
    let slice = this.money.toString().slice(0, 4);
    document.getElementById('pay').innerHTML = slice;
  },

  purchase(node) {
    let self = Object.keys(this);

    for (let i = 1; i < self.length; i++) {
      if (node.firstElementChild.innerHTML === this[self[i]][0].code && this.money >= Number(this[self[i]][0].price)) {
        let name = this[self[i]][0].name;

        if (this[self[i]][0].amount > 0) {
          let newAmount = this.money - Number(this[self[i]][0].price);

          this[self[i]][0].amount--;
          this.resetChange(newAmount);
        } else {
          alert(`${name} is out of stock!`);
          this.resetChange(this.money);
        }

        this.update();
      }
    }
  },

  resetChange(amount = 0) {
    this.money = amount;

    this.update();
    this.addChange();
  },

  updateIndividualSodas() {
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

  mapSodas() {
    let self = Object.keys(this);
    let objArr = [];

    for (let i = 1; i < self.length; i++) {
        let name = this[self[i]][0].name.toLowerCase();
        document.getElementById(`${name}Box`).innerHTML = '';

        for (let j = 0; j < this[self[i]][0].amount; j++) {
          let div = document.createElement('div');
          let para = document.createElement('p');
          para.className = 'soda-text';
          para.innerHTML = name;
          div.className = `soda ${name}`;
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
        case 'coin-outter':
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

Item.prototype = {
  sodaCount: function() {
    return `We have ${this.amount} ${this.name}(s) left in stock`;
  }
}

let machine = new Machine();
let currentDate = new Date();
currentDate.setDate(currentDate.getDate() + 7);

let doce1 = new Item('Doce 1', '5', '6', 'A1');
let doce2 = new Item('Doce 2', '5', '7', 'B3');
let doce3 = new Item('Doce 3', '5', '8', 'C4');



document.getElementById('return').addEventListener('click', function() {
  machine.resetChange();
});

machine.addListeners(document.querySelectorAll('.button'));
machine.addListeners(document.querySelectorAll('.coin-outter'));
machine.loadSodas(doce1, doce2, doce3);
machine.turnOn();
