/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import {Table,Icon, Tab} from 'semantic-ui-react'
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import DatePicker from "react-datepicker";
const initialExperience ={
    id:"",
    company:'',
    position:'',
    responsibilities:'',
    start:'',
    end:''
   };

export default class Experience extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            experience:initialExperience,
            showaddExperience:false,
            showeditExperience:false,
        }
        this.handleAddClick=this.handleAddClick.bind(this)
        this.renderAdd=this.renderAdd.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.handleCloseClick=this.handleCloseClick.bind(this)
        this.savenewExperience=this.savenewExperience.bind(this)
        this.handleDelete=this.handleDelete.bind(this)
        this.startEditing=this.startEditing.bind(this)
        this.renderEdit=this.renderEdit.bind(this)
    };
    handleAddClick()
    {
       this.setState({
        showaddExperience:true
        }) 
    }
    handleChange({target}){
        const { name, value } = target;
        this.setState((state) => ({experience: {...state.experience, [name]: value } }));
    }
    handleCloseClick(){
        this.setState({
            showeditExperience:false,
            showaddExperience:false
            }) 
    }
    handleDelete(id){
        const filteredItems=this.props.experienceData.filter((exp)=>
        exp.id!=id)
        this.props.controlFunc(this.props.componentId,filteredItems)
    }
    startEditing(id){
        console.log(id)
        const selectedItem=this.props.experienceData.find(exp=>exp.id===id)
        console.log(selectedItem)
        this.setState({
            experience:selectedItem,
            showeditExperience:true,
          })

    }
    savenewExperience(){
        const experience = this.state.experience;

        //if there is no id add the concat the language to the array
        const experiences = this.state.experience.id ? this.props.experienceData:this.props.experienceData.concat(experience);
        const newExperiences = experiences.reduce((curr, acc) => {
            if (acc.id === experience.id) {
                curr.push(experience);
            } else {
                curr.push(acc);
            }
            return curr;
        }, []);
        console.log(newExperiences)
        this.props.controlFunc(this.props.componentId,newExperiences)
        this.handleCloseClick()

    }
    renderAdd(){
        return(
        <div className='row'>
        <div className='ui eight wide column'>
          <ChildSingleInput
             inputType="text"
             label="Company:"
             name="company"
             value={this.state.experience.company||""}
             controlFunc={this.handleChange}
             maxLength={50}
             placeholder="Company"
             errorMessage="Please enter company"
         />
         </div>
         <div className='ui eight wide column'>
         <ChildSingleInput
            inputType="text"
            label="Position:"
            name="position"
            value={this.state.experience.position||""}
            controlFunc={this.handleChange}
            maxLength={50}
            placeholder="Position"
            errorMessage="Please enter position"
        />
        </div>
        <div className='ui eight wide column' style={{marginTop:"10px"}}>
         <ChildSingleInput
            inputType="date"
            label="Start Date:"
            name="start"
            value={this.state.experience.start||""}
            controlFunc={this.handleChange}
            maxLength={20}
            placeholder="Start Date"
            errorMessage="Please enter start date"
        />
        </div>
        <div className='ui eight wide column' style={{marginTop:"10px"}}>
        <ChildSingleInput
           inputType="date"
           label="End Date:"
           name="end"
           value={this.state.experience.end||""}
           controlFunc={this.handleChange}
           maxLength={20}
           placeholder="End Date"
           errorMessage="Please enter end date"
       />
       </div>
       <div className='ui sixteen wide column' style={{marginTop:"10px"}}>
       <ChildSingleInput
          inputType="text"
          label="Responsibilities:"
          name="responsibilities"
          value={this.state.experience.responsibilities||""}
          controlFunc={this.handleChange}
          maxLength={500}
          placeholder="Responsibilities"
          errorMessage="Please enter responsibilities"
      />
      </div>
      <div className='ui six wide column' style={{marginTop:'10px'}}>
      <button type="button" className="ui secondary button" onClick={this.savenewExperience}>Add</button>
      <button type="button" className="ui button" onClick={this.handleCloseClick}>Cancel</button>
      </div>
      </div>
        )
    }
    renderEdit(){
        return(
            <React.Fragment>
            <Table.Row>
            <Table.Cell style={{border:"none"}} colSpan="3"> 
               <ChildSingleInput
                  inputType="text"
                  label="Company:"
                  name="company"
                  value={this.state.experience.company||""}
                  controlFunc={this.handleChange}
                  maxLength={50}
                  placeholder="Company"
                  errorMessage="Please enter company"
              />
             </Table.Cell>
              <Table.Cell style={{border:"none"}} colSpan="3">
              <ChildSingleInput
                 inputType="text"
                 label="Position:"
                 name="position"
                 value={this.state.experience.position||""}
                 controlFunc={this.handleChange}
                 maxLength={50}
                 placeholder="Position"
                 errorMessage="Please enter position"
             />
             </Table.Cell>
             </Table.Row>
             <Table.Row>
             <Table.Cell style={{border:"none"}} colSpan="3">
              <ChildSingleInput 
                inputType="date"
                label="Start Date:"
                name="start"
                value={this.state.experience.start||""}
                controlFunc={this.handleChange}
                maxLength={20}
                placeholder="Start Date"
                errorMessage="Please enter start date"
             />
             </Table.Cell>
            <Table.Cell style={{border:"none"}} colSpan="3">
             <ChildSingleInput
                inputType="date"
                label="End Date:"
                name="end"
                value={this.state.experience.end||""}
                controlFunc={this.handleChange}
                maxLength={20}
                placeholder="End Date"
                errorMessage="Please enter end date"
            />
            </Table.Cell>
            </Table.Row>
            <Table.Row>
           <Table.Cell style={{border:"none"}} colSpan="6">
            <ChildSingleInput
               inputType="text"
               label="Responsibilities:"
               name="responsibilities"
               value={this.state.experience.responsibilities||""}
               controlFunc={this.handleChange}
               maxLength={500}
               placeholder="Responsibilities"
               errorMessage="Please enter responsibilities"
           />
           </Table.Cell>
           </Table.Row>
           <Table.Row>
          <Table.Cell style={{border:"none"}} colSpan="6">
           <button type="button" className="ui secondary button" onClick={this.savenewExperience}>Update</button>
           <button type="button" className="ui button" onClick={this.handleCloseClick}>Cancel</button>
         </Table.Cell>
         </Table.Row>
         </React.Fragment>
         )
            
      
    }
    
    render() {
        const experienceData=this.props.experienceData||""
        const addExperience=this.state.showaddExperience?this.renderAdd():""
        const editExperience=this.state.showeditExperience?this.renderEdit():""

        let exprData=experienceData.map((exp)=>
        <Table.Row key={exp.id}>
        <Table.Cell>{exp.company}</Table.Cell>
        <Table.Cell>{exp.position}</Table.Cell>
        <Table.Cell>{exp.responsibilities}</Table.Cell>
        <Table.Cell>{new Intl.DateTimeFormat('en-NZ', {
            year:'numeric',
            month:'short',
            day:'2-digit'
        }).format(new Date(exp.start))}</Table.Cell>
        <Table.Cell>{new Intl.DateTimeFormat('en-NZ', {
            year:'numeric',
            month:'short',
            day:'2-digit'
        }).format(new Date(exp.end))}</Table.Cell>
        <Table.Cell textAlign='right'>
        <Icon name="pencil" onClick={()=>this.startEditing(exp.id)}/>
        <Icon name="cancel" onClick={()=>this.handleDelete(exp.id)}></Icon></Table.Cell>
        </Table.Row>
        )
        return(
            <React.Fragment>
            {addExperience}
           <div className="ui sixteen wide column">
           <Table unstackable>
           <Table.Header>
            <Table.Row>
               <Table.HeaderCell>Company</Table.HeaderCell>
               <Table.HeaderCell>Position</Table.HeaderCell>
               <Table.HeaderCell>Responsibilities</Table.HeaderCell>
               <Table.HeaderCell>Start</Table.HeaderCell>
               <Table.HeaderCell>End</Table.HeaderCell>
               <Table.HeaderCell textAlign='right'>
               <button type="button" className="ui secondary button" onClick={this.handleAddClick}>
               <Icon name='plus'/>Add New</button>
               </Table.HeaderCell>
             </Table.Row>
           </Table.Header>
           <Table.Body>
          {editExperience}
           </Table.Body>
           <Table.Body>
           {exprData}
           </Table.Body>
         </Table>
         </div>
         </React.Fragment>
        )

        
    }

}



/* <ChildSingleInput
                 inputType="date"
                 label="Start Date:"
                 name="start"
                 value={this.state.experience.start||""}
                 controlFunc={this.handleChange}
                 maxLength={20}
                 placeholder="Start Date"
                 errorMessage="Please enter start date"
             />*/