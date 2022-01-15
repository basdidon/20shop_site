import React,{useState,useEffect} from "react";
import axios from "axios";

const ProductTable =()=>{
    const [isLoading,setLoading] = useState(true);
    const [tableData,setTableData] = useState<any>(null);

    const ProductRow =(props:any)=>{
        console.log("ProductRow"+props.i)
        return (
            <tr>
                <td className={'table_view'}>{tableData[props.i]['product_id']}</td>
                <td className={'table_view'}>{tableData[props.i]['product_name']}</td>
                <td className={'table_view'}>{tableData[props.i]['product_summary']}</td>
                <td className={'table_view'}>{tableData[props.i]['product_principal_price']}</td>
                <td className={'table_view'}>{tableData[props.i]['product_price']}</td>
                <td className={'table_view'}>{tableData[props.i]['product_quantity']}</td>
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

    useEffect(()=>{
        axios.get('http://192.168.1.25:8000/database')
            .then(response => {
                setTableData(response.data);
                setLoading(false);
            })
    },[])

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th className={'table_view'}>รหัสสินค้า</th>
                        <th className={'table_view'}>ชื่อสินค้า</th>
                        <th className={'table_view'}>คำอธิบาย</th>
                        <th className={'table_view'}>ราคาซื้อ</th>
                        <th className={'table_view'}>ราคาขาย</th>
                        <th className={'table_view'}>จำนวนคงเหลือ</th>
                    </tr>
                </thead>
                <tbody>
                    {renderProductRows()}
                </tbody>
            </table>
            <span>: {JSON.stringify(tableData)}</span>
        </div>
    );
}

export default ProductTable;