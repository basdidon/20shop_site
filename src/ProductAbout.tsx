import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams} from "react-router-dom";
import {findProductByBarcode, Product} from "./Helper";

const ProductAbout = () => {
    const [inputBarcode,setInputBarcode] = useState('');
    const [product,setProduct] = useState<Product|undefined>();
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {setInputBarcode(event.target.value)}
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        findProductByBarcode(inputBarcode,function(error:any,result:Product){
            console.log("Callback()");
            if (error){
                console.log("findProductByBarcode[error]");
            }else {
                console.log(result);
                setProduct(result)
                setInputBarcode('');
            }
        })

    }

    const renderData = () => {
        if (product instanceof Product){
            return <div>
                <table>
                    <tr>
                        <th>ชื่อสินค้า</th>
                        <td>{product.name}</td>
                    </tr>
                    <tr>
                        <th>รหัสสินค้า</th>
                        <td>{product.barcode}</td>
                    </tr>
                    <tr>
                        <th>ประเภทสินค้า</th>
                        <td>{product.category}</td>
                    </tr>
                    <tr>
                        <th>คำอธิบาย</th>
                        <td>{product.summary}</td>
                    </tr>
                    <tr>
                        <th>ราคาต้น</th>
                        <td>{product.initial_price}</td>
                    </tr>
                    <tr>
                        <th>ราคาขาย</th>
                        <td>{product.price}</td>
                    </tr>
                    <tr>
                        <th>จำนวนสินค้าใหนสต็อค</th>
                        <td>{product.inStock}</td>
                    </tr>
                </table>
            </div>
        }else {
            return <h2>Loading......</h2>
        }
    }

    return  <div>
        <form id={'nav-search'} onSubmit={onSubmit}>
            <span> <input value={inputBarcode} onChange={onChange}/><input type="submit" value={"ค้นหา"}/></span>
        </form>
        {renderData()}
    </div>
}

export default ProductAbout;