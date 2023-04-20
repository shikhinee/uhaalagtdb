import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "context/state";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import jwt_decode from "jwt-decode";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const Item = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  onClick,
  allowedRoles,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { decodedToken } = useContext(GlobalContext);
  if (
    allowedRoles &&
    (!decodedToken || !allowedRoles.includes(decodedToken.userStatus))
  ) {
    return null;
  }
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => {
        console.log(`Clicked: ${title}`); // Add this line to log the click event

        setSelected(title);
        onClick ? onClick() : to && navigate(to);
      }}
      icon={icon}
    >
      {onClick ? (
        <Typography>{title}</Typography>
      ) : (
        <Link to={to}>
          <Typography>{title}</Typography>
        </Link>
      )}
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [cardID, setCardID] = useState(null);
  const [hasCard, setHasCard] = useState(false);
  const navigate = useNavigate();
  const { setDecodedToken, decodedToken, request, setTokenLoading } =
    useContext(GlobalContext);
  console.log(useContext(GlobalContext));
  const branchID = decodedToken ? decodedToken.branchID : null;
  const decodeToken = (token) => {
    try {
      const decodedToken = jwt_decode(token);
      return decodedToken;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };
  const handleMyCardClick = async () => {
    console.log("handlecardclick called");
    if (decodedToken) {
      console.log(decodedToken.userID);
      const userId = decodedToken.userID;

      const response = await request({
        url: `branch/getCardByUserId`,
        method: "GET",
      });
      console.log("API response:", response); // Add this line to log the response

      if (response.success) {
        if (response.value && response.value.length > 0) {
          console.log("Setting cardID to:", response.value[0].cardID); // Add this line to log the new cardID value
          console.log(cardID);
          setCardID(response.value[0].cardID);
        } else {
          navigate("/add");
        }
      }
    }
  };
  useEffect(() => {
    const fetchCardID = async () => {
      const response = await request({
        url: `branch/getCardByUserId`,
        method: "GET",
      });

      if (response.success) {
        if (response.value && response.value.length > 0) {
          setHasCard(true);
        } else {
          setHasCard(false);
        }
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        setDecodedToken(decoded);
        fetchCardID();
      }
    }
    setTokenLoading(false);
  }, []);
  useEffect(() => {
    if (cardID) {
      navigate(`/card/${cardID}`);
    }
  }, [cardID, navigate]);
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": { backgroundColor: `transparent !important` },
        "& .pro-inner-item": { padding: `5px 35px 5px 20px !important` },
        "& .pro-inner-item:hover": { color: `#868dfb !important` },
        "& .pro-menu-item.active": { color: `#6870fa !important` },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  TDB
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {decodedToken && decodedToken.username}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {decodedToken && decodedToken.userStatus === "admin"
                    ? "Админ"
                    : decodedToken && decodedToken.userStatus === "branchAdmin"
                    ? "Салбарын Админ"
                    : decodedToken && decodedToken.userStatus === "Accepted"
                    ? "Ажилтан"
                    : ""}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Home"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              allowedRoles={["Admin", "branchAdmin", "Accepted"]}
            />
            <Item
              title="Миний Карт"
              icon={<CreditCardOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              onClick={handleMyCardClick}
            />
            {hasCard && (
              <Item
                title="Карт засах"
                to="/edit"
                icon={<SettingsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            <Item
              title="Нууц үг солих"
              icon={<LockOpenIcon />}
              to="/changePassword"
              selected={selected}
              setSelected={setSelected}
            />
            {decodedToken &&
              ["Admin", "branchAdmin"].includes(decodedToken.userStatus) && (
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Бүлэг
                </Typography>
              )}
            <Item
              title="Салбар"
              to="/branch"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              allowedRoles={["Admin"]}
            />
            {branchID && (
              <Item
                title="Хэлтэс"
                to={`/departments/${branchID}`}
                icon={<MapOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                allowedRoles={["Admin", "branchAdmin"]}
              />
            )}
            {decodedToken &&
              ["Admin", "branchAdmin"].includes(decodedToken.userStatus) && (
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Ажилчид
                </Typography>
              )}
            <Item
              title="Ажилчид"
              to="/users"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              allowedRoles={["Admin", "branchAdmin"]}
            />
            <Item
              title="Шинэ ажилтан"
              to="/userRequests"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              allowedRoles={["Admin", "branchAdmin"]}
            />
            {decodedToken &&
              ["Admin", "branchAdmin"].includes(decodedToken.userStatus) && (
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Карт
                </Typography>
              )}
            <Item
              title="Картнууд"
              to="/cards"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              allowedRoles={["Admin", "branchAdmin"]}
            />
            <Item
              title="Картны хүсэлтүүд"
              to="/cardRequests"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              allowedRoles={["Admin", "branchAdmin"]}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
