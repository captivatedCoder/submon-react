import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getSubscription } from "../services/subscriptionService";

class SubscriptionForm extends Form {
  state = {
    data: {
      name: "",
      subType: "",
      expirationDate: "",
      notes: ""
    },
    types: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string()
      .required()
      .label("Name"),
    subType: Joi.string()
      .required()
      .label("Type"),
    expirationDate: Joi.string()
      .required()
      .label("Due Date"),
    notes: Joi.string()
      .required()
      .label("Notes")
  };

  populateTypes() {
    const types = [
      "SSL RENEWAL",
      "DOMAIN RENEWAL",
      "HARDWARE WARRANTY",
      "FIREWALL SUPPORT LICENSE",
      "MISCELLANEOUS"
    ];
    this.setState(types);
  }

  async populateSubscription() {
    try {
      const subId = this.props.match.params.id;
      if(subId === "new") return;

      const {data: subscription} = await getSubscription(subId);
      this.setState({data: this.mapToViewModel(subscription)});
    } catch (ex) {
      if(ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateSubscription();
  }

  mapToViewModel(subscription) {
    return {
      _id: subscription._id,
      name: subscription.name,
      subType: subscription.subType,
      expirationDate: subscription.expirationDate,
      notes: subscription.notes
    }
  }

  render() {
    return (
      <div>
        <h3>{`Subscription Form`}</h3>
        <form onSubmit={this.handleSubmit}>
         {this.renderInput("name", "Name")}
         {this.renderSelect("subType", "Type", this.state.types)}
         {this.renderInput("expirationDate", "Due Date")}
         <div className="form-group">
            <textarea className="form-control" rows="3"></textarea>
         </div>
          
        </form>
      </div>
    );
  }
}

export default SubscriptionForm;
