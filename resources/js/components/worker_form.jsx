import React, { useState } from 'react';
import axios from 'axios';

const PhotoUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    patronymic: '',
    email: '',
    phone: '',
    description: '',
    dob: ''
  });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleUpload = () => {
    // if (selectedFile) {
      const uploadData = new FormData();
      uploadData.append('photo', selectedFile);
      uploadData.append('name', formData.name);
      uploadData.append('surname', formData.surname);
      uploadData.append('patronymic', formData.patronymic);
      uploadData.append('email', formData.email);
      uploadData.append('phone', formData.phone);
      uploadData.append('dob', formData.dob);
      uploadData.append('description', formData.description);

      

      axios.post('/addWorker', uploadData)
        .then((response) => {
          console.log('Upload success!', response.data);
          // Handle success response
        })
        .catch((error) => {
          console.error('Upload error:', error);
          // Handle error response
        });
    // }
  };

  return (
    <div>
      <div>
        <label htmlFor="photo">Photo:</label>
        <input type="file" id="photo" className='form-control' onChange={handleFileChange} />
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" className='form-control' value={formData.name} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="surname">Surname:</label>
        <input type="text" id="surname" name="surname" className='form-control' value={formData.surname} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="patronymic">Patronymic:</label>
        <input type="text" id="patronymic" name="patronymic" className='form-control' value={formData.patronymic} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input type="text" id="phone" name="phone" className='form-control' value={formData.phone} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" className='form-control' value={formData.email} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="dob">Date of Birth:</label>
        <input type="date" id="dob" name="dob" className='form-control' value={formData.dob} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea  id="description" name="description" className='form-control' value={formData.description} onChange={handleInputChange} ></textarea>
      </div>
      <button onClick={handleUpload} className='btn btn-success'>Submit</button>
    </div>
  );
};

export default PhotoUploadForm;
