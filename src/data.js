import React, { useState } from "react";
import {
  where,
  query,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase/config";

const SearchPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const [aadharImage, setAadharImage] = useState(null);
  const [panImage, setPanImage] = useState(null);
  const [passbookImage, setPassbookImage] = useState(null);
  const [aadharList, setAadharList] = useState([]);
  const [panList, setPanList] = useState([]);
  const [passbookList, setPassbookList] = useState([]);

  const [userData, setUserData] = useState(null)

  const fetchImageURLs = async (phoneNumber, imageType, setImageList) => {
    try {
      const imageCollectionRef = collection(
        db,
        "Participant",
        phoneNumber,
        "Image"
      );
      const imageTypeRef = doc(imageCollectionRef, imageType);

      const imageDoc = await getDoc(imageTypeRef);

      if (imageDoc.exists()) {
        const { imageUrl } = imageDoc.data();
        setImageList([imageUrl]);
      } else {
        setImageList([]); // No image found for the given type
      }
    } catch (error) {
      console.error("Error fetching image URLs:", error);
    }
  };

  const handleSearch = async() => {

    const userDocRef = doc(db, 'Participant', phoneNumber);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userDataFromFirestore = userDocSnapshot.data();
      setUserData(userDataFromFirestore);
    } else {
      // Handle the case where the user data is not found
    }
    // Fetch and set URLs for Aadhar images
    fetchImageURLs(phoneNumber, "aadhar", setAadharList);

    // Fetch and set URLs for PAN images
    fetchImageURLs(phoneNumber, "pan", setPanList);

    // Fetch and set URLs for Passbook images
    fetchImageURLs(phoneNumber, "passbook", setPassbookList);
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-500 via-green-600 to-green-600">
        <div>
        <div className="flex items-center justify-center mt-8">
  <input
    type="text"
    placeholder="ENTER THE PHONE NUMBER TO SEARCH"
    className="border border-gray-300 rounded-md p-4 mr-2 focus:outline-none focus:border-blue-500 text-lg"
    style={{ width: "400px", height: "50px" }}
    value={phoneNumber}
    onChange={(e) => setPhoneNumber(e.target.value)}
  />
  <button
    className="bg-blue-500 text-white rounded-md px-5 py-3 focus:outline-none hover:bg-blue-700 transition duration-300 mt-0"
    onClick={handleSearch}
  >
    Search
  </button>
</div>


  
          <br></br>
  
          <br></br>
  
          <br></br>
  
          {/* User Data Section */}
          
          {userData ?(
          <div className="mt-4">
             <div className="bg-gray-800 p-4 rounded-md mt-4">
             <p className="text-xl font-bold text-white"> </p>
            <div className="text-left text-white mt-2">
            <p>
              <span className="font-bold">Name:</span> {userData.name}
            </p>
            <p>
              <span className="font-bold">Number:</span> {userData.phone}
            </p>
            <p>
              <span className="font-bold">Bank:</span> {userData.bank}
            </p>
          </div>
          </div>
          </div>
         
          ):(
            <p className="mt-8 text-2xl text-white text-center font-bold border-t pt-4">
            NO data found , Enter a Valid Mobile Number
          </p>
          )}
  
          {/* Display Section for Images */}
          <div className="flex mt-4 gap-4">
            {/* Aadhar Images */}
            {aadharList.map((url) => (
              <div key={url} className="flex items-center border p-4">
                <img
                  src={url}
                  className="h-50 w-50 object-cover"
                  alt="Aadhar Card"
                />
              </div>
            ))}
  
            {/* PAN Images */}
            {panList.map((url) => (
              <div key={url} className="flex items-center border p-4">
                <img
                  src={url}
                  className="h-50 w-50 object-cover"
                  alt="PAN Card"
                />
              </div>
            ))}
  
            {/* Passbook Images */}
            {passbookList.map((url) => (
              <div key={url} className="flex items-center border p-4">
                <img
                  src={url}
                  className="h-50 w-50 object-cover"
                  alt="Passbook"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
  
  
};

export default SearchPage;
