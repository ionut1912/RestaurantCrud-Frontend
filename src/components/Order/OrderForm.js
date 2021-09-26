import { Grid, InputAdornment,makeStyles ,ButtonGroup,Button as MuiButton} from '@material-ui/core';
import React ,{useState,useEffect} from 'react';
import Form  from   "../../layouts/Form"
import {Input,Select,Button} from "../../controls/"
import { createApiEndpoint,ENDPOINTS } from '../../api';
import ReplayIcon from '@mui/icons-material/Replay';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ReorderIcon from '@mui/icons-material/Reorder';
export default function OrderForm(props){ 
const{values,errors,handleInputChange,setValues}=props;

    const pMethods =[
        {id:'none',title:'Select'},
        {id:'Cash',title:'Cash'},
        {id:'Card',title:'Card'},
    ]
    const [customerList,setCustomerList]=useState([]);
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



    return(
<Form>

<Grid container>
<Grid item xs={6}>
<Input disabled label="OrderNumber" name="orderNumber" value={values.orderNumber} InputProps={{
    
    startAdornment: (
     <InputAdornment className={classes.adormentText} position="start">
      #</InputAdornment>
     ) }} ></Input>
</Grid>

<Grid item xs={6}>
<Select  label="Payment" name="pMethod" options={pMethods}  value={values.pMethod} onChange={handleInputChange}></Select>
    </Grid>


</Grid>

<br/>


<Grid container>
    <Grid item xs={6}>
    <Select   label="Customer" name="customerId" options={customerList
} value={values.customerId} onChange={handleInputChange}></Select>
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
      <MuiButton size="small" type="submit" endIcon={<ReplayIcon/>}>
          
      </MuiButton>
  </ButtonGroup>
  <Button size="large" startIcon={<ReorderIcon/>} >Orders</Button>
    </Grid>
</Grid>

</Form>
);
}

