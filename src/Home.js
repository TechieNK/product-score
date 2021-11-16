import React from 'react';
import AnalyticsPage from './Analytics';
import './styles/stylesheet.css';


class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {'formState': false, 'value': ""};
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.app_name = '';
  }

  onChange(event) {
    this.setState({'formState': false, 'value': event.target.value})
  };

  onSubmit(event) {
      this.setState({'formState': true, 'value': this.state.value});
      this.app_name = this.state.value;
      event.preventDefault();  
  };


  render() {
    return(
    <div className="parent_card">
      <div id="header" className="card">
        <h1 className="text">PRODUCT SCORE</h1>
        <p className="text">An one-stop solution for analysing your product reviews</p>
        <br/><hr></hr>
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.formData} onChange={this.onChange} className="input_field" placeholder="Enter the Atlassian Marketplace package name  / Google Play URL / App Store URL here"/>&nbsp;&nbsp;          <button type="submit" className="submit_btn">ANALYZE</button> 
        </form> 
      </div>
      {this.state.formState && <AnalyticsPage app_name={this.app_name} />}
    </div>
    );
  }

}

export default Home;