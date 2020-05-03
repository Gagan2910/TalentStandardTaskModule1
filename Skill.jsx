/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import {Table,Icon} from 'semantic-ui-react'
const initialSkill ={
    id:"",
    name:'',
    level:'',
   };

export default class Skill extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            skill:initialSkill,
            showaddSkill:false,
            showeditSkill:false,
        }
        this.handleAddClick=this.handleAddClick.bind(this)
        this.renderAdd=this.renderAdd.bind(this)
        this.renderEdit=this.renderEdit.bind(this)
        this.savenewSkill=this.savenewSkill.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.handleDelete=this.handleDelete.bind(this)
        this.startEditing=this.startEditing.bind(this)
        this.handleCloseClick=this.handleCloseClick.bind(this)
    };
   
    handleAddClick()
    {
       this.setState({
        showaddSkill:true
        }) 
    }
    handleCloseClick()
    {
       this.setState({
        showeditSkill:false,
        showaddSkill:false
        }) 
    }
    handleChange({ target }){
        const { name, value } = target;
        this.setState((state) => ({skill: {...state.skill, [name]: value } }));
    }
    savenewSkill()
    {
      const skill = this.state.skill;

      //if there is no id add the concat the language to the array
      const skills = this.state.skill.id ? this.props.skillData:this.props.skillData.concat(skill);
      const newSkills = skills.reduce((curr, acc) => {
          if (acc.id === skill.id) {
              curr.push(skill);
          } else {
              curr.push(acc);
          }
          return curr;
      }, []);
      console.log(newSkills)
      this.props.controlFunc(this.props.componentId,newSkills)
      this.handleCloseClick()
    }
    renderAdd(){
        return(
        <div className='row'>
        <div className='ui five wide column'>
          <ChildSingleInput
             inputType="text"
             name="name"
             value={this.state.skill.name||""}
             controlFunc={this.handleChange}
             maxLength={20}
             placeholder="Add Skill"
             errorMessage="Please enter skill"
         />
         </div>
         <div className='ui five wide column' style={{marginTop:'4px'}}>
         <select
          placeholder="Skill Level"
          onChange={this.handleChange}
          name="level" value={this.state.skill.level||""}>
          <option value="Skill Level">Skill Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Expert">Expert</option>
          </select>
          </div>
          <div className='ui six wide column' style={{marginTop:'4px'}}>
          <button type="button" className="ui secondary button" onClick={this.savenewSkill}>Add</button>
          <button type="button" className="ui button" onClick={this.handleCloseClick}>Cancel</button>
          </div>
         </div>
        )
      }
      renderEdit(){
        return(
          <Table.Row>
          <Table.Cell> 
          <ChildSingleInput
          inputType="text"
          name="name"
          value={this.state.skill.name||""}
          controlFunc={this.handleChange}
          maxLength={20}
          placeholder="Add Skill"
          errorMessage="Please enter skill"
          /></Table.Cell>
          <Table.Cell >
          <select style={{marginTop:'4px'}}
          placeholder="Language Level"
          onChange={this.handleChange}
          name="level" value={this.state.skill.level||""}>
          <option value="Skill Level">Skill Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Expert">Expert</option>
          </select>
          </Table.Cell>
          <Table.Cell style={{marginTop:'4px'}}>
          <button type="button" className="ui basic blue button" onClick={this.savenewSkill}>Update</button>
          <button type="button" className="ui basic red button" onClick={this.handleCloseClick}>Cancel</button>
          </Table.Cell>
          </Table.Row>
        )
      }
      startEditing(id){
        //debugger;
        console.log(id)
        const selectedItem=this.props.skillData.find(skil=>skil.id===id)
        console.log(selectedItem)
        this.setState({
            skill:selectedItem,
            showeditSkill:true,
           // languageData:filteredItems,
           //name:selectedItem.name,
           //level:selectedItem.level,
           //id:id,
          })
        }
        
      handleDelete(id){
      const filteredItems=this.props.skillData.filter((skil)=>
        skil.id!=id)
        this.props.controlFunc(this.props.componentId,filteredItems)
      }
    
   render() {
    const skillData=this.props.skillData||""
    const addSkill=this.state.showaddSkill?this.renderAdd():""
    const editSkill=this.state.showeditSkill?this.renderEdit():""

    let skilData=skillData.map((skil)=>
    <Table.Row key={skil.id}>
    <Table.Cell>{skil.name}</Table.Cell>
    <Table.Cell>{skil.level}</Table.Cell>
    <Table.Cell textAlign='right'>
    <Icon name="pencil" onClick={()=>this.startEditing(skil.id)}/>
    <Icon name="cancel" onClick={()=>this.handleDelete(skil.id)}></Icon></Table.Cell>
    </Table.Row>
    )
   
       return(
        <React.Fragment>
        {addSkill}
       <div className="ui sixteen wide column">
       <Table unstackable>
       <Table.Header>
         <Table.Row>
           <Table.HeaderCell>Skill</Table.HeaderCell>
           <Table.HeaderCell>Level</Table.HeaderCell>
           <Table.HeaderCell textAlign='right'>
           <button type="button" className="ui secondary button" onClick={this.handleAddClick}>
           <Icon name='plus'/>Add New</button>
           </Table.HeaderCell>
         </Table.Row>
       </Table.Header>
       <Table.Body>{editSkill}</Table.Body>
       <Table.Body>{skilData}</Table.Body>
     </Table>
     </div>
     </React.Fragment>
       )
        
    }
}

