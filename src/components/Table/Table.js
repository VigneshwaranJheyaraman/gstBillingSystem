import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TableRow from './TableRow';
import TableHeading from './TableHeading';
import TableFooter from './TableFooter';
import Button from '../Button';
class Table extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            TableClicked:false,
            downloadLink : "",
            downloadFileName: ""
        };
        this.printTable = this.printTable.bind(this);
        this.exportCsv = this.exportCsv.bind(this);
    }
    printTable(e)
    {
        //console.log(ReactDOM.findDOMNode(this).outerHTML);
        this.setState({TableClicked:true}, ()=> {
            var newwindow = window.open("");
            newwindow.document.write(ReactDOM.findDOMNode(this).outerHTML);
            newwindow.print();
            newwindow.close();
            this.setState({TableClicked:false});
        });
    }

    exportCsv(e)
    {
        var uriComponent = "";
        let customerName = this.props.tableData[0].custName;
        this.props.tableHeading.forEach((v) => {
            uriComponent += v+","
        });
        uriComponent +="\r\n";
        this.props.tableData.forEach((v) => {
            this.props.objectattributes.forEach((a) => {
                uriComponent += v[a] +",";
            });
            uriComponent += "\r\n";
        });
        this.props.tableHeading.forEach((v,i) => {
            if(i === 0)
            {
                uriComponent += "Final Price" + ",";
            }
            else if(i === (this.props.tableHeading.length -1))
            {
                uriComponent += this.props.finalPrice +",";
            }
            else
            {
                uriComponent += " ,";
            }
        });
        uriComponent += "\r\n";
        this.setState({downloadLink:"data:application/csv;;charset=UTF-8,"+encodeURIComponent(uriComponent), downloadFileName:`${customerName}_${(new Date()).getTime()}.csv`});
    }
    render()
    {
        return <table className={this.props.className} style={this.state.TableClicked?{border:"1px solid"}:{}}>
            <thead>
                <tr style={{backgroundColor:"transparent"}}>
                    <td className={this.props.optionsClassName}><Button className="printbutton" iconClassName="fa fa-print" onClick={this.printTable} href=""/></td>
                    <td className={this.props.optionsClassName}><Button className="excelbutton" iconClassName="fa fa-file" onClick={this.exportCsv} href={this.state.downloadLink} fileName={this.state.downloadFileName}/></td>
                </tr>
                <TableHeading tableHeading={this.props.tableHeading} />
            </thead>
            <tbody>
                <TableRow  tableData={this.props.tableData} objectattributes={this.props.objectattributes}/>
            </tbody>
            <tfoot>
                <TableFooter objectattributes={this.props.objectattributes} finalPrice ={this.props.finalPrice} totalGst={this.props.totalGst} />
            </tfoot>
        </table>
    }
};
export default Table;