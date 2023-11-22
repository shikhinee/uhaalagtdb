import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Avatar, Link } from "@mui/material";
import { GlobalContext } from "context/state";
import { makeStyles } from "@mui/styles";
import background from "../../assets/background-pattern.png";
import asd from "../../assets/asd.png";
import nfc from "../../assets/nfc.png";
import tdblogo from "../../assets/tdb-log.png";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
const useStyles = makeStyles({
  container: {
    display: "flex",
    backgroundColor: "#FFFFFF",
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
  },
  cover: {
    width: "100%",
    height: "30vh",
    position: "relative",
    backgroundColor: "#0E94D2",
    backgroundImage: `url(${background})`,
  },
  nfclogo: {
    right: 10,
    bottom: 10,
    position: "absolute",
  },
  mainlogo: {
    top: "30%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
  },
  info: {
    width: "100%",
    height: "45vh",

    // backdropFilter: "blur(5px)", // Apply blur effect
    // backgroundSize: "cover", // Resize the background image to
    boxShadow: "none",
    backgroundImage: `url(${asd})`,
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
    width: "200px",
    transform: "translateY(-50%)",
    margin: "auto",
  },
  userinfo: {
    width: "80%",
    margin: "auto",
    flexDirection: "column",
    alignItems: "flex-start",
    // transform: "translateY(-20%)",
  },
  name: {
    "& h2": {
      color: "#0E94D2",
      fontWeight: 500,
    },
  },
  position: {
    margin: "6px 0",
    fontSize: "16px",
    color: "#4D4D4F",
    fontWeight: 500,
  },
  contactinfo: {
    width: "80%",
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
    padding: "20px 20px",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "#efefef",
    },
  },
  mail: {
    height: "20px",
    width: "100%",
    padding: "20px 20px",
    display: "flex",
    alignItems: "center",
  },
  facebook: {
    height: "20px",
    width: "100%",
    padding: "20px 20px",
    display: "flex",
    alignItems: "center",
  },
  instagram: {
    height: "20px",
    width: "100%",
    padding: "20px 20px",
    display: "flex",
    alignItems: "center",
  },
  linkedin: {
    height: "20px",
    width: "100%",
    padding: "20px 20px",
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
    justifyContent: "space-between",
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

  const handleSaveInfo = () => {
    if (!user || !cardID) {
      console.error("User data or cardID is not available.");
      return;
    }

<<<<<<< Updated upstream
    // const baseURL = `https://bcard.tdbm.mn/api/`;
    const baseURL = `https://bcard.tdbm.mn/api/`;

=======
    const baseURL = `http://bcard.tdbmlabs.mn:8042/api/`;

    // const baseURL = `http://10.150.10.47:8875/api/`;
>>>>>>> Stashed changes
    const url = `${baseURL}branch/vcard?cardID=${cardID}`;

    // Navigate to the URL without the token
    window.location.href = url;
  };
  if (!user) {
    return <div>Админтай холбогдоно уу</div>;
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
              style={{ width: "200px", height: "200px" }}
              src={user.imglnk}
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
              <Typography variant="h6">{user.pstn}</Typography>
            </div>
            <div className={classes.company}>
              <Typography variant="body1">{user.cmpnnm}</Typography>
            </div>
            <div className={classes.saveContact}>
              <button className={classes.saveContact} onClick={handleSaveInfo}>
                Save Contact
              </button>
            </div>
          </div>
        </div>
        <div className={classes.contact}>
          <div className={classes.contactinfo}>
            <div className={classes.phone}>
              <Link href={`tel:${user.phnehome}`}>
                <PhoneIcon className={classes.logo} />
                {user.phnehome}
              </Link>
            </div>
            <div className={classes.mail}>
              <Link href={`mailto:${user.eml}`}>
                <EmailIcon className={classes.logo} />
                {user.eml}
              </Link>
            </div>
            <div className={classes.facebook}>
              <Link href={`${user.webaddrs}`}>
                <FacebookIcon className={classes.logo} />
                {user.frstnm} {user.lstnm}
              </Link>
            </div>
            <div className={classes.instagram}>
              <Link href={`${user.webaddrS_1}`}>
                <InstagramIcon className={classes.logo} />
                {user.webaddrS_1}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Card;
