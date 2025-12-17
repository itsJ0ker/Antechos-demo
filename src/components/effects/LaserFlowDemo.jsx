import SimpleLaserFlow from './SimpleLaserFlow';
import LaserBeamEffect from './LaserBeamEffect';
import ParticleFieldEffect from './ParticleFieldEffect';
import WaveEffect from './WaveEffect';
import GridEffect from './GridEffect';
import CursorTrailEffect from './CursorTrailEffect';
import RippleEffect from './RippleEffect';

/**
 * Demo component showcasing different effect configurations
 * Use this for testing and previewing different effect combinations
 */
const LaserFlowDemo = () => {
  const demos = [
    { name: 'Laser Flow', Component: SimpleLaserFlow, color: '#3B82F6', intensity: 0.4, speed: 0.8 },
    { name: 'Radial Pulse', Component: LaserBeamEffect, color: '#6366F1', intensity: 0.35, speed: 0.6, beamCount: 5 },
    { name: 'Particle Field', Component: ParticleFieldEffect, color: '#8B5CF6', intensity: 0.4, speed: 0.6, particleCount: 40 },
    { name: 'Wave Effect', Component: WaveEffect, color: '#10B981', intensity: 0.5, speed: 0.7, waveCount: 3 },
    { name: 'Grid Effect', Component: GridEffect, color: '#06B6D4', intensity: 0.4, speed: 0.6, gridSize: 40 },
    { name: 'Cursor Trail ✨', Component: CursorTrailEffect, color: '#F59E0B', intensity: 0.7, trailLength: 25, particleSize: 6 },
    { name: 'Ripple Click 💫', Component: RippleEffect, color: '#EC4899', intensity: 0.6, maxRipples: 5 },
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-4xl font-bold text-white text-center mb-12">
        LaserFlow Effect Showcase
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {demos.map((demo) => {
          const EffectComponent = demo.Component;
          const isInteractive = demo.name.includes('✨') || demo.name.includes('💫');
          return (
            <div key={demo.name} className="relative h-64 rounded-2xl overflow-hidden border-2 border-gray-700 bg-gray-900">
              <EffectComponent 
                color={demo.color} 
                intensity={demo.intensity} 
                speed={demo.speed}
                beamCount={demo.beamCount}
                particleCount={demo.particleCount}
                waveCount={demo.waveCount}
                gridSize={demo.gridSize}
                trailLength={demo.trailLength}
                particleSize={demo.particleSize}
                maxRipples={demo.maxRipples}
              />
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-6 pointer-events-none">
                <h3 className="text-2xl font-bold mb-2">{demo.name}</h3>
                <div className="text-sm text-gray-300 space-y-1 text-center">
                  <p>Color: {demo.color}</p>
                  <p>Intensity: {demo.intensity}</p>
                  {isInteractive && (
                    <p className="text-blue-400 font-semibold mt-2">
                      {demo.name.includes('✨') ? 'Move your mouse!' : 'Click anywhere!'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16 max-w-4xl mx-auto bg-gray-800 rounded-2xl p-8 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">Usage Examples</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2">Laser Beam Effect</h3>
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-300">
{`import LaserBeamEffect from './components/effects/LaserBeamEffect';

<LaserBeamEffect 
  color="#3B82F6" 
  intensity={0.5} 
  speed={0.8}
  beamCount={4}
/>`}
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-400 mb-2">Particle Field Effect</h3>
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-300">
{`import ParticleFieldEffect from './components/effects/ParticleFieldEffect';

<ParticleFieldEffect 
  color="#8B5CF6" 
  intensity={0.4} 
  speed={0.6}
  particleCount={50}
  connectionDistance={150}
/>`}
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-2">Wave Effect</h3>
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-300">
{`import WaveEffect from './components/effects/WaveEffect';

<WaveEffect 
  color="#10B981" 
  intensity={0.5} 
  speed={0.7}
  waveCount={3}
/>`}
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-cyan-400 mb-2">Grid Effect</h3>
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-300">
{`import GridEffect from './components/effects/GridEffect';

<GridEffect 
  color="#06B6D4" 
  intensity={0.4} 
  speed={0.6}
  gridSize={40}
/>`}
            </pre>
          </div>

          <div className="border-t-2 border-amber-500 pt-6 mt-6">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">🎮 Interactive Effects</h2>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-amber-400 mb-2">Cursor Trail Effect ✨</h3>
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-300">
{`import CursorTrailEffect from './components/effects/CursorTrailEffect';

<CursorTrailEffect 
  color="#F59E0B" 
  intensity={0.7} 
  trailLength={25}
  particleSize={6}
/>

// Follows mouse movement with glowing trail`}
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-pink-400 mb-2">Ripple Effect 💫</h3>
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-300">
{`import RippleEffect from './components/effects/RippleEffect';

<RippleEffect 
  color="#EC4899" 
  intensity={0.6} 
  maxRipples={5}
/>

// Creates expanding rings on click`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaserFlowDemo;
