import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Buttons from '../../components/Buttons';
import { deleteSection, fetchSections } from './sectionsSlice';
import SectionAccordion from "./SectionAccordion";
import { selectRestaurantById } from '../restaurants/restaurantsSlice';

export const SectionsContainer = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { status, error } = useSelector(state => state.sections)
  const restaurantId = parseInt(props.menu?.attributes.restaurant_id)
  const restaurant = useSelector(state => selectRestaurantById(state, restaurantId))

  const live = restaurant.attributes.live

  const menuId = parseInt(props.menu?.id)

  useEffect(() => {
    if (props && props.menu) {
      dispatch(fetchSections({restaurantId: props.menu.attributes.restaurant_id, menuId: menuId}))
    }
  }, [dispatch, props, menuId])

  const sections = Object
  .entries(useSelector((state) => state.sections.entities))
  .flat()
  .filter(element => typeof element === 'object')
  .filter(section => section.attributes.menu_id === menuId);

  const handleAddButtonClick = (sectionId) => {
    history.push(`/restaurants/${restaurantId}/menus/${menuId}/sections/${sectionId}/items/new`)
  }

  const handleEditButtonClick = (sectionId) => { 
    history.push(`/restaurants/${restaurantId}/menus/${props.menu.attributes.restaurant_id}/sections/${sectionId}/edit`)
  }

  const handleDeleteButtonClick = (sectionId) => {
    alert('Section Deleted')
    dispatch(deleteSection(sectionId))
    history.push(`/restaurants/${restaurantId}`);
  }

  const sectionsList = sections.map((section) => {
    return (
      <div key={section.id} style={{width: '109.25%'}}>
        <Grid container spacing={3}>
            <Grid item xs={11}>
              <SectionAccordion 
                key={section.id} 
                live={live} 
                menuId={menuId} 
                restaurant_id={restaurantId} 
                section={section} 
                square={true} 
                proprietorView={props.proprietorView}
              />
            </Grid>
            <Grid item xs={1}> 
              { props.proprietorView 
                  ? <Buttons handleEditButton={handleEditButtonClick}  handleDeleteButton={handleDeleteButtonClick} handleAddButton={handleAddButtonClick} modelId={parseInt(section.id)} child={'Item'} />
                  : <div></div>
              }
            </Grid>
        </Grid>
      </div>
    )
  })

  switch (status) {
    case 'idle':
      return null;
    case 'loading':
      return (<div>Loading...</div>)
    case 'succeeded':
      return (
        <div>
          { sectionsList }
        </div>
      )
    case 'failed':
      return (<div>{error}</div>)
    default:
      return (<div>Unknown error</div>)
  }
}

SectionsContainer.propTypes = {
  menu: PropTypes.object,
  restaurantId: PropTypes.number, 
  section: PropTypes.object, 
  proprietorView: PropTypes.bool,
}

export default SectionsContainer;