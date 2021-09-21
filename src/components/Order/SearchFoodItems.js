import { IconButton, InputBase, List, ListItem, ListItemText,makeStyles } from "@material-ui/core";
import { Paper } from "@mui/material";
import React,{useState,useEffect} from "react";
import { createApiEndpoint,ENDPOINTS } from "../../api";
import SearchIcon from '@material-ui/icons/Search';

const useStyles=makeStyles(theme=>({
    searchPaper: {
        padding:'2px 4px',
        display: 'flex',
        alignItems:'center',
    },
    searchInput:{
        marginLeft:theme.spacing(1.5),
        flex:1,
    }
}))
export default function SearchFoodItems(){
  const [foodItems,SetFoodItems] =useState([]);
    useEffect(()=>{
createApiEndpoint(ENDPOINTS.FOODITEM).fetchAll().then(result=>{
SetFoodItems(result.data)
}).catch(err=>console.log(err))
  },[])  
  const classes=useStyles();
    return (
        <>
   <Paper className={classes.searchPaper}>
<InputBase className={classes.searchInput} placeholder="Search food items">
</InputBase>
   <IconButton position="end"><SearchIcon></SearchIcon></IconButton>
   </Paper>
<List>
    {
        foodItems.map((item,idx)=>
        (
            <ListItem key={idx}>
<ListItemText primary={item.foodItemName} secondary={'$'+item.foodItemPrice}></ListItemText>
            </ListItem>
        ))
    }
</List>
</>
        );


}