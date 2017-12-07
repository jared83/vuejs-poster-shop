const LOAD_NUM = 10;
var app = new Vue({
    el: '#app',
    data: {
        total: 0,
        results: [],
        items: [],
        cart: [],
        newSearch: 'view',
        lastSearch: '',
        found: false,
        placeholder: 'Search for posters'
    },
    computed: {
        //Moved from the View:
        noMoreItems () {
            return this.items.length === this.results.length && this.results.length > 0;
        },
        notLoaded () {
            return !this.found && this.lastSearch && this.items.length > 0;
        }
    },
    mounted: function() {
        this.find();
        vueInst = this;
        let elem = document.getElementById('product-list-bottom');
        let watcher = scrollMonitor.create(elem);
        watcher.enterViewport(() => {
            vueInst.renderMore();
        })
    },
    methods: {
        renderMore: function(){
            if (this.items.length < this.results.length){
                let append = this.results.slice(this.items.length, this.items.length+LOAD_NUM);
                this.items = this.items.concat(append);
            }
        },
        find: function(e) {
            if (this.newSearch.length) {
                this.items = [];
                this.found = false;
                this.$http
                .get('search/'.concat(this.newSearch))
                .then(res => {
                    console.log(res.data);
                    this.lastSearch = this.newSearch;
                    this.results = res.data;
                    this.results.forEach((element,index) => {
                        element.price = 9.99+index;
                    });
                    this.items = this.results.slice(0,10);
                    this.found = true;
                })
            } else {
                this.placeholder = 'Type in something...';
            }
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
});