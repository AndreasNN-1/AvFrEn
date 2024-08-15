"use client"; // This is a Client Component

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { PageContent } from "../types";
import { getIdData } from "@/lib/getIdData";
import Loading from "../components/Loading"; // Import the Loading component

export default function HomeClient() {
  // State to manage the current screen width
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  // State to manage the specific data for the given ID
  const [specificData, setSpecificData] = useState<PageContent | null>(null);
  // State to manage loading state
  const [isLoading, setIsLoading] = useState(true);

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
        const data = await getIdData("4"); // Fetch data for the specific ID (4)
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
      {specificData ? (
        <>
          <nav>
            <img src={specificData.Img1} alt="logo" />
          </nav>
          <div className={styles.linkContainer}>
            <Link href="whatwedo">
              <img
                className={styles.LinkImg}
                src={isSmallScreen ? specificData.Img2Small : specificData.Img2}
                alt="linkImg"
              />
            </Link>

            <Link href="maintainable">
              <img
                className={styles.LinkImg}
                src={isSmallScreen ? specificData.Img3Small : specificData.Img3}
                alt="linkImg"
              />
            </Link>

            <Link href="getintouch">
              <img
                className={styles.LinkImg}
                src={isSmallScreen ? specificData.Img4Small : specificData.Img4}
                alt="linkImg"
              />
            </Link>
          </div>
          <div className={styles.extra}>
            <div className={styles.textbox}>
              <span>And yet... more to come</span>
            </div>
          </div>
        </>
      ) : (
        <p>No data available</p> // Message when no data is available
      )}
    </div>
  );
}
