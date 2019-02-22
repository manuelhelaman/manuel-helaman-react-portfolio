import React, { Component } from "react";

import PortfolioItem from './portfolio-item';

export default class PortfolioContainer extends Component {
    constructor() {
        super();

        this.state = {
            pageTitle: "Welcome to my portfolio",
            isLoading: false,
            data: [
                {title: "Quip", category: "eCommerce", slug: 'quip' },
                {title: "Aeromexico", category: "Flights", slug: 'aeromexico'},
                {title: "Joyas Morne", category: "Jewelry", slug: 'joyas-morne'},
                {title: "Bottega", category: "eCommerce", slug: 'bottega'}
            ] 
        };

        this.handleFilter = this.handleFilter.bind(this);
    }

    handleFilter(filter) {
        this.setState({
            data: this.state.data.filter(item => {
                return item.category === filter;
            })
        })
    }

    portfolioItems() {
        return this.state.data.map(item => {
            return <PortfolioItem title={item.title} url={"google.com"} slug={item.slug}/>;
        });
    }

    render() {
        if(this.state.isLoading) {
            return <div>Loading...</div>;
        }
        
        return (
            <div>
                <h2>{this.state.pageTitle}</h2>

                <button onClick={() => this.handleFilter('eCommerce')}>eCommerce</button>
                <button onClick={() => this.handleFilter('Flights')}>Flights</button>
                <button onClick={() => this.handleFilter('Jewelry')}>Jewelry</button>

                {this.portfolioItems()}

            </div>
        );
    }
}


