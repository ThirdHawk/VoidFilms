import React from 'react'
import {connect} from 'react-redux'
import Film from "./Film";
import {setFilmsListAction, setIsLoading, setCurrentApiEndpoint, resetFilmsList} from "../../redux/films-reducer";
import axios from "axios";
import Loader from "../Loader/Loader";
import {ColorLegend} from "./ColorLegend";

class FilmsContainer extends React.Component {

    componentDidMount() {
        if (this.props.films.list.length === 0) {
            this.getFilmsFromApi();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.films.list.length === 0){
            this.getFilmsFromApi()
        }
    }

    getFilmsFromApi = () => {
        if(this.props.films.isLoading === false){
            this.props.setIsLoading(true)
        }

        console.log("test")
        console.log("calling: " + this.props.films.currentApiEndpoint)

        axios.get(`${process.env.voidApipEndpoint}${this.props.films.currentApiEndpoint}`, {params: {sort: "priorita DESC"}}).then(resp => {
            this.props.setFilmsListAction(resp.data)
            this.props.setIsLoading(false)
        })
    }

    setCurrentApiEndpoint = (endpoint) => {
        // console.log("old: " + this.props.films.currentApiEndpoint)
        // console.log("new: " + endpoint)
        if(this.props.films.currentApiEndpoint !== endpoint) {
            this.props.resetFilmsList()
            this.props.setCurrentApiEndpoint(endpoint)
        }
    }

    render() {
        let filmsToDisplay = null

        if (this.props.films.list.length !== 0) {
            filmsToDisplay = this.props.films.list.map(film => <Film film={film}/>)
        }

        if (filmsToDisplay === null) {
            filmsToDisplay = "No films were found"
        }

        return (
            <div>
                <input type="button" value="Tutti i film" onClick={() => this.setCurrentApiEndpoint("/api/films")}/>
                <input type="button" value="Film da vedere" onClick={() => this.setCurrentApiEndpoint("/api/films-to-watch")}/>
                <input type="button" value="Film visti" onClick={() => this.setCurrentApiEndpoint("/api/films-watched")}/>
                <div>
                    <ColorLegend/>
                </div>
                <div>
                    {this.props.films.isLoading === true ? <Loader/> : filmsToDisplay}
                </div>
            </div>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        films: state.films
    }
}

export default connect(mapStateToProps, {
    setFilmsListAction,
    setIsLoading,
    setCurrentApiEndpoint,
    resetFilmsList
})(FilmsContainer)
