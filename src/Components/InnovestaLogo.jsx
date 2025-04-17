import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const InnovestaLogo = (props) => {
  const { nodes, materials } = useGLTF('/models/innovesta_logo.glb')
  let width = window.screen.width
  let y = width == 1440 ? 1 : 0   
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials['Material.001']}
        position={[0, y, 22]}
        rotation={[0, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/models/innovesta_logo.glb')

export default InnovestaLogo;
