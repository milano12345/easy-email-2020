import React from 'react';
import './FileUploader.css';
import { update } from '../../actions';
import { connect } from 'react-redux';

class FileUploader extends React.Component {

  getFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    let imgSrc;

    reader.onload = async (event) => {
      imgSrc = await event.target.result;
      update(imgSrc)
    };

    const update = (imgSrc) => {
      this.props.update({[this.props.store]: imgSrc});
    }

    reader.readAsDataURL(file);
  }

  render() {
    return (
    <div className="upload-btn-wrapper">
      <button className="upload-btn">Upload file</button>
      <input type="file" name="myfile" className="logo-file-uploader" onChange={this.getFile}/>
    </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  update: content => dispatch(update(content))
})

export default connect(null, mapDispatchToProps)(FileUploader);
