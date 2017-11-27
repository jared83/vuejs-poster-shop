var app = new Vue({
    el: '#app',
    data: {
        total: 2,
        items: [
            { title: 'Item1', quantity: 1},
            { title: 'Item2', quantity: 1},
            { title: 'Item3', quantity: 1},
        ],
        cart: []
    },
    methods: {
        addItem: function(index){
            
            if (this.cart.length > 0) {
                added = false;
                this.cart.forEach(el => {
                    if (this.items[index].title === el.title) {
                        el.quantity += 1;
                        added = true;
                    } 
                });
                if (!added) {
                    this.cart.push(this.items[index]);
                }
            }
            else 
                this.cart.push(this.items[index]);
            this.total += 9.99;
        }
    }
})