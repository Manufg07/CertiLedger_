import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BrowserProvider, Contract } from "ethers";

import { abi } from "../scdata/Cert.json"
import { CertModuleCert } from "../scdata/deployed_addresses.json";

const IssueCertificate = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [grade, setGrade] = useState('');
  const [date, setDate] = useState('');

  const navigate = useNavigate();
    const provider = new BrowserProvider(window.ethereum);

  async function connectToMetamask() {
    const signer = await provider.getSigner();
    console.log("Address", signer.address);

  }


  const submitForm = async (e) => {
    e.preventDefault();
    const newCertificate = {
      id,
      name,
      course,
      grade,
      date,
    };
    const signer = await provider.getSigner();
    const instance = new Contract(CertModuleCert, abi, signer);

    const txl = await instance.issue(id, name, course, grade, date);
    navigate("/thank-you");
    console.log("transaction:", txl);
  };

  //   try {
  //     const res = await AddCertificateSubmit(newCertificate);
  //     if (res.ok) {
  //       toast.success('Added successfully');
  //       navigate('/thank-you');
  //     } else {
  //       toast.error('Failed to add certificate');
  //     }
  //   } catch (error) {
  //     console.error('Error adding certificate:', error);
  //     toast.error('An error occurred');
  //   }
  // };

  // const AddCertificateSubmit = async (newCertificate) => {
  //   const res = await fetch('/api/certificate', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(newCertificate),
  //   });
  //   return res;
  

  return (
    <>
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Certificate Dapp
        </h1>
        <button
          className="w-full bg-orange-700 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-md transition duration-300"
          type="submit"
          onClick={connectToMetamask}
        >
          Connect to Metamask
        </button>
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-3xl font-bold text-center mb-4">
            Issue New Certificate
          </h3>
          <form onSubmit={submitForm}>
            <div className="space-y-4">
              <div>
                <label
                  className="block text-lg font-medium mb-2"
                  htmlFor="course"
                >
                  Select Course *
                </label>
                <select
                  className="w-full border-2 border-gray-300 rounded-md p-2"
                  name="course"
                  id="course"
                  required
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                >
                  <option value="">Select Course</option>
                  <option>Certified Blockchain Associate</option>
                  <option>Certified Ethereum Developer</option>
                  <option>Blockchain Foundation</option>
                  <option>Ethereum Fundamentals</option>
                </select>
              </div>
              <div>
                <label
                  className="block text-lg font-medium mb-2"
                  htmlFor="id"
                >
                  Certificate ID *
                </label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-300 rounded-md p-2"
                  name="id"
                  id="id"
                  placeholder="Certificate ID"
                  required
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
              <div>
                <label
                  className="block text-lg font-medium mb-2"
                  htmlFor="name"
                >
                  Candidate Name *
                </label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-300 rounded-md p-2"
                  name="name"
                  id="name"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label
                  className="block text-lg font-medium mb-2"
                  htmlFor="grade"
                >
                  Select Grade *
                </label>
                <select
                  className="w-full border-2 border-gray-300 rounded-md p-2"
                  name="grade"
                  id="grade"
                  required
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                >
                  <option value="">Select Grade</option>
                  <option>S</option>
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                </select>
              </div>
              <div>
                <label
                  className="block text-lg font-medium mb-2"
                  htmlFor="date"
                >
                  Issue Date *
                </label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-300 rounded-md p-2"
                  id="date"
                  name="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="text-center">
                <button
                  className="w-full bg-orange-700 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                  type="submit"
                >
                  Issue Certificate
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default IssueCertificate;
