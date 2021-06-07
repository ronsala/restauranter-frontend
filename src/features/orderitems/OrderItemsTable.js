import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import OrderItemQuantityBox from './OrderItemQuantityBox';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { deleteItemFromOrderitems } from '../orderitems/orderitemsSlice'

const useStyles = makeStyles((theme) => ({
  name: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: "bold"
  },
}));

export const OrderItemsTable= () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const initialOrderitems = useSelector((state) => state.orderitems)

  initialOrderitems.forEach(orderitem => {
    if (orderitem.count === 0) {
      dispatch(deleteItemFromOrderitems(orderitem))
    }
  })

  const orderitems = useSelector((state) => state.orderitems)
  .filter(orderitem => orderitem.count > 0)
  .sort((a, b) => {
    if (Object.values(a.attributes)[0] < Object.values(b.attributes)[0]) {
      return -1;
    } else {
      return 1;
    }
  })

  return (
    <div>
      <Typography variant="h1">
        Review Your Order
      </Typography>
      <TableContainer className={classes.container} component={Paper}>
        <Table className={classes.container} aria-label="order items table">
          <TableBody>
            {orderitems.map((orderitem) => (
              <TableRow key={orderitem.attributes.name}>
                <TableCell>
                  <Typography className={classes.name} variant="subtitle2" >
                    {orderitem.attributes.name}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">
                    {orderitem.attributes.desc}
                  </Typography>
                </TableCell>
                <TableCell align="right">${orderitem.attributes.price}</TableCell>
                <TableCell align="right">
                  <OrderItemQuantityBox orderitem={orderitem} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default OrderItemsTable;