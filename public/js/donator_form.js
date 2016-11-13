"use strict";

var DonatorForm = React.createClass({
    getInitialState: function() {
        return {};
    },
    handleSubmit: function(e){
        e.preventDefault();
      console.log(this.state);
      newDonator(this.state)
      return;
    },
  setFirstName: function (event) {
    this.setState({
      firstName: event.target.value
    });
  },
  setLastName: function (event) {
    this.setState({
      lastName: event.target.value
    });
  },
  setContactNumber: function (event) {
    this.setState({
      contactNumber: event.target.value
    });
  },
  setEmail: function (event) {
    this.setState({
      email: event.target.value
    });
  },
  setBloodGroup: function (event) {
    this.setState({
      bloodGroup: event.target.value
    });
  },
    render: function() {
        return (
            <div>
            <form id="donatorForm" method="POST" onSubmit={this.handleSubmit}>
            <input id="firstName" type="text" placeholder="Firstname" onChange={this.setFirstName} required /><br />
            <input id="lastName" type="text" placeholder="Lastname" onChange={this.setLastName} required /><br />
            <input id="contactNumber" type="tel" placeholder="Contact number" pattern="([\+]\d{2} \d{3} \d{4} \d{3})|(00\d{2} \d{3} \d{4} \d{3})" title="Phone Number (Format: +xx xxx xxxx xxx or 00xx xxx xxxx xxx" required onChange={this.setContactNumber}  required /><br />
            <input id="email" type="email" placeholder="Email address" onChange={this.setEmail} required /><br />
            <select id="bloodGroup" onChange={this.setBloodGroup} required >
            <option value="">Select blood group</option>
            <option value="A+">A+</option>
            <option value="B+">B+</option>
            <option value="O+">O+</option>
            <option value="AB+">AB+</option>
            <option value="A-">A-</option>
            <option value="B-">B-</option>
            <option value="O-">O-</option>
            <option value="AB-">AB-</option>
            </select>
            <br />
            <input type="submit" value="Submit" />
            </form>
            </div>
        );
    }
});

ReactDOM.render(
     <DonatorForm />,
     document.getElementById('donator-form')
   );



