var app = new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [
            { title: 'Item2', quantity: 0, price: 9.99, imgUrl: '/public/MeHQ.jpg', desc: 'It is me!!!!'},
            { title: 'Item1', quantity: 0, price: 9.99, imgUrl: '/public/MeHQ.jpg', desc: 'It is me!!!!'},
            { title: 'Item3', quantity: 0, price: 9.99, imgUrl: '/public/MeHQ.jpg', desc: 'It is me!!!!'},
            { title: 'Item3', quantity: 0, price: 9.99, imgUrl: '/public/MeHQ.jpg', desc: 'It is me!!!!'}
        ],
        cart: [],
        search: ''
    },
    methods: {
        getImages: (img, desc) => {
            console.log(img + ' ' + desc);
        },
        onSubmit: function(e) {
            console.log(this.search);
        },
        addItem: function(index){
            let item = this.items[index];
            item.quantity ? item.quantity : item.quantity = 1;
            added = this.cart.some(el => {
                        if (this.items[index] === el) {
                            el.quantity += 1;
                            return true;
                        }
                    });
            if (!added) {
                this.cart.push(this.items[index]);
            }
            this.total += item.price;
        },
        inc: function(item){
            item.quantity++;
            this.total += item.price;
        },
        dec: function(item){
            if (item.quantity > 1) {
                item.quantity--;
            }else {
                let index = this.cart.indexOf(item);
                item.quantity = 0;
                this.cart.splice(index, 1);
            }
            this.total -= item.price;
        }
    }, 
    filters: {
        currency: function(price) {
            return '$'.concat(price.toFixed(2));
        }
    }
})