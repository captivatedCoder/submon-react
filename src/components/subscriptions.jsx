import React, { Component } from "react";
import { Link } from "react-router-dom";
import SubscriptionTable from "./subscriptionTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import SearchBox from "./searchBox";
import {
  getSubscriptions,
  deleteSubscription
} from "../services/subscriptionService";
import { getSubTypes } from "../services/subTypeService";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Subscriptions extends Component {
  state = {
    subscriptions: [],
    subTypes: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedSubType: null,
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const { data } = await getSubTypes();
    const subTypes = [{ _id: "", name: "All SubTypes" }, ...data];

    const { data: subscriptions } = await getSubscriptions(
      localStorage.getItem("token")
    );

    this.setState({ subscriptions, subTypes });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSubTypeSelect = subType => {
    this.setState({
      selectedSubType: subType,
      searchQuery: "",
      currentPage: 1
    });
  };

  handleSearch = query => {
    this.setState({
      searchQuery: query,
      selectedSubType: null,
      currentPage: 1
    });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleDelete = async subscription => {
    const originalSubs = this.state.subscriptions;
    const subscriptions = originalSubs.filter(s => s._id !== subscription._id);
    this.setState({ subscriptions });

    try {
      await deleteSubscription(subscription._id);
    } catch (ex) {}
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedSubType,
      searchQuery,
      subscriptions: allSubscriptions
    } = this.state;

    let filtered = allSubscriptions;

    console.log(`filtered: ${filtered}`);
    console.log(`Search query:${searchQuery}`);

    if (searchQuery){

      console.log("in if");

      filtered = allSubscriptions.filter(s =>
        s.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );}
    else if (selectedSubType && selectedSubType._id){

      console.log("in else if");

      filtered = allSubscriptions.filter(
        s => s.subType._id === selectedSubType._id
      );}

    console.log(`After search query ${filtered}`);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    console.log(`Sorted: ${sorted}`);

    const subscriptions = paginate(sorted, currentPage, pageSize);
        
    return { totalCount: filtered.length, data: subscriptions };
  };

  render() {
    const { length: count } = this.state.subscriptions;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    const { totalCount, data: subscriptions } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.subTypes}
            selectedItem={this.state.selectedSubType}
            onItemSelect={this.handleSubTypeSelect}
          />
        </div>

        <div className="col">
          <Link to="subscriptions/new" variant="primary">
            New Sub
          </Link>
          <p>Showing {totalCount} subscriptions in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <SubscriptionTable
            subscriptions={subscriptions}
            onDelete={this.handleDelete}
            sortColumn={sortColumn}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Subscriptions;
