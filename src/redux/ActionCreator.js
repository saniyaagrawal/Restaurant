import * as ActionTypes from './ActionType';
import { DISHES } from '../shared/dishes';
import { baseUrl } from '../shared/baseUrl';


export const addComment = (comment) => ({
    type: ActionTypes.Add_Comment,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();
    
    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};

export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
                var errmess = new Error(error.message);
                throw errmess;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchComments = () => (dispatch) => {    
    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok) {
            return response;
            } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        },
        error => {
                var errmess = new Error(error.message);
                throw errmess;
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => {
            if (response.ok) {
            return response;
            } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        },
        error => {
                var errmess = new Error(error.message);
                throw errmess;
        })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const fetchLeader = () => (dispatch) => {
    
    dispatch(leaderLoading());

    return fetch(baseUrl + 'leaders')
        .then(response => {
            if (response.ok) {
            return response;
            } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        },
        error => {
                var errmess = new Error(error.message);
                throw errmess;
        })
        .then(response => response.json())
        .then(leader => dispatch(addLeader(leader)))
        .catch(error => dispatch(leaderFailed(error.message)));
}

export const leaderLoading = () => ({
    type: ActionTypes.LEADER_LOADING
});

export const leaderFailed = (errmess) => ({
    type: ActionTypes.LEADER_FAILED,
    payload: errmess
});

export const addLeader = (leader) => ({
    type: ActionTypes.ADD_LEADER,
    payload: leader
});

export const postFeedback = (firstname, lastname, telnum, email) => (dispatch) => {

    const newFeedback = {
        firstname: firstname, 
        lastname: lastname, 
        telnum: telnum, 
        email: email
    };
    
    return fetch(baseUrl + 'feedback', {
        method: "POST",
        body: JSON.stringify(newFeedback),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => dispatch(addFeedback(response)))
    .catch(error =>  { console.log('post feedback', error.message); alert('Your feedback could not be posted\nError: '+error.message); });
};

export const addFeedback = (feedback) => ({
    type: ActionTypes.Add_Feedback,
    payload: feedback
});