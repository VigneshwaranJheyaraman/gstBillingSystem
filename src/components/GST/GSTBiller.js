import React, {Component} from 'react';
import InputField from '../InputField';
import SubmitButton from '../SubmitButton';
import dataBase from '../../database';
import SuggestionBox from '../Suggestion/SuggestionBox';
import UserPurchase from '../UserPurchase';
import DropDown from '../DropDown';
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
            customerObjectProperties: ["custid","custName","purid","prodid","prodName","pGst","pPrice","qty","tGst","tPrice"],
            finalPriceWithTax:0,
            totalGst:0,
            currentActiveSuggestion:0,
            customerDB: [],
            currentCustomer:0
        };
        this.handleAutoCorrect = this.handleAutoCorrect.bind(this);
        this.updatedDatabase = this.updatedDatabase.bind(this);
        this.addToDatabase = this.addToDatabase.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.checkCustomerAvail = this.checkCustomerAvail.bind(this);
        this.updateAutoCompleteField = this.updateAutoCompleteField.bind(this);
        this.getCustomerList = this.getCustomerList.bind(this);
        this.handleKeyPressEvent = this.handleKeyPressEvent.bind(this);
        this.increaseDecreaseQty = this.increaseDecreaseQty.bind(this);
    }

    componentWillMount()
    {
        dataBase.customer.toArray().then((r) => {
            this.setState({customerDB: Object.assign([], r), validCustomer:true, customerId:r[0].custName});
        });
    }
    //handle autocorrect from DB
    async handleAutoCorrect(value, type, e)
    {
        this.setState({autoCompleteInput: value, suggestBoxDisplay:"block"});
        var productsDb = await dataBase.product.toArray();
        var productList = this.state.productSuggestion;
        if(type === "text")
        {
            let sb = Object.assign([], productsDb).filter((v, i) => {
                if(value.toLowerCase() === v.pName.toLowerCase().substr(0, value.length))return v;
                return "";
            });
            this.setState({productSuggestion: sb});
        }
        else if(type === "number")
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
        else if(type === "null")
        {
            this.setState({color:'rgb(255,255,255)', suggestBoxDisplay:"none", productSuggestion:[], autoCompleteInput:""});
        }
        else
        {
            this.setState({color:"rgba(255, 35, 35, 0.8)"});
        }
    }

    //check customerAvailabilty in DB
    checkCustomerAvail(cust, ind, e)
    {
        this.setState({validCustomer:false, customerPurchaseList:[], userPurchaseTableDisplay:"none"}, () => {
            this.setState({customerId: cust, currentCustomer: ind, validCustomer:true})
        });
    }

    //updates the db entry to state
    updatedDatabase(value, val, regexBool, e)
    {
        if(regexBool)
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
        var purchaseId=0;
        if(this.state.qty !== 0)
        {
            var product = await dataBase.product.get({pName: this.state.autoCompleteInput});
            var anyPreviousPurchase = await dataBase.purchase.get({pid:product.prodid});
            if(anyPreviousPurchase !==  undefined)
            {
                purchaseId = await dataBase.purchase.update(anyPreviousPurchase.purid,{productid: product, qty: (anyPreviousPurchase.qty + this.state.qty), pid:product.prodid});
            }
            else
            {
                purchaseId = await dataBase.purchase.put({productid: product, qty: this.state.qty, pid:product.prodid});
            }
            var customer = await dataBase.customer.get({custName:this.state.customerId});
            if(customer.purchase.indexOf(purchaseId) === -1)customer.purchase.push(purchaseId);
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
        this.setState({productName:'', productId:0, qty:0, autoCompleteInput:'', userPurchaseTableDisplay:"none", customerPurchaseList:[], color:"rgb(255,255,255)", suggestBoxDisplay:"none"});
    }

    updateAutoCompleteField(value)
    {
        this.setState({autoCompleteInput: value, suggestBoxDisplay:"none"});
    }

    async getCustomerList()
    {
        let customerPurchase = {custid:"-",custName:"-",purid:"-",prodid:"-",prodName:"-",pGst:"-",pPrice:"-",qty:"-" ,tGst:'-', tPrice:0};
        let customerPurchaseList =[];
        var amt =0, gst=0;
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
            customerPurchase.tPrice = (p.productid.pPrice*p.qty) + (p.productid.pPrice*p.qty*( p.productid.pGst/100));
            amt += (p.productid.pPrice*p.qty) + (p.productid.pPrice*p.qty*( p.productid.pGst/100));
            gst += p.productid.pGst;
            customerPurchaseList.push(customerPurchase);
        }
        this.setState({customerPurchaseList: customerPurchaseList, finalPriceWithTax:amt, totalGst:gst});
    }

    async getPurchaseList(key)
    {
        let p = await dataBase.purchase.get(key);
        return p;
    }

    handleKeyPressEvent(currFocus, direction, e)
    {
        this.setState({currentActiveSuggestion:currFocus}, ()=> {
            if(direction === "enter")
            {
                this.setState({autoCompleteInput:this.state.productSuggestion[this.state.currentActiveSuggestion].pName, suggestBoxDisplay:"none"});
            }
        });
    }

    increaseDecreaseQty(val,  e)
    {
        this.setState({qty: val});
    }

    render()
    {
        return(
            <div className="billingZone" style={this.props.maximized ? {} : {display:"none"}}>
                <DropDown objectData={this.state.customerDB} optionSelected={this.checkCustomerAvail} customerSelected={this.state.currentCustomer} customDropDownclassName="customDD"/>
                {
                    (this.state.validCustomer) ? <div>
                    <InputField type="text" value={this.state.autoCompleteInput} placeholder="Enter Product Id or Product Name"
                        handleAutoCorrect={this.handleAutoCorrect} autoCorrect={true} color={this.state.color} onKeyPress={this.handleKeyPressEvent} suggestionLength={this.state.productSuggestion.length}/>
                    <SuggestionBox display = {this.state.suggestBoxDisplay} suggestions={this.state.productSuggestion}
                     onClick={this.updateAutoCompleteField} activeSuggestion={this.state.currentActiveSuggestion}/>
                    <InputField type="text" onChange={this.updatedDatabase} placeholder="Enter the Quantity."
                        autoCorrect={false} value={this.state.qty} val="qty" color={this.state.color} onKeyPress={this.increaseDecreaseQty}/>
                    <div className="button-grid">
                        <SubmitButton addToDatabase={this.addToDatabase} reset={false} buttonName = "Submit" color="green" />
                        <SubmitButton resetForm={this.resetForm} reset={true} buttonName="Reset" color="#f00" />
                    </div></div> : ""
                }
                {
                    (this.state.userPurchaseTableDisplay !== "none") ? 
                        <UserPurchase responsiveTableClassName="user-purchase" purchaseDisplay={this.state.userPurchaseTableDisplay} tableclassName="user-purchase-table" 
                        tableHeading = {["Customer Id", "Customer Name", "Purchase Id", "Product Id", "Product Name", "GST", "Price (each)", "Qty","Total GST", "Total Price"]}
                        tableData={this.state.customerPurchaseList} 
                        objectattributes={this.state.customerObjectProperties} finalPrice={this.state.finalPriceWithTax}
                         totalGst={this.state.totalGst} optionsClassName="tableoptions"/>
                    : ""
                }
            </div>
        );
    }
}
export default GSTBiller;