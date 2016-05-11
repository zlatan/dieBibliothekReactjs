import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchWeather } from '../actions/index';
import { bindActionCreators } from 'redux';

import * as config from '../config';


var firstG, lastG, nextG, prevG;

class Pager extends Component{
    constructor(props) {
    super(props);
    this.state = {pageSize: config.DEFALT_PAGE_SIZE,
                  pageNumber: config.DEFALT_PAGE_NUMBER}
    this.onChangePageSize = this.onChangePageSize.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.firstPage = this.firstPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
    }

    onChangePageSize(event){
      this.setState({pageSize: event.target.value})
      var newPage = Math.floor((this.state.pageSize*(parseInt(this.state.pageNumber)))/(event.target.value));
      this.setState({pageNumber: newPage})
      this.props.fetchWeather(event.target.value,newPage);
    }

    nextPage(){
          this.props.fetchWeather(this.state.pageSize,nextG);
          this.setState({pageNumber: nextG});
      }

    prevPage(){
      this.props.fetchWeather(this.state.pageSize,prevG);
      this.setState({pageNumber: prevG});
    }

    firstPage(){
      this.props.fetchWeather(this.state.pageSize,firstG);
      this.setState({pageNumber: firstG});
    }

    lastPage(){
      this.props.fetchWeather(this.state.pageSize,lastG);
      this.setState({pageNumber: lastG});
    }

  render() {
    var navLinks = [];
    var infoLine = [];
    if (this.props.weather[0]){
      if(this.props.weather[0].page.totalElements){
        var totalElements = this.props.weather[0].page.totalElements;
      }

      if(this.props.weather[0].page.number){
        var number = this.props.weather[0].page.number;
        number = number + 1;
      } else {
        var number = config.DEFALT_PAGE_NUMBER + 1;
      }

      if(this.props.weather[0].page.totalPages){
        var totalPages = this.props.weather[0].page.totalPages;
        infoLine.push(
          <div key="infoLine">
          <div className="col-sm-1 col-xs-1 col-md-1" >
                   <select id="lang" className="form-control" onChange={this.onChangePageSize} value={this.state.pageSize}>
                   <option value={config.DEFALT_PAGE_SIZE}>{config.DEFALT_PAGE_SIZE}</option>
                   <option value="3">3</option>
                   <option value="5">5</option>
                   <option value="10">10</option>
                </select> книги на стр.
        </div>
        <div>от общо {totalElements}</div>
        <div> Стр: {number} от  {totalPages} </div>
      </div>);
      }

      if(this.props.weather[0]._links.first){
         firstG = this.props.weather[0]._links.first.href.match(/page=([0-9+])/)[1];
        navLinks.push(<li key="first" onClick={this.firstPage}> <a aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>);
      }

      if(this.props.weather[0]._links.prev){
         prevG = this.props.weather[0]._links.prev.href.match(/page=([0-9+])/)[1];
        navLinks.push(<li key="prev" onClick={this.prevPage}><a>Previous</a></li>);
      }

      if(this.props.weather[0]._links.next){
         nextG = this.props.weather[0]._links.next.href.match(/page=([0-9+])/)[1];
        navLinks.push(<li key="next" onClick={this.nextPage}><a>Next</a></li>);
      }

      if(this.props.weather[0]._links.last){
         lastG = this.props.weather[0]._links.last.href.match(/page=([0-9+])/)[1];
        navLinks.push(<li key="last" onClick={this.lastPage}> <a aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>);
      }
    }
    console.log(this.props.sortBy);
		return (
      <div className="row">
        {infoLine}
        <nav>
          <ul className="pagination">
          {navLinks}
          </ul>
        </nav>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    weather: state.weather,
    sortBy: state.sortBy
   };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchWeather }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Pager);
