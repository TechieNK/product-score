import React from 'react';
import '../styles/stylesheet.css';
 
class Table extends React.Component {
    constructor(props) {
        super(props);
        this.positive_reviews = props.positive_reviews;
        this.negative_reviews = props.negative_reviews;
        this.type = props.type;
        this.tot_pos = [];
        this.tot_neg = [];
        this.pos_text = '';
        this.neg_text = '';
        if(this.type=='reviews')
        {
            this.pos_text = 'Positive Reviews';
            this.neg_text = 'Negative Reviews';
        }
        else {
            this.pos_text = 'Positive Tweets';
            this.neg_text = 'Negative Tweets';
        }
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
            'label': this.pos_text,
            'field': 'positive_reviews',
            'width': 50
        }],
            rows: this.tot_pos
        }
        this.negdata = {columns:[{
            'label': this.neg_text,
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
                    <div className="table_header">{this.pos_text}</div><br/>
                    {this.positive_reviews.map(function(item){
                        return <p className="cell">{item}</p>;
                    })}
                </div><br/><div className="table_style">
                    <div className="table_header">{this.neg_text}</div><br/>
                    {this.negative_reviews.map(function(item){
                        return <p className="cell">{item}</p>;
                    })}
                </div>
            </div>

        );
    }

}

export default Table;