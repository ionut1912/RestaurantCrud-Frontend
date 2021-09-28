import { Button, ButtonGroup, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Paper, makeStyles } from '@material-ui/core';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import React from 'react';
import { roundTo2DecimalPoints } from '../../utils';
const useStyles=makeStyles(theme=>({
    paperRoot: {
        margin:'15px 0px',
       '&:hover': {
           cursor:'pointer'
       }, 
       '&:hover $deleteButton':{
           display: 'block'
       }
    },
    buttonGroup: {
        backgroundColor:'#E3E3E3',
        borderRadius:8,
        '& .MuiButtonBase-root' :{
            border: 'none',
            minWidth: '25px',
            padding: '1px'
        },
        '& button:nth-child(2)':{
            fontSize:'1.2em',
            color:'#000'
        }
    },
    deleteButton:{
        display:'none',
        '& .MuiButtonBase-root':{
color:'#E81719'
        },
    },
    totalPerItem:{
        fontWeight: 'bolder',
        fontSize: '1.2em',
        margin: '0px 10px'
    }
}))
export default function OrderedFoodItems(props){
    const classes=useStyles();
const {values,setValues}=props;
let orderedFoodItems=values.orderDetails;
const updateQuantity=(idx,value) => {
    let x={...values};
    if(x.orderDetails[idx].quantity+value>0){
        x.orderDetails[idx].quantity+=value;
        setValues({...x});
    }

}
const removeFoodItem=(index,id)=>{
    let x={...values};
    x.orderDetails=x.orderDetails.filter((_,i)=> i!==index);
    if(id!=0)
    {
        x.deletedOrderItemsIds+=id+",";
    }
    setValues({...x})
}
    return (
<List>
  {  orderedFoodItems.length === 0 ?
  <ListItem>
      <ListItemText primary="Please select food items" primaryTypographyProps={{
          style:{
              textAlign: 'center',
              fontStyle: 'italic'
          }
      }}>

      </ListItemText>
  </ListItem>
  :
        orderedFoodItems.map((item,index)=>(
            <Paper key={index} className={classes.paperRoot}>
                <ListItem>
                    <ListItemText primary={item.foodItemName} primaryTypographyProps={{
                        component:'h1',
                        style: {
                            fontWeight:'500',
                            fontSize:'1.2em'
                        }
                    }}
                    secondary={
                        <>
                        <ButtonGroup size="small" className={classes.buttonGroup}>
                            <Button onClick={e => updateQuantity(index,-1)}>-</Button>
                            <Button disabled>{item.quantity}</Button>
                            <Button onClick={e => updateQuantity(index,1)}>+</Button>
                        </ButtonGroup>
                        <span className={classes.totalPerItem}>
                            {'$' + roundTo2DecimalPoints(item.quantity * item.foodItemPrice) }
                        </span>
                        </>
                    }
                    secondaryTypographyProps={
                        {
                            component:'div'
                        }
                    }
                    ></ListItemText>
                    <ListItemSecondaryAction className={classes.deleteButton}>
                        <IconButton disableRipple onClick={e=> removeFoodItem(index,item.orderDetailId)}>
<DeleteForeverOutlinedIcon>

</DeleteForeverOutlinedIcon>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                </Paper>

        ))
    }
</List>
);

}