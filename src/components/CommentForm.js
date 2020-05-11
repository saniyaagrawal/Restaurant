import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader, Button, Row, Label,Col } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { postComment } from '../redux/ActionCreator';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
          isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    render() {
        return (
            <div>
            <Button outline onClick={this.toggleModal}>
                                        <span className="fa fa-sign-in fa-lg"></span>Submit
                                    </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group m-2">
                                <Label htmlFor="rating">Rating</Label>   
                                <Control.select model=".rating" id="rating" name="rating" >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select>
                        </Row>
                        <Row className="form-group m-2">
                            <Label htmlFor="author">Author<br/></Label>

                            <Control.text model=".author" id="author" name="author" validators={{
                                             minLength: minLength(3), maxLength: maxLength(15)
                                        }} />
                            <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />            
                        </Row>   
                        <Row className="form-group m-2">
                            <Label htmlFor="comment">Comment</Label>
                            <Control.textarea size="6" model=".comment" id="comment" name="comment" />
                        </Row> 
                        <Button className="primary" value="submit" type="submit">Submit</Button>                     
                    </LocalForm>
                </ModalBody>
            </Modal>
            </div>
        );
    }
}

export default CommentForm;