import React from 'react';
import DOMPurify from 'dompurify'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios'
class App extends React.Component {
	constructor(){
		super()

		this.state = {
			Subject:'',
			To:'',
			message: ''
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange = e =>{
		this.setState({ [e.target.name]: e.target.value })
	}
	async handleSubmit(e){
		e.preventDefault()

		const {Subject, To , message} = this.state
		const form = await axios.post( '/api/form', {
			Subject,
			To,
			message
		})
		}
	render (){
		return(
			<Form onSubmit={this.handleSubmit} style = {{ width: '600px' }}>
				<FormGroup>
					<Label for = "subject"> Subject: </Label>
					<Input
						type = "text"
						name = "Subject"
						onChange = {this.handleChange}/>
				</FormGroup>
				<FormGroup>
					<Label for = "To"> To: </Label>
					<Input
						type = "text"
						name = "To"
						onChange = {this.handleChange}/>
				</FormGroup>
				<FormGroup>
					<Label for = "Message"> Message: </Label>
					<Input
						type = "textarea"
						name = "message"
						onChange = {this.handleChange} style = {{hight:'600px'}}/>
				</FormGroup>
				<Button>Submit</Button>
			</Form>
	);

	}

}
export default App;
