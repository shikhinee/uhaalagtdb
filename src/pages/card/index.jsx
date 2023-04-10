import React, { useContext, useState, useEffect } from "react";
import { Box, Typography, Avatar, Link } from "@mui/material";
import { GlobalContext } from "context/state";

const Card = () => {
  const { decodedToken, request } = useContext(GlobalContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (decodedToken) {
      const fetchUserCards = async () => {
        const response = await request({
          url: `branch/getCardByUserId`,
          method: "GET",
          token: localStorage.getItem("token"),
        });

        if (response.success && response.value && response.value.length > 0) {
          setUser(response.value[0]);
        }
      };

      fetchUserCards();
    }
  }, [decodedToken]);
  const handleSaveInfo = async () => {
    if (!user || !user.cardID) {
      // Handle the case when user or cardID is not available.
      console.error("User data or cardID is not available.");
      return;
    }

    const response = await request({
      url: `branch/vcard?cardID=${user.cardID}`,
      method: "GET",
      token: localStorage.getItem("token"),
    });

    if (response.success) {
      // Do something with the response data, e.g., show a success message or save the contact.
    } else {
      // Handle the error case, e.g., show an error message.
    }
  };
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {user && user.crdst ? (
        <Box
          sx={{
            display: "flex",
            backgroundColor: "#efefef",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              height: "100%",
              width: "100%",
              maxWidth: "60rem",
              boxShadow:
                "4px 0 15px -4px rgba(31, 73, 125, 0.8), -4px 0 8px -4px rgba(31, 73, 125, 0.8)",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "20vh",
                backgroundColor: "#000",
              }}
            />
            <Box
              sx={{
                width: "80%",
                height: "25vh",
              }}
            >
              <Avatar
                sx={{
                  position: "absolute",
                  height: "12rem",
                  width: "12rem",
                  transform: "translateY(-50%)",
                }}
                src={user.imglnk}
                alt="user image"
              />
              {/* Replace the Box below with the EyeOutline icon */}
              <Box
                sx={{
                  position: "absolute",
                  right: "5vh",
                }}
              ></Box>
              <Box
                sx={{
                  paddingTop: "10vh",
                  paddingBottom: "5vh",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    color: "#000",
                    fontWeight: 500,
                  }}
                >
                  {user.lstnm}{" "}
                  <Box
                    component="span"
                    sx={{
                      fontWeight: "normal",
                    }}
                  >
                    {user.frstnm}
                  </Box>
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    margin: "0.6rem 0",
                    fontSize: "1.6rem",
                    color: "#000",
                    fontWeight: 500,
                  }}
                >
                  {user.pstn}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>{user.cmpnnm}</Typography>
                  <button onClick={handleSaveInfo}>Save Contact</button>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: "60vh",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#e1eefe",
                padding: "5vh 0",
              }}
            >
              <Box
                sx={{
                  width: "80%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#fff",
                  borderRadius: "1rem",
                }}
              >
                <Link
                  href={`tel:${user.phnehome}`}
                  sx={{
                    display: "flex",
                    textDecoration: "none",
                    color: "#000",
                    fontWeight: 500,
                    height: "2rem",
                    width: "100%",
                    padding: "2rem 2rem",
                    "&:hover": { backgroundColor: "#efefef" },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: 24,
                      width: 24,
                      marginRight: 2,
                      backgroundImage: `url(/phone.png)`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  {user.phnehome}
                </Link>
                <Link
                  href={`mailto:${user.eml}`}
                  sx={{
                    display: "flex",
                    textDecoration: "none",
                    color: "#000",
                    fontWeight: 500,
                    height: "2rem",
                    width: "100%",
                    padding: "2rem 2rem",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: 24,
                      width: 24,
                      marginRight: 2,
                      backgroundImage: `url(/mail.png)`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  {user.eml}
                </Link>
                <Link
                  href={`${user.webaddrs}`}
                  sx={{
                    display: "flex",
                    textDecoration: "none",
                    color: "#000",
                    fontWeight: 500,
                    height: "2rem",
                    width: "100%",
                    padding: "2rem 2rem",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: 24,
                      width: 24,
                      marginRight: 2,
                      backgroundImage: `url(/facebook.png)`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  {user.frstnm} {user.lstnm}
                </Link>
                <Link
                  href={`${user.webaddrS_1}`}
                  sx={{
                    display: "flex",
                    textDecoration: "none",
                    color: "#000",
                    fontWeight: 500,
                    height: "2rem",
                    width: "100%",
                    padding: "2rem 2rem",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: 24,
                      width: 24,
                      marginRight: 2,
                      backgroundImage: `url(/instagram.png)`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  {user.webaddrS_1}
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 500, color: "#000" }}>
            Card is inactive
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Card;
