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
            TableClicked:false
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
        var nav = window.navigator.userAgent;
        if(nav.indexOf("MSIE ") > 0)
        {
            console.log("CLicked");
            this.setState({TableClicked:true}, () => {
                var exportWindow = document.open("");
                exportWindow.write(ReactDOM.findDOMNode(this).outerHTML);
                exportWindow.execCommand("SaveAs",true,"Say Thanks to Submit.xls");
                exportWindow.close();
                this.setState({TableClicked:false});
            });
        }
        else
        {
            this.setState({TableClicked:true}, () => {
            window.open('data:application/vnd.ms-excel,' + encodeURIComponent(ReactDOM.findDOMNode(this).outerHTML));
            this.setState({TableClicked:false});
        });
        }
    }
    render()
    {
        return <table className={this.props.className} style={this.state.TableClicked?{border:"1px solid"}:{}}>
            <thead>
                <tr style={{backgroundColor:"transparent"}}>
                    <td><Button className="printbutton" iconClassName="fa fa-print" onClick={this.printTable}/></td>
                    <td><Button className="excelbutton" iconClassName="fa fa-file" onClick={this.exportCsv} /></td>
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