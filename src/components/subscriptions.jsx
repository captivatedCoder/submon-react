import React, { Component } from "react";
import SubscriptionTable from "./subscriptionTable";
import { getSubscriptions } from "../services/subscriptionService";

class Subscriptions extends Component {
  state = {
    subscriptions: []
  };

  async componentDidMount() {
    const { data: subscriptions } = await getSubscriptions(
      localStorage.getItem("token")
    );
    
    this.setState({ subscriptions });
  }
 
  render() {    
    return (
      <div className="row">        
        <SubscriptionTable
          subscriptions={this.state.subscriptions}
        />
      </div>
    );
  }
}

export default Subscriptions;
