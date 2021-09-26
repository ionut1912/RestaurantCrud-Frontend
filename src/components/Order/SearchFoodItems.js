import { IconButton, InputBase, List, ListItem, ListItemSecondaryAction, ListItemText,makeStyles } from "@material-ui/core";
import { Paper } from "@mui/material";
import React,{useState,useEffect} from "react";
import { createApiEndpoint,ENDPOINTS } from "../../api";
import SearchIcon from '@material-ui/icons/Search';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const useStyles=makeStyles(theme=>({
    searchPaper: {
        padding:'2px 4px',
        display: 'flex',
        alignItems:'center',
    },
    searchInput:{
        marginLeft:theme.spacing(1.5),
        flex:1,
    },
    listRoot:{
        marginTop:theme.spacing(1),
        maxHeight:450,
        overflow:'auto',
        '& li:hover':{
        cursor:'pointer',
        backgroundColor:'#E3E3E3'
        },
        '& li:hover .MuiButtonBase-root':{
            display:'block',
            color:'#000',
        },
        '& .MuiButtonBase-root':{
            display:'none'
        },
        '& .MuiButtonBase-root:hover':{
            backgroundColor:'transparent'
        }
    }
}))

export default function SearchFoodItems(props){
    const {values,setValues}=props;
    let orderedFoodItems=values.orderDetails;
  const [foodItems,SetFoodItems] =useState([]);
  const [searchList,setSearchList] =useState([]);
  const [searchKey,setSearchKey]=useState('');
  const addFoodItem=foodItem=>
{let x=
{orderMasterId:values.orderMasterId,
 orderDetailId:0,
 foodItemId:foodItem.foodItemId,
 quantity:1,
 foodItemPrice:foodItem.foodItemPrice,
 foodItemName:foodItem.foodItemName,
}
setValues({
    ...values,orderDetails:[...values.orderDetails,x]

})
}
    useEffect(()=>{
createApiEndpoint(ENDPOINTS.FOODITEM).fetchAll().then(result=>{
SetFoodItems(result.data); 
setSearchList(result.data);
}).catch(err=>console.log(err))
  },[])  
  const classes=useStyles();
  useEffect(()=>{
let x=[...foodItems];
x=x.filter(y=>{
    return y.foodItemName.toLowerCase().includes(searchKey.toLowerCase())
    && orderedFoodItems.every(item=>item.foodItemId != y.foodItemId)
});
      setSearchList(x);
  },[searchKey,orderedFoodItems  ])
    return (
        <>
   <Paper className={classes.searchPaper}>
<InputBase className={classes.searchInput} value={searchKey} onChange={e=>setSearchKey(e.target.value)} placeholder="Search food items">
</InputBase>
   <IconButton position="end"><SearchIcon></SearchIcon></IconButton>
   </Paper>
<List className={classes.listRoot}>
    {
        searchList.map((item,idx)=>
        (
            <ListItem key={idx} onClick={e=>addFoodItem(item)}>
<ListItemText primary={item.foodItemName} secondary={'$'+item.foodItemPrice}></ListItemText>
<ListItemSecondaryAction>
<IconButton onClick={e=>addFoodItem(item)}>
<PlusOneIcon/>
<ArrowForwardIcon></ArrowForwardIcon>
</IconButton>

</ListItemSecondaryAction>
            </ListItem>
        ))
    }
</List>
</>
        );


}