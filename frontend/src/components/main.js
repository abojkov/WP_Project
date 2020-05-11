import axios from 'axios'
import React, {Component} from 'react'

export default class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoaded: false
        }
    }

    componentDidMount() {
        axios.get('')
            .then(res => {
                //console.log(res);
                this.setState({
                    items: res.data.results,
                    isLoaded: true
                })
            })
    }

    render(){

        var items = this.state.items;
        var isLoaded = this.state.isLoaded;

        return(
            <div style={{fontSize: "1.5em", margin: "auto", width: "70%", textAlign: "center"}} className="alert alert-info">
                Ова е проект по предметот Веб програмирање. Јас сум Александар Бојков,<br/>
                студент на Факултетот за Информатички Науки и Компјутерско Инженерство, со број на индекс 173023.
            </div>
        )
    }
}
