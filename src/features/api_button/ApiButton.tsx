import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

export const ApiButton = ({options, handler} : any) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleMenuItemClick = (
      event: React.MouseEvent<HTMLLIElement, MouseEvent>,
      index: number
  ) => {
      setSelectedIndex(index);
      setOpen(false);
      handler(options[index]);
  };

  const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
      if (
          anchorRef.current &&
          anchorRef.current.contains(event.target as HTMLElement)
      ) {
          return;
      }

      setOpen(false);
  };

  return (
      <React.Fragment>
          <ButtonGroup
              variant="contained"
              ref={anchorRef}
              aria-label="split button">
              <Button>{options[selectedIndex]}</Button>
              <Button
                  size="small"
                  aria-controls={open ? "split-button-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-label="select merge strategy"
                  aria-haspopup="menu"
                  onClick={handleToggle}>
                  <ArrowDropDownIcon />
              </Button>
          </ButtonGroup>
          <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal>
              {({ TransitionProps, placement }) => (
                  <Grow
                      {...TransitionProps}
                      style={{
                          transformOrigin:
                              placement === "bottom"
                                  ? "center top"
                                  : "center bottom",
                      }}>
                      <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                              <MenuList id="split-button-menu">
                                  {options.map((option: any, index: number) => (
                                      <MenuItem
                                          key={option}
                                          selected={index === selectedIndex}
                                          disabled={index === 1}
                                          onClick={(event) =>
                                              handleMenuItemClick(event, index)
                                          }>
                                          {option}
                                      </MenuItem>
                                  ))}
                              </MenuList>
                          </ClickAwayListener>
                      </Paper>
                  </Grow>
              )}
          </Popper>
      </React.Fragment>
  );
}
