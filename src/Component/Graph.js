import React from "react";
import Plot from "react-plotly.js";
import '../styles/stylesheet.css';

class Graph extends React.Component{

    constructor(props) {
        super(props);
        this.state = {'layout': props.layout, 'data': props.data};
        this.heading = props.heading;
        this.desc = props.desc;
    }

    render() {
        return(
            <div className="plot_container"><div className="table_header">{this.heading}</div><div className="desc">{this.desc}</div><Plot 
                data={this.state.data}
                layout={this.state.layout}
            />
            </div>
        );
    }
}

export default Graph;