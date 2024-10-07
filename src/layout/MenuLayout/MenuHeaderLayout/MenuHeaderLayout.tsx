import  React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { getProfile, userActions } from "../../../store/user.slice";
import { Link, useNavigate } from "react-router-dom";
import { cartActions } from "../../../store/cart.slice";
import LoginIcon from "@mui/icons-material/Login";

export default function PrimarySearchAppBar() {
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
	  React.useState<null | HTMLElement>(null);
  	const dispatch = useDispatch<AppDispatch>();
	const profile = useSelector((s: RootState) => s.user.profile);
	const items = useSelector((s: RootState) => s.cart.items);
	const {jwt} = useSelector((s: RootState) => s.user);
	const logout = () => {
		dispatch(userActions.logout());
		dispatch(cartActions.clean());
		handleMenuClose();
		console.log(profile);
		navigate("/auth/login");
	};
	useEffect(() => {if(jwt){
		dispatch(getProfile());}
	else{return;}
	}, [dispatch, jwt]);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
	  setAnchorEl(event.currentTarget);
	};
  
	const handleMobileMenuClose = () => {
	  setMobileMoreAnchorEl(null);
	};
  
	const handleMenuClose = () => {
	  setAnchorEl(null);
	  handleMobileMenuClose();
	};
  
	const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
	  setMobileMoreAnchorEl(event.currentTarget);
	};
  
	const menuId = "primary-search-account-menu";
	const LoggedInOrNot =()=> {
		if(jwt){
			return<>
				<MenuItem onClick={logout}>Выйти</MenuItem>
				<MenuItem onClick={handleMenuClose}><Link to='/profile'>Профиль</Link></MenuItem></>;
		}
		else {
			return<>
				<MenuItem component={Link} to='/auth/login'>Войти</MenuItem>
				<MenuItem component={Link} to='/auth/register'>Зарегестрироваться</MenuItem></>;}
	};
	const renderMenu = (
		<Menu
		  anchorEl={anchorEl}
		  anchorOrigin={{
				vertical: "top",
				horizontal: "right"
		  }}
		  id={menuId}
		  keepMounted
		  transformOrigin={{
				vertical: "top",
				horizontal: "right"
		  }}
		  open={isMenuOpen}
		  onClose={handleMenuClose}
		>
		  <LoggedInOrNot/>
		</Menu>
	  );
	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
	  <Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
		  vertical: "top",
		  horizontal: "right"
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
		  vertical: "top",
		  horizontal: "right"
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
	  >
			<MenuItem>
			</MenuItem>
			<MenuItem>
		  <IconButton
					size="large"
					aria-label="show the number of items in the cart"
					color="inherit"
					component = {Link}
					to='/cart'
		  >			
		  
					<Badge badgeContent={items.reduce((acc, item) => acc += item.count, 0)} color="error">
			  <ShoppingCartIcon/>
					</Badge>
		  </IconButton>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
		  <IconButton
					size="large"
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
					
		  >
					{profile ? (
						<img src ={profile?.avatar} height='60px' width='60px'/>) : (<LoginIcon height='60px' width='60px' />)}
		  </IconButton>
		  
			</MenuItem>
	  </Menu>
	);
  
	return (
	  <Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
		  <Toolbar>
					<Typography
			  variant="h6"
			  noWrap
			  sx={{ display: { sm: "block" } }}
			  component={Link} // Используйте Link как компонент
			  to='/'
					>
			  eShop
					</Typography>
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { xs: "none", md: "flex" } }}>
			  <IconButton
							size="large"
							aria-label="show "
							color="inherit"
							component = {Link}
							to='/cart'
			  >
							<Badge badgeContent={items.reduce((acc, item) => acc += item.count, 0)} color="error">
				  <ShoppingCartIcon/>
							</Badge>
			  </IconButton>
			  <IconButton
							size="large"
							edge="end"
							aria-label="show the number of items in the cart"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"
			  >
							{profile ? (
								<img src ={profile?.avatar} height='60px' width='60px'/>) : (<LoginIcon height='60px' width='60px' />)}
			  </IconButton>
					</Box>
					<Box sx={{ display: { xs: "flex", md: "none" } }}>
			  <IconButton
							size="large"
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
			  >
							<MoreIcon />
			  </IconButton>
					</Box>
		  </Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
	  </Box>
	);
}