import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Avatar, Link, CircularProgress } from "@mui/material";
import { GlobalContext } from "context/state";
import { makeStyles } from "@mui/styles";
import background from "../../assets/background-pattern.png";
import asd from "../../assets/asd.png";
import nfc from "../../assets/nfc.png";
import tdblogo from "../../assets/tdb-logo.png";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
const useStyles = makeStyles({
  container: {
    display: "flex",
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    display: "flex",
    height: "100%",
    width: "100%",
    maxWidth: "600px",
    boxShadow:
      "4px 0 15px -4px rgba(31, 73, 125, 0.8), -4px 0 8px -4px rgba(31, 73, 125, 0.8)",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#fff",
  },
  cover: {
    width: "100%",
    height: "33vh",
    backgroundColor: "#0E94D2",
    backgroundImage: `url(${background})`,
    position: "absolute",
  },
  nfclogo: {
    right: "6%",
    bottom: "15%",
    position: "absolute",
    width: "6%",
  },
  mainlogo: {
    width: "30%",
    top: "30%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
  },
  info: {
    width: "100%",
    height: "69%",
    position: "absolute",
    top: "33%",
    // backdropFilter: "blur(5px)", // Apply blur effect
    // backgroundSize: "cover", // Resize the background image to
    boxShadow: "none",
    backgroundImage: `url(${asd})`,
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(0,0,30,0.4)",
  },
  contact: {
    display: "flex",
    width: "100%",
    height: "60vh",
    justifyContent: "center",
    alignItems: "center",
    padding: "2vh 0",
  },
  firstName: {
    marginLeft: "5px",
  },
  image: {
    height: "150px",
    width: "180px",
    transform: "translateY(-70%)",
    margin: "auto",
  },
  userinfo: {
    width: "66%",
    margin: "auto",
    flexDirection: "column",
    alignItems: "flex-start",
    transform: "translateY(-20%)",
  },
  name: {
    "& h2": {
      fontSize: 26,
      color: "#0E94D2",
      fontWeight: 600,
    },
  },
  position: {
    margin: "2px 0",
    fontSize: 18,
    color: "#4D4D4F",
    fontWeight: 400,
  },
  contactinfo: {
    width: "100%",
    height: "100%",

    display: "flex",
    flexDirection: "column",
    // backgroundColor: "#444444",
    borderRadius: "10px",
    "& a": {
      display: "flex",
      textDecoration: "none",
      color: "#4D4D4F",
      fontWeight: 500,
    },
  },
  phone: {
    height: "20px",
    width: "100%",
    padding: "17px 0px",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "#efefef",
    },
  },
  mail: {
    height: "20px",
    width: "100%",
    padding: "17px 0px",
    display: "flex",
    alignItems: "center",
  },
  facebook: {
    height: "20px",
    width: "100%",
    padding: "17px 0px",
    display: "flex",
    alignItems: "center",
  },
  instagram: {
    height: "20px",
    width: "100%",
    padding: "17px 0px",
    display: "flex",
    alignItems: "center",
  },
  linkedin: {
    height: "20px",
    width: "100%",
    padding: "17px 0px",
    display: "flex",
    alignItems: "center",
  },
  logo: {
    position: "relative",
    height: 24,
    width: 24,
    marginRight: "20px",
    color: "#0095DA",
  },
  company: {
    color: "#4D4D4F",
    display: "flex",
    width: "100%",
    fontSize: 18,
    justifyContent: "space-between",
    color: "#000",
    "& button": {
      padding: "5px 20px",
      backgroundColor: "#2e7cf6",
      borderRadius: "10px",
      color: "white",
      boxShadow: "none",
    },
  },
  saveContact: {
    width: "100%",
    padding: "10px 0px 10px 0px",
    "& button": {
      backgroundColor: "#0E94D2",
      borderRadius: "10px",
      color: "white",
      border: "none",
      margin: "auto",
    },
    fontSize: 16,
    fontWeight: "300",
    marginTop: 10,
  },
});
const Card = () => {
  const { decodedToken, request, baseURL } = useContext(GlobalContext);
  const { cardID } = useParams();
  const [user, setUser] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await request({
        url: `branch/getCard?cardID=${cardID}`,
        method: "GET",
        token: localStorage.getItem("token"),
      });

      if (response.success) {
        setUser(response.value);
      } else {
        // Handle the error case, e.g., show an error message.
      }
    };

    if (cardID) {
      fetchUserData();
    }
  }, [cardID, request]);

  const handleSaveInfo = async () => {
    if (!user || !cardID) {
      console.error("User data or cardID is not available.");
      return;
    }

    const baseURL = `https://bcard.tdbm.mn/api/`;

    const url = `${baseURL}branch/vcard?cardID=${cardID}`;
    try {
      // Replace 'your-api-endpoint' with the endpoint to fetch the file
      const response = await fetch(url, {
        method: "GET",
      });
      console.log(response);
      if (response.ok) {
        // Create a Blob from the PDF stream
        const blob = await response.blob();
        // Create a link element, use it to download the blob, and then delete it
        const link = document.createElement("a");
        // Create a URL for the blob
        link.href = window.URL.createObjectURL(blob);
        // Set link properties
        link.download = `${user.frstnm}.vcf`; // The file name you want the file to be downloaded with
        document.body.appendChild(link);
        // Trigger the download
        link.click();
        // Clean up by revoking the Object URL and removing the link element
        window.URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.error("Failed to download file:", error);
    }
  };
  if (!user) {
    return (
      <div className={classes.container}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <div className={classes.cover}>
          <img
            className={classes.mainlogo}
            src={tdblogo}
            // style={{ width: "150px" }}
          />
          <img className={classes.nfclogo} src={nfc} />
        </div>
        <div className={classes.info}>
          <div className={classes.image}>
            <Avatar
              style={{ width: "180px", height: "180px" }}
              src={`data:image/jpeg;base64, ${user.imglnk}`}
              alt="user image"
            />
          </div>
          <div className={classes.userinfo}>
            <div className={classes.name}>
              <Typography variant="h-3" component="h2">
                <Box component="span">{user.lstnm}</Box>
                <Box component="span" className={classes.firstName}>
                  {user.frstnm}
                </Box>
              </Typography>
            </div>
            <div className={classes.position}>
              <span variant="h6">{user.pstn}</span>
            </div>
            <div className={classes.position}>
              <span variant="h6">{user.branchName}</span>
            </div>
            <div className={classes.company}>
              <span variant="h6">{user.cmpnnm}</span>
            </div>
            <div className={classes.saveContact}>
              <button className={classes.saveContact} onClick={handleSaveInfo}>
                Save Contact
              </button>
            </div>
            <div className={classes.contactinfo}>
              {user.phnehome && (
                <div className={classes.phone}>
                  <Link href={`tel:${user.phnehome}`}>
                    <PhoneIcon className={classes.logo} />
                    {user.phnehome}
                  </Link>
                </div>
              )}
              {user.eml && (
                <div className={classes.mail}>
                  <Link href={`mailto:${user.eml}`}>
                    <EmailIcon className={classes.logo} />
                    {user.eml}
                  </Link>
                </div>
              )}
              {user.webaddrs && (
                <div className={classes.facebook}>
                  <Link href={`${user.webaddrs}`}>
                    <FacebookIcon className={classes.logo} />
                    {user.frstnm} {user.lstnm}
                  </Link>
                </div>
              )}
              {user.webaddrS_1 && (
                <div className={classes.instagram}>
                  <Link href={`${user.webaddrS_1}`}>
                    <InstagramIcon className={classes.logo} />
                    {user.webaddrS_1}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Card;
