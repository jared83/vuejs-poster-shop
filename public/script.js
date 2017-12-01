var app = new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [],
        cart: [],
        newSearch: 'vue.js',
        lastSearch: '',
        found: false
    },
    mounted: function() {
        this.find();
    },
    methods: {
        find: function(e) {
            this.items = [];
            this.found = false;
            this.$http
            .get('search/'.concat(this.newSearch))
            .then(res => {
                console.log(res.data);
                this.lastSearch = this.newSearch;
                this.items = res.data;
                this.items.forEach((element,index) => {
                    element.price = 9.99+index;
                });
                this.found = true;
            })
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