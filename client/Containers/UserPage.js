import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserProImg from '../Components/UserProImg';

export class UserPage extends Component {
  constructor(props){
      super(props)
      this.state={
          userName: ''
      }
  }

  componentDidMount(){
      console.log('his should be params', this.props.match.params.name)
      console.log(this.props)
  }

  render() {

    return (
      <div className='account-body'>
          {/* User profle */}
          <div className='User-Img'>
              <UserProImg img={'empty'} username={this.state.userName}/>
          </div>


      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = dispatch =>( {
  
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
