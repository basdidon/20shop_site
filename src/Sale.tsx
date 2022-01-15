import React, {useState, useEffect, FormEventHandler} from "react";
import {findProductByBarcode,Order,Product} from "./Helper";

type Inputs = {
    barcode: string;
}

const Sale =()=>{
    const [tableData,setTableData] = useState<Order[]>([]);
    const [inputBarcode,setInputBarcode] = useState('');
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {setInputBarcode(event.target.value)}

    const ProductRow =(props:any)=>{
        console.log("ProductRow"+props.i)
        return (
            <tr>
                <td className={'table_view'}>{tableData[props.i].barcode}</td>
                <td className={'table_view'}>{tableData[props.i].name}</td>
                <td className={'table_view'}>{tableData[props.i].price}</td>
                <td className={'table_view'}>{tableData[props.i].quantity}</td>
                <td className={'table_view'}>{tableData[props.i].price*tableData[props.i].quantity}</td>
            </tr>
        )
    }

    const renderProductRows = () => {
        const rows  = [];
        try {
            for (let i=0;i<tableData.length;i++){
                rows.push(<ProductRow i={i}/>)
            }
        }catch{
            console.log('error')
        }
        return rows;
    };

    const renderTotalPrice = () => {
        let totalPrice = 0;
        tableData.forEach(element=>totalPrice += element.price * element.quantity)

        return (
            <h1>{totalPrice}</h1>
        )
    }
    
    const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        let new_order;
        event.preventDefault();
        console.log("enter : "+inputBarcode);
        findProductByBarcode(inputBarcode,function(error:any,result:Product){
            console.log("Callback()");
            if (error){
                console.log("findProductByBarcode[error]");
            }
            else {
                if(result instanceof Product){
                    if (tableData.length===0){
                        console.log("first new data");
                        tableData.push(new Order(inputBarcode,result.name,result.price,1));
                        setTableData(tableData);
                    }else {
                        console.log("new data");
                        console.log("tableData.length : "+tableData.length);
                        tableData.forEach(element=>console.log("[ "+ element.barcode+" ]"));
                        let foundIndex = tableData.findIndex(element=>element.barcode===inputBarcode);
                        if(foundIndex >= 0){
                            console.log("add exiting data");
                            let tempArray = tableData;
                            tempArray[foundIndex].quantity++;
                            setTableData(tempArray);
                        }else {
                            console.log("new data");
                            tableData.push(new Order(inputBarcode,result.name,result.price,1));
                            setTableData(tableData);
                        }
                    }
                    console.log(tableData);
                    console.log("-----------------------------")
                    setInputBarcode('');
                }else {
                    console.log("not found");
                }
            }
        })
    }

    // const onSubmit: SubmitHandler<Inputs> = data =>{
    //     console.log('onSubmit()');
    //     const res :any= [];
    //     console.log("orders : "+orders.length);
    //     if(orders.length===0){
    //         findProductByBarcode('9786167890906',function (error:any,result:any){
    //             if (error){}
    //             else {
    //                 orders.push(new Order(data.barcode,res['product_name'],res['product_price'],0));
    //                 console.log(orders);
    //                 orders.forEach(element=>console.log(":barcode: "+element.i_barcode));
    //                 console.log("after : "+orders.length);
    //             }
    //         });
    //     }else {
    //         orders.forEach((element)=>{
    //             console.log("aa");
    //             if(data.barcode!==element.i_barcode){
    //                 console.log("sasa");
    //                 findProductByBarcode('9786167890906',function (error:any,result:any){
    //                     if (error){}
    //                     else {
    //                         let new_order = new Order(data.barcode,res['product_name'],1,0);
    //                         orders.push(new_order);
    //                         orders.forEach(element=>console.log(":barcode: "+element.i_barcode));
    //                     }
    //                 });
    //             }else {
    //                 element.i_quantity++;
    //                 orders.forEach(element=>console.log(element.i_barcode+"(qyt): "+element.i_quantity));
    //             }
    //         });
    //         setTableData(orders);
    //         renderProductRows();
    //     }


        // let new_order = new Order(data.barcode,"_name_",1,0)
        // orders.push(new_order);
        // console.log(orders.length);
        // orders.forEach(element=>console.log(element));
    //}

    // return <div className={"list-container"}>
    //     <form onSubmit={handleSubmit(onSubmit)}>
    //         <table>
    //             <thead>
    //                 <tr>
    //                     <th className={'table_view'}>รหัสสินค้า</th>
    //                     <th className={'table_view'}>ชื่อสินค้า</th>
    //                     <th className={'table_view'}>ราคาต่อหน่วย</th>
    //                     <th className={'table_view'}>จำนวน</th>
    //                     <th className={'table_view'}>ราคารวม</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {renderProductRows()}
    //             </tbody>
    //         </table>
    //         <input {...register("barcode")} />
    //         <input type="submit" />
    //     </form>
    // </div>

    return <div className={"list-container"} id={"sale-view"}>
        <table id={"sale-table"}>
            <thead>
                <th className={'table_view'} id={"sale-th-01"}>รหัสสินค้า</th>
                <th className={'table_view'} id={"sale-th-02"}>ชื่อสินค้า</th>
                <th className={'table_view'} id={"sale-th-03"}>ราคา / หน่วย</th>
                <th className={'table_view'} id={"sale-th-04"}>จำนวน</th>
                <th className={'table_view'} id={"sale-th-05"}>ราคารวม / รายการ</th>
            </thead>
            <tbody>
                {renderProductRows()}
            </tbody>
        </table>
        <form onSubmit={onSubmit} id={"sale-form"}>
            <div id={"sale-sidebar"}>
                <h3>ราคารวม</h3>
                {renderTotalPrice()}
                <div id={"sale-input"}>
                    <input value={inputBarcode} onChange={onChange}/>
                    <input type="submit"/>
                </div>
            </div>
        </form>
    </div>
}

export default Sale;