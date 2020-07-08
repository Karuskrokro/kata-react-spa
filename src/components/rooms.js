import React from 'react'

class Rooms extends React.Component {

    renderReservation(r, i) {
        return (
            <p key={i} className="card-text">{"Réservé entre " + r.start + "h et " + r.end + "h pour " + r.name}</p>
        );
    }

    renderRoom(i) {
        return (
            <div className="card room">
                <div className="card-body">
                    <h5 className="card-title">{this.props.rooms[i].id}</h5>
                    {this.props.rooms[i].reservations.map((resa, index) => {
                        return this.renderReservation(resa, index);
                    })}
                </div>
            </div>
        );
    }

    render() {
        const rooms = this.props.rooms;
        if (rooms.length === 0) {
            return null;
        } else {
            return (
                <div className="rooms">
                    <div className="room-row">
                        {this.renderRoom(0)}
                        {this.renderRoom(1)}
                        {this.renderRoom(2)}
                        {this.renderRoom(3)}
                        {this.renderRoom(4)}
                    </div>
                    <div className="room-row">
                        {this.renderRoom(5)}
                        {this.renderRoom(6)}
                        {this.renderRoom(7)}
                        {this.renderRoom(8)}
                        {this.renderRoom(9)}
                    </div>
                </div>
            );
        }
    }
}

export default Rooms