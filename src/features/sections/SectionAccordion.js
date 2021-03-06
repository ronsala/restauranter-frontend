import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ItemsContainer from '../items/ItemsContainer';
import { fetchItems } from '../items/itemsSlice';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 375,
  },
  branch: {
    minWidth: 375,
  }
}));

export const SectionAccordion = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    if (props && props.section) {
      dispatch(fetchItems({restaurantId: props.restaurant_id, menuId: props.menuId, sectionId: props.section.id}))
    }
    // `props` is not included in dependency array because doing so would set up an infinite loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <div>
      <Accordion square={props.square} className={classes.root}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h4">
            { props.section.attributes.name }
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.root}>
          <ItemsContainer 
            className={classes.branch} 
            live={props.live} 
            menu_id={props.menuId} 
            restaurant_id={props.restaurant_id} 
            section={props.section}
            proprietorView={props.proprietorView}
          />
        </AccordionDetails>
      </Accordion>
      <Divider className={classes.root}></Divider>
    </div>
  );
}

SectionAccordion.propTypes = {
  live: PropTypes.bool, 
  menu_id: PropTypes.object,
  menuId: PropTypes.number.isRequired,
  restaurant_id: PropTypes.number.isRequired,
  section: PropTypes.object.isRequired,
  square: PropTypes.bool, 
  proprietorView: PropTypes.bool, 
}

export default SectionAccordion;