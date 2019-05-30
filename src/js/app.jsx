import React from 'react';
import '../css/style.less';

export default class App extends React.Component {
  // your Javascript goes here

  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
      rate: 0.01,
      term: 15,
      payment: '',    
    };
  }

  onChange(e) {
    // console.log('onChange(e):');
    // console.log('  e.target');
    // console.log('    .name:  ' + e.target.name);
    // console.log('    .value: ' + e.target.value);
    
    this.setState({ [e.target.name]: e.target.value });
    // switch( e.target.name  ) {

    //   case 'balance':
    //     this.setState({ balance: Number(e.target.value) });
    //     break;

    //   case 'rate':
    //     this.setState({ rate: Number(e.target.value) });
    //     break;

    //   case 'term':
    //     this.setState({ term: Number(e.target.value) });
    //     break;
    // }
  }


  calculate(balance, rate, term) {
    // console.log(`calculate(balance:${balance}, rate:${rate}, term:${term})`);
    const nt = term * 12;
    const rt = rate / 1200;
    const pt = (1 + rt) ** -nt;
    // const pt = Math.pow( (1 + rt), -nt);
    const payment = (balance * rt / (1 - pt)).toFixed(2);
    // console.log( `    payment: ${payment}`  );
    this.setState({ payment: payment });
  }

  render() {
    return (
      <div className='container'>

        <h3>Mortgage Calculator</h3>
        <div className="row">

          <div className="col-md-1 form-group">
            <label htmlFor="balance">Loan Balance: </label>
            <input 
              name="balance" 
              type="number" 
              value={this.state.balance} 
              onChange={e => this.onChange(e)} 
              className="form-control" 
            />
          </div>

          <div className="col-md-1 form-group">
            <label htmlFor="rate">Interest Rate (%): </label>
            <input 
              name="rate" 
              type="number" 
              step="0.01" 
              min ='0'
              value={this.state.rate} 
              onChange={e => this.onChange(e)} 
              className="form-control" />
          </div>

          <div className="col-md-1 form-group">
            <label htmlFor="term">Loan Term (years): </label>
            <select 
              name="term" 
              type="number" 
              value={this.state.term} 
              onChange={e => this.onChange(e)} 
              className="form-control"
            >
              <option value="15">15</option>
              <option value="30">30</option>
            </select>
          </div>

          <div className="col-md-1 offset-md-1  form-group">
            <button 
              name="submit" 
              className="btn btn-primary btn-block" 
              onClick={() => this.calculate(this.state.balance, this.state.rate, this.state.term)} 
              disabled={!this.state.balance || !this.state.rate || !this.state.term}
            > Calculate </button>
          </div>

          <div className="col-md-1 offset-md-1 form-group"  >

            <label htmlFor="payment" >Payment: </label>
            <h2 
              className="font-weight-bold text-primary"
              id="output"
            >
              {this.state.payment ? '$' + this.state.payment : ''}
            </h2>

          </div>

        </div>
      </div>
    );
  }
}

