import React from "react";
import box_image from "./image/box.png";

const ProductItem = (props:any) => {
    return  <div className={"item-container"}>
        <div className={"item-left-column"}>
            <img src={box_image} alt={"item_image"}/>
        </div>
        <div className={"item-right-column"}>
            <div className={"item-category"}>Menu Category</div>
            <h4 className={"item-name"}>Menu Name </h4>
            <div className={"item-price"}>10฿</div>
        </div>
    </div>
}

export default ProductItem;