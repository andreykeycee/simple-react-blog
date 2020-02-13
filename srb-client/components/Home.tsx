import React from 'react'
import { logout } from '@/actions/auth'
import { connect } from 'react-redux'

const Home = ({ user, logout }) => (
  <div className="home">
    <div className="user">
      <div> {user.email} </div>
      <div> {user.name} </div>
    </div >
    <div className="logout" onClick={logout}>logout</div>
  </div>
)

const mapStateToProps = (state) => ({
  user: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
