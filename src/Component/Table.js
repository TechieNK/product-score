import React from 'react';
import '../styles/stylesheet.css';
 
class Table extends React.Component {
    constructor(props) {
        super(props);
        this.positive_reviews = props.positive_reviews;
        this.negative_reviews = props.negative_reviews;
        this.tot_pos = [];
        this.tot_neg = [];
        for(var i=0; i<this.positive_reviews.length; i++)
        {
            let pos = {};
            pos['positive_reviews'] = this.positive_reviews[i];
            this.tot_pos.push(pos);
        }
        for(i=0; i<this.negative_reviews.length; i++)
        {
            let pos = {};
            pos['negative_reviews'] = this.negative_reviews[i];
            this.tot_neg.push(pos);
        }

        this.posdata = {columns:[{
            'label': 'Positive Reviews',
            'field': 'positive_reviews',
            'width': 50
        }],
            rows: this.tot_pos
        }
        this.negdata = {columns:[{
            'label': 'Negative Reviews',
            'field': 'negative_reviews',
            'width': 50
        }],
            rows: this.tot_neg
        }
    }

    render() {
        return (
            <div className="div_style">
                <div className="table_style">
                    <div className="table_header">Positive Reviews</div><br/>
                    {this.positive_reviews.map(function(item){
                        return <p className="cell">{item}</p>;
                    })}
                </div><br/><div className="table_style">
                    <div className="table_header">Negative Reviews</div><br/>
                    {this.negative_reviews.map(function(item){
                        return <p className="cell">{item}</p>;
                    })}
                </div>
            </div>

        );
    }

}

export default Table;