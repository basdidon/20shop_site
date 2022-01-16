import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

type Inputs = {
    productId:string,
    productName:string,
    productSummary:string,
    productPrinciplePrice:number,
    productPrice:number,
    productQuantity:number
};

const bodyFormData = new FormData();

const AddProduct=()=>{
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data =>{
        bodyFormData.append('product_id',data.productId);
        bodyFormData.append('product_name',data.productName);
        console.log(bodyFormData);
        axios({
            method: "post",
            url: 'http://localhost:8000/add_product',
            data: bodyFormData,
            headers: {"Content-Type": "multipart/form-data"},
        }).then(function (response) {
                //handle success
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
        console.log(data);
    }

    console.log(watch("productName")) // watch input value by passing the name of it

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <table>
                <thead>
                    <tr>
                        <th><label>รหัสสินค้า :</label></th>
                        <th><label>ชื่อสินค้า :</label></th>
                        <th><label>คำอธิบาย :</label></th>
                        <th><label>ราคาซื้อ :</label></th>
                        <th><label>ราคาขาย :</label></th>
                        <th><label>จำนวนคงเหลือ :</label></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input {...register("productId",{required:true})}/></td>
                        {errors.productId?.type === 'required' && "Product ID is required"}
                    </tr>
                    <tr>
                        <td><input {...register("productName")}/></td>
                    </tr>
                    <tr>
                        <td><textarea {...register("productSummary")}/></td>
                    </tr>
                    <tr>
                        <td><input {...register("productPrinciplePrice")}/></td>
                    </tr>
                    <tr>
                        <td><input {...register("productPrice")}/></td>
                    </tr>
                    <tr>
                        <td><input {...register("productQuantity")}/></td>
                    </tr>
                    <tr>
                        <td>
                            <button type="submit">Submit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
}

export default AddProduct;