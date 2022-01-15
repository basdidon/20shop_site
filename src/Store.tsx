import React,{useState, useEffect} from "react";
import axios from "axios";
import ProductItem from "./ProductItem";

const Store =()=>{
    const [isLoading, setLoading] = useState(true);
    const [ProductList, setProductList] = useState<any>(null);

    useEffect(()=>{
        axios.get('http://localhost:8000/database')
            .then(response => {
                setProductList(response.data);
                setLoading(false);
            })
    },[])

    const RenderProductItem =()=>{
        const items = [];
        try {
            for (let i = 0; i < ProductList.length; i++) {
                items.push(<ProductItem i={i}/>)
            }
        }catch{
            console.log('error')
        }
        return items;
    }

    // const RenderProductCategory = () => {
    //     const category = [];
    //     try {
    //         for (let i = 0;i < )
    //     }catch{
    //
    //     }
    // }

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    return <div className={"list-container"}>
        {/*{RenderProductCategory()}*/}
        {RenderProductItem()}
    </div>

}

export default Store;