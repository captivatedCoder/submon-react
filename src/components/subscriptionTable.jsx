import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class SubscriptionsTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: subscription => (
        <Link to={`/subscriptions/${subscription._id}`}>
          {subscription.name}
        </Link>
      )
    },
    { path: "subType", label: "Type" },
    { path: "expirationDate", label: "Due Date" },
    { path: "notes", label: "Notes" }
  ];

  render() {
    const { subscriptions } = this.props;

    return (
      <Table
        columns={this.columns}
        data={subscriptions}
      />
    );
  }
}

export default SubscriptionsTable;
