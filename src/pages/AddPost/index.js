import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import NavBar from '../../components/NavBar';

import styles from './AddPost.module.scss';

export class AddPost extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  state = {
    title: { value: '', error: false },
    body: { value: '', error: false },
    isLoading: false,
    error: false
  };

  handleChange = name => event => {
    this.setState({
      [name]: { value: event.target.value, error: false }
    });
  };

  submit = () => {
    const isFormValid = this.validate();
    if (!isFormValid) return false;
    const {
      title: { value: titleValue },
      body: { value: bodyValue }
    } = this.state;
    this.setState(() => ({ isLoading: true }));
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({ title: titleValue, body: bodyValue, userId: 1 }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
      .then(response => response.json())
      .then(this.notifySuccess)
      .catch(this.handleError);
  };

  validate = () => {
    let errors = 0;
    ['title', 'body'].forEach(field => {
      if (this.state[field].value.length === 0) {
        this.setState(state => ({
          [field]: { value: state[field].value, error: true }
        }));
        errors++;
      }
    });
    return errors === 0;
  };

  handleError = error => {
    this.setState(() => ({ error, isLoading: false }));
    toast.error(`Something bad happens: ${error}`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };

  notifySuccess = data => {
    this.setState(() => ({
      title: { value: '', error: false },
      body: { value: '', error: false },
      isLoading: false
    }));
    toast.success(
      `Your post has been successfully posted with title ${data.title}`,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      }
    );
  };

  render() {
    const {
      title: { value: titleValue, error: titleError },
      body: { value: bodyValue, error: bodyError },
      isLoading
    } = this.state;
    const { classes } = this.props;
    return (
      <div className={styles.AddPost}>
        <NavBar backToPostsPage={true} />
        <div className={styles.content}>
          <Paper className={styles.formContainer}>
            <form className={styles.form} noValidate autoComplete="off">
              <TextField
                id="field-title"
                label="Title"
                value={titleValue}
                onChange={this.handleChange('title')}
                margin="normal"
                variant="outlined"
                required
                error={titleError}
              />
              <TextField
                id="field-content"
                label="Body"
                type="textarea"
                value={bodyValue}
                onChange={this.handleChange('body')}
                margin="normal"
                variant="outlined"
                multiline={true}
                rows={10}
                rowsMax={50}
                required
                error={bodyError}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                disabled={isLoading}
                onClick={this.submit}
              >
                {!isLoading && (
                  <Fragment>
                    <SendIcon className={classes.leftIcon} />
                    Send
                  </Fragment>
                )}
                {isLoading && <CircularProgress thickness={3} size={20} />}
              </Button>
            </form>
          </Paper>
          <ToastContainer />
        </div>
      </div>
    );
  }
}

export default withStyles(theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit * 2
  }
}))(AddPost);
