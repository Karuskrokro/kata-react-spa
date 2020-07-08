import './App.css';
import ReservationForm from './components/reservation-form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { Component } from 'react';
import Rooms from './components/rooms';

class App extends Component {

  constructor(props) {
    super(props);

    this.handleReservationMade = this.handleReservationMade.bind(this);
    this.handleReservationRemoval = this.handleReservationRemoval.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  state = {
    rooms: [],
    status: ''
  }

  loadData() {
    fetch('http://localhost:64101/reservation')
      .then(res => res.json())
      .then((data) => {
        this.setState({ rooms: data })
      })
      .catch(console.log)
  }

  handleReservationMade(id, name, start, end) {
    if (name === '') {
      this.setState({ status: 'Nom de personne obligatoire pour toute réservation' });
    } else if (parseInt(start) === parseInt(end)) {
      this.setState({ status: 'Les heures de départ & de fin doivent être différentes' });
    } else if (parseInt(start) > parseInt(end)) {
      console.log(start);
      console.log(end);
      console.log(start > end);
      this.setState({ status: 'L\'heure de début doit être inférieure à l\'heure de fin' });
    } else {
      fetch('http://localhost:64101/reservation/create',
        {
          method: "PATCH",
          mode: "cors",
          headers: {
            id: id,
            name: name,
            start: start,
            end: end
          }
        })
        .then(res => res.json())
        .then((data) => {
          // L'enum C# pour les erreurs
          console.log(data);
          if (data === 1) {
            this.loadData();
            this.setState({ status: 'Réservation effectuée' })
          } else {
            this.setState({ status: 'Réservation annulée, personne déjà présente sur ce créneau' })
          }
        })
        .catch(console.log)
    }
  }

  handleReservationRemoval(id) {
    fetch('http://localhost:64101/reservation/delete',
      {
        method: "PATCH",
        mode: "cors",
        headers: {
          id: id
        }
      })
      .then(res => res.json())
      .then((data) => {
        if (data === true) {
          this.loadData();
          this.setState({ status: 'Réservations supprimées' })
        } else {
          this.setState({ status: 'Suppression impossible, pas de réservation présente' })
        }
      })
      .catch(console.log)
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <div>
        <center><h1 className="title">Réservations</h1></center>
        <Container>
          <Row>
            <Col>
              <Rooms rooms={this.state.rooms} />
            </Col>
            <Col className="col-md-4">
              <ReservationForm onReservationMade={this.handleReservationMade}
                onReservationRemoval={this.handleReservationRemoval}></ReservationForm>
              <div className="message">{this.state.status}</div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
