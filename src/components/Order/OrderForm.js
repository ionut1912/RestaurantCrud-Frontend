import { Grid, InputAdornment,makeStyles ,ButtonGroup,Button as MuiButton} from '@material-ui/core';
import React ,{useState,useEffect} from 'react';
import Form  from   "../../layouts/Form"
import {Input,Select,Button} from "../../controls/"
import { createApiEndpoint,ENDPOINTS } from '../../api';
import ReplayIcon from '@mui/icons-material/Replay';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ReorderIcon from '@mui/icons-material/Reorder';
import Popup from '../../layouts/Popup';
import Notification from '../../layouts/Notification';
import OrderList from './OrderList';
export default function OrderForm(props){ 
const{values,errors,handleInputChange,setValues,setErrors,resetFormControls}=props;
const [orderListVisibility,setOrderListVisibility]=useState(false);
const [orderId,setOrderId]=useState(0);
    const pMethods =[
        {id:'none',title:'Select'},
        {id:'Cash',title:'Cash'},
        {id:'Card',title:'Card'},
    ]
    const [customerList,setCustomerList]=useState([]);
    const [notify,setNotify]= useState({isOpen:false});
    useEffect(()=>{
createApiEndpoint( ENDPOINTS.CUSTOMER).fetchAll().then(res=>
    {
        let customerList=res.data.map(item=>({
            id:item.customerId,
            title:item.customerName
        }));
    customerList=[{id:0,title:'Select'}].concat(customerList);
    setCustomerList(customerList);
     }).catch(err=>console.log(err))
    },[]);
    useEffect(()=>{
        let gTotal=values.orderDetails.reduce((tempTotal,item)=>{
            return tempTotal+(item.quantity*item.foodItemPrice);
        },0);
        setValues({
            ...values,
            gTotal:gTotal})
    },[JSON.stringify(values.orderDetails)]);
    
    const useStyles=makeStyles(theme=>({
        adoCrmentText:{
            '& .MuiTypography-root':{
                color:'#f3b33d',
                fontWeight:'bolder',
                fontSize:'1.5em'
            }
        },
        submitButtonGroup:{
            backgroundColor:'#f3b33d',
            color:'#000',
            margin:theme.spacing(1),
            '&.MuiButton-label':{
                textTransform: 'none'
            },
            '&.hover':{
                backgroundColor:'#f3b33d',
            }
        }
}));
const classes=useStyles();
const validateForm = () =>{
    let temp={};
    temp.customerId=values.customerId !== 0 ? "" :"This field is required";
    temp.pMethod= values.pMethod !=="none" ? " ":"This field is required";
    temp.orderDetails = values.orderDetails.length!==0 ? "": "This field is required.";
    console.log(temp);
    setErrors({...temp});
    return Object.values(errors).every(x=>x==="");
}
const openListOfOrders=()=>{
    setOrderListVisibility(true);
}
const submitOrder=e =>{
    e.preventDefault();
    if(validateForm())
{if(values.orderMasterId==0){
    createApiEndpoint(ENDPOINTS.ORDER).create(values)
    .then(res =>{
       resetFormControls();
       setNotify({isOpen:true,message:'New order is created.'})
    }).catch(err =>console.log(err));
}

else{
    createApiEndpoint(ENDPOINTS.ORDER).update(values.orderMasterId,values)
    .then(res=>{
        setOrderId(0);
        setNotify({isOpen:true,message:'Order updated succesfully.'})
    }).catch(err=>console.log(err));
}
}

}
const resetForm=()=>{
    resetFormControls();
    setOrderId(0);
}
useEffect(()=>{
    if(orderId==0)
    resetFormControls();
    else{
        createApiEndpoint(ENDPOINTS.ORDER).fetchById(orderId)
        .then(res=>{
            setValues(res.data);
            setErrors({});
        }).catch(err=>console.log(err))
    }
},[orderId]);
    return(
        <>
<Form  onSubmit={submitOrder}>

<Grid container>
<Grid item xs={6}>
<Input disabled label="OrderNumber" name="orderNumber" value={values.orderNumber} InputProps={{
    
    startAdornment: (
     <InputAdornment className={classes.adormentText} position="start">
      #</InputAdornment>
     ) }} ></Input>
</Grid>

<Grid item xs={6}>
<Select  label="Payment" name="pMethod" options={pMethods}  value={values.pMethod}  onChange={handleInputChange} error={errors.pMethod}></Select>
    </Grid>


</Grid>

<br/>


<Grid container>
    <Grid item xs={6}>
    <Select   label="Customer" name="customerId" options={customerList
} value={values.customerId} onChange={handleInputChange} error={errors.customerId}></Select>
    </Grid>
    <Grid item xs={6}>

    <Input disabled label="GrandTotal" name="gTotal" value={values.gTotal} InputProps={{
    
 startAdornment: (
  <InputAdornment className={classes.adormentText} position="start">
   $</InputAdornment>
  ) }} ></Input>
  <br/>
  
  <ButtonGroup className={classes.submitButtonGroup} >
      <MuiButton size="large" type="submit" endIcon={<RestaurantMenuIcon/>}>
          Submit
      </MuiButton>
      <MuiButton onClick={resetForm} size="small" type="submit" endIcon={<ReplayIcon/>}>
          
      </MuiButton>
  </ButtonGroup>
  <Button size="large" onClick={openListOfOrders} startIcon={<ReorderIcon/>} >Orders</Button>
    </Grid>
</Grid>

</Form>
<Popup title="List of orders" openPopup={orderListVisibility} setOpenPopup={setOrderListVisibility}>
<OrderList {...{setOrderId,setOrderListVisibility,resetFormControls,setNotify}} ></OrderList>

</Popup>
<Notification     {...{notify,setNotify}}>

</Notification>
</>
);
}

