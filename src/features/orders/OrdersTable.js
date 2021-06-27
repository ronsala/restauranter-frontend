/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes, { array } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  orderId: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export const OrdersTable = (props) => {
console.log('props in OrdersTable:', props);
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="orders table">
        <TableBody>
          {props.orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className={classes.orderId} component="th" scope="row">
                {order.id}
              </TableCell>
              <TableCell align="center">{order.attributes.total}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    );
}

OrdersTable.propTypes = {
  orders: PropTypes.array, 
  // orders.map: PropTypes.array, 
}

export default OrdersTable;