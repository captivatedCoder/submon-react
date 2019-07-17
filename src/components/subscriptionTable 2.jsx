import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";
import Button from "react-bootstrap/Button";

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
    { path: "subType.name", label: "Type" },
    { path: "expirationDate", label: "Due Date" },
    { path: "notes", label: "Notes" },
    {
      key: "delete",
      content: subscription => (
        <Button
          onClick={() => this.props.onDelete(subscription)}          
          size="sm"
          variant="outline-danger"
        >
          Delete
        </Button>
      )
    }
  ];

  render() {
    const { subscriptions } = this.props;
    
    return (
      <Table responsive className="table">
        <TableHeader columns={this.columns} />
        <TableBody columns={this.columns} data={subscriptions} />
      </Table>      
    );
  }
}

export default SubscriptionsTable;
