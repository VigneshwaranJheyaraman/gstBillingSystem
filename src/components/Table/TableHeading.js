import React, {Component} from 'react';
class TableHeading extends Component
{
    render()
    {
        return <tr>
            {
                this.props.tableHeading.map((v,i) => {
                    return <th key={i}>{v}</th>
            })
        }
        </tr>

    }
};
export default TableHeading;
