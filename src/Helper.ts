import axios from "axios";

export class Product{
    barcode: string;
    category: string;
    name: string;
    summary: string;
    initial_price: number;
    price: number;
    inStock: number;

    constructor(barcode:string,category:string,name:string,summary:string,initial_price:number,price:number,inStock:number) {
        this.barcode = barcode;
        this.category = category;
        this.name = name;
        this.summary = summary;
        this.initial_price = initial_price;
        this.price =price;
        this.inStock = inStock;
    }

    toString(){
        return "Product :"+
            "\n barcode : "+this.barcode+
            "\n category : "+this.category+
            "\n name : "+this.name+
            "\n summary : "+this.summary+
            "\n initial_price : "+this.initial_price+
            "\n price : "+this.price+
            "\n quantity : "+this.inStock
    }
}

export class Order{
    barcode: string;
    name: string;
    price: number;
    quantity: number;

    constructor(barcode:string,name:string,price:number,quantity:number) {
        this.barcode = barcode;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    toString(){
        return "Order :"+
            "\n barcode : "+this.barcode+
            "\n name : "+this.name+
            "\n price : "+this.price+
            "\n quantity : "+this.quantity
    }
}

export const findProductByBarcode = (barcode: string,cb:any) => {
    console.log("findProductByBarcode:"+barcode);
    let result: Product|undefined = undefined;
    axios.get('http://192.168.1.25:8000/product', {params: {barcode: barcode}})
        .then(res => {
            result = new Product(res.data[0]['product_id'],res.data[0]['category_id'],res.data[0]['product_name'],res.data[0]['product_summary'],res.data[0]['product_principal_price'],res.data[0]['product_price'],res.data[0]['product_quantity'])
            console.log("findProductByBarcode()");
            console.log(res.data);
            cb(null,result)
        }).catch(err => {
        console.log(err);
    });
}

