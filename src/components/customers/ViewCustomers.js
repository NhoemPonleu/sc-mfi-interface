import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { saveAs } from "file-saver";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import html2canvas from "html2canvas";
import { FacebookShareButton, TelegramShareButton } from "react-share";
import UserService from "../service/Userservice";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const DownloadButton = ({ user }) => {
  const downloadAsPdf = () => {
    const pdfData = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Customer ID: {user.customerId}</Text>
            <Text>First Name: {user.firstName}</Text>
            <Text>Last Name: {user.lastName}</Text>
            <Text>First Name in Khmer: {user.firstNameInKhmer}</Text>
            <Text>Last Name in Khmer: {user.lastNameInKhmer}</Text>
            <Text>Phone Number 1: {user.phoneNumbers1}</Text>
            <Text>Phone Number 2: {user.phoneNumbers2}</Text>
            <Text>Gender: {user.gender}</Text>
            <Text>
              <a
                href={user.googleMap}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => { window.location.href = user.googleMap; }}
                onMouseLeave={() => { window.location.href = '#'; }}
              >
                Go To Google Map
              </a>
            </Text>
          </View>
        </Page>
      </Document>
    );

    const pdfBlob = new Blob([pdfData], { type: "application/pdf" });
    saveAs(pdfBlob, "userDetails.pdf");
  };

  const shareAsImage = () => {
    html2canvas(document.getElementById("userDetails")).then((canvas) => {
      const titleCanvas = document.createElement("canvas");
      const titleCtx = titleCanvas.getContext("2d");
      const titleText = "SACHACK MICROFINANCE PLC";
      const titleFontSize = 24;
      const titlePadding = 20;

      const firstName = user.firstName;
      const lastName = user.lastName;

      const originalCanvasWidth = canvas.width;
      const originalCanvasHeight = canvas.height;

      titleCanvas.width = originalCanvasWidth;
      titleCanvas.height = originalCanvasHeight + titleFontSize * 3 + titlePadding * 3;

      titleCtx.fillStyle = "#ffffff";
      titleCtx.fillRect(0, 0, titleCanvas.width, titleCanvas.height);

      titleCtx.font = `bold ${titleFontSize}px Arial`;
      titleCtx.fillStyle = "#000000";
      titleCtx.fillText(titleText, titlePadding, titleFontSize + titlePadding);
      titleCtx.fillText(`Name Customers: ${firstName} ${lastName}`, titlePadding, titleFontSize * 3 + titlePadding * 3);

      titleCtx.drawImage(canvas, 0, titleFontSize * 3 + titlePadding * 3);

      const imageBlob = titleCanvas.toDataURL("image/png");
      const blob = dataURLtoBlob(imageBlob);
      saveAs(blob, "userDetails.png");
    });
  };

  const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  return (
    <div>
      <button onClick={downloadAsPdf} className="btn btn-primary">
        Download as PDF
      </button>
      <button onClick={shareAsImage} className="btn btn-primary">
        Share as Image
      </button>
    </div>
  );
};

export default function UserView() {
  const { id } = useParams();
  const [user, setProfileInfo] = useState(null);
  const userDetailsRef = useRef(null);

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      const response = await UserService.getCustomerView(id, token);
      setProfileInfo(response);
    } catch (error) {
      console.error('Error fetching profile information:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>User Details</h2>
      <div id="userDetails" ref={userDetailsRef}>
        <table className="table">
          <tbody>
            <tr>
              <th>Customer ID:</th>
              <td>{user.customerId}</td>
            </tr>
            <tr>
              <th>First Name:</th>
              <td>{user.firstName}</td>
            </tr>
            <tr>
              <th>Last Name:</th>
              <td>{user.lastName}</td>
            </tr>
            <tr>
              <th>First Name in Khmer:</th>
              <td>{user.firstNameInKhmer}</td>
            </tr>
            <tr>
              <th>Last Name in Khmer:</th>
              <td>{user.lastNameInKhmer}</td>
            </tr>
            <tr>
              <th>Phone Number 1:</th>
              <td>{user.phoneNumbers1}</td>
            </tr>
            <tr>
              <th>Phone Number 2:</th>
              <td>{user.phoneNumbers2}</td>
            </tr>
            <tr>
              <th>Gender:</th>
              <td>{user.gender}</td>
            </tr>
            <tr>
              <th>Go To Google Map:</th>
              <td>
                <a href={user.googleMap} target="_blank" rel="noopener noreferrer">
                  OpenLink
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container">
        <h1>Joiner</h1>
        <table className="table">
          <tbody>
            <tr>
              <th>Customer ID:</th>
              <td>{user.customerId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <DownloadButton user={user} />
    </div>
  );
}
