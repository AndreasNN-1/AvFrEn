"use client"; // This is a Client Component

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { PageContent } from "../../types"; // Import the PageContent type
import { getIdData } from "../../lib/getIdData"; // Import the getIdData function
import Loading from "../../components/Loading"; // Import the Loading component

export default function Maintainable() {
  // State to manage the specific data for the given ID
  const [specificData, setSpecificData] = useState<PageContent | null>(null);
  // State to manage loading state
  const [isLoading, setIsLoading] = useState(true);
  // State to manage the current screen width
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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
    // Function to fetch data for ID 2
    const fetchData = async () => {
      setIsLoading(true); // Set loading to true before fetching
      try {
        const data = await getIdData("2"); // Fetch data for ID 2
        setSpecificData(data); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once on mount

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
          <a href="#">
            <div>
              <img
                src="https://cmbkjwkktokbxoggnzup.supabase.co/storage/v1/object/public/PageImgs/nav-2.png"
                alt="img"
                className={styles.LinkImg}
              />
              <img
                src="https://cmbkjwkktokbxoggnzup.supabase.co/storage/v1/object/public/PageImgs/nav-2-where.png"
                alt="img"
                className={styles.LinkWhere}
              />
            </div>
          </a>
          <a href="getintouch">
            <div>
              <img
                src="https://cmbkjwkktokbxoggnzup.supabase.co/storage/v1/object/public/PageImgs/nav-3.png"
                alt="img"
                className={styles.LinkImg}
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
              <div className={styles.ExtraText}>
                <div>WhatWeDo</div>
              </div>
              <div className={styles.ExtraImg}>
                <img src="https://cmbkjwkktokbxoggnzup.supabase.co/storage/v1/object/public/PageImgs/logo-a.png" alt="ExtraImg" />
              </div>
            </div>
          </div>
        ) : (
          <p>No data available</p> // Message when no data is available
        )}
      </div>
  );
}
