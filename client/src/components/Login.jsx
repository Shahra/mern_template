import React, { Component } from 'react';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const user = { email, password };
    console.log(user);
  }

  render() {
    return (
      <div className = "container" style = {{ marginTop: '50px', width: '700px' }}>
        <h2 style={{marginBottom: '40px'}}>Login</h2>
        <form onSubmit={ this.handleSubmit }>
          <div className="form-group">
            <input
              type="email"
              placeholder="E-mail"
              className="form-control"
              name="email"
              onChange={ this.handleInputChange }
              value={ this.state.email }
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              name="password"
              onChange={ this.handleInputChange }
              value={ this.state.password }
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Login User
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
