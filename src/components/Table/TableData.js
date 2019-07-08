import React, {Component} from 'react';
class TableData extends Component
{
    render()
    {
        let comp = [];
        this.props.objectattributes.map((val,i) => {
           comp.push(<td key={i}>{this.props.value[val]}</td>);
           return "";
        });
        return <tr>
            {
                comp
            }
        </tr>
    }
};
export default TableData;