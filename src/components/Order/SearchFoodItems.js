import { List, ListItem, ListItemText } from "@material-ui/core";
import React,{useState,useEffect} from "react";
import { createApiEndpoint,ENDPOINTS } from "../../api";
export default function SearchFoodItems(){
  const [foodItems,SetFoodItems] =useState([]);
    useEffect(()=>{
createApiEndpoint(ENDPOINTS.FOODITEM).fetchAll().then(result=>{
SetFoodItems(result.data)
}).catch(err=>console.log(err))
  },[])  
    return (
<List>
    {
        foodItems.map((item,idx)=>
        (
            <ListItem key={idx}>
<ListItemText primary={item.foodItemName} secondary={item.foodItemPrice}></ListItemText>
            </ListItem>
        ))
    }
</List>
        );


}