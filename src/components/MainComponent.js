import React, { Component } from 'react';
import Home from './HomeComponent';
import About from './AboutComponent';
import Menu from './MenuComponent'
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Header  from './Headercomponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import {Switch, Route, Redirect} from 'react-router-dom';


  class Main extends Component {

    constructor(props){
      super(props);
      this.state={
        dishes: DISHES,
        comments: COMMENTS,
        promotions: PROMOTIONS,
        leaders: LEADERS
        // selectedDish: null
      };
    }
    onDishSelect(dishId) {
      this.setState({selectedDish:dishId});
    }
      render() {
        
        const HomePage = () => {
          return(
            <Home dish={this.state.dishes.filter((dish)=>dish.featured)[0]}
            promotion={this.state.promotions.filter((promo)=>promo.featured)[0]}
            leader={this.state.leaders.filter((leader)=>leader.featured)[0]}
          />
          );
        }
        const DishWithId = ({match}) => {
            return(
              <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.parameter,10))[0]} 
            comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.parameter,10))} />
            );
        }

        return (
          <div>
             <Header data-testid="check-1" name="Restornate de Confusion" /> 

            <Switch>
              <Route path="/home" component={HomePage} />
              <Route exact path="/aboutus" component={()=> <About leader={this.state.leaders} />} />
              <Route exact path="/menu" component={()=> <Menu dishes={this.state.dishes} />} />
              <Route path="/Menu/:parameter" component={DishWithId} />
              <Route exact path="/contactus" component={Contact} />
              <Redirect to="/home" />
            </Switch>

            <Footer/>
            {/* <Menu dishes={this.state.dishes} onclicking={(dishId) => this.onDishSelect(dishId)} />
            <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
            
          </div>
        );
    }
  }

export default Main;
