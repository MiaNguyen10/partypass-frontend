import { ListItemIcon, MenuItem, MenuList, styled } from "@mui/material";
import PropTypes from 'prop-types';

const MenuItemStyled = styled(MenuItem)({
  padding: 0,
  "&:hover": {
    backgroundColor: "transparent",
  },
});
const MenuListStyled = styled(MenuList)({
  display: "flex",
  flexDirection: "row",
});

const MenuAction = ({submenu}) => {
  return (
    <MenuListStyled>
      {submenu?.map((sub, index) => (
        <MenuItemStyled
          key={`table-item-${index}`}
          disableRipple
          onClick={sub?.link ? sub?.link : sub?.onClick || null}
        >
          <ListItemIcon>{sub.icon}</ListItemIcon>
        </MenuItemStyled>
      ))}
    </MenuListStyled>
  );
};
MenuAction.propTypes = {
  submenu: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node,
      link: PropTypes.func,
      onClick: PropTypes.func,
    })
  ),
};

export default MenuAction;
