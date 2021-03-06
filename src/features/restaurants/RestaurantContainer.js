import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Buttons from '../../components/Buttons';
import { 
  deleteRestaurant, 
  fetchRestaurant, 
  selectRestaurantById, 
} from './restaurantsSlice';
import { Restaurant } from "./Restaurant";

export const RestaurantContainer = ({match}) => {
  const currentUserId = useSelector(state => state.users.ids[0])
  const dispatch = useDispatch();
  const history = useHistory();
  const { restaurantId } = match.params
  const restaurant = useSelector(state => selectRestaurantById(state, restaurantId));
  const { status, error } = useSelector(state => state.restaurants);

  useEffect(() => {
    if (!restaurant) {
      dispatch(fetchRestaurant(restaurantId))
    }
  }, [dispatch, restaurant, restaurantId])

  const handleAddButtonClick = () => {
    history.push(`/restaurants/${restaurant.id}/menus/new`)
  }

  const handleDeleteButtonClick = () => {
    alert('Restaurant Deleted')
    dispatch(deleteRestaurant(restaurant.id))
    history.push(`/`);
  }

  const handleEditButtonClick = () => { 
    history.push(`/restaurants/${restaurant.id}/edit`)
  }

  const buttons = <Buttons handleEditButton={handleEditButtonClick}  handleDeleteButton={handleDeleteButtonClick} handleAddButton={handleAddButtonClick} modelId={parseInt(restaurant?.id)} child={'Menu'} />

  let proprietorView = false

  if (parseInt(currentUserId) === restaurant.attributes.user_id) {
    proprietorView = true
  }

  switch (status) {
    case 'idle':
      return null;
    case 'loading':
      return (<div>Still Loading...</div>)
    case 'succeeded':
      return (
        <div>
          { proprietorView
              ? <Restaurant restaurant={restaurant} buttons={buttons} proprietorView={proprietorView} />
              : <Restaurant restaurant={restaurant} /> 
          }
        </div>
      )
    case 'failed':
      return (<div>{error}</div>)
    default:
      return (<div>Unknown error</div>)
  }
}

RestaurantContainer.propTypes = {
  match: PropTypes.object.isRequired,
}

export default RestaurantContainer;