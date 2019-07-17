import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import {
  getSubscription,
  saveSubscription
} from "../services/subscriptionService";
import { getSubTypes } from "../services/subTypeService";

class SubscriptionForm extends Form {
  state = {
    data: {
      name: "",
      subId: "",
      expirationDate: "",
      notes: "",
      reminders: []
    },
    subTypes: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string()
      .required()
      .label("Name"),
    subId: Joi.string()
      .required()
      .label("Type"),
    expirationDate: Joi.string()
      .required()
      .label("Due Date"),
    notes: Joi.string()
      .required()
      .label("Notes"),
    reminders: Joi.array()
      .items(Joi.number())
      .label("Reminders")
  };

  async populateTypes() {
    const { data: subTypes } = await getSubTypes();
    this.setState({ subTypes });
  }

  async populateSubscription() {
    try {
      const subId = this.props.match.params.id;
      if (subId === "new") return;

      const { data: subscription } = await getSubscription(subId);

      this.setState({ data: this.mapToViewModel(subscription) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateTypes();
    await this.populateSubscription();
  }

  mapToViewModel(subscription) {
    return {
      _id: subscription._id,
      name: subscription.name,
      subId: subscription.subType._id,
      expirationDate: subscription.expirationDate,
      notes: subscription.notes,
      reminders: subscription.reminders
    };
  }

  doSubmit = async () => {
    await saveSubscription(this.state.data);
    this.props.history.push("/subscriptions");
  };

  doDelete = reminder => {
    let newReminders = [...this.state.data.reminders];
    const index = newReminders.indexOf(reminder);
    newReminders.splice(index, 1);

    this.setState({ data: { ...this.state.data, reminders: newReminders } });
  };

  doReminderChange = input => {    
    // if(input.value === "") return;
    let newReminders = [...this.state.data.reminders]; 
    const oldValue = Number(input.defaultValue);   
    const index = newReminders.indexOf(oldValue);
    newReminders[index] = input.value;

    this.setState({ data: { ...this.state.data, reminders: newReminders } });
  };

  doAdd = () => {
    let newReminders = [...this.state.data.reminders];
    newReminders.push(1);

    this.setState({ data: { ...this.state.data, reminders: newReminders } });
  };
  
  render() {
    return (
      <div>
        <h3>Subscription Form</h3>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name", "text")}
          {this.renderSelect("subId", "Type", this.state.subTypes)}
          {this.renderDatePicker("expirationDate", "Due Date", "date")}
          {this.renderTextArea("notes", "Notes", "text")}
          {this.renderReminder("reminder")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default SubscriptionForm;
