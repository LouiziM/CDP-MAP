import React, { useEffect, useState } from 'react';
import { InputLabel, Accordion, AccordionSummary, AccordionDetails, Typography, Button, Menu, MenuItem, IconButton, Select, FormControl } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import GraphDisplay from './GraphDisplay';
import LineDisplay from './LineDisplay';
import BoxPlot from './BoxPlot';
import Draggable from 'react-draggable';

const MainComponent = ({ snackBarOpen, setSnackBarOpen, snackBarMessage, setSnackBarMessage, flickerId, theme, items, setItems, fusedItems, setFusedItems }) => {
  const [anchorEls, setAnchorEls] = useState(Array(items.length).fill(null));
  const [expanded, setExpanded] = useState({});
  const [removedItems, setRemovedItems] = useState({});
  const [displayedFusedItems, setDisplayedFusedItems] = useState([]);
  const [graphTypes, setGraphTypes] = useState(Array(items.length).fill('Volume vendu par marque'));
  const [fusedGraphTypes, setFusedGraphTypes] = useState(Array(fusedItems.length).fill('Volume vendu par marque'));

  useEffect(() => {
    const updatedDisplayedFusedItems = fusedItems.map((fusedItem, index) => {
      const items = { ...fusedItem };
      if (removedItems[index]) {
        Object.keys(removedItems[index]).forEach((key) => {
          delete items[key];
        });
      }
      return items;
    });
    setDisplayedFusedItems(updatedDisplayedFusedItems);
  }, [fusedItems, removedItems]);

  useEffect(() => {
    setGraphTypes(Array(items.length).fill('Volume vendu par marque'));
  }, [items]);

  useEffect(() => {
    setFusedGraphTypes(Array(fusedItems.length).fill('Volume vendu par marque'));
  }, [fusedItems]);

  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };

  const deleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const deleteFusedItem = (index) => {
    const updatedFusedItems = [...fusedItems];
    updatedFusedItems.splice(index, 1);
    setFusedItems(updatedFusedItems);
  };

  const unfuseItem = (index) => {
    const unfusedItem = fusedItems[index];
    const itemsToAdd = Object.values(unfusedItem).filter(item => {
      const itemId = Object.keys(item)[0];
      return !items.some(item => Object.keys(item)[0] === itemId);
    });

    const updatedItems = [...items, ...itemsToAdd];
    const updatedFusedItems = fusedItems.filter((item, i) => i !== index);

    setItems(updatedItems);
    setFusedItems(updatedFusedItems);
  };

  const fuseItems = (index1, index2) => {
    const item1 = items[index1];
    const item2 = items[index2];
    const fusedItem = {
      item1: item1,
      item2: item2
    };
    setFusedItems([...fusedItems, fusedItem]);

    const updatedItems = items.filter((item, index) => index !== index1 && index !== index2);
    setItems(updatedItems);
  };

  const concatenateItemsWithFused = (fusedIndex, newItemIndex) => {
    const newItem = items[newItemIndex];
    const newItemId = Object.keys(newItem)[0];

    let currentFusedIds = Object.values(fusedItems[fusedIndex]).map(item => Object.keys(item)[0]);

    if (currentFusedIds.includes(newItemId)) {
      setSnackBarMessage("Item déjà ajouté.");
      setSnackBarOpen(true);
      return;
    }

    if (Object.keys(fusedItems[fusedIndex]).length - 2 < 4) {
      let concatenatedItem = {
        ...fusedItems[fusedIndex],
        [`item${Object.keys(fusedItems[fusedIndex]).length + 1}`]: newItem
      };

      const updatedFusedItems = [
        ...fusedItems.slice(0, fusedIndex),
        concatenatedItem,
        ...fusedItems.slice(fusedIndex + 1)
      ];

      const updatedItems = items.filter((_, index) => index !== newItemIndex);

      setFusedItems(updatedFusedItems);
      setItems(updatedItems);
    } else {
      setSnackBarMessage("Le nombre maximum pour la comparaison est atteint");
      setSnackBarOpen(true);
    }
  };

  const handleClick = (event, index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
  };

  const handleClose = (index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = null;
    setAnchorEls(newAnchorEls);
  };

  const handleMenuItemClick = (selectedItemId, index) => {
    handleClose(index);
    if (selectedItemId >= items.length) {
      concatenateItemsWithFused(selectedItemId - items.length, index);
    } else {
      fuseItems(index, selectedItemId);
    }
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [panel]: isExpanded
    }));
  };

  const handleItemToggle = (fusedIndex, itemKey) => {
    const updatedRemovedItems = { ...removedItems };
    const itemToRemove = fusedItems[fusedIndex][itemKey];
    if (removedItems[fusedIndex] && removedItems[fusedIndex][itemKey]) {
      delete updatedRemovedItems[fusedIndex][itemKey];
    } else {
      if (!updatedRemovedItems[fusedIndex]) {
        updatedRemovedItems[fusedIndex] = {};
      }
      updatedRemovedItems[fusedIndex][itemKey] = itemToRemove;
    }
    setRemovedItems(updatedRemovedItems);
  };

  const handleDeleteRemovedItem = (fusedIndex, itemKey) => {
    const updatedFusedItems = fusedItems.map((fusedItem, index) => {
      if (index === fusedIndex) {
        const updatedItem = { ...fusedItem };
        delete updatedItem[itemKey];
        return updatedItem;
      }
      return fusedItem;
    });
    setFusedItems(updatedFusedItems);

    const updatedRemovedItems = { ...removedItems };
    delete updatedRemovedItems[fusedIndex][itemKey];
    setRemovedItems(updatedRemovedItems);
  };

  const handleGraphTypeChange = (index, type, isFused) => {
    if (isFused) {
      const updatedFusedGraphTypes = [...fusedGraphTypes];
      updatedFusedGraphTypes[index] = type;
      setFusedGraphTypes(updatedFusedGraphTypes);
    } else {
      const updatedGraphTypes = [...graphTypes];
      updatedGraphTypes[index] = type;
      setGraphTypes(updatedGraphTypes);
    }
  };

  return (
    <div style={{
      position: 'absolute',
      left: 0,
      width: '400px',
      zIndex: 999,
    }}>
      <div>
      <Typography
      variant="h4"
      style={{
        marginLeft: "120px",
        backgroundColor: "white",
        color: theme.palette.blue.first,
        padding: "10px 20px",
        borderRadius: "4px",
        display: "inline-block",
        marginBottom:"8px",
        marginTop:"8px"
      }}
    >
      Succursale:
    </Typography>        
        {items.map((item, index) => {
          const itemId = Object.keys(item)[0];
          const itemData = Object.values(item)[0];
          const isFlickering = flickerId == itemId;
          const panelId = `panel-${itemId}`;
          const transformedData = [{ [`item${index + 1}`]: { [itemId]: itemData } }];

          return (
            <Draggable key={itemId + flickerId}>
              <div >
                <Accordion
                  expanded={expanded[panelId] || false}
                  onChange={handleAccordionChange(panelId)}
                  sx={{marginTop:"5px", borderRadius: '10px', animation: isFlickering ? 'flicker 1s linear' : 'none' }}
                >
                  <AccordionSummary>
                    <Typography sx={{ minWidth: "240px" }}>{itemData.name}</Typography>
                    <FormControl>
                      <IconButton
                        aria-controls={`fuse-fused-${index}`}
                        aria-haspopup="true"
                        onClick={(event) => handleClick(event, index)}
                      >
                        <ControlPointDuplicateIcon sx={{ color: theme.palette.blue.first, fontSize: "25px" }} />
                      </IconButton>
                      <Menu
                        id={`fuse-fused-${index}`}
                        anchorEl={anchorEls[index]}
                        open={Boolean(anchorEls[index])}
                        onClose={() => handleClose(index)}
                      >
                        {items.map((fuseItem, idx) => {
                          const fuseItemId = Object.keys(fuseItem)[0];
                          const fuseItemData = Object.values(fuseItem)[0];
                          if (idx !== index) {
                            return (
                              <MenuItem key={fuseItemId} onClick={() => handleMenuItemClick(idx, index)}>
                                {fuseItemData.name}
                              </MenuItem>
                            );
                          } else {
                            return null;
                          }
                        })}
                        {fusedItems.map((fusedItem, idx) => {
                          const fusedItemId = `fused-${idx}`;
                          if (fusedItems.length < 5) {
                            return (
                              <MenuItem key={fusedItemId} onClick={() => handleMenuItemClick(idx + items.length, index)}>
                                {`Fused Item ${idx + 1}`}
                              </MenuItem>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </Menu>
                    </FormControl>
                    <IconButton onClick={() => deleteItem(index)}>
                      <DeleteForeverIcon sx={{ color: theme.palette.blue.first, fontSize: "27px" }} />
                    </IconButton>
                    <IconButton onClick={() => setExpanded({...expanded, [panelId]: !expanded[panelId]})}>
                      {expanded[panelId] ? <ExpandLessIcon sx={{ color: theme.palette.blue.first, fontSize: "27px" }} /> : <ExpandMoreIcon sx={{ color: theme.palette.blue.first, fontSize: "27px" }} />}
                    </IconButton>
                  </AccordionSummary>
                  <AccordionDetails sx={{ paddingBottom: '15px', cursor: 'default', height: '400px' }}>
                    <FormControl sx={{ width: "80px", marginRight: "10px" }}>
                    <InputLabel id="type-label">Type</InputLabel>
                      <Select
                        labelId="type-label"
                         label="Type"
                        value={graphTypes[index] || 'Volume vendu par marque'}
                        onChange={(event) => handleGraphTypeChange(index, event.target.value, false)}
                      >
                        <MenuItem value="Satisfaction par mois">Satisfaction par mois</MenuItem>
                        <MenuItem value="Fréquence de satisfaction">Fréquence de satisfaction</MenuItem>
                        <MenuItem value="Volume vendu par marque">Volume vendu par marque</MenuItem>
                      </Select>
                    </FormControl>
                    {expanded[panelId] && (() => {
                      switch (graphTypes[index]) {
                        case 'Volume vendu par marque':
                          return <GraphDisplay initialData={transformedData} variation={'singular'}/>;
                        case 'Satisfaction par mois':
                          return <LineDisplay initialData={transformedData} type={'Satisfaction par mois'} variation={'singular'} />;
                        case 'Fréquence de satisfaction':
                          return <BoxPlot initialData={transformedData} type={'Fréquence de satisfaction'} variation={'singular'}/>;
                        default:
                          return null;
                      }
                    })()}
                  </AccordionDetails>
                </Accordion>
              </div>
            </Draggable>
          );
        })}
      </div>
      <div>
      <Typography
      variant="h4"
      style={{
        marginLeft: "110px",
        backgroundColor: "white",
        color: theme.palette.blue.first,
        padding: "10px 20px",
        borderRadius: "4px",
        display: "inline-block",
        marginBottom:"8px",
        marginTop:"8px"
      }}
    >
      Comparaison:
    </Typography>  
        {fusedItems.map((fusedItem, index) => (
          <Draggable key={index}>
            <div marginTop={"5px"}>
              <Accordion expanded={expanded[`fused-panel-${index}`] || false} onChange={handleAccordionChange(`fused-panel-${index}`)}>
                <AccordionSummary>
                  <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    {Object.keys(fusedItem).map((key) => (
                      <div key={key} style={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                          sx={{ flexGrow: 1, color: removedItems[index] && removedItems[index][key] ? 'grey' : 'inherit' }}
                          onClick={(event) => {
                            event.stopPropagation();
                            handleItemToggle(index, key);
                          }}
                        >
                          {Object.values(fusedItem[key])[0].name}
                        </Button>
                        {removedItems[index] && removedItems[index][key] && (
                          <IconButton
                            sx={{ color: theme.palette.blue.first, fontSize: "20px", marginLeft: '10px' }}
                            onClick={(event) => {
                              event.stopPropagation();
                              handleDeleteRemovedItem(index, key);
                            }}
                          >
                            <DeleteForeverIcon />
                          </IconButton>
                        )}
                      </div>
                    ))}
                  </div>
                  <IconButton onClick={(event) => {
                    event.stopPropagation();
                    unfuseItem(index);
                  }}
                  >
                    <UnarchiveIcon sx={{ color: theme.palette.blue.first, fontSize: "27px" }} />
                  </IconButton>
                  <IconButton onClick={(event) => {
                    event.stopPropagation();
                    deleteFusedItem(index);
                  }}
                  >
                    <DeleteForeverIcon sx={{ color: theme.palette.blue.first, fontSize: "27px" }} />
                  </IconButton>
                  <IconButton onClick={() => setExpanded({...expanded, [`fused-panel-${index}`]: !expanded[`fused-panel-${index}`]})}>
                    {expanded[`fused-panel-${index}`] ? <ExpandLessIcon sx={{ color: theme.palette.blue.first, fontSize: "27px" }} /> : <ExpandMoreIcon sx={{ color: theme.palette.blue.first, fontSize: "27px" }} />}
                  </IconButton>
                </AccordionSummary>
                <AccordionDetails sx={{ paddingBottom: '55px', cursor: 'default', height: '400px' }}>
                  <FormControl sx={{ width: "80px", marginRight: "10px" }}>
                    <InputLabel id="Type1">Type</InputLabel>
                    <Select
                      labelId="Type1"
                      label="Type"
                      value={fusedGraphTypes[index] || 'Satisfaction par mois'}
                      onChange={(event) => handleGraphTypeChange(index, event.target.value, true)}
                    >
                      <MenuItem value="Satisfaction par mois">Satisfaction par mois</MenuItem>
                      <MenuItem value="Fréquence de satisfaction">Fréquence de satisfaction</MenuItem>
                      <MenuItem value="Volume vendu par marque">Volume vendu par marque</MenuItem>
                    </Select>
                  </FormControl>
                  {expanded[`fused-panel-${index}`] && (() => {
                    switch (fusedGraphTypes[index]) {
                      case 'Volume vendu par marque':
                        return <GraphDisplay initialData={[displayedFusedItems[index]]} variation={'multi'} />;
                      case 'Satisfaction par mois':
                        return <LineDisplay initialData={[displayedFusedItems[index]]} type={'Satisfaction par mois'} />;
                      case 'Fréquence de satisfaction':
                        return <BoxPlot  initialData={[displayedFusedItems[index]]} type={'Fréquence de satisfaction'} variation={'multi'}/>;
                      default:
                        return null;
                    }
                  })()}
                </AccordionDetails>
              </Accordion>
            </div>
          </Draggable>
        ))}
      </div>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
        sx={{
          position: 'absolute',
          top: 600,
          left: 0,
          right: 0,
          width: '50%',
        }}
      >
        <Alert onClose={handleSnackBarClose} severity="error" sx={{ width: '100%' }}>
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MainComponent;
