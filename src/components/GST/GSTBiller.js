import React, {Component} from 'react';
import InputField from '../InputField';
import Button from '../Button';
import dataBase from '../../database';
import SuggestionBox from '../Suggestion/SuggestionBox';
import UserPurchase from '../UserPurchase';
class GSTBiller extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            validCustomer : false,
            autoCompleteInput: '',
            customerId: '',
            qty:0,
            color:'none',
            productSuggestion: [],
            suggestBoxDisplay: "none",
            userPurchaseTableDisplay: "none",
            customerPurchaseList:[],
            customerObjectProperties: ["custid","custName","purid","prodid","prodName","pGst","pPrice","qty","tGst","tPrice"]
        };
        this.handleAutoCorrect = this.handleAutoCorrect.bind(this);
        this.updatedDatabase = this.updatedDatabase.bind(this);
        this.addToDatabase = this.addToDatabase.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.checkCustomerAvail = this.checkCustomerAvail.bind(this);
        this.updateAutoCompleteField = this.updateAutoCompleteField.bind(this);
        this.getCustomerList = this.getCustomerList.bind(this);
    }
    //handle autocorrect from DB
    async handleAutoCorrect(value, e)
    {
        this.setState({autoCompleteInput: value, suggestBoxDisplay:"block"});
        var productsDb = await dataBase.product.toArray();
        var productList = this.state.productSuggestion;
        if(/[a-zA-Z]/.test(value))
        {
            let sb = Object.assign([], productsDb).filter((v, i) => {
                if(value.toLowerCase() === v.pName.toLowerCase().substr(0, value.length))return v;
            });
            this.setState({productSuggestion: sb});
        }
        else if(/[0-9]+/.test(value))
        {
            Object.assign([], productsDb).map((v,i) => {
                if(parseInt(value) === v.prodid)
                {
                    productList.push(v);
                }
                return "";
            });
            this.setState({productSuggestion:productList});
        }
        else if(value === "")
        {
            this.setState({color:'rgb(255,255,255)', productSuggestion:[], suggestBoxDisplay:"none"});
        }
        else
        {
            this.setState({color:"rgba(255, 35, 35, 0.8)"});
        }
    }

    //check customerAvailabilty in DB
    checkCustomerAvail(custName)
    {
        this.setState({validCustomer:false, customerPurchaseList:[], userPurchaseTableDisplay:"none"});
        dataBase.customer.each((cust) => {
            if(custName.toLowerCase() === cust.custName)
            {
                this.setState({validCustomer: true});
            }
        });
    }

    //updates the db entry to state
    updatedDatabase(value, val, e)
    {
        if(/[a-zA-Z0-9]/.test(value) || value === "")
        {
            switch(val)
            {
                case "custId":                    
                    this.setState({customerId: value.toLowerCase(), color:'rgb(255,255,255)'}, () => {
                        this.checkCustomerAvail(this.state.customerId);
                    });
                    
                    break;
                case "prodName":
                    this.setState({productName: value, color:'rgb(255,255,255)'});
                    break;
                case "qty":
                    if(/[0-9]/.test(value))
                    {
                        this.setState({qty:parseInt(value), color:'rgb(255,255,255)'});
                    }
                    else
                    {
                        this.setState({qty:0});
                    }
                    break;
                default:
                    break;
            }
        }
        else
        {
            this.setState({color:"rgba(255, 35, 35, 0.8)"});
        }
    }

    //submit the fields to DB
    async addToDatabase(e)
    {
        if(this.state.qty !== 0)
        {
            var product = await dataBase.product.get({pName: this.state.autoCompleteInput});
            var purchaseId = await dataBase.purchase.put({productid: product, qty: this.state.qty});
            var customer = await dataBase.customer.get({custName:this.state.customerId});
            customer.purchase.push(purchaseId);
            await dataBase.customer.update(customer.custid, {purchase: customer.purchase});
            this.setState({productName:'', qty:0, autoCompleteInput:"", userPurchaseTableDisplay:"block"});
            this.getCustomerList();
        }
        else
        {
            this.setState({color:"rgba(255, 35, 35, 0.8)"});
        }
    }

    //reset the form
    resetForm(e)
    {
        this.setState({customerId:'', productName:'', productId:0, qty:0, autoCompleteInput:''});
    }

    updateAutoCompleteField(value)
    {
        this.setState({autoCompleteInput: value, suggestBoxDisplay:"none"});
    }

    async getCustomerList()
    {
        let customerPurchase = {custid:"-",custName:"-",purid:"-",prodid:"-",prodName:"-",pGst:"-",pPrice:"-",qty:"-" ,tGst:0, tPrice:0};
        let customerPurchaseList =[];
        var customer = await dataBase.customer.get({custName:this.state.customerId});
        for(let v of customer.purchase){
            customerPurchase = {...customerPurchase,custid:"-",custName:"-",purid:"-",prodid:"-",prodName:"-",pGst:"-",pPrice:"-",qty:"-" };
            let p = await this.getPurchaseList(v);
            customerPurchase.custid = customer.custid;
            customerPurchase.custName = customer.custName;
            customerPurchase.purid = p.purid;
            customerPurchase.prodid = p.productid.prodid;
            customerPurchase.prodName = p.productid.pName;
            customerPurchase.pGst = p.productid.pGst;
            customerPurchase.pPrice = p.productid.pPrice;
            customerPurchase.qty = p.qty;
            customerPurchase.tGst += p.productid.pGst;
            customerPurchase.tPrice += p.productid.pPrice*p.qty;
            customerPurchaseList.push(customerPurchase);
        }
        this.setState({customerPurchaseList: customerPurchaseList});
    }

    async getPurchaseList(key)
    {
        let p = await dataBase.purchase.get(key);
        return p;
    }

    render()
    {
        return(
            <div className="billingZone">
                <InputField type="text" value={this.state.customerId} placeholder="Enter the Customer Id." 
                    autoCorrect={false} onChange={this.updatedDatabase} val="custId" color={this.state.color} />
                {
                    (this.state.validCustomer) ? <div>
                    <InputField type="text" value={this.state.autoCompleteInput} placeholder="Enter Product Id or Product Name"
                        handleAutoCorrect={this.handleAutoCorrect} autoCorrect={true} color={this.state.color} />
                    <SuggestionBox display = {this.state.suggestBoxDisplay} suggestions={this.state.productSuggestion} onClick={this.updateAutoCompleteField}/>
                    <InputField type="text" onChange={this.updatedDatabase} placeholder="Enter the Quantity."
                        autoCorrect={false} value={this.state.qty} val="qty" color={this.state.color} />
                    <div className="button-grid">
                        <Button addToDatabase={this.addToDatabase} reset={false} buttonName = "Submit" color="green" />
                        <Button resetForm={this.resetForm} reset={true} buttonName="Reset" color="#f00" />
                    </div></div> : ""
                }
                {
                    (this.state.userPurchaseTableDisplay !== "none") ? 
                        <UserPurchase responsiveTableClassName="user-purchase" purchaseDisplay={this.state.userPurchaseTableDisplay} tableclassName="user-purchase-table" 
                        tableHeading = {["Customer Id", "Customer Name", "Purchase Id", "Product Id", "Product Name", "GST", "Price (each)", "Qty","Total GST", "Total Price"]}
                        tableData={this.state.customerPurchaseList} objectattributes={this.state.customerObjectProperties}/>
                    : ""
                }
            </div>
        );
    }
}
export default GSTBiller;