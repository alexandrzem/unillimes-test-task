import React, { useEffect, useMemo, useRef, useState } from "react"
import { Canvas,useThree } from "@react-three/fiber"
import { OrbitControls, Box } from "@react-three/drei"
import ControlPanel from "./ControlPanel"
import * as THREE from 'three'
import {  Box as MuiBox } from '@mui/material'
import useUpdatedTexture from './hooks/useUpdatedTexture'

const TableLeg = ({ size, position,color,tableLegStyle,tableLegTextureURL,repeat }) => {
  const geometry = useMemo(() => {
    if (tableLegStyle === "round") {
      return new THREE.CylinderGeometry(size[0] / 2, size[0] / 2, size[1], 16);
    } else {
      return new THREE.BoxGeometry(size[0], size[1], size[2]);
    }
  }, [tableLegStyle, size]);

  const texture = useUpdatedTexture(tableLegTextureURL,repeat)

  const material = useMemo(() => {
    const newMaterial = new THREE.MeshStandardMaterial({ color })
    if (texture) {
      newMaterial.map = texture
    }
    return newMaterial
  }, [color, texture])

  return (
    <mesh position={position}  geometry={geometry}>
       <primitive object={material} />
    </mesh>
)}

const CameraSetup = () => {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(1, 2, 2)
    camera.lookAt(0, 0, 0)
  }, [camera])

  return null
};

const TableTop = ({ size,color,tableTopTextureURL,repeat }) => {
   const texture = useUpdatedTexture(tableTopTextureURL,repeat);

    const material = useMemo(() => {
    const newMaterial = new THREE.MeshStandardMaterial({ color })
    if (texture) {
      newMaterial.map = texture
    }
    return newMaterial
  }, [color, texture])

  return (
    <Box args={size}>
       <primitive object={material} />
    </Box>
  )
}

const Table = () => {
  const [tableTopSize, setTableTopSize] = useState([1.1, 0.05, 0.7])
  const [tableLegSize, setTableLegSize] = useState([0.1, 0.8, 0.1])

  const [tableTopColor,setTableTopColor] = useState('#723e1c')
  const [tableLegColor,setTableLegColor] = useState('#000000')

  const [tableLegStyle, setTableLegStyle] = useState("square")

  const [tableTopTextureURL, setTableTopTextureURL] = useState(null)
  const [tableLegTextureURL, setTableLegTextureURL] = useState(null)

  const [tableTopTextureRepeat, setTableTopTextureRepeat] = useState([1,1])
  const [tableLegTextureRepeat, setTableLegTextureRepeat] = useState([1,1])


  const tableRef = useRef()

  const legPosition = (x, z) => {
    return new THREE.Vector3(x, -0.425 - (tableLegSize[1] / 2 - 0.425), z);
  }

  const handleSave = () => {
  const data = {
    countertop: {
      width: tableTopSize[0] * 1000,
      height: tableTopSize[1] * 1000,
      depth: tableTopSize[2] * 1000,
      color: tableTopColor,
      textureRepeatX: tableTopTextureRepeat[0],
      textureRepeatY: tableTopTextureRepeat[1],
      texture: tableTopTextureURL,
    },
    tablelegs: {
      style: tableLegStyle,
      size: tableLegSize[0] * 1000,
      height: tableLegSize[1] * 1000,
      color: tableLegColor,
      textureRepeatX: tableLegTextureRepeat[0],
      textureRepeatY: tableLegTextureRepeat[1],
      texture: tableLegTextureURL,
    },
  };
    const jsonString = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "table-config.json"
    a.click()
    URL.revokeObjectURL(url)
  }


  return (
    <MuiBox style={{ display: "flex", width: "100%", height: "100%" }}>
      <MuiBox style={{ flexGrow: 1 }}>
          <Canvas ref={tableRef}>
            <CameraSetup />
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 15, 10]} angle={0.3} />
            <TableTop size={tableTopSize} color={tableTopColor} tableTopTextureURL={tableTopTextureURL} repeat={tableTopTextureRepeat} />
            <TableLeg size={tableLegSize} position={legPosition(-0.45, -0.225)} color={tableLegColor} tableLegStyle={tableLegStyle} tableLegTextureURL={tableLegTextureURL} repeat={tableLegTextureRepeat} />
            <TableLeg size={tableLegSize} position={legPosition(-0.45, 0.225)} color={tableLegColor} tableLegStyle={tableLegStyle} tableLegTextureURL={tableLegTextureURL} repeat={tableLegTextureRepeat} />
            <TableLeg size={tableLegSize} position={legPosition(0.45, -0.225)} color={tableLegColor}  tableLegStyle={tableLegStyle} tableLegTextureURL={tableLegTextureURL} repeat={tableLegTextureRepeat} />
            <TableLeg size={tableLegSize} position={legPosition(0.45, 0.225)}  color={tableLegColor} tableLegStyle={tableLegStyle} tableLegTextureURL={tableLegTextureURL} repeat={tableLegTextureRepeat} />
          </Canvas>
      </MuiBox>
        <ControlPanel
          tableTopSize={tableTopSize}
          setTableTopSize={setTableTopSize}
          tableLegSize={tableLegSize}
          setTableLegSize={setTableLegSize}
          tableTopColor={tableTopColor}
          tableLegColor={tableLegColor}
          setTableTopColor={setTableTopColor}
          setTableLegColor={setTableLegColor}
          tableLegStyle={tableLegStyle} 
          setTableLegStyle={setTableLegStyle} 
          setTableTopTextureURL={setTableTopTextureURL}
          setTableLegTextureURL={setTableLegTextureURL}
          tableTopTextureRepeat={tableTopTextureRepeat}
          setTableTopTextureRepeat={setTableTopTextureRepeat}
          tableLegTextureRepeat={tableLegTextureRepeat}
          setTableLegTextureRepeat={setTableLegTextureRepeat}
          onSave={handleSave}
        />  
    </MuiBox>
  );
};

export default Table;
