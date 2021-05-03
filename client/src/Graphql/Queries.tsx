import {gql} from '@apollo/client'

export const LOAD_PEOPLE = gql`
query ($url : String!){
  Person (url: $url ){
    name,
    gender,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    planet {
        name,
        climate,
        population,
        rotation_period,
        orbital_period,
        diameter,
        gravity,
        terrain,
        surface_water
    }
  }
}
  
`;

export const SEARCH_PERSON = gql`
query ($personName: String!) {
    searchPerson (personName: $personName){
        name,
        gender,
        height,
        mass,
        hair_color,
        skin_color,
        eye_color,
        birth_year, 
    planet{
        name,
        climate,
        population,
        rotation_period,
        orbital_period,
        diameter,
        gravity,
        terrain,
        surface_water
    }
  }
}
`