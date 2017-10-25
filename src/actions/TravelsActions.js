import axios from 'axios';
import {push} from 'react-router-redux';
import queryString from 'query-string';

import * as TravelConstant from '../constants/TravelsConstants';
import {API_URL} from '../settings/configuration';


/**
 * ListTravels action
 *
 * @returns {{type}}
 */
export const fetchTravels = (page) => {
    return dispatch => {
        dispatch({
            type: TravelConstant.LIST_REQUESTED
        });

        let url = `${API_URL}/travels`;
        if(page) url += `?page=${page}`;

        return axios.get(url)
            .then(response => {
                let travels = response.data;

                if(travels['hydra:member']) {
                    travels['hydra:member'] = travels['hydra:member'].map(function(item) {
                        let explode = item['@id'].split('/');

                        return {
                            ...item,
                            id: explode[explode.length - 1]
                        };
                    });
                }

                dispatch({
                    type: TravelConstant.LIST_SUCCESS,
                    travels: travels
                });
            })
            .catch(error => {
                dispatch({
                    type: TravelConstant.LIST_FAILURE
                });
            })
        ;
    }
};

/**
 * Change pagination currentPage
 *
 * @param page
 * @returns {function(*, *)}
 */
export const changePage = (page) => {
    return (dispatch, getState) => {
        let props = getState();

        let query = queryString.parse(props.routing.location.search);

        query = queryString.stringify({
            ...query,
            page: page
        });

        dispatch(push({
            search: `?${query}`,
        }));
    }
};