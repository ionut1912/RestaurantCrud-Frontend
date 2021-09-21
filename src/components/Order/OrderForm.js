import { Grid, InputAdornment,makeStyles ,ButtonGroup,Button as MuiButton} from '@material-ui/core';
import React ,{useState} from 'react';
import Form  from   "../../layouts/Form"
import {Input,Select,Button} from "../../controls/"

import ReplayIcon from '@mui/icons-material/Replay';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ReorderIcon from '@mui/icons-material/Reorder';
export default function OrderForm(props){
const{values,errors,handleInputChange}=props;
    const pMethods =[
        {id:'none',title:'Select'},
        {id:'Cash',title:'Cash'},
        {id:'Card',title:'Card'},
    ]
    const useStyles=makeStyles(theme=>({
        adormentText:{
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
    <Select   label="Customer" name="customerId" options={[


{id:0,title:'Select'},
{id:1,title:'Customer 1'},
{id:2,title:'Customer 2'},
{id:3,title:'Customer 3'},
{id:4,title:'Customer 4'}
]} value={values.customerId} onChange={handleInputChange}></Select>
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

