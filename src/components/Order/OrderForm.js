import { Grid } from '@material-ui/core';
import React from 'react';
import Form  from   "../../layouts/Form"
import Input from "../../controls/Input"
export default function OrderForm(){
    return(
<Form>
<Grid container>
<Grid item xs={6}>
<Input disabled label="OrderNumber" name="orderNumber">

</Input>
</Grid>
    <Grid item xs={6}>
        <Input disabled label="Grand Total" name="gTotal">

        </Input>
    
</Grid>
</Grid>
</Form>
);
}