import useDebounce from '../../hooks/useDebounce';
import './search.css'

function Search({updateSearchTerm}){
    const debounceUpdateSearch=useDebounce((e)=> updateSearchTerm(e.target.value))
    return(
        <input type='text' placeholder='Enter pokemon name' id='search-pokemon' onChange={debounceUpdateSearch}/>
    )
};
export default Search;