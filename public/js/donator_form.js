"use strict";

var DonatorForm = React.createClass({
    getInitialState: function() {

        return {
            donator_id: this.props.donatorId,
            firstName: this.props.props.firstName,
             lastName: this.props.props.lastName,
             contactNumber: this.props.props.contactNumber,
             email: this.props.props.email,
             bloodGroup: this.props.props.bloodGroup
             };
    },
    handleSubmit: function(e){
        e.preventDefault();

      this.state.address = donatorAddress;
      newDonator(this.state);
      return;
    },
   onClickCancel: function (event) {
     document.getElementById("donator-form").style.display = "none";
     document.getElementById("response-donator-form").style.display = "none";
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
  componentDidMount: function(){

    var donator;
    if(localStorage.user)
        donator = JSON.parse(localStorage.user);
    if(location.hash.length == 25){
            ReactDOM.render(
             <DonatorForm props={donator} donatorId={localStorage.url}  />,
             document.getElementById('donator-form')
        );
        document.getElementById("donator-form").style.display = "";
        document.getElementById("edit-donator-form").style.display = "";
        document.getElementById("delete-donator-form").style.display = "";
        document.getElementById("response-donator-form").style.display = "none";
        }
  },
    render: function() {
        return (
            <div>
            <h3>Donator Form Registration</h3>
            <form id="donatorForm" method="POST" onSubmit={this.handleSubmit}>
            <input id="donator_id" type="text" value={this.props.donatorId} readOnly /><br />
            <input id="firstName" type="text" placeholder="Firstname" defaultValue={this.props.props.firstName} onChange={this.setFirstName} required /><br />
            <input id="lastName" type="text" placeholder="Lastname" defaultValue={this.props.props.lastName} onChange={this.setLastName} required /><br />
            <input id="contactNumber" type="tel" placeholder="Contact number" defaultValue={this.props.props.contactNumber} pattern="([\+]\d{2} \d{3} \d{4} \d{3})|(00\d{2} \d{3} \d{4} \d{3})" title="Phone Number (Format: +xx xxx xxxx xxx or 00xx xxx xxxx xxx" required onChange={this.setContactNumber}  required /><br />
            <input id="email" type="email" placeholder="Email address" defaultValue={this.props.props.email} onChange={this.setEmail} required /><br />
            <select id="bloodGroup" onChange={this.setBloodGroup} defaultValue={this.props.props.bloodGroup} required >
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
            <input type="submit" value="Submit" /> &nbsp; &nbsp;
            <input type="button" value="Cancel" onClick={this.onClickCancel} />
            </form>
            </div>
        );
    }
});
    var donator = {};
    if(localStorage.user)
        donator = JSON.parse(localStorage.user);

    if(location.hash.length == 25){
            ReactDOM.render(
             <DonatorForm props={donator} donatorId={location.hash.substring(1)}  />,
             document.getElementById('donator-form')
        );
        document.getElementById("donator-form").style.display = "";
        document.getElementById("edit-donator-form").style.display = "";
        document.getElementById("delete-donator-form").style.display = "";
        document.getElementById("response-donator-form").style.display = "none";
        } else {

        var donator = {
               firstName: "",
               lastName: "",
               address: "",
               contactNumber: "",
               email: "",
               bloodGroup: "",
               };

        ReactDOM.render(
             <DonatorForm props={donator} />,
             document.getElementById('donator-form')
        );

        }