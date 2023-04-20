import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Avatar, Link } from "@mui/material";
import { GlobalContext } from "context/state";
import { makeStyles } from "@mui/styles";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
const useStyles = makeStyles({
  container: {
    display: "flex",
    backgroundColor: "#efefef",
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
    justifyContent: "center",
    alignItems: "center",
  },
  cover: {
    width: "100%",
    height: "20vh",
    backgroundColor: "#000",
  },
  info: {
    width: "80%",
    height: "25vh",
  },
  contact: {
    display: "flex",
    width: "100%",
    height: "60vh",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1eefe",
    padding: "5vh 0",
  },
  firstName: {
    marginLeft: "5px",
  },
  image: {
    position: "absolute",
    height: "120px",
    width: "120px",
    transform: "translateY(-50%)",
  },
  userinfo: {
    paddingTop: "10vh",
    paddingBottom: "5vh",
  },
  name: {
    "& h2": {
      color: "#000",
      fontWeight: 500,
    },
  },
  position: {
    margin: "6px 0",
    fontSize: "16px",
    color: "#000",
    fontWeight: 500,
  },
  contactinfo: {
    width: "80%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: "10px",
    "& a": {
      display: "flex",
      textDecoration: "none",
      color: "#000",
      fontWeight: 500,
    },
  },
  phone: {
    height: "20px",
    width: "100%",
    padding: "20px 20px",
    "&:hover": {
      backgroundColor: "#efefef",
    },
  },
  mail: {
    height: "20px",
    width: "100%",
    padding: "20px 20px",
  },
  facebook: {
    height: "20px",
    width: "100%",
    padding: "20px 20px",
  },
  instagram: {
    height: "20px",
    width: "100%",
    padding: "20px 20px",
  },
  linkedin: {
    height: "20px",
    width: "100%",
    padding: "20px 20px",
  },
  logo: {
    position: "relative",
    height: 24,
    width: 24,
    marginRight: "20px",
  },
  company: {
    display: "flex",
    width: "100%",
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
});
const Card = () => {
  const { decodedToken, request } = useContext(GlobalContext);
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

    try {
      const vCardText = await request({
        url: `branch/vcard?cardID=${cardID}`,
        method: "GET",
        token: localStorage.getItem("token"),
        iscard: true,
      });

      if (typeof vCardText === "string") {
        // Process the vCard text as needed
        const blob = new Blob([vCardText], { type: "text/vcard" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "contact.vcf";
        a.click();
        URL.revokeObjectURL(url);
      } else {
        console.error("Error: The received data is not a string.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  if (!user) {
    return <div>Админтай холбогдоно уу</div>;
  }

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <div className={classes.cover}></div>
        <div className={classes.info}>
          <div className={classes.image}>
            <Avatar
              style={{ width: "120px", height: "120px" }}
              src={user.imglnk}
              alt="user image"
            />
          </div>
          <div className={classes.userinfo}>
            <div className={classes.name}>
              <Typography variant="h4" component="h2">
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
              <button onClick={handleSaveInfo}>Save Contact</button>
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
  );
};

export default Card;
