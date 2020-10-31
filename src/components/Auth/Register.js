import React, { Component } from 'react'
import { Grid, Form, Segment, Header, Button, Message, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import firebase from '../../firebase'

class Register extends Component {
  state = {
    username: '',
    password: '',
    passwordConfirmation: '',
    email: '',
    errors: [],
    loading: false
  }

  isFormValid = () => {
    let errors = []
    let error

    if (this.isFormEmpty(this.state)) {
      error = { message: 'Fill in all fields ' }
      this.setState({ errors: errors.concat(error) })
      return false
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: 'Password invalid' }
      this.setState({ errors: errors.concat(error) })
      return false
    } else {

      return true
    }
  }

  isFormEmpty = ({ username, email, password, passwordConfirmation}) => {
    return !username.length || !email.length || !password.length || !passwordConfirmation.length
  }

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false
    } else if (password !== passwordConfirmation) {
      return false
    } else {
      return true
    }
  }

  displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>)

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleInputError = (errors, inputName) => {
    return errors.some(error =>
      error.message.toLowerCase().includes(inputName)
    )
    ? 'error'
    : ''
  }

  handleSubmit = event => {
    event.preventDefault()

    if(this.isFormValid()) {
      this.setState({ errors: [], loading: true })
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
          console.log(createdUser)
          this.setState({ loading: false })
        })
        .catch(err => {
          console.error(err)
          this.setState({ loading: false, errors: this.state.errors.concat(err) })
        })
    }
  }

  render () {
    const { username, password, passwordConfirmation, email, errors, loading } = this.state
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' icon color='orange' textAlign='center'>
            <Icon name="puzzle piece" color="orange" />
            Register for DevChat
          </Header>
          <Form onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              value={username}
              onChange={this.handleChange}
              className={this.handleInputError(errors, 'username')}
              type='text'
              />

              <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email"
              value={email}
              onChange={this.handleChange}
              type='email'
              className={this.handleInputError(errors, 'email')}
              />

              <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
              type='password'
              className={this.handleInputError(errors, 'password')}
              />

              <Form.Input
              fluid
              name="passwordConfirmation"
              icon="lock"
              iconPosition="left"
              placeholder="Password  Confirmation"
              value={passwordConfirmation}
              onChange={this.handleChange}
              type='password'
              className={this.handleInputError(errors, 'password')}
              />

              <Button
              diabled={loading}
              className={loading ? 'loading' : '' }
              color="orange"
              fluid
              size="large"
              >
              Submit
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>Already a user? <Link to='/login'>Login</Link></Message>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Register