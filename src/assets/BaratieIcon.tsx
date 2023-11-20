/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 public/BaratieIcon.glb -t -r public 
*/

import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Fish: THREE.Mesh
  }
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial
  }
}


export function BaratieIcon(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/BaratieIcon.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Fish.geometry} material={materials['Material.001']} />
    </group>
  )
}

useGLTF.preload('/BaratieIcon.glb')
