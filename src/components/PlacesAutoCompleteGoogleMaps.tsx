import React, {useState} from "react";
import PlacesAutocomplete from 'react-places-autocomplete';
const PlacesAutoCompleteGoogleMaps = ({input, meta}) => {
    const [address, setAddress] = useState("");
    const handleSelect = async (value) => {
        setAddress(value);
        // const results = await geocodeByAddress(value);
        // console.log(results,"results");
    };
    const handleChange = async (value) => {
        setAddress(value);
        // const results = await geocodeByAddress(value);
        // console.log(results,"results");
    };
    //(<PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>
    return(<PlacesAutocomplete value={input.value} onChange={input.onChange} onSelect={input.onSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
                <input
                    {...getInputProps({
                        placeholder: 'Search Places ...',
                        className: 'location-search-input',
                    })}
                />
                <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                        const className = suggestion.active
                            ? 'suggestion-item--active'
                            : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                            <div
                                {...getSuggestionItemProps(suggestion, {
                                    className,
                                    style,
                                })}
                            >
                                <span>{suggestion.description}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        )}
    </PlacesAutocomplete>)
}
export default PlacesAutoCompleteGoogleMaps;