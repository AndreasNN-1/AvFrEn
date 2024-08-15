"use client"; // This is a Client Component

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { PageContent } from "../../types"; // Import the PageContent type
import { getIdData } from "../../lib/getIdData"; // Import the getIdData function
import Loading from "../../components/Loading"; // Import the Loading component
import ContactForm from "../../components/ContactForm"; // Import the ContactForm component

export default function GetInTouch() {
  // State to manage the current screen width
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  // State to manage the specific data for the given ID
  const [specificData, setSpecificData] = useState<PageContent | null>(null);
  // State to manage loading state
  const [isLoading, setIsLoading] = useState(true);
  // State to manage the visibility of the contact form
  const [isFormVisible, setIsFormVisible] = useState(false);
  // State to manage the email to which the form should be sent
  const [formEmail, setFormEmail] = useState<string | null>(null);

  useEffect(() => {
    // Function to check screen size
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 769);
    };

    // Initial check
    checkScreenSize();

    // Event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    // Function to fetch data based on the ID
    const fetchData = async () => {
      setIsLoading(true); // Set loading to true before fetching
      try {
        const data = await getIdData("1"); // Fetch data for the specific ID (1)
        setSpecificData(data); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once on mount

  const handleContactClick = (email: string) => {
    setFormEmail(email); // Set the email for the contact form
    setIsFormVisible(true); // Show the contact form
  };

  const handleCloseForm = () => {
    setIsFormVisible(false); // Hide the contact form
  };

  if (isLoading) {
    return <Loading />; // Display the Loading component while data is loading
  }

  return (
      <div className={styles.PageContainer}>
        <div className={styles.nav}>
          <a href="/">
            <div>
              <img
                src="https://cmbkjwkktokbxoggnzup.supabase.co/storage/v1/object/public/PageImgs/back.png"
                alt="img"
                className={styles.LinkImg}
              />
            </div>
          </a>
          <a href="whatwedo">
            <div>
              <img
                src="https://cmbkjwkktokbxoggnzup.supabase.co/storage/v1/object/public/PageImgs/nav-1.png"
                alt="img"
                className={styles.LinkImg}
              />
            </div>
          </a>
          <a href="maintainable">
            <div>
              <img
                src="https://cmbkjwkktokbxoggnzup.supabase.co/storage/v1/object/public/PageImgs/nav-2.png"
                alt="img"
                className={styles.LinkImg}
              />
            </div>
          </a>
          <a href="#">
            <div>
              <img
                src="https://cmbkjwkktokbxoggnzup.supabase.co/storage/v1/object/public/PageImgs/nav-3.png"
                alt="img"
                className={styles.LinkImg}
              />
              <img
                src="https://cmbkjwkktokbxoggnzup.supabase.co/storage/v1/object/public/PageImgs/nav-3-where.png"
                alt="img"
                className={styles.LinkWhere}
              />
            </div>
          </a>
        </div>
        {specificData ? (
          <div className={styles.ContentContainer}>
            <div className={styles.ImgContainer}>
              <img
                src={isSmallScreen ? specificData.Img1Small : specificData.Img1}
                alt="Img"
              />
            </div>

            <div className={styles.TextContainer}>
              <div className={styles.TextCon}>
                <h1 className={styles.title}>
                  {specificData.Title}
                  <span className={styles.highlighted}>
                    {" "}
                    {specificData.Text1}{" "}
                  </span>
                  ...
                </h1>
                <p>{specificData.Text2}</p>
                <p>{specificData.Text3}</p>
                <p>{specificData.Text4}</p>
              </div>
              <div className={styles.ImgCon}>
                <div onClick={() => handleContactClick('lt@coolish.com')}>
                  <img src={specificData.Img2} alt="" />
                  <div>lt@coolish.com</div>
                </div>
                <div onClick={() => handleContactClick('pr@coolish.com')}>
                  <img src={specificData.Img3} alt="" />
                  <div>pr@coolish.com</div>
                </div>
                <div onClick={() => handleContactClick('mn@coolish.com')}>
                  <img src={specificData.Img4} alt="" />
                  <div>mn@coolish.com</div>
                </div>
              </div>
              <div className={styles.ExtraText}>
                <div>getintouch</div>
              </div>
              <div className={styles.ExtraImg}>
                <img src="https://cmbkjwkktokbxoggnzup.supabase.co/storage/v1/object/public/PageImgs/logo-b.png" alt="ExtraImg" />
              </div>
            </div>
          </div>
        ) : (
          <p>No data available</p> // Message when no data is available
        )}

        {/* Conditionally render the ContactForm component */}
        {isFormVisible && formEmail && (
          <ContactForm email={formEmail} onClose={handleCloseForm} />
        )}
      </div>
  );
}
