import React, {useState} from "react";
import {findProductByBarcode,Order,Product} from "./Helper";

const Sale =()=>{
    const [tableData,setTableData] = useState<Order[]>([]);
    const [inputBarcode,setInputBarcode] = useState<string>('');
    const [consoleText,setConsoleText] = useState<string>('')
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {setInputBarcode(event.target.value)}

    const ProductRow =(props:any)=>{
        const removeOrder = (i:string) => {
            const arrayCopy = tableData.filter((tableData: { barcode: string; }) => tableData.barcode !== i);
            setTableData(arrayCopy);
        }

        console.log("ProductRow"+props.i)
        return (
            <tr>
                <td className={'table_view'}>{tableData[props.i].barcode}</td>
                <td className={'table_view'}>{tableData[props.i].name}</td>
                <td className={'table_view'}>{tableData[props.i].price}</td>
                <td className={'table_view'}>{tableData[props.i].quantity}</td>
                <td className={'table_view'}>{tableData[props.i].price*tableData[props.i].quantity}</td>
                <td><button id={'sale-remove-btn'}onClick={() => removeOrder(tableData[props.i].barcode)}>-</button></td>
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

    const renderConsoleText = () => {
        if (consoleText===''){
            return;
        }else {
            return <div id={"sale-console"}>
                <p>{consoleText}</p>
            </div>
        }
    }
    
    const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setConsoleText('');
        console.log("enter : "+inputBarcode);
        findProductByBarcode(inputBarcode,function(error:Error,result:Product){
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
        }).catch(err => {
            console.log("not found.")
            setInputBarcode('');
            setConsoleText("item not found !!!")
        })
    }

    return <div className={"list-container"} id={"sale-view"}>
        <table id={"sale-table"}>
            <thead>
                <tr>
                    <th className={'table_view'} id={"sale-th-01"}>รหัสสินค้า</th>
                    <th className={'table_view'} id={"sale-th-02"}>ชื่อสินค้า</th>
                    <th className={'table_view'} id={"sale-th-03"}>ราคา / หน่วย</th>
                    <th className={'table_view'} id={"sale-th-04"}>จำนวน</th>
                    <th className={'table_view'} id={"sale-th-05"}>ราคารวม / รายการ</th>
                </tr>
            </thead>
            <tbody>
                {renderProductRows()}
            </tbody>
        </table>
        <div id={"sale-sidebar"}>
            <div id={"sale-input"}>
                <h3>ราคารวม</h3>
                {renderTotalPrice()}
                <form onSubmit={onSubmit} id={"sale-form"}>
                    <input value={inputBarcode} onChange={onChange}/>
                    <input type="submit"/>
                </form>
            </div>
            {renderConsoleText()}
        </div>

    </div>
}

export default Sale;