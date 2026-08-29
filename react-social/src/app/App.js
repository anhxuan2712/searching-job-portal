import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import AppHeader from '../common/AppHeader';
import Home from '../home/Home';
import JobList from '../home/jobList/JobList';
import JobDetails from '../home/jobList/JobDetails';
import Login from '../user/login/Login';
import LoginRecruiter from '../user/login/LoginRecruiter';
import Signup from '../user/signup/Signup';
import SignupRecruiter from '../user/signup/SignupRecruiter';
import Profile from '../user/profile/Profile';
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import { getCurrentAdmin, getCurrentRecruiter, getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';
import PrivateRoute from '../common/PrivateRoute';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';
import Dashboard from '../recruiter/Dashboard';
import AddJob from '../recruiter/AddJob';
import ManagerJob from '../recruiter/ManagerJob';
import Recruitment from '../recruiter/Recruitment';
import Advertisement from '../home/Advertisement';
import Contact from '../home/Contact';
import LoginAdmin from '../user/login/LoginAdmin';
import DashboardAdmin from '../admin/DashboardAdmin';
import JobManager from '../admin/JobManager';
import AccountManager from '../admin/AccountManager';
import AdvertisementManager from '../admin/AdvertisementManager';
import AddAdvertisement from '../admin/AddAdvertisement';
import AddCv from '../user/profile/AddCv';
import ManagerCV from '../user/profile/ManagerCV';
import ManagerRecruiter from '../user/profile/ManagerRecruiter';
import EditAdvertisement from '../admin/edit/EditAdvertisement';
import SendMail from '../recruiter/SendEmail';
import EditJob from '../recruiter/edit/EditJob';
import ProfileRecruiter from '../recruiter/ProfileRecruiter';
import CatgoryManagement from '../admin/CategoryManagement';
import EditCategory from '../admin/edit/EditCategory';
import AddCategory from '../admin/AddCategory';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      username: '',
      currentUser: null,
      role: '',
      loading: true
    }

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);

    this.handleLogout = this.handleLogout.bind(this);
  }


  loadCurrentlyLoggedInUser() {
    getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response,
          username: response.name,
          role: response.roles[0].name,
          authenticated: true,
          loading: false
        });
        console.log(this.state)
      }).catch(error => {
        this.setState({
          loading: false
        });
      });
  }

  loadCurrentlyLoggedInCruiter() {
    getCurrentRecruiter()
      .then(response => {
        this.setState({
          currentUser: response,
          username: response.name,
          role: response.roles[0].name,
          authenticated: true,
          loading: false
        });
        console.log(this.state)
      }).catch(error => {
        this.setState({
          loading: false
        });
      });
  }

  loadCurrentlyLoggedInAdmin() {
    getCurrentAdmin()
      .then(response => {
        this.setState({
          currentUser: response,
          username: response.name,
          role: response.roles[0].name,
          authenticated: true,
          loading: false
        });
        console.log(this.state)
      }).catch(error => {
        this.setState({
          loading: false
        });
      });
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null
    });
    window.location.reload();
    Alert.success("Bạn đăng xuất thành công!!!");
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
    this.loadCurrentlyLoggedInCruiter();
    this.loadCurrentlyLoggedInAdmin();
  }

  render() {
    if (this.state.loading) {
      return <LoadingIndicator />
    }
    console.log("Role", this.state.role)
    return (

      <div className="app">
        <Switch>
          <Route exact path="/admin"
            render={(props) => <DashboardAdmin
              authenticated={this.state.authenticated}
              roleName={this.state.role}
              username={this.state.username}
              onLogout={this.handleLogout} {...props} />}>
          </Route>
          <Route exact path="/admin/job-manager"
            render={(props) => <JobManager
              authenticated={this.state.authenticated}
              roleName={this.state.role}
              username={this.state.username}
              onLogout={this.handleLogout} {...props} />}>
          </Route>
          <Route exact path="/admin/account-manager"
            render={(props) => <AccountManager
              authenticated={this.state.authenticated}
              roleName={this.state.role}
              username={this.state.username}
              onLogout={this.handleLogout} {...props} />}>
          </Route>
          <Route exact path="/admin/advertisement-manager"
            render={(props) => <AdvertisementManager
              authenticated={this.state.authenticated}
              roleName={this.state.role}
              username={this.state.username}
              onLogout={this.handleLogout} {...props} />}>
          </Route>
          <Route exact path="/admin/category-manager"
            render={(props) => <CatgoryManagement
              authenticated={this.state.authenticated}
              roleName={this.state.role}
              username={this.state.username}
              onLogout={this.handleLogout} {...props} />}>
          </Route>
          <Route exact path="/admin/advertisement/:id"
            render={(props) => <EditAdvertisement
              authenticated={this.state.authenticated}
              roleName={this.state.role}
              username={this.state.username}
              onLogout={this.handleLogout} {...props} />}>
          </Route>
          <Route exact path="/admin/category/:id"
            render={(props) => <EditCategory
              authenticated={this.state.authenticated}
              roleName={this.state.role}
              username={this.state.username}
              onLogout={this.handleLogout} {...props} />}>
          </Route>
          <Route exact path="/admin/add-advertisement"
            render={(props) => <AddAdvertisement
              authenticated={this.state.authenticated}
              roleName={this.state.role}
              username={this.state.username}
              onLogout={this.handleLogout} {...props} />}>
          </Route>
          <Route exact path="/admin/add-category"
            render={(props) => <AddCategory
              authenticated={this.state.authenticated}
              roleName={this.state.role}
              username={this.state.username}
              onLogout={this.handleLogout} {...props} />}>
          </Route>
        </Switch>

        <Switch>
          <Route exact path="/recruiter"
            render={(props) => <Dashboard
              authenticated={this.state.authenticated}
              roleName={this.state.role}
              username={this.state.username}
              onLogout={this.handleLogout} {...props} />}>
          </Route>
          <Route exact path="/recruiter/profile"
            render={(props) => <ProfileRecruiter
              authenticated={this.state.authenticated}
              roleName={this.state.role}
              currentUser={this.state.currentUser}
              onLogout={this.handleLogout} {...props} />}>
          </Route>
          <Route exact path="/recruiter/add-job"
            render={(props) => <AddJob
              authenticated={this.state.authenticated}
              roleName={this.state.role}
              username={this.state.username}
              onLogout={this.handleLogout} {...props} />}>
          </Route>
          <Route exact path="/recruiter/manager-job"
            render={(props) => <ManagerJob
              authenticated={this.state.authenticated}
              roleName={this.state.role}
              username={this.state.username}
              onLogout={this.handleLogout} {...props} />}>
          </Route>
          <Route exact path="/recruiter/recruitment"
            render={(props) => <Recruitment
              authenticated={this.state.authenticated}
              roleName={this.state.role}
              username={this.state.username}
              onLogout={this.handleLogout} {...props} />}>
          </Route>
          <Route exact path="/recruitment/send-email/:id"
            render={(props) => <SendMail
              authenticated={this.state.authenticated}
              roleName={this.state.role}
              username={this.state.username}
              onLogout={this.handleLogout} {...props} />}>
          </Route>
          <Route exact path="/recruitment/job/:id"
            render={(props) => <EditJob
              authenticated={this.state.authenticated}
              roleName={this.state.role}
              username={this.state.username}
              onLogout={this.handleLogout} {...props} />}>
          </Route>
        </Switch>
        {this.state.role === "ROLE_JOBSEEKER" || this.state.role === '' ? (
          <div className="app-top-box">
            <AppHeader authenticated={this.state.authenticated} roleName={this.state.role} onLogout={this.handleLogout} />
          </div>
        ) : ""}
        <div className="app-body">
          <Switch>
            <Route exact path="/" component={Home} ></Route>
            <Route exact path="/job-list" component={JobList}></Route>
            <Route exact path="/advertisement" component={Advertisement}></Route>
            <Route exact path="/contact" component={Contact}></Route>
            <Route exact path="/job-detail/:id"
              render={(props) => <JobDetails
                authenticated={this.state.authenticated} {...props} />}>
            </Route>
            <PrivateRoute path="/profile" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              loadCurrentUser={this.loadCurrentlyLoggedInUser}
              component={Profile}>

            </PrivateRoute>
            <Route exact path="/add-cv"
              render={(props) => <AddCv
                authenticated={this.state.authenticated}
                roleName={this.state.role}
                onLogout={this.handleLogout} {...props} />}>
            </Route>
            <Route exact path="/cv-manager"
              render={(props) => <ManagerCV
                authenticated={this.state.authenticated}
                roleName={this.state.role}
                onLogout={this.handleLogout} {...props} />}>
            </Route>
            <Route exact path="/recruiment-manager"
              render={(props) => <ManagerRecruiter
                authenticated={this.state.authenticated}
                roleName={this.state.role}
                onLogout={this.handleLogout} {...props} />}>
            </Route>
            <Route path="/login"
              render={(props) => <Login authenticated={this.state.authenticated} roleName={this.state.role} {...props} />}></Route>
            <Route path="/login-recruiter"
              render={(props) => <LoginRecruiter authenticated={this.state.authenticated} roleName={this.state.role}  {...props} />}></Route>
            <Route path="/login-admin"
              render={(props) => <LoginAdmin authenticated={this.state.authenticated} roleName={this.state.role}  {...props} />}></Route>
            <Route path="/signup"
              render={(props) => <Signup authenticated={this.state.authenticated} {...props} />}></Route>
            <Route path="/signup-recruiter"
              render={(props) => <SignupRecruiter authenticated={this.state.authenticated} {...props} />}></Route>

            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>

          </Switch>
        </div>
        <Alert stack={{ limit: 3 }}
          timeout={3000}
          position='top-right' effect='slide' offset={65} />
      </div>

    );
  }
}

export default App;
