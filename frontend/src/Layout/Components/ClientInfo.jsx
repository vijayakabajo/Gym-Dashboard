import React from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';

const ClientDetails = () => {
  const { state: clientData } = useLocation();

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Client Information`, 10, 10);
    doc.text(`Name: ${clientData.fullname}`, 10, 20);
    doc.text(`Email: ${clientData.emailId}`, 10, 30);
    doc.text(`Mobile: ${clientData.mobileNumber}`, 10, 40);
    doc.text(`Plan: ${clientData.plan}`, 10, 50);
    doc.text(`Plan Cost: ${clientData.planCost}`, 10, 60);
    doc.text(`Amount Paid: ${clientData.amountPaid}`, 10, 70);
    doc.text(`Debt: ${clientData.debt}`, 10, 80);
    // Add more fields as needed
    doc.save(`${clientData.fullname}_details.pdf`);
  };

  return (
    <div className="p-4 text-white text-3xl font-semibold">
      <h2>Client Details</h2>
      <p><strong>Name:</strong> {clientData.fullname}</p>
      <p><strong>Email:</strong> {clientData.emailId}</p>
      <p><strong>Mobile:</strong> {clientData.mobileNumber}</p>
      <p><strong>Plan:</strong> {clientData.plan}</p>
      <p><strong>Plan Cost:</strong> {clientData.planCost}</p>
      <p><strong>Amount Paid:</strong> {clientData.amountPaid}</p>
      <p><strong>Debt:</strong> {clientData.debt}</p>
      <button onClick={downloadPDF} className="btn btn-primary mt-4">
        Download as PDF
      </button>
    </div>
  );
};

export default ClientDetails;
