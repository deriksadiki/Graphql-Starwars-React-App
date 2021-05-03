import react, { useState, useEffect } from 'react';
import {useQuery} from '@apollo/client';
import searchImage from '../../Images/search.png';
import warsImages from '../../Images/wars.png';
import './Search.Syle.css'
import { SEARCH_PERSON } from '../../Graphql/Queries';
import React from 'react';

interface NamesProps {
    peopleNames: any[],
    getPerson : (arg : any[]) => void
  }

const SearchPerson:  React.FC <NamesProps> = ({peopleNames, getPerson}) =>{
    let storeNames =  peopleNames;
    const tempArr = new Array()
    const [modalState, setModalState] = useState(false);
    const [findName, setFindName] = useState('');
    const [searchText, setSeachText] =  useState('');
    const [searchName, saveSearchName] = useState(tempArr);
    const {error, loading, data} = useQuery(SEARCH_PERSON, {variables: { personName : findName }});
    
    useEffect(()=>{
        if (data && searchText !== ''){
            let tempArray = new Array();
            tempArray.push(data.searchPerson)
            getPerson(tempArray)
        }
           
    }, [data])

    const search  = (name : any) =>{
        if (name.length > 1){
            setModalState(true)
            let tempArray =  new Array();
            for (var x = 0; x < storeNames.length; x++){
                if (storeNames[x].toLowerCase().indexOf(name.toLowerCase()) > -1){
                        tempArray.push(storeNames[x])
                }
            }
           saveSearchName(tempArray)
        }else{
            setModalState(false)
            saveSearchName([])
            getPerson([])
        }  
    }

    
    const seacrhName = (name : any) =>{
        setModalState(false)
        setSeachText(name)
        setFindName(name)
        saveSearchName([])
    }

    

    return(
        <div>
            <div className="header">
            <img className="headerImage" src={warsImages} />
                <div className="inputBody">
                    <input className="searchInput" value={searchText} onChange={(text) => {search(text.target.value); setSeachText(text.target.value)}}  placeholder="Search by character name…" />
                    <img className="searchImg" src={searchImage} />
                </div>
            </div>
           <div className={modalState ? "showModal" : "hideModal"}>
                <div className="coverBackground">
                    <div className="coverContent">
                        <p style={{marginLeft: '5%', fontWeight: 'bold'}}>Results <span className="close" onClick={()=>{setSeachText('');setModalState(false)}}>&times;</span></p>
                        <hr style={{width: '90%'}}></hr>
                        {
                            searchName.map((val,indx) =>{
                                return(
                                    <div key={indx} onClick={()=> seacrhName(val)}> 
                                    <p className="searchResults" >{val}</p>
                                    </div>
                                )
                            })
                        }
                        <div className="bottomColor"></div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default SearchPerson;