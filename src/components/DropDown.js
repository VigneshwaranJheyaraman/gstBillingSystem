import React, {Component} from 'react';
class DropDown extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {objectSelected:""};
        this.objectSelection = this.objectSelection.bind(this);
    }
    objectSelection(e)
    {
        let index = e.target.selectedIndex;
        this.setState({objectSelected:e.target.value}, () => {
            this.props.optionSelected(this.state.objectSelected, index, e);
        });
    }
    render()
    {
        return (
            <select onChange={this.objectSelection}>
                {
                    this.props.objectData.map((v,i) => {
                        return <option selected={this.props.customerSelected === i} key={i}>{v.custName}</option>
                    })
                }
            </select>
        );
    }
};
export default DropDown;