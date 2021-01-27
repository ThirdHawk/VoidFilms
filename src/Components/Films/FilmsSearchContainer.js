import React from 'react'
import {connect} from 'react-redux'
import axios from "axios";
import {setFilmToSearch, resetFilmToSearch, setFilmsList, resetFilmsList, addFilmToDb} from "../../redux/films-search-reducer";
import {FilmGenericSearch} from "./FilmGenericSearch";
import style from './Films.module.css'
import dudeStaring from '../../images/black_dude_staring.jpg'
import Cookies from 'js-cookie'

const config = require('../../configs/config.json')

class FilmsSearchContainer extends React.Component {
    constructor() {
        super();
        this.filmToSearch = React.createRef()
        this.delay = null;
    }

    componentDidMount() {
        if(Cookies.get('logged') !== 'true'){
            window.location.replace("/login")
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.filmsSearch.filmToSearch !== this.props.filmsSearch.filmToSearch) {
            if(this.delay !== null){
                clearTimeout(this.delay)
            }
            this.delay = setTimeout(() => this.searchFilmByName(), 250)
        }
    }

    onSearchFieldChange() {
        this.props.setFilmToSearch(this.filmToSearch.current.value)
    }

    searchFilmByName() {
        console.log("Searching : " + encodeURI(this.props.filmsSearch.filmToSearch))
        let data = []

        new Promise(resolve => {
            axios.get(`${config.omdbNameSearch}${encodeURI(this.props.filmsSearch.filmToSearch)}`).then(async resp => {
                if (resp.data.Search !== undefined) {
                    data = resp.data.Search
                }
                resolve(data)
            })
        }).then(promiseResult => {
            data = []
            Promise.all(promiseResult.map(async film => {
                await axios.get('/api/films/check-if-exists', {params: {imdbId: film.imdbID}}).then(async check => {
                    if (check.data.length !== 0) {
                        film.inDb = true
                    }
                    data.push(film)
                    this.props.setFilmsList(data)
                })
            })).then(finalRes => {
                this.props.setFilmsList(data)
            })
        })
    }

    componentWillUnmount() {
        this.props.resetFilmToSearch()
        this.props.resetFilmsList()
    }

    render() {
        let filmsToDisplay = ""
        if (this.props.filmsSearch.searchList.length !== 0) {
            filmsToDisplay = this.props.filmsSearch.searchList.map(film => <FilmGenericSearch film={film}
                addToDb={(film) => {
                    if(window.confirm("\"Are you sure about that ?\" -cit. John Cena")){
                        axios.get(`${config.omdbIdSearch}${film.imdbID}`).then(resp => {
                            axios.post('/api/films/add-film', {film: resp.data}).then(dbResp => {
                                if(dbResp.status === 200){
                                    this.props.addFilmToDb(film)
                                }else{
                                    alert("Something went wrong")
                                }
                            })
                        })
                    }
                }
            }/>)
        }
        return (
            <div>
                <input type="text" placeholder="Film to search..." ref={this.filmToSearch}
                       onChange={() => this.onSearchFieldChange()} value={this.props.filmsSearch.filmToSearch}/>
                <button onClick={() => this.props.resetFilmToSearch()}>Reset</button>
                <p>
                    {filmsToDisplay === "" ?
                        <img src={dudeStaring} className={style.dudeStaringImg}/>
                        :
                        <div className={style.genericSearchContainer}>
                            {filmsToDisplay}
                        </div>
                    }
                </p>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        filmsSearch: state.filmsSearch,
        user: state.user
    }
}

export default connect(mapStateToProps, {
    setFilmToSearch,
    resetFilmToSearch,
    setFilmsList,
    resetFilmsList,
    addFilmToDb
})(FilmsSearchContainer)