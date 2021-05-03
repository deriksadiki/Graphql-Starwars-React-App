import react from 'react';
import './More.Style.css'

function ListPeople (details : any){

    let personDetails = details.details;
    if (personDetails.length === undefined){
        const newObj = Object.assign({loading: true}, personDetails);
        personDetails = newObj
    }
   
    return(
        <div>
            {personDetails.loading ? 
             <div className="card">
                    <div className="headertxt">{personDetails.name}</div>
                    <hr style={{width:'90%'}}></hr>
                    <div className="headerText">Home Planet</div>
                    <table>
                    <tr className="fildName">Planet Name <td className="fildValue">{personDetails.planet.name}</td></tr>
                    <tr className="fildName">Rotational Period <td className="fildValue">{personDetails.planet.rotation_period}</td></tr>
                    <tr className="fildName">Orbital Period <td className="fildValue">{personDetails.planet.orbital_period} Days</td></tr>
                    <tr className="fildName">Diameter <td className="fildValue">{personDetails.planet.diameter}</td></tr>
                    <tr className="fildName">Climate <td className="fildValue">{personDetails.planet.climate}</td></tr>
                    <tr className="fildName">Gravity <td className="fildValue">{personDetails.planet.gravity}</td></tr>
                    <tr className="fildName">Terrain <td className="fildValue">{personDetails.planet.terrain}</td></tr>
                    <tr className="fildName">Surface Water <td className="fildValue">{personDetails.planet.surface_water}</td></tr>
                    <tr className="fildName">Population <td className="fildValue">{personDetails.planet.population}</td></tr>
                    
                    <div className="textHeader">Personal Details</div>
                   
                    <tr className="fildName">Gender <td className="fildValue">{personDetails.gender}</td></tr>
                    <tr className="fildName">Birth Year <td className="fildValue">{personDetails.birth_year}</td></tr>
                    <tr className="fildName">Height <td className="fildValue">{personDetails.height} cm</td></tr>
                    <tr className="fildName">Mass <td className="fildValue">{personDetails.mass} kg</td></tr>
                    <tr className="fildName">Hair Colour <td className="fildValue">{personDetails.hair_color}</td></tr>
                    <tr className="fildName">Skin Colour<td className="fildValue">{personDetails.skin_color}red</td></tr>
                    <tr className="fildName">Eye Colour<td className="fildValue">{personDetails.eye_color}</td></tr>
                    </table>
                    <div className="bottomline"></div>
             </div>
             : 
             <div> </div>
            }
        </div>
    )
}

export default ListPeople