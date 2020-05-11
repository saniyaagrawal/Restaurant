import * as ActionTypes from './ActionType';

export const Comments = (state=  {
        errMess: null,
        comments:[]
    }, action)=>{
    switch(action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload};

        case ActionTypes.COMMENTS_FAILED:
            return {...state, errMess: action.payload};

        case ActionTypes.Add_Comment:
            var comment= action.payload;
            return {...state, comments: state.comments.concat(comment)};
        default:
            return state;
    }
};