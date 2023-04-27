import React from "react";
import { Box } from "@mui/system";
import { FormControl, Select, MenuItem, TextField, Typography, Button } from "@mui/material";


const ControlPanel = ({ 
  tableTopSize, 
  setTableTopSize,
  tableLegSize, 
  setTableLegSize,
  tableLegColor, 
  tableTopColor ,
  setTableTopColor,
  setTableLegColor,
  tableLegStyle, 
  setTableLegStyle,
  setTableTopTextureURL,
  setTableLegTextureURL,
  tableTopTextureRepeat,
  setTableTopTextureRepeat,
  tableLegTextureRepeat,
  setTableLegTextureRepeat,
  onSave,
}) => {
  const tableTop = tableTopSize || {}
  const tableLeg = tableLegSize || {}

  const handleChangeSize = (e, index, state, setter) => {
    const newSize = [...state]
    if(state === tableTopTextureRepeat || state === tableLegTextureRepeat){
      newSize[index] =  e.target.value === "" ? 0 : Math.max(parseFloat(e.target.value),0)
      setter(newSize)
    } else {
      newSize[index] =  e.target.value === "" ? 0 : Math.max((parseFloat(e.target.value)/1000),0)
      setter(newSize)
    }
    
  };

  const handleChangeColor = (e,  setter) => {
      const newColor = e.target.value
      setter(newColor)
  }
    
  const handleTextureChange = (e, setTextureURL) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setTextureURL(reader.result)
      };
      reader.readAsDataURL(file)
    }
  };

  const handleLoadCustomConfig = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target.result)
        setTableTopSize([
          config.countertop.width / 1000,
          config.countertop.height / 1000,
          config.countertop.depth / 1000,
        ]);
        setTableTopColor(config.countertop.color)
        setTableTopTextureURL(config.countertop.texture)
        setTableTopTextureRepeat([
          config.countertop.textureRepeatX,
          config.countertop.textureRepeatY,
        ]);

        setTableLegStyle(config.tablelegs.style)
        setTableLegSize([
          config.tablelegs.size / 1000,
          config.tablelegs.height / 1000,
          config.tablelegs.size / 1000,
        ]);
        setTableLegColor(config.tablelegs.color)
        setTableLegTextureURL(config.tablelegs.texture)
        setTableLegTextureRepeat([
          config.tablelegs.textureRepeatX,
          config.tablelegs.textureRepeatY,
        ]);
      } catch (error) {
        console.error("Error parsing JSON:", error)
      }
    };
    reader.readAsText(file);
  }
};
  const handleResetTable = () => {
    setTableTopSize(defaultTableTopSize)
    setTableLegSize(defaultTableLegSize)
    setTableTopColor(defaultTableTopColor)
    setTableLegColor(defaultTableLegColor)
    setTableLegStyle(defaultTableLegStyle)
    setTableTopTextureURL(defaultTableTopTextureURL)
    setTableLegTextureURL(defaultTableLegTextureURL)
    setTableTopTextureRepeat(defaultTableTopTextureRepeat)
    setTableLegTextureRepeat(defaultTableLegTextureRepeat)
  }

  return (
   <Box sx={{
      fontFamily:'sans-serif',
      minWidth:'400px',
      marginRight:2,
      overflowY: "auto",
      border:'1px solid',
      padding:2.5,
      'input':{
        padding:'8px 6px',maxWidth:'100px'
      }
    }}>
      <section>
        <Typography mt={2} variant='h5'>Countertop</Typography>
        <Typography mt={1}>Width</Typography>
        <TextField
          value={Math.min(Math.max(tableTop[0] * 1000,0), 999999) }
          onChange={(e) => handleChangeSize(e, 0,tableTop, setTableTopSize)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="dense"
        />
        <Typography mt={1}>Height</Typography>
        <TextField
          value={Math.min(Math.max(tableTop[1] * 1000,0), 999999) }
          onChange={(e) => handleChangeSize(e, 1,tableTop, setTableTopSize)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="dense"
        />
        <Typography mt={1}>Depth</Typography>
        <TextField
          value={Math.min(Math.max(tableTop[2] * 1000,0), 999999) }
          onChange={(e) => handleChangeSize(e, 2,tableTop, setTableTopSize)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="dense"
        />
        <Typography mt={1}>Color</Typography>
        <TextField
          type="color"
          value={tableTopColor}
          margin="dense"
          sx={{minWidth:'50px'}}
          onChange={(e )=>handleChangeColor(e,setTableTopColor)}
        />
        <FormControl fullWidth margin="normal">
        <Typography mb={1}>Table Top Texture</Typography>
          <Button
            variant="contained"
            component="label"
          >
            Upload Texture
            <input
              type="file"
              id="countertop-texture"
              accept="image/*"
              hidden
              onChange={(e) => handleTextureChange(e, setTableTopTextureURL)}
            />
          </Button>
        </FormControl>
        <Box display='flex'>
          <Box mr={3}>
            <Typography mt={1}>Repeat X</Typography>
            <TextField
              type="number"
              value={tableTopTextureRepeat[0]}
              margin="dense"
              sx={{minWidth:'50px'}}
              onChange={(e)=>handleChangeSize(e,0, tableTopTextureRepeat,setTableTopTextureRepeat)}
            />
          </Box>
          <Box>
            <Typography mt={1}>Repeat Y</Typography>
            <TextField
              type="number"
              value={tableTopTextureRepeat[1]}
              margin="dense"
              sx={{minWidth:'50px'}}
              onChange={(e)=>handleChangeSize(e,1,tableTopTextureRepeat,setTableTopTextureRepeat)}
            />
          </Box>
        </Box>
        
      </section>
      
      <section>
        <Typography mt={2} variant='h5'>Table Legs</Typography>
        <Typography mt={1}>Legs Style</Typography>
        <FormControl fullWidth>
        <Select 
          labelId="table-leg-style-label"
          id="table-leg-style"
          sx={{height:'39px',mt:1}}
          value={tableLegStyle}
          onChange={(e) => setTableLegStyle(e.target.value)}
        >
          <MenuItem value="square">Square</MenuItem>
          <MenuItem value="round">Round</MenuItem>
        </Select>
      </FormControl>
        <Typography mt={1}>Size</Typography>
        <TextField
          value={Math.min(Math.max(tableLeg[0] * 1000,0), 999999) }
          onChange={(e) => handleChangeSize(e, 0,tableLeg, setTableLegSize)}
          fullWidth
          margin="dense"
        />
        <Typography mt={1}>Height</Typography>
        <TextField
          value={Math.min(Math.max(tableLeg[1] * 1000,0), 999999) }
          onChange={(e) => handleChangeSize(e, 1, tableLeg, setTableLegSize)}
          fullWidth
          margin="dense"
        />
        <Typography mt={1}>Color</Typography>
        <TextField
          type="color"
          value={tableLegColor}
          margin="dense"
          sx={{minWidth:'50px'}}
          onChange={(e )=>handleChangeColor(e,setTableLegColor)}
        />
        <FormControl fullWidth margin="normal">
        <Typography mb={1}>Table Legs Texture</Typography>
          <Button
            variant="contained"
            component="label"
          >
            Upload Texture
            <input
              type="file"
              id="tablelegs-texture"
              accept="image/*"
              hidden
              onChange={(e) => handleTextureChange(e, setTableLegTextureURL)}
            />
          </Button>
      </FormControl>
       <Box display='flex'>
          <Box mr={3}>
            <Typography mt={1}>Repeat X</Typography>
            <TextField
              type="number"
              value={tableLegTextureRepeat[0]}
              margin="dense"
              sx={{minWidth:'50px'}}
              onChange={(e)=>handleChangeSize(e,0, tableLegTextureRepeat,setTableLegTextureRepeat)}
            />
          </Box>
          <Box>
            <Typography mt={1}>Repeat Y</Typography>
            <TextField
              type="number"
              value={tableLegTextureRepeat[1]}
              margin="dense"
              sx={{minWidth:'50px'}}
              onChange={(e)=>handleChangeSize(e,1,tableLegTextureRepeat,setTableLegTextureRepeat)}
            />
          </Box>
        </Box>
      </section>
      <Box mt={2.5}>
        <Box mb={2}>
          <Button variant="contained" component="label">
            Load Custom Config
            <input
              type="file"
              accept=".json"
              hidden
              onChange={(e) => handleLoadCustomConfig(e)}
            />
          </Button>
        </Box>
      <Box sx={{display:'flex',justifyContent:'space-between'}}>
        <Button   variant="contained" color="primary"  disabled={true}>Snapshot</Button>
        <Button variant="contained" color="primary" onClick={onSave}>
          Save
        </Button>
        <Button variant="contained" onClick={handleResetTable}>
          New Table
        </Button>
      </Box>
      </Box>
    </Box>
  );
};

export default ControlPanel;


const defaultTableTopSize = [1.1, 0.05, 0.7]
const defaultTableLegSize = [0.1, 0.8, 0.1]
const defaultTableTopColor = '#723e1c'
const defaultTableLegColor = '#000000'
const defaultTableLegStyle = 'square'
const defaultTableTopTextureURL = null
const defaultTableLegTextureURL = null
const defaultTableTopTextureRepeat = [1, 1]
const defaultTableLegTextureRepeat = [1, 1]