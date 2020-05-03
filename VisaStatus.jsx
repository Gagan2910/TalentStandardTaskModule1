import React from 'react'
import { SingleInput } from '../Form/SingleInput.jsx';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import SocialMediaLinkedAccount from './SocialMediaLinkedAccount.jsx';
import moment from 'moment';
import DatePicker from "react-datepicker";


export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)
        const visaData=props.visaData ? Object.assign({},props.visaData):
            {
                visaStatus:'',
                visaExpiryDate:""
            }
        this.state = {
            newvisaData:visaData,
            //showExpiryDate:false,
            //visaStatus:props.visaStatus,
            //visaExpiryDate:props.visaExpiryDate
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleDateChange=this.handleDateChange.bind(this)
        this.saveVisaData=this.saveVisaData.bind(this)
       
    }
    handleDateChange(visaExpiryDate,event){
        this.setState({
            visaExpiryDate
        })
    }
   
    handleChange(event) {
        const data = Object.assign({}, this.state.newvisaData)
        data[event.target.name] = event.target.value
        console.log(data)
        
       if(event.target.value=='Citizen' || event.target.value=='Permanent Resident')
        {
            this.props.controlFunc(this.props.componentId,data)
            this.setState({
                [event.target.name]:event.target.value,
                //showExpiryDate:false
              })
        }
        if(event.target.value=='Work Visa' || event.target.value=='Student Visa')
        {
          
            this.setState({
                //showExpiryDate:true,
                [event.target.name]:event.target.value,
                newvisaData:data
              })
             this.props.controlFunc(this.props.componentId,data)
        } 

        this.setState({
            newvisaData:data
          })
    }
   
    saveVisaData() {
        console.log(this.props.componentId)
        console.log(this.state.newvisaData)
        const data = Object.assign({}, this.state.newvisaData)
        console.log(data)
        this.props.controlFunc(this.props.componentId,data)
        //const data = Object.assign({}, this.state.visaExpiryDate)
        //this.props.saveProfileData(data)

    }
    
    render() {
        let visaStatus = this.props.visaData? this.props.visaData.visaStatus:"";
        let visaExpiryDate=this.props.visaData?this.props.visaData.visaExpiryDate:"";

        return(
            <div className='row'>
            <div className='ui six wide column'>
            <h5>Visa type:</h5>
            <select
            placeholder="Select your visa status"
            onChange={this.handleChange}
            name="visaStatus"
            value={visaStatus||""}>
            <option value="Citizen">Citizen</option>
            <option value="Permanent Resident">Permanent Resident</option>
            <option value="Work Visa">Work Visa</option>
            <option value="Student Visa">Student Visa</option>
            </select>
            </div>
            
           
            {this.props.visaData.visaStatus=="Student Visa"||
            this.props.visaData.visaStatus=="Work Visa"?
            <React.Fragment>
            <div className='ui six wide column'>
            
            <ChildSingleInput 
                inputType="date"
                label="Visa expiry date:"
                name="visaExpiryDate"
                defaultValue={visaExpiryDate|| ""}
                controlFunc={this.handleChange}
                maxLength={20}
                placeholder="Expiry Date"
                errorMessage="Please enter expiry date"
             />
            </div>
            <div className='ui three wide column' style={{marginTop:"15px"}}>
            <h5></h5>
            <button type="button" className="ui right floated teal button" onClick={this.saveVisaData}>Save</button>
            </div></React.Fragment>
            :""}
            </div>
        )
      
    }
}

/*<input type="date" 
name="visaExpiryDate" 
placeholder="Enter visa expiry date" 
defaultValue={visaExpiryDate || ""} onChange={this.handleChange}></input>*/


/* <input type="date"
            name="visaExpiryDate"
            placeholder="dd/mm/yyyy" 
            defaultValue={moment(visaExpiryDate).format("DD-MM-YYYY") || ""} onChange={this.handleChange}></input>*/

