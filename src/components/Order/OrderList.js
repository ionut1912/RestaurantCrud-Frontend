import { Tab, TableBody, TableHead, TableRow } from '@material-ui/core';
import { TableCell } from '@mui/material';
import React,{useState,useEffect} from 'react';
import { createApiEndpoint,ENDPOINTS } from '../../api';
import Table from '../../layouts/Table';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
export default function OrderList(props){
    const {setOrderId,setOrderListVisibility,setNotify}= props;
    const [orderList,setOrderList,resetFormControls]=useState([]);
    const deleteOrder = id=>{
     if(window.confirm('Are you sure to delete this order?')){
         createApiEndpoint(ENDPOINTS.ORDER).delete(id).then(res=>{
                setOrderListVisibility(false);
                setOrderId(0);
                setNotify({isOpen:true,message:'Order deleted succesfully.'})
         }).catch(err=>console.log(err))
     }
    }
    const showForUpdate= id=>
    {
        setOrderId(id);
        setOrderListVisibility(false);
        resetFormControls();
    }
useEffect(()=>{
    createApiEndpoint(ENDPOINTS.ORDER).fetchAll().then(res=>{
        console.log(res.data);
        setOrderList(res.data);
    }).catch(err=>console.log(err));
})
    return(
      <Table>
          <TableHead>
              <TableRow>
                <TableCell>Order No.</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Payed With</TableCell>

                <TableCell></TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
              {
                  orderList.map(item=>(
                     <TableRow key={item.orderMasterId}>
                         <TableCell onClick={e=>showForUpdate(item.orderMasterId)}>
                             {item.orderNumber}
                         </TableCell>
                         <TableCell onClick={e=>showForUpdate(item.orderMasterId)}>
                             {item.customer.customerName}
                         </TableCell>
                         <TableCell onClick={e=>showForUpdate(item.orderMasterId)}>
                             {item.pMethod}
                         </TableCell>
                      
                         <TableCell>
                         <DeleteForeverIcon onClick={e=>deleteOrder(item.orderMasterId)} color="secondary"></DeleteForeverIcon>
                         </TableCell>
                     </TableRow> 
                  ))
              }
          </TableBody>
      </Table>
    )
}