import react, { useState, useEffect } from 'react';
import { LOAD_PEOPLE } from '../../Graphql/Queries';
import SearchPerson from '../SearchPerson/SearchPerson';
import MoreInfo from '../ShowMoreInfo/MoreInfo'
import {useQuery} from '@apollo/client';
import axios from 'axios';
import './List.Style.css'
import Pagination from '../Pagination/Pagination';
import Loader from '../Loader/Loader';

const ListPeople : React.FC = () =>{
    let tempArray = new Array
    let pageCounter = 1;
    let pagesArray = new Array;
    let namesList = new Array;
    const [peopleUrl, setUrl] = useState("https://swapi.dev/api/people/");
    const { error, loading, data} = useQuery(LOAD_PEOPLE, {variables: { url : peopleUrl }});
    const [storeNames, saveNames] = useState([tempArray]);
    const [people, setPeople] = useState(tempArray);
    const [selectedPerson, setPerson] = useState(tempArray)
    const [pageNumbers, setPageNumbers] = useState(tempArray);
    const [selectedCard, setCard] = useState(0);
    const [trackLoading, setLoadingTrack] = useState(false)
    const [showLoading, setLoading] = useState(true)
    

    const getPerson = (personDetails: any[]):void => {
        if (personDetails.length === 0)
            showList()
        else
            setPeople(personDetails)
   }

   const changePage = (pageNumber : string) : void =>{
        let url = "https://swapi.dev/api/people/?page=" + pageNumber
            setUrl(url)
            setLoading(true)
   }

   const showList = () =>{
    let tempArr = new Array()
    for (var x = 0; x < data.Person.length; x++){
        if (x == 0){
            setPerson(data.Person[x])
        }
           
        tempArr.push(data.Person[x])
    }
        setPeople(tempArr)
   }

    useEffect(()=> {
        if (data){
            showList()
            if (trackLoading){
                setLoading(false)
            }
        }
        if (loading)
            console.log(loading);
        if (error)
            console.log(error)
    },[data])


    useEffect(() =>{
        getPagination('https://swapi.dev/api/people/')
    }, [])

 const getPagination = (url : any) =>{
        axios.get(url).then(res =>{
            if (res.data.next != null){
                const list = res.data.results;
                for (var x = 0; x < list.length; x++){
                   namesList.push(list[x].name)
                }
                
                pagesArray.push(pageCounter)
                pageCounter++;
                getPagination(res.data.next)
            }else{
                const list = res.data.results;
                for (var x = 0; x < list.length; x++){
                   namesList.push(list[x].name)
                }
                
                setLoading(false)
                pagesArray.push(pageCounter)
                setPageNumbers(pagesArray)
                saveNames(namesList)
                setLoadingTrack(true)
               
            }
        })
    }

    const selectPerson = (details : any, indx : any) =>{
        setCard(indx)
        setPerson(details)
    }

    return(
        <div>
            <SearchPerson peopleNames={storeNames}  getPerson={getPerson}/>
            <MoreInfo  details={selectedPerson}/>
            <Loader  loadingState={showLoading}/>
            <div className="listBody">
            {
                people.map((val, indx) =>{
                 return(
                     <div className="cards" key={indx} onClick={(eve)=>selectPerson(val, indx)} > 
                        <div className="listCard" >
                        <div  className={selectedCard === indx ? "cardColorSelected" : "cardColor"}></div>
                        <div className="cardHeader">{val.name}<span className="cardView">View</span></div>
                        <div className="cardBody">{val.planet.name} <span className="cardMass">Weight: {val.mass}kg</span> <span className="cardHeight">Height: {val.height}cm</span></div>
                    </div>
                </div>
                 )
                })
            }
            </div>
           
          <Pagination pagesList={pageNumbers} changePage={changePage}/>
            
        </div>
    )
}

export default ListPeople