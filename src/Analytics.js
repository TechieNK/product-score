import React from 'react';
import axios from 'axios';
import Loader from "react-loader-spinner";
import './styles/stylesheet.css';
import Graph from './Component/Graph';
import Table from './Component/Table';
class AnalyticsPage extends React.Component{

    constructor(props) {
        super(props);
        this.app_name = props.app_name;
        this.state = {'big5_graph':{}, 'big5_traits_graph':{}, 'sentiment_graph':{}, 'star_graph':{}, 
        'rating_bar_chart':{}, 'rating_line_chart':{},
        'iptc_chart':{},
        'top_keyword_graph':{}, 'exception': false, 'exception_val': '',
        'positive_reviews':[], 'negative_reviews':[], 'top_keywords_chart':{},
        'positive_tweets':[], 'negative_tweets':[],
        'type': ''};
        this.loading = true;
        this.getReviews();
    }
 
    getReviews = async() => {
        
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };

        
        //com.atlassian.confluence.plugins.confluence-questions 
        this.url = 'https://jayanth-api.herokuapp.com/analyze?key='.concat(this.app_name);
        await axios.get(this.url, requestOptions)
            .then((response)=>{
                if('exception' in response.data)
                {
                    this.loading = false;
                    this.setState({'exception': true, 'exception_val': 'Failed to fetch the reviews. Please try again with valid details'});

                }
                else
                {
                    let data = response.data;
                    console.log('Success');
                    this.loading = false;
                    if(data['type'] === 'twitter')
                    {
                        this.setState({
                            'big5_graph':JSON.parse(data['big5_traits_graph']), 
                            'big5_traits_graph':JSON.parse(data['big5_traits_val_graph']),
                            'star_graph':JSON.parse(data['star_dist']),
                            'top_keyword_graph':JSON.parse(data['top_keywords']),
                            'positive_tweets': data['positive_reviews'],
                            'negative_tweets': data['negative_reviews'],
                            'type': data['type'],
                            'exception': false
                        });
                    }
                   else {
                        this.setState({ 
                            'big5_traits_graph':JSON.parse(data['behavorial_chart']),
                            'sentiment_graph':JSON.parse(data['emotional_chart']),
                            'rating_bar_chart':JSON.parse(data['rating_bar_chart']),
                            'rating_line_chart':JSON.parse(data['rating_line_chart']),
                            'positive_reviews': data['positive_reviews'],
                            'negative_reviews': data['negative_reviews'],
                            'iptc_chart': JSON.parse(data['iptc_chart']),
                            'top_keywords_chart': JSON.parse(data['top_keywords_chart']),
                            'type': data['type'],
                            'exception': false
                        });
                   }

                }
                
            });
        
    }
    
    render() {
        if (this.loading) {
            return(
            <center><div className="loader">
                <Loader
                    type="Bars"
                    color="#0052CC"
                    height={100}
                    width={100}
                />
                <p className="analyzing">Analyzing the reviews...</p>
            </div></center>
            )

        }
        if(this.state.exception) {
            return(
                <div className='card'>
                    <h3 className="error_msg">{this.state.exception_val}</h3>
                </div>
            )
        }
        else {
            return(
                <div className="card">
                    {this.state.positive_reviews[0] &&
                        <Table positive_reviews={this.state.positive_reviews}
                                negative_reviews={this.state.negative_reviews}
                                type="reviews"
                                />}
                    {this.state.positive_tweets[0] &&
                        <Table positive_reviews={this.state.positive_tweets}
                                negative_reviews={this.state.negative_tweets}
                                type="tweets"
                                />}
                    <div className="card_row">
                        {this.state.big5_graph['data'] && 
                            <Graph data={this.state.big5_graph['data']} 
                                layout={this.state.big5_graph['layout']}
                                heading = "General Insights"
                                desc = "The pie chart depicts the common traits found in the review of your product"
                                />}
                        {this.state.big5_traits_graph['data'] && 
                            <Graph data={this.state.big5_traits_graph['data']} 
                                layout={this.state.big5_traits_graph['layout']}
                                heading = "Emotional Analysis"
                                desc = "Wondered what is the general emotion of your reviews? Using our NLP services it is easy to visualize what the users think about the product on an emotional level"
                                />}
                        {this.state.sentiment_graph['data'] && 
                            <Graph data={this.state.sentiment_graph['data']} 
                                layout={this.state.sentiment_graph['layout']}
                                heading = "Behavioral Analysis"
                                desc = "The BIG5 traits are personality traits which are of five types. Extraversion (also often spelled extroversion), Agreeableness, Openness, Conscientiousness, and Neuroticism. The following graph is trying to depict the personality of the users who have reviewed your product by using an NLP model."
                                />}
                    </div>
                    <div className="card_row">
                        {this.state.star_graph['data'] &&
                            <Graph data={this.state.star_graph['data']} 
                                layout={this.state.star_graph['layout']}
                                heading = "Likes"
                                desc = "The line chart shown is a visual representation of how users have liked your tweets"
                            />}
                        {this.state.top_keyword_graph['data'] && 
                            <Graph data={this.state.top_keyword_graph['data']} 
                                layout={this.state.top_keyword_graph['layout']}
                                heading = "Top Keywords"
                                desc = "The histogram below shows the top keywords collected from the reviews using some NLP tools at the disposal."
                            />}
                        {this.state.rating_bar_chart['data'] && 
                            <Graph data={this.state.rating_bar_chart['data']} 
                                layout={this.state.rating_bar_chart['layout']}
                                heading = "Overall Rating"
                                desc = "The bar plot below shows you a general distribution of how users have rated your product over time."
                            />}
                        {this.state.rating_line_chart['data'] && 
                            <Graph data={this.state.rating_line_chart['data']} 
                                layout={this.state.rating_line_chart['layout']}
                                heading = "Ratings (Historic Data)"
                                desc = "This graph is used to depict how the scores of your product have varied from when your app was launched to current time. It gives meaningful insights on how length of a review might be affecting a score or which type of score has increased for your app."
                            />}
                    </div>
                    <div className="card_row">
                        {this.state.top_keywords_chart['data'] && 
                                <Graph data={this.state.top_keywords_chart['data']} 
                                    layout={this.state.top_keywords_chart['layout']}
                                    heading = "Top Keywords"
                                    desc = "This graph tries to use NLP tools such as 'nltk' to find the top keywords in your reviews and depict them for you!"
                                />}
                        {this.state.iptc_chart['data'] && 
                            <Graph data={this.state.iptc_chart['data']} 
                                layout={this.state.iptc_chart['layout']}
                                heading = "IPTC Analysis"
                                desc = "This graph tries to fetch the topics of importance from the reviews for you!"
                            />}
                    </div>
                </div>
            );
        }
        
    }
}

export default AnalyticsPage;