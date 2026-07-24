import React, { useRef, useMemo, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random';

class WebGLErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.warn("WebGL Canvas failed to render:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

function ParticleSwarm(props) {
  const ref = useRef();

  // Generate 1667 particles (1667 * 3 = 5001 values, perfectly divisible by stride 3)
  const sphere = useMemo(() => {
    try {
      const data = new Float32Array(5001);
      return random.inSphere(data, { radius: 1.5 });
    } catch (err) {
      console.error("Particle generation error:", err);
      return new Float32Array(0);
    }
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  if (!sphere || sphere.length === 0) return null;

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#00f3ff"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0c0c1e] to-[#04040a]">
      <WebGLErrorBoundary>
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticleSwarm />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}

