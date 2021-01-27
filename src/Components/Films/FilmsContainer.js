import React from 'react'
import {connect} from 'react-redux'
import Film from "./Film";
import {setFilmsListAction, setIsLoading, setCurrentApiEndpoint, resetFilmsList, removeFilmFromList} from "../../redux/films-reducer";
import axios from "axios";
import Loader from "../Loader/Loader";
import {ColorLegend} from "./ColorLegend";
import Cookies from 'js-cookie'

class FilmsContainer extends React.Component {

    componentDidMount() {
        if(Cookies.get('logged') !== 'true'){
            window.location.replace("/login")
        }
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

        let baseUrl = process.env.voidApipEndpoint;
        axios.get(`${baseUrl}${this.props.films.currentApiEndpoint}`, {params: {sort: "priorita DESC"}}).then(resp => {
            console.log("data is", resp.data)
            this.props.setFilmsListAction(resp.data)
            this.props.setIsLoading(false)
        })
    }

    setCurrentApiEndpoint = (endpoint) => {
        if(this.props.films.currentApiEndpoint !== endpoint) {
            this.props.resetFilmsList()
            this.props.setCurrentApiEndpoint(endpoint)
        }
    }
    componentWillUnmount() {
        this.props.resetFilmsList()
    }

    render() {
        let filmsToDisplay = null

        if (this.props.films.list.length !== 0) {
            filmsToDisplay = this.props.films.list.map(film => <Film film={film}
                removeFromDb={(film) =>{
                    if(window.confirm("Are you sure you want to delete this film ?")){
                        axios.post('/api/films/remove-film', {film : film}).then(resp =>{
                            if(resp.status===200){
                                this.props.removeFilmFromList(film)
                            }else{
                                alert("Something went wrong...")
                            }
                        })
                    }
                }
            }/>)
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
                <h2 style={{color:"white"}}>TOTALE PAGINA : {this.props.films.list.length}</h2>
                <div>
                    {this.props.films.isLoading === true ? <Loader/> : filmsToDisplay}
                </div>
            </div>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        films: state.films,
        user: state.user
    }
}

export default connect(mapStateToProps, {
    setFilmsListAction,
    setIsLoading,
    setCurrentApiEndpoint,
    resetFilmsList,
    removeFilmFromList
})(FilmsContainer)
