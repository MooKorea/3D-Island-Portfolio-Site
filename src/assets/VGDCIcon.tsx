/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 public/VGDCIcon.glb -t -r public 
*/

import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Cube076: THREE.Mesh
    Cube076_1: THREE.Mesh
  }
  materials: {
    White: THREE.MeshStandardMaterial
    Black: THREE.MeshStandardMaterial
  }
}

export function VGDCIcon(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/VGDCIcon.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cube076.geometry} material={materials.White} />
      <mesh geometry={nodes.Cube076_1.geometry} material={materials.Black} />
    </group>
  )
}

useGLTF.preload('/VGDCIcon.glb')
