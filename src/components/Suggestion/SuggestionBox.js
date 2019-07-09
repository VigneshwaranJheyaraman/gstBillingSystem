import React, {Component} from 'react';
import Suggestion from './Suggestion';
class SuggestionBox extends Component
{
    render()
    {
        const sugg = []
        this.props.suggestions.map((v,i) => {
            sugg.push(<Suggestion className={this.props.activeSuggestion === i ? "activeSuggestion": "suggestionDiv"} value={v.pName} key={i} onClick={this.props.onClick}/>);
            return "";
        });
        return (
            <div className="suggestBox"  style={{display:this.props.display}}>
                <div className="suggestion">
                    {
                        sugg
                    }
                </div>
            </div>
        );
    }
}
export default SuggestionBox;