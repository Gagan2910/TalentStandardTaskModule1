/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import {Table,Icon} from 'semantic-ui-react'
import nextId from "react-id-generator"
const initiallanguage ={
  id:"",
  name:'',
  level:'',
  userId:""
 };
export class Language extends React.Component {
    constructor(props) {
      super(props);
      
      this.state={
          language:initiallanguage,
          showaddLanguage:false,
          showeditLanguage:false,
        }
        this.handleAddClick=this.handleAddClick.bind(this)
        this.renderAdd=this.renderAdd.bind(this)
        this.renderEdit=this.renderEdit.bind(this)
        this.savenewLanguage=this.savenewLanguage.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.handleDelete=this.handleDelete.bind(this)
        this.startEditing=this.startEditing.bind(this)
        this.handleCloseClick=this.handleCloseClick.bind(this)
    }

    handleAddClick()
    {
       this.setState({
        showaddLanguage:true
        //showaddLanguage:!this.state.showaddLanguage
        }) 
    }
    handleCloseClick()
    {
       this.setState({
        showeditLanguage:false,
        showaddLanguage:false
            //showeditLanguage:!this.state.showeditLanguage
        }) 
    }
    renderAdd(){
      return(
      <div className='row'>
      <div className='ui five wide column'>
        <ChildSingleInput
           inputType="text"
           name="name"
           value={this.state.language.name ||""}
           controlFunc={this.handleChange}
           maxLength={20}
           placeholder="Add Language"
           errorMessage="Please enter language"
       />
       </div>
       <div className='ui five wide column' style={{marginTop:'4px'}}>
       <select
        placeholder="Language Level"
        onChange={this.handleChange}
        name="level" value={this.state.language.level || ""}>
        <option value="Language Level">Language Level</option>
        <option value="Basic">Basic</option>
        <option value="Conversational">Conversational</option>
        <option value="Fluent">Fluent</option>
        <option value="Native/Bilingual">Native/Bilingual</option>
        </select>
        </div>
        <div className='ui six wide column' style={{marginTop:'4px'}}>
        <button type="button" className="ui secondary button" onClick={this.savenewLanguage}>Add</button>
        <button type="button" className="ui button" onClick={this.handleCloseClick}>Cancel</button>
        </div>
       </div>
      )
    }
    
    handleChange({ target }){
      const { name, value } = target;
      this.setState((state) => ({language:{...state.language,[name]: value}}));
  }
    /*handleChange(event) 
    {
      //this.setState({[event.target.name]: event.target.value})
      this.setState((state) => ({language:{ ...state.language, [event.target.name]: event.target.value }}));
    }*/
    savenewLanguage()
    {
      const language = this.state.language;

      //if there is no id add the concat the language to the array
      const languages = this.state.language.id ? this.props.languageData : this.props.languageData.concat(language);
      const newLanguages = languages.reduce((curr, acc) => {
          if (acc.id === language.id) {
              curr.push(language);
          } else {
              curr.push(acc);
          }
          return curr;
      }, []);
      console.log(newLanguages)
      this.props.controlFunc(this.props.componentId,newLanguages)
      this.handleCloseClick()
     /* event.preventDefault();
      const data = {
      id:this.state.id,
      name:this.state.name,
      level:this.state.level
      }
      const languageData=[...this.state.language, this.state.language]
        this.setState({
          
        })*/
        
        //this.props.controlFunc(this.props.componentId,languageData)
       
        //this.props.updateProfileData(languageData)

    }
    renderEdit(){
      return(
        <Table.Row>
        <Table.Cell> 
        <ChildSingleInput
        inputType="text"
        name="name"
        value={this.state.language.name ||""}
        controlFunc={this.handleChange}
        maxLength={20}
        placeholder="Add Language"
        errorMessage="Please enter language"/></Table.Cell>
        <Table.Cell >
        <select style={{marginTop:'4px'}}
        placeholder="Language Level"
        onChange={this.handleChange}
        name="level" value={this.state.language.level || ""}>
        <option value="">Language Level</option>
        <option value="Basic">Basic</option>
        <option value="Conversational">Conversational</option>
        <option value="Fluent">Fluent</option>
        <option value="Native/Bilingual">Native/Bilingual</option>
        </select>
        </Table.Cell>
        <Table.Cell style={{marginTop:'4px'}}>
        <button type="button" className="ui basic blue button" onClick={this.savenewLanguage}>Update</button>
        <button type="button" className="ui basic red button" onClick={this.handleCloseClick}>Cancel</button>
        </Table.Cell>
        </Table.Row>
      )
    }
    startEditing(id){
      //debugger;
      console.log(id)
      const selectedItem=this.props.languageData.find(lang=>lang.id===id)
      console.log(selectedItem)
      this.setState({
          language:selectedItem,
          showeditLanguage:true,
         // languageData:filteredItems,
         name:selectedItem.name,
         level:selectedItem.level,
         id:id,
        })
      }
      
    handleDelete(id){
    const filteredItems=this.props.languageData.filter((lang)=>
      lang.id!=id)
      this.props.controlFunc(this.props.componentId,filteredItems)

      /*this.setState({
        languageData:filteredItems
      })*/
    }
  
  
    render() {
      const languageData=this.props.languageData
      const addLanguage=this.state.showaddLanguage?this.renderAdd():""
      const editLanguage=this.state.showeditLanguage?this.renderEdit():""

      let langData=languageData.map((lang)=>
      <Table.Row key={lang.id}>
      <Table.Cell>{lang.name}</Table.Cell>
      <Table.Cell>{lang.level}</Table.Cell>
      <Table.Cell textAlign='right'>
      <Icon name="pencil" onClick={()=>this.startEditing(lang.id)}/>
      <Icon name="cancel" onClick={()=>this.handleDelete(lang.id)}></Icon></Table.Cell>
      </Table.Row>
      )
     
        return(
             <React.Fragment>
             {addLanguage}
            <div className="ui sixteen wide column">
            <Table unstackable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Language</Table.HeaderCell>
                <Table.HeaderCell>Level</Table.HeaderCell>
                <Table.HeaderCell textAlign='right'>
                <button type="button" className="ui secondary button" onClick={this.handleAddClick}>
                <Icon name='plus'/>Add New</button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{editLanguage}</Table.Body>
            <Table.Body>{langData}</Table.Body>
          </Table>
          </div>
          </React.Fragment>
        )
    }
}





