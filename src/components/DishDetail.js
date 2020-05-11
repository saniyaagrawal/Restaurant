import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

    function RenderDish({dish} ) {
        if (dish != null)
            return(
                <FadeTransform
                        in
                        transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                        }}>
                    <Card>
                        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
                
            );
        else
            return(
                <div></div>
            );
    }

    function RenderComments({comments, postComment, dishId}){
        if(comments!=null){
            return(
                <div>
                    <h4>Comments</h4>
                    <ul className="list-styled">
                        <Stagger in>
                            {comments.map((comment) => {
                                return (
                                    <Fade in>
                                    <li key={comment.id}>
                                    <p>{comment.comment}</p>
                                    <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                    </li>
                                    </Fade>
                                );
                            })}
                        </Stagger>
                    </ul>
                    <p>{comments.comment}</p>
                    <CommentForm dishId={dishId} postComment={postComment} /> 
                </div>
            );
        }
        else 
            return (
                <div></div>
            );
    }

    const DishDetail =(props)=> {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else{
            return(
                <div className="container">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="row">
                    <div  className="col-12 col-md-5 m-1 mt-5">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div  className="col-12 col-md-5 m-1 mt-5">
                        <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id}/>
                        </div>
                </div>
                </div>
                
            );
        }
    }
export default DishDetail;