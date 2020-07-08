import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class ReservationForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            roomId: 0,
            name: '',
            start: 8,
            end: 8
        }

        this.handleRoomChange = this.handleRoomChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleIntervalStartChange = this.handleIntervalStartChange.bind(this);
        this.handleIntervalEndChange = this.handleIntervalEndChange.bind(this);
    }

    handleReservation() {
        this.props.onReservationMade(this.state.roomId, this.state.name, this.state.start, this.state.end);
    }

    handleReservationRemoval() {
        this.props.onReservationRemoval(this.state.roomId);
    }

    handleRoomChange(e) {
        if(e.target.value >= 0 && e.target.value < 10) {
            this.setState({roomId: e.target.value});
        }
    }

    handleNameChange (e) {
        this.setState({name: e.target.value});
    }

    handleIntervalStartChange(e) {
        if(e.target.value >= 8 && e.target.value < 19) {
            this.setState({start: e.target.value})
        }
    }

    handleIntervalEndChange(e) {
        if(e.target.value >= 8 && e.target.value < 19) {
            this.setState({end: e.target.value})
        }
    }


    render() {
        return (
            <Form>
                <Form.Group controlId="roomId">
                    <Form.Label>Salle à réserver</Form.Label>
                    <Form.Control value={this.state.roomId} 
                                    onChange={this.handleRoomChange}
                                    type="number" 
                                    placeholder="Compris entre 0 et 9" />
                </Form.Group>

                <Form.Group controlId="name">
                    <Form.Label>Nom pour la réservation</Form.Label>
                    <Form.Control value={this.state.name} 
                                    onChange={this.handleNameChange}
                                    type="text" 
                                    placeholder="Nom" />
                </Form.Group>

                <Form.Group controlId="roomIntervalStart">
                    <Form.Label>Début de la réservation (h)</Form.Label>
                    <Form.Control value={this.state.start} 
                                    onChange={this.handleIntervalStartChange}
                                    type="number" 
                                    placeholder="Compris entre 8h et 18h" />
                </Form.Group>

                <Form.Group controlId="roomIntervalEnd">
                    <Form.Label>Fin de la réservation (h)</Form.Label>
                    <Form.Control value={this.state.end} 
                                    onChange={this.handleIntervalEndChange}
                                    type="number" 
                                    placeholder="Compris entre 8h et 18h" />
                </Form.Group>

                <Button variant="primary" 
                        onClick={(i) => this.handleReservation()}>
                    Reserver
                </Button>

                <Button className="delete"
                        variant="secondary" 
                        onClick={(i) => this.handleReservationRemoval()}>
                    Supprimer
                </Button>
            </Form>
        );
    }
}


export default ReservationForm