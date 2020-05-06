import React from "react";
import Plot from "react-plotly.js";

export default class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: [],
      stockSymbol: "AMZN",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetchStock();
  }

  handleClick() {
    this.fetchStock();
  }

  fetchStock() {
    const pointerToThis = this;
    const API_KEY = "SLIIE11N2DCT0QUM";
    //let StockSymbol = "AMZN";
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${this.state.stockSymbol}&outputsize=compact&apikey=${API_KEY}`;
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];
    fetch(API_Call)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //console.log(data);

        for (var key in data["Time Series (Daily)"]) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(
            data["Time Series (Daily)"][key]["1. open"]
          );
        }

        //console.log(stockChartYValuesFunction);
        pointerToThis.setState({
          stockChartXValues: stockChartXValuesFunction,
          stockChartYValues: stockChartYValuesFunction,
        });
      });
  }

  render() {
    return (
      <div>
        <h1> Stock Market for {this.state.stockSymbol}</h1>
        <h2>
          <label>Company Name: </label>
          <input
            type="text"
            onChange={(e) => this.setState({ stockSymbol: e.target.value })}
          ></input>
          <button onClick={this.handleClick}>Search</button>
        </h2>
        <h4><a href={"http://eoddata.com/symbols.aspx"} target='blank'>Click here to view more stock symbols</a></h4>
        <Plot
          data={[
            {
              x: this.state.stockChartXValues,
              y: this.state.stockChartYValues,
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "red" },
            },
          ]}
          layout={{ width: 720, height: 440, title: "Stock market Plot" }}
        />
      </div>
    );
  }
}
